import { $createHeadingNode, $createQuoteNode } from '@lexical/rich-text'
import { convertSelectionToNode$, currentBlockType$, activePlugins$, useTranslation, BlockType, allowedHeadingLevels$ } from '@mdxeditor/editor'
import { useCellValue, usePublisher } from '@mdxeditor/gurx'
import { $createParagraphNode } from 'lexical'
import { Select, Tooltip } from 'antd'

/**
 * A toolbar component that allows the user to change the block type of the current selection.
 * Supports paragraphs, headings and block quotes.
 * @group Toolbar Components
 */
export const BlockTypeSelect = () => {
  const convertSelectionToNode = usePublisher(convertSelectionToNode$)
  const currentBlockType = useCellValue(currentBlockType$)
  const activePlugins = useCellValue(activePlugins$)
  const hasQuote = activePlugins.includes('quote')
  const hasHeadings = activePlugins.includes('headings')
  const t = useTranslation()

  if (!hasQuote && !hasHeadings) {
    return null
  }

  const items: { label: string | JSX.Element; value: BlockType }[] = [
    { label: t('toolbar.blockTypes.paragraph', 'Paragraph'), value: 'paragraph' }
  ]

  if (hasQuote) {
    items.push({ label: t('toolbar.blockTypes.quote', 'Quote'), value: 'quote' })
  }

  if (hasHeadings) {
    const allowedHeadingLevels = useCellValue(allowedHeadingLevels$)
    items.push(
      ...allowedHeadingLevels.map(
        (n) => ({ label: t('toolbar.blockTypes.heading', 'Heading {{level}}', { level: n }), value: `h${n}` }) as const
      )
    )
  }

  return (
    <Tooltip title={t('toolbar.blockTypeSelect.selectBlockTypeTooltip', 'Select block type')}>
      <Select
        value={currentBlockType}
        variant="borderless"
        onChange={(value) => {
          const blockType = value as BlockType
          switch (blockType) {
            case 'quote':
              convertSelectionToNode(() => $createQuoteNode())
              break
            case 'paragraph':
              convertSelectionToNode(() => $createParagraphNode())
              break
            case '':
              break
            default:
              if (blockType.startsWith('h')) {
                convertSelectionToNode(() => $createHeadingNode(blockType))
              } else {
                throw new Error(`Unknown block type: ${blockType}`)
              }
          }
        }}
        placeholder={t('toolbar.blockTypeSelect.placeholder', 'Block type')}
        options={items}
      />
    </Tooltip>
  )
}