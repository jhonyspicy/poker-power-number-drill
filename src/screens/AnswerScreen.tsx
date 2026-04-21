import type { Hand } from '../types'

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

type Props = {
  result: AnswerResult
  onNext: () => void
}

function ChoiceGrid({ choices, correct, selected }: { choices: number[]; correct: number; selected?: number }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {choices.map((v) => {
        const isCorrect = v === correct
        const isSelected = v === selected
        let style = 'py-3 rounded-xl text-lg font-bold shadow transition-all duration-300 '
        if (isCorrect) {
          style += 'bg-green-500 text-white ring-2 ring-amber-400 scale-105 animate-pulse'
        } else if (isSelected) {
          style += 'bg-red-500/60 text-white/60'
        } else {
          style += 'bg-white/10 text-white/30'
        }
        return (
          <div key={v} className={`relative ${style}`}>
            {isCorrect && (
              <span className="absolute inset-0 flex items-center justify-center text-5xl text-white/70 pointer-events-none">
                ◯
              </span>
            )}
            <div className="text-center">{v}</div>
          </div>
        )
      })}
    </div>
  )
}

export default function AnswerScreen({ result, onNext }: Props) {
  const { hand } = result
  const isPair = hand.type === 'pair'

  console.log(hand.mnemonic.image)

  return (
    <div className="flex flex-col min-h-dvh bg-[#0b3d0b] px-4 py-6">
      {/* Hand */}
      <div className="text-center mb-6">
        <span className="text-6xl font-bold text-white">{hand.id}</span>
      </div>

      {/* Correct answers */}
      {isPair ? (
        <div className="mb-6 max-w-xs mx-auto w-full">
          <ChoiceGrid choices={result.pairChoices} correct={hand.power.pair!} selected={result.selectedPair} />
        </div>
      ) : (
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <p className="text-center text-white/60 text-sm mb-2">オフスート（o）</p>
            <ChoiceGrid choices={result.offsuitChoices} correct={hand.power.offsuit!} selected={result.selectedOffsuit} />
          </div>
          <div className="flex-1">
            <p className="text-center text-white/60 text-sm mb-2">スート（s）</p>
            <ChoiceGrid choices={result.suitedChoices} correct={hand.power.suited!} selected={result.selectedSuited} />
          </div>
        </div>
      )}

      {/* Mnemonic */}
      <div className="text-center mb-4">
        <p className="text-xl font-bold text-amber-400">{hand.mnemonic.text}</p>
      </div>

      {/* Mnemonic image */}
      {hand.mnemonic.image && (
        <div className="flex justify-center mb-6">
          <img
            src={hand.mnemonic.image}
            alt={hand.mnemonic.text}
            className="w-full max-w-sm rounded-2xl shadow-lg"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>
      )}

      {/* Next button */}
      <div className="mt-auto">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-2xl bg-amber-500 text-black text-xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          次の問題
        </button>
      </div>
    </div>
  )
}
