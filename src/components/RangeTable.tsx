import { Fragment } from 'react'
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
  const headerClass =
    'aspect-square text-[16px] leading-none p-0.5 text-center flex items-center justify-center font-bold text-amber-300'

  return (
    <div className="grid grid-cols-14 gap-px w-full max-w-sm mx-auto">
      <div className={headerClass} />
      {RANKS.map((rank) => (
        <div key={`col-${rank}`} className={headerClass}>
          {rank}
        </div>
      ))}
      {RANKS.map((row, ri) => (
        <Fragment key={`row-${row}`}>
          <div className={headerClass}>
            {row}
          </div>
          {RANKS.map((col, ci) => {
          let cellId: string
          let displayValue: string
          if (ri === ci) {
            cellId = row + col
            displayValue = showPower ? formatPower(powerMap.get(cellId)?.pair) : row + col
          } else if (ri < ci) {
            cellId = row + col
            displayValue = showPower ? formatPower(powerMap.get(cellId)?.suited) : row + col
          } else {
            cellId = col + row
            displayValue = showPower ? formatPower(powerMap.get(cellId)?.offsuit) : col + row
          }
          const isHighlight = highlightId !== undefined && cellId === highlightId
          const isPair = ri === ci
          return (
            <div
              key={`${ri}-${ci}`}
              className={`aspect-square text-[16px] leading-none p-0.5 text-center rounded-xs flex items-center justify-center ${
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
          })}
        </Fragment>
      ))}
    </div>
  )
}
