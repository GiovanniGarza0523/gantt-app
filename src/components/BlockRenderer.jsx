import HeroBlock from './blocks/HeroBlock.jsx'
import ServiceListBlock from './blocks/ServiceListBlock.jsx'
import PricingTableBlock from './blocks/PricingTableBlock.jsx'
import TeamBlock from './blocks/TeamBlock.jsx'
import TermsBlock from './blocks/TermsBlock.jsx'
import GalleryBlock from './blocks/GalleryBlock.jsx'

const BLOCK_COMPONENTS = {
  hero: HeroBlock,
  serviceList: ServiceListBlock,
  pricingTable: PricingTableBlock,
  team: TeamBlock,
  terms: TermsBlock,
  gallery: GalleryBlock,
}

export default function BlockRenderer({ block }) {
  const Component = BLOCK_COMPONENTS[block.type]
  if (!Component) return null
  return <Component block={block} />
}
