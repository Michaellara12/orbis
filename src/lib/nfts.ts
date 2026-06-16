export interface NftTrait {
  label: string
  value: string
  /** Share of the collection that carries this trait (for the rarity bar). */
  rarity: number
}

export interface NftStat {
  label: string
  value: string
}

export interface Nft {
  id: number
  slug: string
  name: string
  tagline: string
  /** Short blurb used on cards / gallery. */
  description: string
  /** Long-form lore, one entry per paragraph (NFT detail page). */
  lore: string[]
  video: string
  score: string
  price: string
  lastSale: string
  edition: string
  accent: string
  traits: NftTrait[]
  stats: NftStat[]
  timeline: { date: string; event: string }[]
}

/**
 * The three Orbis characters. Each one has its own dedicated page
 * (`/nft/:slug`, see `NftPage.tsx`) and a card in the collection grid.
 */
export const NFTS: Nft[] = [
  {
    id: 1,
    slug: 'nova',
    name: 'Nova',
    tagline: 'The first to drift beyond the line',
    description:
      'Born from a collapsing star, Nova carries the warmth of the first light — a wanderer who maps the silence between worlds.',
    lore: [
      'Nova was forged in the final breath of a dying star, the moment a sun folds inward and lets go of everything it was. What remained was not an ending but a traveler — small, bright, and impossibly patient.',
      'It drifts along the edge of the known map, where the charts run out of names and the dark stops answering. Nova does not fear that border. It was the first of the Orbis to cross it, and the only one to cross it twice.',
      'Those who own Nova say it hums faintly when the night is clear — a sound somewhere between memory and invitation, as if the first light still has somewhere it wants to take you.',
    ],
    video:
      'https://firebasestorage.googleapis.com/v0/b/edifia-ai-video.firebasestorage.app/o/portafolio%2FWhatsApp%20Video%202026-06-16%20at%201.22.13%20AM.mp4?alt=media&token=e22cc422-e49f-4acb-9520-f681163423e6',
    score: '8.7/10',
    price: '2.4 ETH',
    lastSale: '2.1 ETH',
    edition: '1 of 1',
    accent: '#ff8a5c',
    traits: [
      { label: 'Origin', value: 'Supernova', rarity: 4 },
      { label: 'Element', value: 'Plasma', rarity: 11 },
      { label: 'Aura', value: 'Amber', rarity: 7 },
      { label: 'Rarity', value: 'Legendary', rarity: 2 },
    ],
    stats: [
      { label: 'Token ID', value: '#0001' },
      { label: 'Blockchain', value: 'Ethereum' },
      { label: 'Standard', value: 'ERC-721' },
      { label: 'Minted', value: 'Mar 2026' },
    ],
    timeline: [
      { date: 'Mar 2026', event: 'Minted to the Orbis genesis contract' },
      { date: 'Apr 2026', event: 'Acquired by collector 0x7f…a91' },
      { date: 'Jun 2026', event: 'Listed for 2.4 ETH' },
    ],
  },
  {
    id: 2,
    slug: 'lumen',
    name: 'Lumen',
    tagline: 'A celebration carried across the void',
    description:
      'Lumen moves to a rhythm only the cosmos can hear. Where it lands, color follows — a bright rebellion against the dark.',
    lore: [
      'Lumen arrived without warning, trailing color across a stretch of sky that had been grey for a thousand years. No one knows where it learned to move like that — loose, joyful, certain — but everything it passes seems to remember how to glow.',
      'It keeps no fixed orbit. Lumen follows celebration the way other things follow gravity, drawn to the brief, bright moments when the void forgets to be empty.',
      'To hold Lumen is to hold a small, stubborn argument with silence: proof that even out here, between the cold and the further cold, something insists on dancing.',
    ],
    video:
      'https://firebasestorage.googleapis.com/v0/b/edifia-ai-video.firebasestorage.app/o/portafolio%2FWhatsApp%20Video%202026-06-16%20at%201.22.22%20AM%20(1).mp4?alt=media&token=da06e681-71d2-4b70-89ef-a0bfb3f2067a',
    score: '9/10',
    price: '3.1 ETH',
    lastSale: '2.8 ETH',
    edition: '1 of 1',
    accent: '#6fff00',
    traits: [
      { label: 'Origin', value: 'Nebula', rarity: 6 },
      { label: 'Element', value: 'Light', rarity: 9 },
      { label: 'Aura', value: 'Neon', rarity: 3 },
      { label: 'Rarity', value: 'Mythic', rarity: 1 },
    ],
    stats: [
      { label: 'Token ID', value: '#0002' },
      { label: 'Blockchain', value: 'Ethereum' },
      { label: 'Standard', value: 'ERC-721' },
      { label: 'Minted', value: 'Mar 2026' },
    ],
    timeline: [
      { date: 'Mar 2026', event: 'Minted to the Orbis genesis contract' },
      { date: 'May 2026', event: 'Featured in the Orbis spotlight drop' },
      { date: 'Jun 2026', event: 'Listed for 3.1 ETH' },
    ],
  },
  {
    id: 3,
    slug: 'vesper',
    name: 'Vesper',
    tagline: 'The quiet keeper of distant signals',
    description:
      'Last seen near the edge of a forgotten orbit, Vesper listens to frequencies the rest of us lost — patient, watchful, fixed beyond time.',
    lore: [
      'Vesper does not travel so much as wait — parked at the edge of a forgotten orbit, antennas turned toward frequencies everyone else stopped listening for. It is the keeper of signals that have no sender left.',
      'Patience is its whole nature. Vesper has heard the last transmissions of ships long gone and the slow static of stars cooling down, and it holds all of it, faithfully, the way a lighthouse holds a coast it will never visit.',
      'Owning Vesper is a quiet kind of stewardship. It asks little and notices everything — and on the rare nights it answers back, the message is always the same: you are not as alone as the dark would have you believe.',
    ],
    video:
      'https://firebasestorage.googleapis.com/v0/b/edifia-ai-video.firebasestorage.app/o/portafolio%2FWhatsApp%20Video%202026-06-16%20at%201.22.22%20AM.mp4?alt=media&token=ac0661cd-372b-4249-8aeb-133560ae9318',
    score: '8.2/10',
    price: '1.9 ETH',
    lastSale: '1.7 ETH',
    edition: '1 of 1',
    accent: '#7c9bff',
    traits: [
      { label: 'Origin', value: 'Deep Orbit', rarity: 8 },
      { label: 'Element', value: 'Signal', rarity: 12 },
      { label: 'Aura', value: 'Indigo', rarity: 10 },
      { label: 'Rarity', value: 'Epic', rarity: 5 },
    ],
    stats: [
      { label: 'Token ID', value: '#0003' },
      { label: 'Blockchain', value: 'Ethereum' },
      { label: 'Standard', value: 'ERC-721' },
      { label: 'Minted', value: 'Mar 2026' },
    ],
    timeline: [
      { date: 'Mar 2026', event: 'Minted to the Orbis genesis contract' },
      { date: 'Apr 2026', event: 'Held in the Orbis treasury' },
      { date: 'Jun 2026', event: 'Listed for 1.9 ETH' },
    ],
  },
]

export function getNft(slug: string | undefined): Nft | undefined {
  return NFTS.find((n) => n.slug === slug)
}
