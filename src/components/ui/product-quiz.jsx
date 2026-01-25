import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, ChevronLeft, Sparkles, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useConfetti } from "@/components/ui/confetti"

// Quiz questions
const QUIZ_QUESTIONS = [
  {
    id: "purpose",
    question: "What will you primarily use these assets for?",
    emoji: "🎯",
    options: [
      { id: "social", label: "Social Media", emoji: "📱", tags: ["social", "creative"] },
      { id: "education", label: "Education Materials", emoji: "📚", tags: ["education", "paper"] },
      { id: "branding", label: "Brand & Marketing", emoji: "🎨", tags: ["branding", "creative"] },
      { id: "web", label: "Web & App Design", emoji: "💻", tags: ["web", "creative"] },
    ],
  },
  {
    id: "style",
    question: "Which style resonates with you most?",
    emoji: "✨",
    options: [
      { id: "playful", label: "Playful & Fun", emoji: "🎪", tags: ["playful", "creative"] },
      { id: "minimal", label: "Clean & Minimal", emoji: "🪷", tags: ["minimal", "paper"] },
      { id: "vintage", label: "Vintage & Nostalgic", emoji: "📜", tags: ["vintage", "paper"] },
      { id: "bold", label: "Bold & Colorful", emoji: "🌈", tags: ["bold", "creative"] },
    ],
  },
  {
    id: "quantity",
    question: "How many assets do you typically need per project?",
    emoji: "📊",
    options: [
      { id: "few", label: "Just a few (5-10)", emoji: "✋", tags: ["starter"] },
      { id: "medium", label: "A good variety (20-50)", emoji: "👍", tags: ["standard"] },
      { id: "lots", label: "As many as possible!", emoji: "🙌", tags: ["complete"] },
    ],
  },
  {
    id: "format",
    question: "Which file format is most important to you?",
    emoji: "📁",
    options: [
      { id: "svg", label: "SVG (Scalable)", emoji: "📐", tags: ["vector"] },
      { id: "png", label: "PNG (Quick Use)", emoji: "🖼️", tags: ["raster"] },
      { id: "ai", label: "AI (Illustrator)", emoji: "🎭", tags: ["professional"] },
      { id: "all", label: "All of them!", emoji: "📦", tags: ["complete"] },
    ],
  },
]

// Result recommendations based on answers
const QUIZ_RESULTS = {
  complete: {
    title: "The Complete Pack is Perfect for You!",
    emoji: "🎉",
    description: "You need variety, flexibility, and all the formats. The Complete Pack has everything you need for any project.",
    recommendation: "complete",
    discount: null,
  },
  creative: {
    title: "You're a Creative Powerhouse!",
    emoji: "🎨",
    description: "Your projects need bold, playful assets that stand out. The Complete Pack's creative collection will be your new best friend.",
    recommendation: "complete",
    discount: null,
  },
  education: {
    title: "Perfect for Educators!",
    emoji: "📚",
    description: "Clean, friendly illustrations that make learning fun. The Paper & Stationery collections are ideal for worksheets and presentations.",
    recommendation: "complete",
    discount: null,
  },
  minimal: {
    title: "Clean & Professional Choice",
    emoji: "✨",
    description: "You appreciate simplicity and elegance. Our minimalist assets will complement your designs beautifully.",
    recommendation: "complete",
    discount: null,
  },
}

// Calculate result based on answers
function calculateResult(answers) {
  const tagCounts = {}

  // Count tags from all answers
  Object.values(answers).forEach((answer) => {
    if (answer?.tags) {
      answer.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1
      })
    }
  })

  // Determine primary result
  if (tagCounts.complete >= 2) return QUIZ_RESULTS.complete
  if (tagCounts.creative >= 2) return QUIZ_RESULTS.creative
  if (tagCounts.education >= 1) return QUIZ_RESULTS.education
  if (tagCounts.minimal >= 1) return QUIZ_RESULTS.minimal

  return QUIZ_RESULTS.complete
}

// Individual question card
function QuestionCard({ question, selectedAnswer, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3 }}
      className="space-y-6"
    >
      <div className="text-center">
        <span className="text-4xl mb-2 block">{question.emoji}</span>
        <h3 className="text-xl font-semibold text-foreground">
          {question.question}
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {question.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => onSelect(option)}
            className={cn(
              "p-4 rounded-lg border-2 text-left transition-all",
              "hover:border-primary hover:bg-primary/5",
              selectedAnswer?.id === option.id
                ? "border-primary bg-primary/10 shadow-md"
                : "border-border bg-card"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-2xl block mb-1">{option.emoji}</span>
            <span className="font-medium text-sm">{option.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}

// Result display
function QuizResult({ result, onClose, onRestart }) {
  const { trigger, ConfettiComponent } = useConfetti()

  // Trigger confetti on mount
  useState(() => {
    setTimeout(() => trigger(40), 300)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 relative"
    >
      <ConfettiComponent />

      <div>
        <motion.span
          className="text-6xl block mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          {result.emoji}
        </motion.span>
        <h3 className="text-2xl font-bold text-foreground mb-2">
          {result.title}
        </h3>
        <p className="text-muted-foreground">
          {result.description}
        </p>
      </div>

      <div className="bg-primary/10 rounded-lg p-4 border border-primary/20">
        <div className="flex items-center justify-center gap-2 text-primary font-medium">
          <CheckCircle2 className="size-5" />
          <span>We recommend the Complete Pack</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button variant="outline" onClick={onRestart} className="flex-1">
          <ChevronLeft className="size-4 mr-1" />
          Retake Quiz
        </Button>
        <Button onClick={onClose} className="flex-1">
          <Sparkles className="size-4 mr-1" />
          Get the Pack
        </Button>
      </div>
    </motion.div>
  )
}

// Progress indicator
function ProgressDots({ total, current }) {
  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length: total }, (_, i) => (
        <motion.div
          key={i}
          className={cn(
            "w-2 h-2 rounded-full transition-colors",
            i <= current ? "bg-primary" : "bg-muted"
          )}
          initial={false}
          animate={{
            scale: i === current ? 1.2 : 1,
          }}
        />
      ))}
    </div>
  )
}

/**
 * ProductQuiz - Interactive quiz modal to help users find the right pack
 */
function ProductQuiz({ isOpen, onClose }) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

  const question = QUIZ_QUESTIONS[currentQuestion]
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1
  const canGoNext = answers[question?.id]

  const handleSelect = useCallback((option) => {
    setAnswers((prev) => ({
      ...prev,
      [question.id]: option,
    }))
  }, [question?.id])

  const handleNext = useCallback(() => {
    if (isLastQuestion) {
      setShowResult(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }, [isLastQuestion])

  const handlePrev = useCallback(() => {
    setCurrentQuestion((prev) => Math.max(0, prev - 1))
  }, [])

  const handleRestart = useCallback(() => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }, [])

  const handleClose = useCallback(() => {
    onClose()
    // Reset after animation
    setTimeout(handleRestart, 300)
  }, [onClose, handleRestart])

  const result = calculateResult(answers)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-lg z-50"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
          >
            <Card className="h-full md:h-auto overflow-hidden paper-stack">
              <CardContent className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🎯</span>
                    <span className="font-semibold">Find Your Perfect Pack</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="size-8"
                  >
                    <X className="size-4" />
                  </Button>
                </div>

                {/* Content */}
                <div className="min-h-[300px] flex flex-col">
                  <AnimatePresence mode="wait">
                    {showResult ? (
                      <QuizResult
                        key="result"
                        result={result}
                        onClose={handleClose}
                        onRestart={handleRestart}
                      />
                    ) : (
                      <QuestionCard
                        key={question.id}
                        question={question}
                        selectedAnswer={answers[question.id]}
                        onSelect={handleSelect}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Footer - only show for questions */}
                {!showResult && (
                  <div className="mt-6 space-y-4">
                    <ProgressDots
                      total={QUIZ_QUESTIONS.length}
                      current={currentQuestion}
                    />

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        onClick={handlePrev}
                        disabled={currentQuestion === 0}
                        className="flex-1"
                      >
                        <ChevronLeft className="size-4 mr-1" />
                        Back
                      </Button>
                      <Button
                        onClick={handleNext}
                        disabled={!canGoNext}
                        className="flex-1"
                      >
                        {isLastQuestion ? "See Results" : "Next"}
                        <ChevronRight className="size-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/**
 * ProductQuizTrigger - Button to open the quiz
 */
function ProductQuizTrigger({ children, className, ...props }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={className}
        {...props}
      >
        {children}
      </button>
      <ProductQuiz isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  )
}

export { ProductQuiz, ProductQuizTrigger }
