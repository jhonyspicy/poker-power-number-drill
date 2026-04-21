export type Hand = {
  id: string
  ranks: [string, string]
  type: string
  power: {
    pair?: number
    offsuit?: number
    suited?: number
  }
  mnemonic: {
    text: string
    image: string
  }
}

export type HandData = {
  combos: Hand[]
}
