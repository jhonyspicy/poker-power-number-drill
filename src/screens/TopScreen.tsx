
type Props = {
  onStart: () => void
  onAbout: () => void
}

export default function TopScreen({ onStart, onAbout }: Props) {
  return (
    <div className="flex flex-col items-center min-h-dvh bg-[#0b3d0b] px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white leading-tight">
          <span className="block">パワーナンバー</span>
          <span className="block text-amber-400">ドリル</span>
        </h1>
      </div>
      <button
        onClick={onStart}
        className="w-full max-w-xs py-4 rounded-2xl bg-amber-500 text-black text-xl font-bold shadow-lg active:scale-95 transition-transform mb-4"
      >
        始める
      </button>
      <button
        type="button"
        onClick={onAbout}
        className="text-amber-300 underline underline-offset-4 text-base mb-10 active:opacity-70"
      >
        パワーナンバーとは？
      </button>
    </div>
  )
}
