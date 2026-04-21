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

function pickRandomHand(exclude?: Hand): Hand {
  const pool = exclude ? combos.filter(h => h.id !== exclude.id) : combos
  return shuffle(pool)[0]
}

export default function App() {
  const [screen, setScreen] = useState<Screen>('top')
  const [currentHand, setCurrentHand] = useState<Hand>(() => pickRandomHand())
  const [answerResult, setAnswerResult] = useState<AnswerResult | null>(null)

  const handleStart = () => {
    setCurrentHand(pickRandomHand())
    setScreen('quiz')
  }

  const handleAnswer = useCallback((result: AnswerResult) => {
    setAnswerResult(result)
    setScreen('answer')
  }, [])

  const handleNext = () => {
    setCurrentHand(pickRandomHand(currentHand))
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
