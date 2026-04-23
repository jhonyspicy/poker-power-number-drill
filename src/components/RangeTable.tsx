import data from '../data/data.json'

const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

type Props = {
  highlightId?: string
  showPower?: boolean
}

const powerMap = new Map<string, { pair?: number; offsuit?: number; suited?: number }>()
for (const combo of data.combos) {
  powerMap.set(combo.id, combo.power as { pair?: number; offsuit?: number; suited?: number })
}

function formatPower(value: number | undefined): string {
  if (value === undefined || value === 0) return '-'
  if (value === 99) return '∞'
  return String(value)
}

export default function RangeTable({ highlightId, showPower = false }: Props) {
  return (
    <div className="grid grid-cols-13 gap-[1px] w-full max-w-sm mx-auto">
      {RANKS.map((row, ri) =>
        RANKS.map((col, ci) => {
          let cellId: string
          let displayValue: string
          if (ri === ci) {
            cellId = row + col
            displayValue = showPower ? formatPower(powerMap.get(cellId)?.pair) : row + col
          } else if (ri < ci) {
            cellId = row + col
            displayValue = showPower ? formatPower(powerMap.get(cellId)?.suited) : row + col + 's'
          } else {
            cellId = col + row
            displayValue = showPower ? formatPower(powerMap.get(cellId)?.offsuit) : col + row + 'o'
          }
          const isHighlight = highlightId !== undefined && cellId === highlightId
          const isPair = ri === ci
          return (
            <div
              key={`${ri}-${ci}`}
              className={`aspect-square text-[8px] sm:text-[10px] leading-none p-[2px] text-center rounded-[2px] flex items-center justify-center ${
                isHighlight
                  ? 'bg-amber-500 text-black font-bold'
                  : isPair
                  ? 'bg-white/20 text-white/50'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              {displayValue}
            </div>
          )
        })
      )}
    </div>
  )
}
