type Props = {
  onBack: () => void
}

export default function AboutScreen({ onBack }: Props) {
  return (
    <div className="flex flex-col min-h-dvh bg-[#0b3d0b] px-6 py-8">
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        パワーナンバーとは？
      </h1>

      <div className="text-white/90 space-y-4 leading-relaxed text-base max-w-xl mx-auto w-full">
        <p>パワーナンバーとは、</p>
        <blockquote className="border-l-4 border-amber-400 pl-4 text-amber-100 italic">
          ショートスタック時に<br />
          「このハンドでオールインして良いか」<br />
          を判断するための数値です。
        </blockquote>
        <p>
          特に、スタックが <span className="text-amber-300 font-bold">20BB</span> を下回ったあたりから重要になります。
        </p>
        <p>
          トーナメントでスタックが減った時、<br />
          M値とパワーナンバーを比較することで、<br />
          プッシュ判断を客観的に行いやすくなります。
        </p>

        <hr className="border-white/20 my-6" />

        <h2 className="text-xl font-bold text-amber-400 mt-2">計算方法</h2>
        <p>まず、現在の危険度を表す「M値」を計算します。</p>
        <div className="bg-black/30 rounded-lg px-4 py-3 text-center font-mono text-amber-200">
          M = 自分のスタック / (BB + SB + Ante)
        </div>
        <p>M値とは、</p>
        <blockquote className="border-l-4 border-amber-400 pl-4 text-amber-100 italic">
          「あと何周耐えられるか」
        </blockquote>
        <p>を表す数字です。</p>

        <p>このM値に、</p>
        <blockquote className="border-l-4 border-amber-400 pl-4 text-amber-100 italic">
          自分の後ろに残っている人数
        </blockquote>
        <p>を掛けます。</p>
        <div className="bg-black/30 rounded-lg px-4 py-3 text-center font-mono text-amber-200">
          M × 後ろ人数
        </div>
        <p>そして、その値と各ハンドのパワーナンバーを比較します。</p>
        <ul className="list-disc list-inside space-y-2">
          <li>
            計算結果 <span className="font-bold">≤</span> パワーナンバー<br />
            <span className="text-amber-300">→ オールイン候補</span>
          </li>
          <li>
            計算結果 <span className="font-bold">＞</span> パワーナンバー<br />
            <span className="text-amber-300">→ まだ待てる可能性あり</span>
          </li>
        </ul>
      </div>

      <div className="mt-8">
        <button
          onClick={onBack}
          className="w-full max-w-xs mx-auto block py-4 rounded-2xl bg-amber-500 text-black text-xl font-bold shadow-lg active:scale-95 transition-transform"
        >
          戻る
        </button>
      </div>
    </div>
  )
}
