import HeroBlock from './blocks/HeroBlock'
import type { BlockType, HeroBlockData } from '@/types/blocks'

interface RenderBlocksProps {
  blocks: BlockType[]
}

export default function RenderBlocks({ blocks }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-0">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            const heroBlock = block as HeroBlockData
            return (
              <HeroBlock
                key={block.id || index}
                backgroundColor={heroBlock.backgroundColor}
                textColor={heroBlock.textColor}
                title={heroBlock.title}
                description={heroBlock.description}
                image={heroBlock.image}
                button={heroBlock.button}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

