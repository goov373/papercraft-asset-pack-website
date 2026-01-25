# Papercraft UI: Interactive Behaviors & Components

## Chunk 5 of 5

> *"Moving away from it just being an art style, and it's a totally realistic treatment of paper... The first fold was a revelation."*
> — Media Molecule, Tearaway GDC Talk

---

## Overview

This final chunk synthesizes all previous research into complete, interactive paper components. Where Chunks 2-4 defined *how paper looks*, this chunk defines *how paper moves and responds*. We'll establish interaction states, physics-based animations, folding systems, and component recipes that bring the papercraft aesthetic to life.

**Dependencies**: This document assumes familiarity with:
- **Chunk 2**: Shadow & Elevation System (4-level elevation tokens)
- **Chunk 3**: Edge Treatment System (SVG filters, torn edges, folds)
- **Chunk 4**: Texture System (feTurbulence, material textures, aging)

---

## Part 1: Paper Interaction States

### 1.1 The Physics of Paper Response

Before writing CSS, understand how real paper responds to interaction:

```
PHYSICAL PAPER BEHAVIOR
=======================

AT REST (Default):
┌─────────────────────┐
│                     │  • Lies flat on surface
│        📄           │  • Casts minimal shadow
│                     │  • Edges touch surface
└─────────────────────┘

HOVER (Lifted):
     ┌─────────────────┐
    ╱                  ╱│   • Paper lifts from surface
   ╱                  ╱ │   • Shadow grows + softens
  ╱                  ╱  │   • Slight perspective shift
 └──────────────────┘   │   • Edges separate from surface
   │                    │
   └────────────────────┘
        ↑ Shadow

PRESSED (Flattened):
━━━━━━━━━━━━━━━━━━━━━━━
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   • Paper compresses
│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│   • Shadow nearly disappears
━━━━━━━━━━━━━━━━━━━━━━━   • Surface "pushes back"

FOCUSED (Highlighted):
┌╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┐
╏                     ╏   • Visible outline appears
╏        📄           ╏   • Elevation unchanged
╏                     ╏   • Indicates keyboard selection
└╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍╍┘
```

### 1.2 State Token System

```css
:root {
  /* ================================================
     INTERACTION STATE TOKENS
     Integrate with elevation system from Chunk 2
     ================================================ */
  
  /* Default State (Elevation Level 1) */
  --paper-state-default-elevation: var(--paper-elevation-1);
  --paper-state-default-transform: translateY(0) rotateX(0deg);
  --paper-state-default-filter: none;
  
  /* Hover State (Elevation Level 2-3) */
  --paper-state-hover-elevation: var(--paper-elevation-2);
  --paper-state-hover-transform: translateY(-4px) rotateX(2deg);
  --paper-state-hover-scale: 1.02;
  
  /* Active/Pressed State (Elevation Level 0) */
  --paper-state-active-elevation: var(--paper-elevation-0);
  --paper-state-active-transform: translateY(1px) scale(0.98);
  --paper-state-active-filter: brightness(0.95);
  
  /* Focus State (Keyboard Navigation) */
  --paper-state-focus-outline-width: 3px;
  --paper-state-focus-outline-color: var(--paper-focus-ring, #0066cc);
  --paper-state-focus-outline-offset: 2px;
  --paper-state-focus-outline-style: solid;
  
  /* Disabled State */
  --paper-state-disabled-opacity: 0.5;
  --paper-state-disabled-filter: grayscale(30%);
  --paper-state-disabled-cursor: not-allowed;
  
  /* Dragging State (Elevation Level 4) */
  --paper-state-dragging-elevation: var(--paper-elevation-4);
  --paper-state-dragging-transform: translateY(-8px) rotate(-2deg);
  --paper-state-dragging-scale: 1.05;
  --paper-state-dragging-opacity: 0.9;
  
  /* ================================================
     TRANSITION TIMING TOKENS
     Paper has weight—movements should feel physical
     ================================================ */
  
  /* Lift timing (hover/focus) */
  --paper-transition-lift: 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Press timing (active) */
  --paper-transition-press: 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Settle timing (return to rest) */
  --paper-transition-settle: 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  
  /* Drag timing */
  --paper-transition-drag: 0.15s ease-out;
  
  /* Fold timing */
  --paper-transition-fold: 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
```

### 1.3 Base Interaction Class

```css
/* ================================================
   .paper-interactive
   Base class for all interactive paper elements
   ================================================ */

.paper-interactive {
  /* Enable 3D transformations */
  transform-style: preserve-3d;
  perspective: 1000px;
  
  /* Default state */
  transform: var(--paper-state-default-transform);
  box-shadow: var(--paper-state-default-elevation);
  
  /* Smooth transitions */
  transition: 
    transform var(--paper-transition-settle),
    box-shadow var(--paper-transition-settle),
    filter var(--paper-transition-settle);
  
  /* Prevent text selection during drag */
  user-select: none;
  
  /* Indicate interactivity */
  cursor: pointer;
  
  /* GPU acceleration hint */
  will-change: transform, box-shadow;
}

/* ================================================
   HOVER STATE
   Paper lifts from surface toward user
   ================================================ */

.paper-interactive:hover {
  transform: var(--paper-state-hover-transform);
  box-shadow: var(--paper-state-hover-elevation);
}

/* Optional: Add subtle scale for emphasis */
.paper-interactive--scalable:hover {
  transform: 
    var(--paper-state-hover-transform) 
    scale(var(--paper-state-hover-scale));
}

/* ================================================
   ACTIVE/PRESSED STATE
   Paper flattens against surface
   ================================================ */

.paper-interactive:active {
  transform: var(--paper-state-active-transform);
  box-shadow: var(--paper-state-active-elevation);
  filter: var(--paper-state-active-filter);
  transition: 
    transform var(--paper-transition-press),
    box-shadow var(--paper-transition-press);
}

/* ================================================
   FOCUS STATE (Accessibility Critical)
   Visible keyboard focus indicator
   ================================================ */

.paper-interactive:focus-visible {
  outline: 
    var(--paper-state-focus-outline-width) 
    var(--paper-state-focus-outline-style) 
    var(--paper-state-focus-outline-color);
  outline-offset: var(--paper-state-focus-outline-offset);
}

/* Alternative: Paper-themed focus (folded corner highlight) */
.paper-interactive--paper-focus:focus-visible {
  outline: none;
  position: relative;
}

.paper-interactive--paper-focus:focus-visible::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 24px 24px 0;
  border-color: 
    transparent 
    var(--paper-state-focus-outline-color) 
    transparent 
    transparent;
  animation: paper-focus-fold 0.2s ease-out forwards;
}

@keyframes paper-focus-fold {
  from {
    border-width: 0 0 0 0;
    opacity: 0;
  }
  to {
    border-width: 0 24px 24px 0;
    opacity: 1;
  }
}

/* ================================================
   DISABLED STATE
   Faded, weathered paper appearance
   ================================================ */

.paper-interactive:disabled,
.paper-interactive[aria-disabled="true"],
.paper-interactive.is-disabled {
  opacity: var(--paper-state-disabled-opacity);
  filter: var(--paper-state-disabled-filter);
  cursor: var(--paper-state-disabled-cursor);
  pointer-events: none;
}

/* Remove transitions for disabled state */
.paper-interactive:disabled {
  transition: none;
}
```

### 1.4 Interaction State Decision Table

| State | Elevation | Transform | Shadow | Use Case |
|-------|-----------|-----------|--------|----------|
| **Default** | Level 1 | `translateY(0)` | Soft, close | At-rest appearance |
| **Hover** | Level 2-3 | `translateY(-4px) rotateX(2deg)` | Medium, diffuse | Mouse/touch proximity |
| **Active** | Level 0 | `translateY(1px) scale(0.98)` | Minimal | Click/tap feedback |
| **Focus** | Unchanged | Unchanged + outline | Unchanged | Keyboard navigation |
| **Dragging** | Level 4 | `translateY(-8px) rotate(-2deg)` | Large, soft | Active drag operation |
| **Disabled** | Level 0 | None | Faint | Non-interactive |

---

## Part 2: Drag and Drop Physics

### 2.1 Understanding Paper Drag Behavior

Real paper being picked up and moved exhibits specific behaviors:

```
PAPER DRAG PHYSICS
==================

1. PICKUP PHASE
   ┌───────────────┐
   │   Before      │ → Finger contacts paper
   └───────────────┘
   
         ↓ Press
   
   ┌───────────────┐
   │   Contact     │ → Paper begins to lift at touch point
   │    ╲         │ → Shadow starts forming
   └─────╲─────────┘
   
         ↓ Lift
   
      ┌───────────┐
     ╱           ╱│  → Paper fully lifted
    ╱           ╱ │  → Trailing edge may lag (air resistance)
   └───────────┘  │  → Large, soft shadow
      ║       ║
      ╚═══════╝

2. DRAG PHASE
   
   Movement →
   ┌─────────────┐
    ╲            │   → Paper tilts opposite to direction
     ╲           │   → Leading edge slightly higher
   ───╲──────────┘   → "Air resistance" rotation

3. DROP PHASE
   
      ┌─────────┐
       ╲        │    → Paper "floats" down
        ╲       │    → Natural deceleration
   ──────╲──────┘    → Settles with slight bounce

   ┌─────────────────┐
   │   Settled       │ → Returns to rest state
   └─────────────────┘
```

### 2.2 Drag State Tokens

```css
:root {
  /* ================================================
     DRAG PHYSICS TOKENS
     Simulate paper weight and air interaction
     ================================================ */
  
  /* Pickup animation */
  --paper-drag-pickup-duration: 0.2s;
  --paper-drag-pickup-scale: 1.05;
  --paper-drag-pickup-rotation: -3deg;
  --paper-drag-pickup-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* During drag */
  --paper-drag-tilt-factor: 0.5deg; /* per 10px movement */
  --paper-drag-max-tilt: 8deg;
  --paper-drag-shadow-blur: 24px;
  --paper-drag-shadow-spread: -4px;
  --paper-drag-shadow-offset-y: 16px;
  
  /* Drop animation */
  --paper-drag-drop-duration: 0.4s;
  --paper-drag-drop-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --paper-drag-drop-settle: cubic-bezier(0.22, 1, 0.36, 1);
  
  /* Ghost/placeholder */
  --paper-drag-ghost-opacity: 0.4;
  --paper-drag-ghost-border: 2px dashed var(--paper-border-color, #ccc);
  
  /* Drop zone feedback */
  --paper-dropzone-highlight: rgba(0, 102, 204, 0.1);
  --paper-dropzone-border: 2px dashed var(--paper-primary, #0066cc);
}
```

### 2.3 CSS Drag States

```css
/* ================================================
   DRAGGABLE PAPER ELEMENT
   ================================================ */

.paper-draggable {
  /* Inherit interactive styles */
  composes: paper-interactive;
  
  /* Enable drag cursor on hover */
  cursor: grab;
  
  /* Touch-action for mobile */
  touch-action: none;
}

/* ================================================
   DRAGGING STATE
   Applied via JS when drag begins
   ================================================ */

.paper-draggable.is-dragging,
.paper-draggable[data-dragging="true"] {
  /* Elevated appearance */
  transform: 
    scale(var(--paper-drag-pickup-scale))
    rotate(var(--paper-drag-pickup-rotation));
  
  /* Dramatic shadow */
  box-shadow: 
    0 var(--paper-drag-shadow-offset-y) 
      var(--paper-drag-shadow-blur) 
      var(--paper-drag-shadow-spread) 
      rgba(0, 0, 0, 0.2);
  
  /* Slight transparency */
  opacity: var(--paper-state-dragging-opacity);
  
  /* Grabbing cursor */
  cursor: grabbing;
  
  /* Ensure on top */
  z-index: 9999;
  
  /* Smooth movement */
  transition: 
    box-shadow var(--paper-drag-pickup-duration) var(--paper-drag-pickup-easing),
    opacity var(--paper-drag-pickup-duration);
}

/* ================================================
   DRAG GHOST (Original Position Placeholder)
   ================================================ */

.paper-draggable.is-dragging + .paper-drag-ghost,
.paper-drag-ghost {
  background: transparent;
  border: var(--paper-drag-ghost-border);
  opacity: var(--paper-drag-ghost-opacity);
  border-radius: inherit;
}

/* ================================================
   DROP ZONE STATES
   ================================================ */

.paper-dropzone {
  transition: 
    background-color 0.2s ease,
    border-color 0.2s ease;
}

/* Valid drop target */
.paper-dropzone.is-drag-over,
.paper-dropzone[data-drag-over="true"] {
  background-color: var(--paper-dropzone-highlight);
  border: var(--paper-dropzone-border);
}

/* Invalid drop target */
.paper-dropzone.is-drag-invalid {
  background-color: rgba(255, 0, 0, 0.05);
  border-color: rgba(255, 0, 0, 0.3);
}
```

### 2.4 JavaScript Drag Physics Engine

```javascript
/**
 * PaperDragPhysics
 * Adds realistic paper-like drag behavior
 */
class PaperDragPhysics {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      tiltFactor: 0.5,      // Degrees per 10px movement
      maxTilt: 8,           // Maximum tilt angle
      airResistance: 0.95,  // Velocity decay (0-1)
      bounceStrength: 0.3,  // Drop bounce intensity
      ...options
    };
    
    this.state = {
      isDragging: false,
      startX: 0,
      startY: 0,
      currentX: 0,
      currentY: 0,
      velocityX: 0,
      velocityY: 0,
      lastX: 0,
      lastY: 0,
      tiltX: 0,
      tiltY: 0
    };
    
    this.bindEvents();
  }
  
  bindEvents() {
    // Mouse events
    this.element.addEventListener('mousedown', this.onDragStart.bind(this));
    document.addEventListener('mousemove', this.onDragMove.bind(this));
    document.addEventListener('mouseup', this.onDragEnd.bind(this));
    
    // Touch events
    this.element.addEventListener('touchstart', this.onDragStart.bind(this), { passive: false });
    document.addEventListener('touchmove', this.onDragMove.bind(this), { passive: false });
    document.addEventListener('touchend', this.onDragEnd.bind(this));
    
    // Respect reduced motion
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
  }
  
  getPointerPosition(e) {
    if (e.touches && e.touches[0]) {
      return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
    return { x: e.clientX, y: e.clientY };
  }
  
  onDragStart(e) {
    e.preventDefault();
    const pos = this.getPointerPosition(e);
    
    this.state.isDragging = true;
    this.state.startX = pos.x - this.state.currentX;
    this.state.startY = pos.y - this.state.currentY;
    this.state.lastX = pos.x;
    this.state.lastY = pos.y;
    
    this.element.classList.add('is-dragging');
    this.element.setAttribute('data-dragging', 'true');
    
    // Create ghost placeholder
    this.createGhost();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('paper:dragstart', {
      detail: { x: pos.x, y: pos.y }
    }));
  }
  
  onDragMove(e) {
    if (!this.state.isDragging) return;
    e.preventDefault();
    
    const pos = this.getPointerPosition(e);
    
    // Calculate velocity (for physics)
    this.state.velocityX = pos.x - this.state.lastX;
    this.state.velocityY = pos.y - this.state.lastY;
    this.state.lastX = pos.x;
    this.state.lastY = pos.y;
    
    // Update position
    this.state.currentX = pos.x - this.state.startX;
    this.state.currentY = pos.y - this.state.startY;
    
    // Calculate tilt based on velocity (air resistance effect)
    if (!this.prefersReducedMotion) {
      const tiltX = Math.max(
        -this.options.maxTilt,
        Math.min(this.options.maxTilt, this.state.velocityY * this.options.tiltFactor)
      );
      const tiltY = Math.max(
        -this.options.maxTilt,
        Math.min(this.options.maxTilt, -this.state.velocityX * this.options.tiltFactor)
      );
      
      this.state.tiltX = tiltX;
      this.state.tiltY = tiltY;
    }
    
    // Apply transform
    this.updateTransform();
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('paper:dragmove', {
      detail: {
        x: this.state.currentX,
        y: this.state.currentY,
        velocityX: this.state.velocityX,
        velocityY: this.state.velocityY
      }
    }));
  }
  
  onDragEnd(e) {
    if (!this.state.isDragging) return;
    
    this.state.isDragging = false;
    this.element.classList.remove('is-dragging');
    this.element.removeAttribute('data-dragging');
    
    // Remove ghost
    this.removeGhost();
    
    // Animate drop with physics
    if (!this.prefersReducedMotion) {
      this.animateDrop();
    } else {
      // Instant settle for reduced motion
      this.element.style.transform = '';
    }
    
    // Dispatch custom event
    this.element.dispatchEvent(new CustomEvent('paper:dragend', {
      detail: {
        x: this.state.currentX,
        y: this.state.currentY
      }
    }));
  }
  
  updateTransform() {
    const transform = this.prefersReducedMotion
      ? `translate(${this.state.currentX}px, ${this.state.currentY}px)`
      : `translate(${this.state.currentX}px, ${this.state.currentY}px) 
         rotateX(${this.state.tiltX}deg) 
         rotateY(${this.state.tiltY}deg)
         scale(1.05)`;
    
    this.element.style.transform = transform;
  }
  
  animateDrop() {
    // Spring physics for natural settle
    const spring = {
      stiffness: 300,
      damping: 20,
      velocity: Math.sqrt(
        this.state.velocityX ** 2 + 
        this.state.velocityY ** 2
      )
    };
    
    this.element.style.transition = `
      transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)
    `;
    
    // Reset tilt
    this.state.tiltX = 0;
    this.state.tiltY = 0;
    
    // Final position (keep translation, remove tilt/scale)
    this.element.style.transform = `
      translate(${this.state.currentX}px, ${this.state.currentY}px)
    `;
    
    // Clean up after animation
    setTimeout(() => {
      this.element.style.transition = '';
    }, 400);
  }
  
  createGhost() {
    const ghost = document.createElement('div');
    ghost.className = 'paper-drag-ghost';
    ghost.style.cssText = `
      position: absolute;
      width: ${this.element.offsetWidth}px;
      height: ${this.element.offsetHeight}px;
      left: ${this.element.offsetLeft}px;
      top: ${this.element.offsetTop}px;
      border: var(--paper-drag-ghost-border);
      border-radius: inherit;
      opacity: var(--paper-drag-ghost-opacity);
      pointer-events: none;
    `;
    this.element.parentNode.insertBefore(ghost, this.element);
    this.ghost = ghost;
  }
  
  removeGhost() {
    if (this.ghost) {
      this.ghost.remove();
      this.ghost = null;
    }
  }
  
  destroy() {
    // Remove all event listeners
    this.element.removeEventListener('mousedown', this.onDragStart);
    this.element.removeEventListener('touchstart', this.onDragStart);
    document.removeEventListener('mousemove', this.onDragMove);
    document.removeEventListener('touchmove', this.onDragMove);
    document.removeEventListener('mouseup', this.onDragEnd);
    document.removeEventListener('touchend', this.onDragEnd);
  }
}

// Usage:
// const draggable = new PaperDragPhysics(element, { maxTilt: 10 });
```

---

## Part 3: Folding & Flipping Animations

### 3.1 Paper Fold Mechanics

Folding is paper's signature behavior. Understanding fold physics:

```
FOLD TYPES
==========

1. SINGLE FOLD (Card Flip)
   
   Axis of rotation
        │
   ┌────┼────┐        ┌────┬────┐
   │    │    │   →    │    │╲   │
   │ F  │ B  │        │ F  │ ╲B │
   │    │    │        │    │  ╲ │
   └────┴────┘        └────┴───╲┘
   
   Front visible      Back rotates into view

2. ACCORDION FOLD (Multi-panel)
   
   ┌────┬────┬────┐
   │ 1  │ 2  │ 3  │   Flat
   └────┴────┴────┘
   
      ╱╲  ╱╲
     ╱ 2╲╱ 3╲         Folded
    ╱────╲───╲
   ╱  1  ╲

3. CORNER FOLD (Page Peel)
   
   ┌─────────────╮
   │             │╲
   │             │ ╲
   │             │  ╲
   │             │ ╱
   │             │╱
   └─────────────┘

4. ENVELOPE FOLD (Multi-flap)
   
       ┌───┐
      ╱     ╲
     ╱       ╲        Top flap
    ╱─────────╲
   │           │
   │           │      Side flaps fold in
   │           │
   └───────────┘
```

### 3.2 Fold Animation Tokens

```css
:root {
  /* ================================================
     FOLD ANIMATION TOKENS
     ================================================ */
  
  /* Perspective for fold container */
  --paper-fold-perspective: 1000px;
  --paper-fold-perspective-origin: center center;
  
  /* Fold timing */
  --paper-fold-duration: 0.5s;
  --paper-fold-duration-fast: 0.3s;
  --paper-fold-duration-slow: 0.7s;
  --paper-fold-easing: cubic-bezier(0.4, 0, 0.2, 1);
  --paper-fold-easing-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  
  /* Fold shadow (darker on fold crease) */
  --paper-fold-shadow-intensity: 0.15;
  --paper-fold-crease-color: rgba(0, 0, 0, 0.08);
  
  /* Backface (back of paper) */
  --paper-fold-backface-color: #f5f5f5;
  --paper-fold-backface-texture: var(--paper-texture-bond-light, none);
}
```

### 3.3 Card Flip Component

```css
/* ================================================
   PAPER FLIP CARD
   3D card that flips to reveal backside
   ================================================ */

.paper-flip-card {
  /* Establish 3D context */
  perspective: var(--paper-fold-perspective);
  width: 300px;
  height: 200px;
}

.paper-flip-card__inner {
  position: relative;
  width: 100%;
  height: 100%;
  
  /* Enable 3D transforms */
  transform-style: preserve-3d;
  transition: transform var(--paper-fold-duration) var(--paper-fold-easing);
}

/* Flip on hover (or use .is-flipped class for click) */
.paper-flip-card:hover .paper-flip-card__inner,
.paper-flip-card.is-flipped .paper-flip-card__inner {
  transform: rotateY(180deg);
}

/* Both faces share common styles */
.paper-flip-card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  
  /* Hide when rotated away */
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  
  /* Paper styling from previous chunks */
  background: var(--paper-surface-color, #fff);
  box-shadow: var(--paper-elevation-1);
  border-radius: 4px;
  
  /* Apply texture */
  filter: url(#paper-texture-filter);
}

/* Front face - default visible */
.paper-flip-card__front {
  /* No transform needed */
}

/* Back face - starts rotated away */
.paper-flip-card__back {
  transform: rotateY(180deg);
  background: var(--paper-fold-backface-color);
}

/* Crease shadow effect during flip */
.paper-flip-card__inner::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 2px;
  height: 100%;
  background: var(--paper-fold-crease-color);
  opacity: 0;
  transform: translateX(-50%);
  transition: opacity var(--paper-fold-duration);
  pointer-events: none;
}

.paper-flip-card:hover .paper-flip-card__inner::before,
.paper-flip-card.is-flipped .paper-flip-card__inner::before {
  opacity: 1;
}

/* Vertical flip variant */
.paper-flip-card--vertical:hover .paper-flip-card__inner,
.paper-flip-card--vertical.is-flipped .paper-flip-card__inner {
  transform: rotateX(180deg);
}

.paper-flip-card--vertical .paper-flip-card__back {
  transform: rotateX(180deg);
}

/* Reduced motion: instant flip */
@media (prefers-reduced-motion: reduce) {
  .paper-flip-card__inner {
    transition: none;
  }
  
  /* Use opacity instead of rotation */
  .paper-flip-card:hover .paper-flip-card__front,
  .paper-flip-card.is-flipped .paper-flip-card__front {
    opacity: 0;
    visibility: hidden;
  }
  
  .paper-flip-card__back {
    transform: none;
    opacity: 0;
    visibility: hidden;
  }
  
  .paper-flip-card:hover .paper-flip-card__back,
  .paper-flip-card.is-flipped .paper-flip-card__back {
    opacity: 1;
    visibility: visible;
  }
}
```

### 3.4 Accordion Fold Component

```css
/* ================================================
   PAPER ACCORDION
   Multi-panel folding content
   ================================================ */

.paper-accordion {
  /* 3D context */
  perspective: var(--paper-fold-perspective);
}

.paper-accordion__panel {
  overflow: hidden;
  background: var(--paper-surface-color, #fff);
  box-shadow: var(--paper-elevation-1);
}

.paper-accordion__header {
  padding: 1rem;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--paper-border-color, #e0e0e0);
  
  /* Interaction states */
  transition: background-color 0.2s ease;
}

.paper-accordion__header:hover {
  background-color: rgba(0, 0, 0, 0.02);
}

.paper-accordion__header:focus-visible {
  outline: var(--paper-state-focus-outline-width) solid var(--paper-state-focus-outline-color);
  outline-offset: -2px;
}

/* Fold indicator (chevron) */
.paper-accordion__icon {
  transition: transform var(--paper-fold-duration) var(--paper-fold-easing);
}

.paper-accordion__panel[open] .paper-accordion__icon,
.paper-accordion__panel.is-open .paper-accordion__icon {
  transform: rotate(180deg);
}

/* Content area with fold animation */
.paper-accordion__content {
  /* Use grid for height animation */
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows var(--paper-fold-duration) var(--paper-fold-easing);
}

.paper-accordion__panel[open] .paper-accordion__content,
.paper-accordion__panel.is-open .paper-accordion__content {
  grid-template-rows: 1fr;
}

.paper-accordion__content-inner {
  overflow: hidden;
}

/* Fold shadow at top of content */
.paper-accordion__content::before {
  content: '';
  display: block;
  height: 4px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.05),
    transparent
  );
  opacity: 0;
  transition: opacity var(--paper-fold-duration);
}

.paper-accordion__panel[open] .paper-accordion__content::before,
.paper-accordion__panel.is-open .paper-accordion__content::before {
  opacity: 1;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .paper-accordion__content {
    transition: none;
  }
  
  .paper-accordion__icon {
    transition: none;
  }
}
```

### 3.5 Page Corner Fold (Peel Effect)

```css
/* ================================================
   PAPER CORNER FOLD
   Animated page corner that peels back
   ================================================ */

.paper-corner-fold {
  position: relative;
  overflow: hidden;
}

/* The folded corner */
.paper-corner-fold::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  
  /* Triangle shape */
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 30px 30px;
  border-color: 
    transparent 
    transparent 
    var(--paper-fold-backface-color) 
    transparent;
  
  /* Paper shadow on fold */
  filter: drop-shadow(-2px -2px 2px rgba(0, 0, 0, 0.1));
  
  /* Animation */
  transition: 
    border-width var(--paper-fold-duration) var(--paper-fold-easing);
}

/* Corner shadow underneath */
.paper-corner-fold::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30px;
  height: 30px;
  background: linear-gradient(
    135deg,
    transparent 50%,
    rgba(0, 0, 0, 0.1) 50%
  );
  transition: 
    width var(--paper-fold-duration) var(--paper-fold-easing),
    height var(--paper-fold-duration) var(--paper-fold-easing);
}

/* Expanded corner on hover */
.paper-corner-fold:hover::before {
  border-width: 0 0 60px 60px;
}

.paper-corner-fold:hover::after {
  width: 60px;
  height: 60px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .paper-corner-fold::before,
  .paper-corner-fold::after {
    transition: none;
  }
}
```

---

## Part 4: Stacking & Layering Behaviors

### 4.1 Paper Stack Physics

Paper stacking follows predictable patterns:

```
STACK BEHAVIORS
===============

1. NEAT STACK
   ┌─────────────────┐
   │                 │
   └──┬──────────────┤
      │              │
      └──┬───────────┤
         │           │
         └───────────┘
   
   • Offset: 4-8px per layer
   • Shadow: Each layer casts on below
   • Max visible: 3-5 layers

2. MESSY STACK
      ┌────────────┐
     ╱            ╱│
    ╱────────────╱─┤
   │   ╲        │  │
   │    ╲───────│──┤
   │            │ ╱
   └────────────┴╱
   
   • Random rotation: ±3-8°
   • Random offset: variable
   • More natural appearance

3. FAN SPREAD
   
   ┌───┐
   │ 1 ├───┐
   └───┤ 2 ├───┐
       └───┤ 3 ├───┐
           └───┤ 4 │
               └───┘
   
   • Rotate from single point
   • Reveal all items
   • Good for navigation

4. SHUFFLE
   
   [Top] → slides out → [Back]
   
   ┌───┐        ┌───┐        ┌───┐
   │ A │   →    │ B │   →    │ A │
   ├───┤        ├───┤        ├───┤
   │ B │        │ A │        │ C │
   └───┘        └───┘        └───┘
```

### 4.2 Stack Tokens

```css
:root {
  /* ================================================
     STACK TOKENS
     ================================================ */
  
  /* Stack offsets */
  --paper-stack-offset-x: 4px;
  --paper-stack-offset-y: 4px;
  --paper-stack-max-visible: 3;
  
  /* Stack shadows (compound for layering) */
  --paper-stack-shadow-intensity: 0.08;
  --paper-stack-shadow-blur: 4px;
  
  /* Fan spread */
  --paper-fan-angle: 8deg;
  --paper-fan-origin: bottom center;
  
  /* Shuffle timing */
  --paper-shuffle-duration: 0.4s;
  --paper-shuffle-easing: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### 4.3 CSS Stack Effect

```css
/* ================================================
   PAPER STACK
   Layered paper pile effect
   ================================================ */

.paper-stack {
  position: relative;
  display: inline-block;
}

/* Stack layers using pseudo-elements */
.paper-stack::before,
.paper-stack::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--paper-surface-color, #fff);
  border-radius: inherit;
  z-index: -1;
}

/* Second layer (::before) */
.paper-stack::before {
  transform: 
    translateX(var(--paper-stack-offset-x)) 
    translateY(var(--paper-stack-offset-y));
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, var(--paper-stack-shadow-intensity));
}

/* Third layer (::after) */
.paper-stack::after {
  transform: 
    translateX(calc(var(--paper-stack-offset-x) * 2)) 
    translateY(calc(var(--paper-stack-offset-y) * 2));
  box-shadow: 
    0 1px 2px rgba(0, 0, 0, calc(var(--paper-stack-shadow-intensity) * 0.7));
  z-index: -2;
}

/* ================================================
   MESSY STACK VARIANT
   Random rotation for natural look
   ================================================ */

.paper-stack--messy::before {
  transform: 
    translateX(calc(var(--paper-stack-offset-x) * 0.8)) 
    translateY(calc(var(--paper-stack-offset-y) * 1.2)) 
    rotate(-2deg);
}

.paper-stack--messy::after {
  transform: 
    translateX(calc(var(--paper-stack-offset-x) * 1.5)) 
    translateY(calc(var(--paper-stack-offset-y) * 2.2)) 
    rotate(3deg);
}

/* ================================================
   FAN SPREAD (on hover)
   ================================================ */

.paper-fan {
  position: relative;
}

.paper-fan__item {
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: var(--paper-fan-origin);
  transition: transform var(--paper-fold-duration) var(--paper-fold-easing-bounce);
}

/* Stacked state (default) */
.paper-fan__item:nth-child(1) { z-index: 5; }
.paper-fan__item:nth-child(2) { z-index: 4; transform: translateY(4px); }
.paper-fan__item:nth-child(3) { z-index: 3; transform: translateY(8px); }
.paper-fan__item:nth-child(4) { z-index: 2; transform: translateY(12px); }
.paper-fan__item:nth-child(5) { z-index: 1; transform: translateY(16px); }

/* Fanned state (on container hover) */
.paper-fan:hover .paper-fan__item:nth-child(1),
.paper-fan.is-fanned .paper-fan__item:nth-child(1) {
  transform: rotate(calc(var(--paper-fan-angle) * -2));
}

.paper-fan:hover .paper-fan__item:nth-child(2),
.paper-fan.is-fanned .paper-fan__item:nth-child(2) {
  transform: rotate(calc(var(--paper-fan-angle) * -1));
}

.paper-fan:hover .paper-fan__item:nth-child(3),
.paper-fan.is-fanned .paper-fan__item:nth-child(3) {
  transform: rotate(0deg);
}

.paper-fan:hover .paper-fan__item:nth-child(4),
.paper-fan.is-fanned .paper-fan__item:nth-child(4) {
  transform: rotate(var(--paper-fan-angle));
}

.paper-fan:hover .paper-fan__item:nth-child(5),
.paper-fan.is-fanned .paper-fan__item:nth-child(5) {
  transform: rotate(calc(var(--paper-fan-angle) * 2));
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .paper-fan__item {
    transition: none;
  }
}
```

### 4.4 JavaScript Card Shuffle

```javascript
/**
 * PaperShuffle
 * Animated card shuffling for stacks
 */
class PaperShuffle {
  constructor(container, options = {}) {
    this.container = container;
    this.items = Array.from(container.querySelectorAll('.paper-shuffle__item'));
    this.options = {
      duration: 400,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      direction: 'up', // 'up', 'down', 'left', 'right'
      ...options
    };
    
    this.prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    
    this.updateZIndices();
  }
  
  updateZIndices() {
    this.items.forEach((item, index) => {
      item.style.zIndex = this.items.length - index;
    });
  }
  
  async shuffleToTop(item) {
    const index = this.items.indexOf(item);
    if (index === 0) return; // Already on top
    
    if (this.prefersReducedMotion) {
      // Instant reorder
      this.items.splice(index, 1);
      this.items.unshift(item);
      this.updateZIndices();
      return;
    }
    
    // Animate
    const offsetMap = {
      up: { x: 0, y: -100 },
      down: { x: 0, y: 100 },
      left: { x: -100, y: 0 },
      right: { x: 100, y: 0 }
    };
    
    const offset = offsetMap[this.options.direction];
    
    // Phase 1: Slide out
    item.style.transition = `transform ${this.options.duration / 2}ms ${this.options.easing}`;
    item.style.transform = `translate(${offset.x}%, ${offset.y}%) rotate(${offset.x ? -5 : 5}deg)`;
    
    await this.wait(this.options.duration / 2);
    
    // Reorder DOM
    this.container.prepend(item);
    this.items.splice(index, 1);
    this.items.unshift(item);
    this.updateZIndices();
    
    // Phase 2: Slide in from opposite side
    item.style.transition = 'none';
    item.style.transform = `translate(${-offset.x}%, ${-offset.y}%) rotate(${offset.x ? 5 : -5}deg)`;
    
    // Force reflow
    item.offsetHeight;
    
    item.style.transition = `transform ${this.options.duration / 2}ms ${this.options.easing}`;
    item.style.transform = 'translate(0, 0) rotate(0deg)';
    
    await this.wait(this.options.duration / 2);
    
    // Cleanup
    item.style.transition = '';
    item.style.transform = '';
    
    // Dispatch event
    this.container.dispatchEvent(new CustomEvent('paper:shuffle', {
      detail: { item, newIndex: 0 }
    }));
  }
  
  async shuffleToBottom(item) {
    const index = this.items.indexOf(item);
    if (index === this.items.length - 1) return; // Already at bottom
    
    if (this.prefersReducedMotion) {
      this.items.splice(index, 1);
      this.items.push(item);
      this.updateZIndices();
      return;
    }
    
    // Similar animation logic...
    // (abbreviated for space)
  }
  
  wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Usage:
// const shuffle = new PaperShuffle(container);
// shuffle.shuffleToTop(cardElement);
```

---

## Part 5: Component Recipes

### 5.1 Paper Card (Complete Implementation)

Combines: Shadows (Chunk 2) + Edges (Chunk 3) + Textures (Chunk 4) + Interactions (Chunk 5)

```html
<article class="paper-card">
  <div class="paper-card__inner">
    <header class="paper-card__header">
      <h2 class="paper-card__title">Card Title</h2>
    </header>
    <div class="paper-card__content">
      <p>Card content goes here...</p>
    </div>
    <footer class="paper-card__footer">
      <button class="paper-button">Action</button>
    </footer>
  </div>
</article>
```

```css
/* ================================================
   PAPER CARD - Complete Component
   ================================================ */

.paper-card {
  /* Base structure */
  position: relative;
  display: flex;
  flex-direction: column;
  
  /* Size */
  width: 100%;
  max-width: 400px;
  
  /* Paper surface */
  background: var(--paper-surface-color, #fff);
  
  /* CHUNK 3: Subtle rounded corners like trimmed paper */
  border-radius: 4px;
  
  /* CHUNK 2: Elevation shadow */
  box-shadow: var(--paper-elevation-1);
  
  /* CHUNK 4: Optional texture overlay */
  /* filter: url(#paper-texture-bond); */
  
  /* CHUNK 5: Interaction setup */
  transform-style: preserve-3d;
  perspective: 1000px;
  transition: 
    transform var(--paper-transition-lift),
    box-shadow var(--paper-transition-lift);
  
  /* Interactivity */
  cursor: pointer;
}

/* Hover: Lift effect */
.paper-card:hover {
  transform: translateY(-4px) rotateX(2deg);
  box-shadow: var(--paper-elevation-2);
}

/* Active: Press down */
.paper-card:active {
  transform: translateY(1px) scale(0.99);
  box-shadow: var(--paper-elevation-0);
  transition: 
    transform var(--paper-transition-press),
    box-shadow var(--paper-transition-press);
}

/* Focus: Keyboard navigation */
.paper-card:focus-visible {
  outline: 3px solid var(--paper-focus-ring, #0066cc);
  outline-offset: 2px;
}

/* Inner container */
.paper-card__inner {
  padding: 1.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* Header */
.paper-card__header {
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 1px solid var(--paper-border-color, #e5e5e5);
}

.paper-card__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--paper-text-primary, #1a1a1a);
}

/* Content */
.paper-card__content {
  flex: 1;
  color: var(--paper-text-secondary, #4a4a4a);
  line-height: 1.6;
}

/* Footer */
.paper-card__footer {
  margin-top: auto;
  padding-top: 1rem;
}

/* CHUNK 3: Optional torn edge variant */
.paper-card--torn {
  border-radius: 0;
  clip-path: url(#torn-edge-top);
}

/* CHUNK 4: Aged paper variant */
.paper-card--aged {
  background: var(--paper-aged-color, #f5f0e6);
  filter: url(#paper-texture-aged);
}

/* Stack variant (shows layers behind) */
.paper-card--stacked::before,
.paper-card--stacked::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: inherit;
  border-radius: inherit;
  z-index: -1;
}

.paper-card--stacked::before {
  transform: translate(4px, 4px);
  box-shadow: var(--paper-elevation-0);
}

.paper-card--stacked::after {
  transform: translate(8px, 8px);
  box-shadow: var(--paper-elevation-0);
  z-index: -2;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .paper-card {
    transition: none;
  }
  
  .paper-card:hover {
    transform: none;
    /* Keep shadow change for visual feedback */
  }
}
```

### 5.2 Sticky Note

```css
/* ================================================
   STICKY NOTE
   Post-it style adhesive note
   ================================================ */

.paper-sticky-note {
  /* Shape */
  position: relative;
  width: 200px;
  min-height: 200px;
  padding: 1.5rem 1rem 1rem;
  
  /* Paper appearance */
  background: var(--paper-sticky-yellow, #ffeb3b);
  
  /* Slight curl at bottom */
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 10px),
    calc(100% - 10px) 100%,
    0 100%
  );
  
  /* Shadow beneath curled corner */
  box-shadow: 
    0 4px 6px rgba(0, 0, 0, 0.1),
    /* Curled corner shadow */
    inset -10px -10px 15px rgba(0, 0, 0, 0.03);
  
  /* Slight tilt for natural look */
  transform: rotate(-2deg);
  
  /* Interaction */
  transition: 
    transform var(--paper-transition-lift),
    box-shadow var(--paper-transition-lift);
  cursor: grab;
  
  /* Font */
  font-family: 'Kalam', 'Comic Sans MS', cursive;
  font-size: 1rem;
  line-height: 1.5;
  color: #333;
}

/* Adhesive strip at top */
.paper-sticky-note::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 8px;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.08),
    transparent
  );
}

/* Curled corner triangle */
.paper-sticky-note::after {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 20px 20px;
  border-color: 
    transparent 
    transparent 
    rgba(0, 0, 0, 0.1) 
    transparent;
}

/* Hover: Lift and straighten */
.paper-sticky-note:hover {
  transform: rotate(0deg) translateY(-8px) scale(1.02);
  box-shadow: 
    0 12px 20px rgba(0, 0, 0, 0.15),
    inset -10px -10px 15px rgba(0, 0, 0, 0.03);
}

/* Focus */
.paper-sticky-note:focus-visible {
  outline: 3px solid var(--paper-focus-ring, #0066cc);
  outline-offset: 2px;
}

/* Color variants */
.paper-sticky-note--pink {
  background: var(--paper-sticky-pink, #f8bbd9);
}

.paper-sticky-note--blue {
  background: var(--paper-sticky-blue, #bbdefb);
}

.paper-sticky-note--green {
  background: var(--paper-sticky-green, #c8e6c9);
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .paper-sticky-note {
    transition: box-shadow 0.2s ease;
  }
  
  .paper-sticky-note:hover {
    transform: rotate(-2deg); /* Keep original tilt */
  }
}
```

### 5.3 Index Card

```css
/* ================================================
   INDEX CARD
   3x5 ruled card style
   ================================================ */

.paper-index-card {
  /* Realistic proportions */
  width: 300px;
  height: 200px;
  padding: 1.5rem;
  
  /* Surface */
  background: 
    /* Ruled lines */
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 23px,
      var(--paper-ruled-line-color, #a8d8ff) 23px,
      var(--paper-ruled-line-color, #a8d8ff) 24px
    ),
    /* Paper base */
    var(--paper-surface-white, #fff);
  
  /* Rigid card feel */
  box-shadow: var(--paper-elevation-1);
  border-radius: 2px;
  
  /* Slight texture */
  /* filter: url(#paper-texture-bond); */
  
  /* Interaction */
  transition: 
    transform var(--paper-transition-lift),
    box-shadow var(--paper-transition-lift);
  cursor: pointer;
}

/* Header line (usually red on index cards) */
.paper-index-card::before {
  content: '';
  position: absolute;
  top: 1rem;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--paper-index-header-line, #e57373);
}

/* Left margin line */
.paper-index-card::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  left: 1.5rem;
  width: 1px;
  background: var(--paper-index-margin-line, #ffcdd2);
}

/* Hover */
.paper-index-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--paper-elevation-2);
}

/* Focus */
.paper-index-card:focus-visible {
  outline: 3px solid var(--paper-focus-ring, #0066cc);
  outline-offset: 2px;
}
```

### 5.4 Ticket / Coupon with Tear-Off

```css
/* ================================================
   TICKET / COUPON
   With perforated tear-off section
   ================================================ */

.paper-ticket {
  display: flex;
  width: 400px;
  background: var(--paper-surface-color, #fff);
  box-shadow: var(--paper-elevation-1);
  border-radius: 4px;
  overflow: hidden;
}

/* Main ticket body */
.paper-ticket__main {
  flex: 2;
  padding: 1.5rem;
  position: relative;
}

/* Perforation line */
.paper-ticket__perforation {
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    transparent,
    transparent 4px,
    var(--paper-border-color, #ccc) 4px,
    var(--paper-border-color, #ccc) 8px
  );
  position: relative;
}

/* Semi-circle cutouts for tear effect */
.paper-ticket__perforation::before,
.paper-ticket__perforation::after {
  content: '';
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 16px;
  height: 16px;
  background: var(--paper-background, #f5f5f5);
  border-radius: 50%;
}

.paper-ticket__perforation::before {
  top: -8px;
}

.paper-ticket__perforation::after {
  bottom: -8px;
}

/* Stub / tear-off section */
.paper-ticket__stub {
  flex: 1;
  padding: 1rem;
  background: 
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 10px,
      rgba(0, 0, 0, 0.02) 10px,
      rgba(0, 0, 0, 0.02) 20px
    ),
    var(--paper-surface-color, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

/* Hover: Slight separation at perforation */
.paper-ticket:hover .paper-ticket__stub {
  transform: translateX(2px);
  transition: transform var(--paper-transition-lift);
}

/* Interactive stub (clickable tear-off) */
.paper-ticket__stub--interactive {
  cursor: pointer;
}

.paper-ticket__stub--interactive:hover {
  transform: translateX(4px) rotate(1deg);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
}

/* Torn state (after tear animation) */
.paper-ticket.is-torn .paper-ticket__stub {
  animation: paper-tear-off 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
}

@keyframes paper-tear-off {
  0% {
    transform: translateX(0) rotate(0);
  }
  50% {
    transform: translateX(20px) rotate(5deg);
    opacity: 1;
  }
  100% {
    transform: translateX(100px) rotate(15deg);
    opacity: 0;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .paper-ticket.is-torn .paper-ticket__stub {
    animation: none;
    opacity: 0;
  }
}
```

### 5.5 Envelope Component

```css
/* ================================================
   ENVELOPE
   Interactive opening envelope
   ================================================ */

.paper-envelope {
  position: relative;
  width: 300px;
  height: 180px;
  perspective: 1000px;
}

/* Envelope body */
.paper-envelope__body {
  position: absolute;
  width: 100%;
  height: 100%;
  background: var(--paper-envelope-color, #fff5e6);
  border-radius: 4px;
  box-shadow: var(--paper-elevation-1);
}

/* Inner shadow for depth */
.paper-envelope__body::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 50%,
    rgba(0, 0, 0, 0.03) 100%
  );
  border-radius: inherit;
}

/* Top flap */
.paper-envelope__flap {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50%;
  
  /* Triangle shape */
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  
  background: var(--paper-envelope-flap-color, #ffefd5);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  /* Fold mechanics */
  transform-origin: top center;
  transform-style: preserve-3d;
  transition: transform var(--paper-fold-duration) var(--paper-fold-easing);
  
  cursor: pointer;
  z-index: 2;
}

/* Flap inner side (visible when open) */
.paper-envelope__flap::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--paper-envelope-flap-inner, #f5ebe0);
  clip-path: inherit;
  transform: rotateX(180deg);
  backface-visibility: hidden;
}

/* Content inside envelope */
.paper-envelope__content {
  position: absolute;
  top: 25%;
  left: 10%;
  right: 10%;
  bottom: 10%;
  
  background: var(--paper-surface-white, #fff);
  padding: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  /* Animation for letter reveal */
  transform: translateY(0);
  transition: transform var(--paper-fold-duration) var(--paper-fold-easing);
  
  z-index: 1;
}

/* Open state */
.paper-envelope:hover .paper-envelope__flap,
.paper-envelope.is-open .paper-envelope__flap {
  transform: rotateX(-160deg);
}

.paper-envelope:hover .paper-envelope__content,
.paper-envelope.is-open .paper-envelope__content {
  transform: translateY(-20px);
}

/* Focus */
.paper-envelope__flap:focus-visible {
  outline: 3px solid var(--paper-focus-ring, #0066cc);
  outline-offset: 2px;
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  .paper-envelope__flap,
  .paper-envelope__content {
    transition: none;
  }
  
  .paper-envelope:hover .paper-envelope__flap,
  .paper-envelope.is-open .paper-envelope__flap {
    transform: rotateX(-160deg);
  }
}
```

### 5.6 Notebook / Notepad

```css
/* ================================================
   NOTEBOOK / NOTEPAD
   Spiral-bound notepad with pages
   ================================================ */

.paper-notebook {
  position: relative;
  width: 280px;
  background: var(--paper-surface-color, #fff);
  border-radius: 0 4px 4px 0;
  box-shadow: var(--paper-elevation-2);
  
  /* Stacked pages effect */
  background: 
    linear-gradient(
      to right,
      var(--paper-surface-color, #fff) 0%,
      var(--paper-surface-color, #fff) 98%,
      rgba(0, 0, 0, 0.05) 98%,
      rgba(0, 0, 0, 0.05) 100%
    );
}

/* Spiral binding */
.paper-notebook::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 30px;
  background: 
    /* Spiral holes */
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 18px,
      var(--paper-background, #f5f5f5) 18px,
      var(--paper-background, #f5f5f5) 22px,
      transparent 22px,
      transparent 40px
    ),
    /* Spiral ring */
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 16px,
      var(--paper-spiral-color, #888) 16px,
      var(--paper-spiral-color, #888) 24px,
      transparent 24px,
      transparent 40px
    ),
    /* Binding strip */
    var(--paper-binding-color, #e0e0e0);
  
  border-radius: 4px 0 0 4px;
}

/* Page content area */
.paper-notebook__page {
  margin-left: 40px;
  padding: 1.5rem;
  min-height: 300px;
  
  /* Ruled lines */
  background: 
    repeating-linear-gradient(
      to bottom,
      transparent,
      transparent 27px,
      var(--paper-ruled-line-color, #e3f2fd) 27px,
      var(--paper-ruled-line-color, #e3f2fd) 28px
    );
  
  /* Left margin */
  border-left: 1px solid var(--paper-margin-line-color, #ffcdd2);
  
  line-height: 28px; /* Match ruled lines */
}

/* Multiple pages (stacked) */
.paper-notebook--multi::after {
  content: '';
  position: absolute;
  top: 2px;
  right: -2px;
  bottom: 2px;
  width: 100%;
  background: var(--paper-surface-color, #fff);
  border-radius: inherit;
  box-shadow: var(--paper-elevation-0);
  z-index: -1;
}

/* Hover: Slight page lift */
.paper-notebook:hover {
  transform: translateY(-2px);
  box-shadow: var(--paper-elevation-3);
  transition: 
    transform var(--paper-transition-lift),
    box-shadow var(--paper-transition-lift);
}
```

---

## Part 6: Accessibility Considerations

### 6.1 Motion & Animation Accessibility

```css
/* ================================================
   REDUCED MOTION SYSTEM
   Respect user preferences for less motion
   ================================================ */

/* Default: Animations enabled */
:root {
  --paper-motion-enabled: 1;
  --paper-transition-duration-scale: 1;
}

/* Reduced motion preference detected */
@media (prefers-reduced-motion: reduce) {
  :root {
    --paper-motion-enabled: 0;
    --paper-transition-duration-scale: 0;
  }
  
  /* Kill all animations */
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  /* Preserve essential state changes */
  .paper-interactive:hover {
    box-shadow: var(--paper-elevation-2);
    /* Transform removed, shadow preserved for feedback */
  }
  
  .paper-flip-card__inner {
    transition: none;
  }
  
  /* Use opacity instead of transforms for state */
  .paper-flip-card:hover .paper-flip-card__front,
  .paper-flip-card.is-flipped .paper-flip-card__front {
    opacity: 0;
  }
  
  .paper-flip-card__back {
    transform: none;
    opacity: 0;
  }
  
  .paper-flip-card:hover .paper-flip-card__back,
  .paper-flip-card.is-flipped .paper-flip-card__back {
    opacity: 1;
  }
}

/* User toggle for motion (in-page control) */
[data-reduce-motion="true"] {
  --paper-motion-enabled: 0;
  --paper-transition-duration-scale: 0;
}

/* Utility to disable motion on specific element */
.paper-no-motion {
  animation: none !important;
  transition: none !important;
}
```

### 6.2 Focus Management

```css
/* ================================================
   FOCUS INDICATOR SYSTEM
   WCAG 2.4.7 compliant focus styles
   ================================================ */

:root {
  /* Focus ring tokens */
  --paper-focus-ring-width: 3px;
  --paper-focus-ring-color: #0066cc;
  --paper-focus-ring-offset: 2px;
  --paper-focus-ring-style: solid;
  
  /* High contrast variant */
  --paper-focus-ring-high-contrast: 4px double #000;
}

/* Base focus-visible styles */
.paper-focusable:focus-visible,
[class*="paper-"]:focus-visible {
  outline: 
    var(--paper-focus-ring-width) 
    var(--paper-focus-ring-style) 
    var(--paper-focus-ring-color);
  outline-offset: var(--paper-focus-ring-offset);
}

/* Remove default outline when custom applied */
.paper-focusable:focus:not(:focus-visible) {
  outline: none;
}

/* Enhanced focus for interactive cards */
.paper-card:focus-visible {
  /* Standard outline */
  outline: var(--paper-focus-ring-width) solid var(--paper-focus-ring-color);
  outline-offset: var(--paper-focus-ring-offset);
  
  /* Plus elevation change */
  box-shadow: 
    var(--paper-elevation-2),
    0 0 0 calc(var(--paper-focus-ring-width) + var(--paper-focus-ring-offset) + 2px) 
      rgba(0, 102, 204, 0.2);
}

/* High contrast mode */
@media (prefers-contrast: more) {
  .paper-focusable:focus-visible,
  [class*="paper-"]:focus-visible {
    outline: var(--paper-focus-ring-high-contrast);
    outline-offset: 4px;
  }
}

/* Forced colors (Windows High Contrast) */
@media (forced-colors: active) {
  .paper-focusable:focus-visible,
  [class*="paper-"]:focus-visible {
    outline: 3px solid CanvasText;
    outline-offset: 2px;
  }
}
```

### 6.3 Screen Reader Considerations

```html
<!-- ARIA patterns for paper components -->

<!-- Flip Card: Use button with aria-pressed -->
<button 
  class="paper-flip-card" 
  aria-pressed="false"
  aria-label="Product card. Press to reveal details."
>
  <div class="paper-flip-card__inner">
    <div class="paper-flip-card__front" aria-hidden="false">
      <!-- Front content -->
    </div>
    <div class="paper-flip-card__back" aria-hidden="true">
      <!-- Back content -->
    </div>
  </div>
</button>

<!-- Accordion: Use native details/summary -->
<details class="paper-accordion__panel">
  <summary class="paper-accordion__header">
    Section Title
    <span class="paper-accordion__icon" aria-hidden="true">▼</span>
  </summary>
  <div class="paper-accordion__content">
    <!-- Content -->
  </div>
</details>

<!-- Draggable: Announce drag operations -->
<div 
  class="paper-draggable"
  role="button"
  tabindex="0"
  aria-grabbed="false"
  aria-describedby="drag-instructions"
>
  Draggable Item
</div>
<div id="drag-instructions" class="sr-only">
  Press Space to pick up. Use arrow keys to move. Press Space to drop.
</div>

<!-- Stack with navigation -->
<div 
  class="paper-stack" 
  role="group" 
  aria-label="Card stack with 5 items"
>
  <div role="article" aria-posinset="1" aria-setsize="5">Card 1</div>
  <div role="article" aria-posinset="2" aria-setsize="5">Card 2</div>
  <!-- ... -->
</div>
```

```css
/* Screen reader only utility */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 6.4 Keyboard Navigation

```javascript
/**
 * Keyboard navigation for paper components
 */

// Flip card keyboard control
document.querySelectorAll('.paper-flip-card').forEach(card => {
  card.setAttribute('tabindex', '0');
  card.setAttribute('role', 'button');
  
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('is-flipped');
      
      const isFlipped = card.classList.contains('is-flipped');
      card.setAttribute('aria-pressed', isFlipped);
      
      // Toggle aria-hidden on faces
      const front = card.querySelector('.paper-flip-card__front');
      const back = card.querySelector('.paper-flip-card__back');
      if (front) front.setAttribute('aria-hidden', isFlipped);
      if (back) back.setAttribute('aria-hidden', !isFlipped);
    }
  });
});

// Draggable keyboard control
class KeyboardDraggable {
  constructor(element) {
    this.element = element;
    this.isGrabbed = false;
    this.position = { x: 0, y: 0 };
    this.step = 10; // pixels per arrow key press
    
    this.element.setAttribute('tabindex', '0');
    this.element.setAttribute('role', 'button');
    this.element.setAttribute('aria-grabbed', 'false');
    
    this.bindEvents();
  }
  
  bindEvents() {
    this.element.addEventListener('keydown', (e) => {
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        this.toggleGrab();
      }
      
      if (this.isGrabbed) {
        switch(e.key) {
          case 'ArrowUp':
            e.preventDefault();
            this.move(0, -this.step);
            break;
          case 'ArrowDown':
            e.preventDefault();
            this.move(0, this.step);
            break;
          case 'ArrowLeft':
            e.preventDefault();
            this.move(-this.step, 0);
            break;
          case 'ArrowRight':
            e.preventDefault();
            this.move(this.step, 0);
            break;
          case 'Escape':
            this.drop();
            break;
        }
      }
    });
  }
  
  toggleGrab() {
    this.isGrabbed = !this.isGrabbed;
    this.element.setAttribute('aria-grabbed', this.isGrabbed);
    this.element.classList.toggle('is-dragging', this.isGrabbed);
    
    // Announce state change
    this.announce(this.isGrabbed ? 'Grabbed. Use arrow keys to move.' : 'Dropped.');
  }
  
  drop() {
    this.isGrabbed = false;
    this.element.setAttribute('aria-grabbed', 'false');
    this.element.classList.remove('is-dragging');
    this.announce('Dropped.');
  }
  
  move(dx, dy) {
    this.position.x += dx;
    this.position.y += dy;
    this.element.style.transform = `translate(${this.position.x}px, ${this.position.y}px)`;
  }
  
  announce(message) {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 1000);
  }
}
```

---

## Part 7: Final Token Consolidation

### 7.1 Complete Token Reference

```css
/* ================================================
   PAPERCRAFT UI: COMPLETE TOKEN SYSTEM
   Combines all chunks into unified system
   ================================================ */

:root {
  /* ================================================
     CHUNK 2: SHADOW & ELEVATION
     ================================================ */
  
  /* Elevation levels */
  --paper-elevation-0: 
    0 1px 1px rgba(0, 0, 0, 0.04);
  
  --paper-elevation-1: 
    0 1px 2px rgba(0, 0, 0, 0.06),
    0 2px 4px rgba(0, 0, 0, 0.06);
  
  --paper-elevation-2: 
    0 2px 4px rgba(0, 0, 0, 0.06),
    0 4px 8px rgba(0, 0, 0, 0.08),
    0 8px 16px rgba(0, 0, 0, 0.04);
  
  --paper-elevation-3: 
    0 4px 8px rgba(0, 0, 0, 0.06),
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.06);
  
  --paper-elevation-4: 
    0 8px 16px rgba(0, 0, 0, 0.08),
    0 16px 32px rgba(0, 0, 0, 0.1),
    0 32px 64px rgba(0, 0, 0, 0.08);
  
  /* ================================================
     CHUNK 3: EDGE TREATMENTS
     (SVG filter IDs - see Chunk 3 for definitions)
     ================================================ */
  
  --paper-edge-torn: url(#paper-edge-torn);
  --paper-edge-deckled: url(#paper-edge-deckled);
  --paper-edge-perforated: url(#paper-edge-perforated);
  
  /* ================================================
     CHUNK 4: TEXTURES
     (SVG filter IDs - see Chunk 4 for definitions)
     ================================================ */
  
  --paper-texture-bond: url(#paper-texture-bond);
  --paper-texture-cotton: url(#paper-texture-cotton);
  --paper-texture-kraft: url(#paper-texture-kraft);
  --paper-texture-watercolor: url(#paper-texture-watercolor);
  --paper-texture-aged: url(#paper-texture-aged);
  
  /* ================================================
     CHUNK 5: INTERACTIONS
     ================================================ */
  
  /* State transforms */
  --paper-state-default-transform: translateY(0);
  --paper-state-hover-transform: translateY(-4px) rotateX(2deg);
  --paper-state-active-transform: translateY(1px) scale(0.98);
  --paper-state-dragging-transform: translateY(-8px) rotate(-2deg);
  
  /* Transition timings */
  --paper-transition-lift: 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
  --paper-transition-press: 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  --paper-transition-settle: 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  --paper-transition-fold: 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Focus indicators */
  --paper-focus-ring-width: 3px;
  --paper-focus-ring-color: #0066cc;
  --paper-focus-ring-offset: 2px;
  
  /* Drag physics */
  --paper-drag-tilt-factor: 0.5deg;
  --paper-drag-max-tilt: 8deg;
  
  /* Stack geometry */
  --paper-stack-offset-x: 4px;
  --paper-stack-offset-y: 4px;
  --paper-fan-angle: 8deg;
  
  /* Fold perspective */
  --paper-fold-perspective: 1000px;
  
  /* ================================================
     SURFACE COLORS
     ================================================ */
  
  --paper-surface-white: #ffffff;
  --paper-surface-cream: #fffef5;
  --paper-surface-aged: #f5f0e6;
  --paper-surface-kraft: #c9a66b;
  
  /* Sticky note colors */
  --paper-sticky-yellow: #ffeb3b;
  --paper-sticky-pink: #f8bbd9;
  --paper-sticky-blue: #bbdefb;
  --paper-sticky-green: #c8e6c9;
  
  /* ================================================
     TEXT COLORS
     ================================================ */
  
  --paper-text-primary: #1a1a1a;
  --paper-text-secondary: #4a4a4a;
  --paper-text-muted: #888888;
  
  /* ================================================
     BORDER COLORS
     ================================================ */
  
  --paper-border-color: #e5e5e5;
  --paper-ruled-line-color: #e3f2fd;
  --paper-margin-line-color: #ffcdd2;
}

/* ================================================
   DARK MODE TOKENS
   ================================================ */

@media (prefers-color-scheme: dark) {
  :root {
    /* Inverted surfaces */
    --paper-surface-white: #2d2d2d;
    --paper-surface-cream: #3a3a35;
    --paper-surface-aged: #3d3930;
    
    /* Adjusted shadows (lighter on dark) */
    --paper-elevation-1: 
      0 1px 2px rgba(0, 0, 0, 0.3),
      0 2px 4px rgba(0, 0, 0, 0.25);
    
    --paper-elevation-2: 
      0 2px 4px rgba(0, 0, 0, 0.3),
      0 4px 8px rgba(0, 0, 0, 0.35),
      0 8px 16px rgba(0, 0, 0, 0.2);
    
    /* Adjusted text */
    --paper-text-primary: #f0f0f0;
    --paper-text-secondary: #b0b0b0;
    
    /* Adjusted focus */
    --paper-focus-ring-color: #66b3ff;
  }
}

/* ================================================
   HIGH CONTRAST MODE
   ================================================ */

@media (prefers-contrast: more) {
  :root {
    --paper-border-color: #000;
    --paper-focus-ring-width: 4px;
    --paper-text-secondary: var(--paper-text-primary);
  }
}
```

### 7.2 Naming Convention Reference

| Category | Pattern | Example |
|----------|---------|---------|
| **Elevation** | `--paper-elevation-{0-4}` | `--paper-elevation-2` |
| **State** | `--paper-state-{state}-{property}` | `--paper-state-hover-transform` |
| **Transition** | `--paper-transition-{action}` | `--paper-transition-lift` |
| **Surface** | `--paper-surface-{variant}` | `--paper-surface-cream` |
| **Texture** | `--paper-texture-{material}` | `--paper-texture-kraft` |
| **Edge** | `--paper-edge-{type}` | `--paper-edge-torn` |
| **Focus** | `--paper-focus-ring-{property}` | `--paper-focus-ring-color` |
| **Component** | `.paper-{component}` | `.paper-card` |
| **Modifier** | `.paper-{component}--{modifier}` | `.paper-card--stacked` |
| **Element** | `.paper-{component}__{element}` | `.paper-card__header` |
| **State Class** | `.is-{state}` | `.is-dragging` |

---

## Appendices

### Appendix A: Animation Easing Reference

| Easing | CSS Value | Use Case |
|--------|-----------|----------|
| **Lift (overshoot)** | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Hover lift, pickup |
| **Press (quick)** | `cubic-bezier(0.4, 0, 0.2, 1)` | Active press, click |
| **Settle (natural)** | `cubic-bezier(0.22, 1, 0.36, 1)` | Return to rest, drop |
| **Fold (smooth)** | `cubic-bezier(0.4, 0, 0.2, 1)` | Card flip, accordion |
| **Linear** | `linear` | Continuous animations |

### Appendix B: Browser Support

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|------|
| `transform-style: preserve-3d` | ✅ 36+ | ✅ 16+ | ✅ 9+ | ✅ 12+ |
| `backface-visibility` | ✅ 36+ | ✅ 16+ | ✅ 9+ | ✅ 12+ |
| `perspective` | ✅ 36+ | ✅ 16+ | ✅ 9+ | ✅ 12+ |
| `:focus-visible` | ✅ 86+ | ✅ 85+ | ✅ 15.4+ | ✅ 86+ |
| `prefers-reduced-motion` | ✅ 74+ | ✅ 63+ | ✅ 10.1+ | ✅ 79+ |
| CSS `grid-template-rows: 0fr/1fr` | ✅ 93+ | ✅ 108+ | ✅ 16+ | ✅ 93+ |

### Appendix C: Performance Checklist

- [ ] Use `transform` and `opacity` for animations (GPU accelerated)
- [ ] Avoid animating `box-shadow` directly; use pseudo-element opacity
- [ ] Add `will-change` only to actively animating elements
- [ ] Remove `will-change` after animation completes
- [ ] Limit simultaneous animations to 10-15 elements
- [ ] Test on low-end devices (4x CPU throttle in DevTools)
- [ ] Provide `prefers-reduced-motion` alternatives
- [ ] Use `contain: layout` on complex components

### Appendix D: Common Mistakes

| Mistake | Problem | Solution |
|---------|---------|----------|
| Animating `box-shadow` directly | Causes repaints | Use pseudo-element with opacity |
| Missing `backface-visibility` | Back of card shows through | Add `backface-visibility: hidden` |
| Forgetting `perspective` | 3D transforms look flat | Add to parent container |
| No reduced motion fallback | Accessibility violation | Always provide static alternative |
| Removing focus outlines | Keyboard users lost | Use `:focus-visible` instead |
| Fixed heights in accordion | Content clips | Use `grid-template-rows` trick |
| Drag without touch-action | Scroll conflict on mobile | Add `touch-action: none` |

### Appendix E: Implementation Checklist

#### Phase 1: Foundation
- [ ] Import all CSS custom properties
- [ ] Add SVG filter definitions to document
- [ ] Set up reduced motion media query
- [ ] Configure focus-visible polyfill if needed

#### Phase 2: Base Components
- [ ] Implement `.paper-interactive` base class
- [ ] Build `.paper-card` with all states
- [ ] Create `.paper-flip-card` component
- [ ] Add `.paper-accordion` component

#### Phase 3: Advanced Components
- [ ] Build sticky note component
- [ ] Create ticket/coupon with tear-off
- [ ] Implement envelope animation
- [ ] Add notebook/notepad component

#### Phase 4: Interactions
- [ ] Implement drag physics class
- [ ] Add keyboard navigation
- [ ] Create shuffle animation
- [ ] Build fan spread interaction

#### Phase 5: Accessibility Audit
- [ ] Test with screen reader
- [ ] Verify keyboard navigation
- [ ] Check reduced motion behavior
- [ ] Validate focus indicators
- [ ] Test high contrast mode

---

## Quick Reference: CSS-Only vs JavaScript Required

| Feature | CSS-Only | Requires JS |
|---------|----------|-------------|
| Hover lift | ✅ | |
| Active press | ✅ | |
| Focus ring | ✅ | |
| Card flip (hover) | ✅ | |
| Card flip (click) | | ✅ |
| Accordion (using details) | ✅ | |
| Corner fold | ✅ | |
| Stack appearance | ✅ | |
| Fan spread (hover) | ✅ | |
| Drag and drop | | ✅ |
| Shuffle animation | | ✅ |
| Physics-based motion | | ✅ |
| Keyboard dragging | | ✅ |

---

*Document complete. The Papercraft UI system now has a complete foundation covering physical paper behavior, shadow systems, edge treatments, textures, and interactive behaviors. All components integrate seamlessly and respect accessibility requirements.*
