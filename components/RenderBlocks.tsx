import HeroBlock from './blocks/HeroBlock'
import FormBlockComponent from './blocks/FormBlockComponent'
import PartnersBlock from './blocks/PartnersBlock'
import type { HeroBlockData, FormBlockData, FormData, PartnersBlockData } from '@/types/blocks'
import type { RenderBlocksProps } from '@/types/components'

export default function RenderBlocks({ blocks, consentText }: RenderBlocksProps) {
  if (!blocks || blocks.length === 0) {
    return null
  }

  return (
    <div className="space-y-0">
      {blocks.map((block, index) => {
        switch (block.blockType) {
          case 'hero':
            const heroBlock = block as unknown as HeroBlockData
            return (
              <HeroBlock
                key={block.id || index}
                backgroundColor={heroBlock.backgroundColor}
                noPadding={heroBlock.noPadding}
                textColor={heroBlock.textColor}
                title={heroBlock.title}
                badges={heroBlock.badges}
                description={heroBlock.description}
                image={heroBlock.image}
                buttons={heroBlock.buttons}
                consentText={consentText}
              />
            )
          case 'form':
            const formBlock = block as unknown as FormBlockData
            // Проверяем, является ли form объектом или ID
            const formData = typeof formBlock.form === 'object' ? formBlock.form : null
            if (!formData) {
              console.warn('Form data not populated for block:', formBlock.id)
              return null
            }
            return (
              <FormBlockComponent
                key={block.id || index}
                backgroundColor={formBlock.backgroundColor}
                title={formBlock.title}
                description={formBlock.description}
                formData={formData as FormData}
              />
            )
          case 'partners':
            const partnersBlock = block as unknown as PartnersBlockData
            return (
              <PartnersBlock
                key={block.id || index}
                title={partnersBlock.title}
                description={partnersBlock.description}
                logos={partnersBlock.logos}
                animationSpeed={partnersBlock.animationSpeed}
                grayscale={partnersBlock.grayscale}
                showCardBackground={partnersBlock.showCardBackground}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}

