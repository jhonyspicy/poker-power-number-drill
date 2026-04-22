const RANKS = ['A', 'K', 'Q', 'J', 'T', '9', '8', '7', '6', '5', '4', '3', '2']

type Props = {
  highlightId: string
}

export default function RangeTable({ highlightId }: Props) {
  return (
    <div className="grid grid-cols-13 gap-[1px] w-full max-w-sm mx-auto">
      {RANKS.map((row, ri) =>
        RANKS.map((col, ci) => {
          let label: string
          let cellId: string
          if (ri === ci) {
            label = row + col
            cellId = row + col
          } else if (ri < ci) {
            label = row + col + 's'
            cellId = row + col
          } else {
            label = col + row + 'o'
            cellId = col + row
          }
          const isHighlight = cellId === highlightId
          const isPair = ri === ci
          return (
            <div
              key={`${ri}-${ci}`}
              className={`aspect-square text-[6px] sm:text-[8px] leading-none p-[2px] text-center rounded-[2px] flex items-center justify-center ${
                isHighlight
                  ? 'bg-amber-500 text-black font-bold'
                  : isPair
                  ? 'bg-white/20 text-white/50'
                  : 'bg-white/10 text-white/40'
              }`}
            >
              {label}
            </div>
          )
        })
      )}
    </div>
  )
}
