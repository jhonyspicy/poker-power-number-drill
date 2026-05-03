import { useState, useCallback } from 'react'
import type { Hand } from './types'
import handData from './data/data.json'
import { shuffle } from './utils'
import TopScreen from './screens/TopScreen'
import QuizScreen from './screens/QuizScreen'
import AnswerScreen from './screens/AnswerScreen'

type AnswerResult = {
  hand: Hand
  offsuitCorrect?: boolean
  suitedCorrect?: boolean
  pairCorrect?: boolean
  offsuitChoices: number[]
  suitedChoices: number[]
  pairChoices: number[]
  selectedOffsuit?: number
  selectedSuited?: number
  selectedPair?: number
}

type Screen = 'top' | 'quiz' | 'answer'

const combos = handData.combos as Hand[]

const CORRECT_FACTOR = 0.5   // 正解すると重みを半分に
const WRONG_FACTOR = 2.0     // 不正解すると重みを2倍に
const MIN_WEIGHT = 0.1
const MAX_WEIGHT = 8.0

function pickWeightedHand(weights: Record<string, number>, exclude?: Hand): Hand {
  const pool = exclude ? combos.filter(h => h.id !== exclude.id) : combos
  const totalWeight = pool.reduce((sum, h) => sum + (weights[h.id] ?? 1), 0)
  let rand = Math.random() * totalWeight
  for (const hand of shuffle(pool)) {
    rand -= weights[hand.id] ?? 1
    if (rand <= 0) return hand
  }
  return pool[0]
}

function initWeights(): Record<string, number> {
  return Object.fromEntries(combos.map(h => [h.id, 1]))
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('top')
  const [weights, setWeights] = useState<Record<string, number>>(initWeights)
  const [currentHand, setCurrentHand] = useState<Hand>(() => pickWeightedHand(initWeights()))
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null)

  const handleStart = () => {
    setCurrentHand(pickWeightedHand(weights))
    setScreen('quiz')
  }

  const handleAnswer = useCallback((result: AnswerResult) => {
    const isCorrect = result.hand.type === 'pair'
      ? result.pairCorrect === true
      : result.offsuitCorrect === true && result.suitedCorrect === true

    setWeights(prev => {
      const factor = isCorrect ? CORRECT_FACTOR : WRONG_FACTOR
      const current = prev[result.hand.id] ?? 1
      const next = Math.min(MAX_WEIGHT, Math.max(MIN_WEIGHT, current * factor))
      return { ...prev, [result.hand.id]: next }
    })

    setAnswerResult(result)
    setScreen('answer')
  }, [])

  const handleNext = () => {
    setCurrentHand(pickWeightedHand(weights, currentHand))
    setScreen('quiz')
  }

  switch (screen) {
    case 'top':
      return <TopScreen onStart={handleStart} />
    case 'quiz':
      return <QuizScreen hand={currentHand} onAnswer={handleAnswer} />
    case 'answer':
      return answerResult ? <AnswerScreen result={answerResult} onNext={handleNext} /> : null
  }
}
