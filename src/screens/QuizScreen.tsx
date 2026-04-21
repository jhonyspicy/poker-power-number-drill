import { useState, useMemo, useEffect } from 'react'
import type { Hand } from '../types'
import { generateChoices } from '../utils'
import RangeTable from '../components/RangeTable'

type Props = {
  hand: Hand
  onAnswer: (result: { hand: Hand; offsuitCorrect?: boolean; suitedCorrect?: boolean; pairCorrect?: boolean; offsuitChoices: number[]; suitedChoices: number[]; pairChoices: number[]; selectedOffsuit?: number; selectedSuited?: number; selectedPair?: number }) => void
}

export default function QuizScreen({ hand, onAnswer }: Props) {
  const isPair = hand.type === 'pair'

  const pairChoices = useMemo(() => isPair ? generateChoices(hand.power.pair!) : [], [hand, isPair])
  const offsuitChoices = useMemo(() => !isPair ? generateChoices(hand.power.offsuit!) : [], [hand, isPair])
  const suitedChoices = useMemo(() => !isPair ? generateChoices(hand.power.suited!) : [], [hand, isPair])

  const [selectedOffsuit, setSelectedOffsuit] = useState<number | null>(null)
  const [selectedSuited, setSelectedSuited] = useState<number | null>(null)
  const [selectedPair, setSelectedPair] = useState<number | null>(null)
  const [judged, setJudged] = useState(false)

  // Reset on hand change
  useEffect(() => {
    setSelectedOffsuit(null)
    setSelectedSuited(null)
    setSelectedPair(null)
    setJudged(false)
  }, [hand])

  // Judge when selections complete
  useEffect(() => {
    if (judged) return
    if (isPair && selectedPair !== null) {
      setJudged(true)
      const pairCorrect = selectedPair === hand.power.pair
      setTimeout(() => {
        onAnswer({ hand, pairCorrect, pairChoices, offsuitChoices: [], suitedChoices: [], selectedPair: selectedPair })
      }, 700)
    } else if (!isPair && selectedOffsuit !== null && selectedSuited !== null) {
      setJudged(true)
      const offsuitCorrect = selectedOffsuit === hand.power.offsuit
      const suitedCorrect = selectedSuited === hand.power.suited
      setTimeout(() => {
        onAnswer({ hand, offsuitCorrect, suitedCorrect, offsuitChoices, suitedChoices, pairChoices: [], selectedOffsuit: selectedOffsuit, selectedSuited: selectedSuited })
      }, 700)
    }
  }, [selectedOffsuit, selectedSuited, selectedPair, judged, hand, isPair, onAnswer, pairChoices, offsuitChoices, suitedChoices])

  function choiceStyle(value: number, selected: number | null, correct: number) {
    const base = 'py-3 rounded-xl text-lg font-bold shadow transition-all duration-200 '
    if (!judged && selected === null) return base + 'bg-white/15 text-white active:scale-95'
    if (selected === value) {
      if (!judged) return base + 'bg-amber-500 text-black scale-105'
      return value === correct
        ? base + 'bg-green-500 text-white scale-105'
        : base + 'bg-red-500 text-white scale-105'
    }
    return base + 'bg-white/10 text-white/40'
  }

  return (
    <div className="flex flex-col min-h-dvh bg-[#0b3d0b] px-4 py-6">
      {/* Hand display */}
      <div className="text-center mb-6">
        <span className="text-6xl font-bold text-white">{hand.id}</span>
      </div>

      {/* Choices */}
      {isPair ? (
        <div className="mb-6">
          <div className="grid grid-cols-2 gap-3 max-w-xs mx-auto">
            {pairChoices.map((v) => (
              <button
                key={v}
                disabled={judged}
                onClick={() => setSelectedPair(v)}
                className={choiceStyle(v, selectedPair, hand.power.pair!)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex gap-4 mb-6">
          {/* Offsuit */}
          <div className="flex-1">
            <p className="text-center text-white/60 text-sm mb-2">オフスート（o）</p>
            <div className="grid grid-cols-2 gap-2">
              {offsuitChoices.map((v) => (
                <button
                  key={v}
                  disabled={judged || selectedOffsuit !== null}
                  onClick={() => setSelectedOffsuit(v)}
                  className={choiceStyle(v, selectedOffsuit, hand.power.offsuit!)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
          {/* Suited */}
          <div className="flex-1">
            <p className="text-center text-white/60 text-sm mb-2">スート（s）</p>
            <div className="grid grid-cols-2 gap-2">
              {suitedChoices.map((v) => (
                <button
                  key={v}
                  disabled={judged || selectedSuited !== null}
                  onClick={() => setSelectedSuited(v)}
                  className={choiceStyle(v, selectedSuited, hand.power.suited!)}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Range table */}
      <div className="mt-auto opacity-60">
        <RangeTable highlightId={hand.id} />
      </div>
    </div>
  )
}
