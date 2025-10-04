import HeroBlock from './blocks/HeroBlock'
import FormBlockComponent from './blocks/FormBlockComponent'
import type { HeroBlockData, FormBlockData, FormData } from '@/types/blocks'
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
            const heroBlock = block as HeroBlockData
            return (
              <HeroBlock
                key={block.id || index}
                backgroundColor={heroBlock.backgroundColor}
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
            const formBlock = block as FormBlockData
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
          default:
            return null
        }
      })}
    </div>
  )
}

