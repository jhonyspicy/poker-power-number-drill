import { useEffect } from 'react'

declare global {
  interface Window {
    adsbygoogle: any[]
  }
}

export default function AdSense() {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({})
      }
    } catch (e) {
      console.error('AdSense error:', e)
    }
  }, [])

  return (
    <div className="w-full flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minWidth: '250px', minHeight: '250px' }}
        data-ad-client="ca-pub-3080773555651810"
        data-ad-slot="9350437098"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  )
}
