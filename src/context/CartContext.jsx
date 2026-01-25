import { createContext, useContext, useState, useMemo, useCallback } from "react"
import { assets, getAssetsByCategory, PRICE_PER_ITEM, MINIMUM_CART } from "@/data/assets"

const CartContext = createContext(null)

export function CartProvider({ children }) {
  // Set of selected asset IDs
  const [selectedItems, setSelectedItems] = useState(new Set())

  // Toggle a single item
  const toggleItem = useCallback((assetId) => {
    setSelectedItems((prev) => {
      const next = new Set(prev)
      if (next.has(assetId)) {
        next.delete(assetId)
      } else {
        next.add(assetId)
      }
      return next
    })
  }, [])

  // Toggle an entire category pack
  const togglePack = useCallback((categoryId) => {
    const categoryAssets = getAssetsByCategory(categoryId)
    const categoryIds = categoryAssets.map((a) => a.id)

    setSelectedItems((prev) => {
      const next = new Set(prev)
      // Check if all items in pack are already selected
      const allSelected = categoryIds.every((id) => prev.has(id))

      if (allSelected) {
        // Remove all items from this pack
        categoryIds.forEach((id) => next.delete(id))
      } else {
        // Add all items from this pack
        categoryIds.forEach((id) => next.add(id))
      }
      return next
    })
  }, [])

  // Check if an item is selected
  const isItemSelected = useCallback(
    (assetId) => selectedItems.has(assetId),
    [selectedItems]
  )

  // Check if all items in a pack are selected
  const isPackSelected = useCallback(
    (categoryId) => {
      const categoryAssets = getAssetsByCategory(categoryId)
      return categoryAssets.every((asset) => selectedItems.has(asset.id))
    },
    [selectedItems]
  )

  // Check if some (but not all) items in a pack are selected
  const isPackPartiallySelected = useCallback(
    (categoryId) => {
      const categoryAssets = getAssetsByCategory(categoryId)
      const selectedCount = categoryAssets.filter((asset) =>
        selectedItems.has(asset.id)
      ).length
      return selectedCount > 0 && selectedCount < categoryAssets.length
    },
    [selectedItems]
  )

  // Clear entire cart
  const clearCart = useCallback(() => {
    setSelectedItems(new Set())
  }, [])

  // Select all items
  const selectAll = useCallback(() => {
    setSelectedItems(new Set(assets.map((a) => a.id)))
  }, [])

  // Get cart totals
  const cartTotals = useMemo(() => {
    const itemCount = selectedItems.size
    const price = itemCount * PRICE_PER_ITEM
    const meetsMinimum = price >= MINIMUM_CART
    const amountToMinimum = meetsMinimum ? 0 : MINIMUM_CART - price
    const itemsToMinimum = Math.ceil(amountToMinimum / PRICE_PER_ITEM)

    return {
      itemCount,
      price,
      meetsMinimum,
      amountToMinimum,
      itemsToMinimum,
    }
  }, [selectedItems])

  // Get selected items as array (for cart display)
  const selectedItemsList = useMemo(() => {
    return assets.filter((asset) => selectedItems.has(asset.id))
  }, [selectedItems])

  const value = {
    selectedItems,
    toggleItem,
    togglePack,
    isItemSelected,
    isPackSelected,
    isPackPartiallySelected,
    clearCart,
    selectAll,
    cartTotals,
    selectedItemsList,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
