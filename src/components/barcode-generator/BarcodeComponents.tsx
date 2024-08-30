import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Copy, Printer, Sliders } from 'lucide-react'
import { useBarcodeContext } from './BarcodeContext'

import { useTranslations } from 'next-intl'
import { ShareButton } from './share-button'
import { Switch } from '@/components/ui/switch'
import ScrollControls from './ScrollControls'
import ImportData from './ImportData'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const LayoutSelector: React.FC<{
  onLayoutChange: (layout: string) => void
}> = ({ onLayoutChange }) => {
  const t = useTranslations('Barcode')
  return (
    <Select onValueChange={onLayoutChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={t('layout.name')} defaultValue={'3x4'} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1x2">{t('layout.1x2')}</SelectItem>
        <SelectItem value="2x3">{t('layout.2x3')}</SelectItem>
        <SelectItem value="3x4">{t('layout.3x4')}</SelectItem>
        <SelectItem value="4x5">{t('layout.4x5')}</SelectItem>
      </SelectContent>
    </Select>
  )
}

export const InputComponent: React.FC = () => {
  const t = useTranslations('Barcode')
  const { input, setInput } = useBarcodeContext()
  return (
    <div className="form-control">
      <label htmlFor="input" className="label">
        <div className="flex justify-between">
          <span className="label-text text-lg font-semibold">
            {t('input.title')}
          </span>
          <span className="label-text-alt flex gap-4">
            <ImportData setInput={setInput} />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(input)}
            >
              <Copy className="h-5 w-5" />
            </Button>
          </span>
        </div>
      </label>
      <Textarea
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-28 bg-white"
        placeholder="Enter values here, one per line"
      />
    </div>
  )
}

export const OutputComponent: React.FC = () => {
  const { output } = useBarcodeContext()
  const outputRef = React.useRef<HTMLDivElement>(null)
  const t = useTranslations('Barcode')
  const [layout, setLayout] = React.useState('3x4')

  // Create a numbered output
  const numberedOutput = output
    .map((svg, index) => {
      const numberSpan =
        output.length > 1
          ? `<span class="barcode-number mr-2">${index + 1}.</span>`
          : ''

      return `<div class="barcode-item flex items-center mb-2">
      ${numberSpan}
      <div class="barcode-svg">${svg}</div>
    </div>`
    })
    .join('')

  return (
    <div className="form-control flex flex-col">
      <label htmlFor="output" className="label">
        <div className="flex justify-between">
          <span className="label-text text-lg font-semibold">
            {t('output.title')}
          </span>
          <span className="label-text-alt flex items-center justify-between gap-4">
            <ShareButton size="icon" variant="ghost" />
            <PrintButton output={output} layout={layout} />
            <LayoutSelector onLayoutChange={setLayout} />
            <ScrollControls outputRef={outputRef} />
          </span>
        </div>
      </label>
      <div
        ref={outputRef}
        id="output"
        className="flex aspect-square max-h-[480px] flex-col items-center overflow-auto rounded-md border bg-blue-100 bg-opacity-30 p-3 text-sm shadow-sm"
        dangerouslySetInnerHTML={{ __html: numberedOutput }}
      />
    </div>
  )
}
interface PrintButtonProps {
  output: string[]
  layout: string
}

export const PrintButton: React.FC<PrintButtonProps> = ({ output, layout }) => {
  const handlePrint = () => {
    const [cols, rows] = layout.split('x').map(Number)
    const printContent = `
      <html>
        <head>
          <title>Barcode Print</title>
          <style>
            body { font-family: Arial, sans-serif; }
            .barcode-container { 
              display: grid;
              grid-template-columns: repeat(${cols}, 1fr);
              gap: 10px;
              page-break-inside: avoid;
            }
            .barcode-item { text-align: center; }
            @media print {
              @page { size: A4; margin: 0; }
              body { margin: 1cm; }
            }
          </style>
        </head>
        <body>
          <div class="barcode-container">${output.join('')}</div>
        </body>
      </html>
    `

    const iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    document.body.appendChild(iframe)

    const iframeDoc = iframe.contentWindow?.document
    if (iframeDoc) {
      iframeDoc.open()
      iframeDoc.write(printContent)
      iframeDoc.close()

      iframe.onload = () => {
        iframe.contentWindow?.print()
        setTimeout(() => {
          document.body.removeChild(iframe)
        }, 100)
      }
    }
  }

  return (
    <Button size="icon" variant="ghost" onClick={handlePrint}>
      <Printer className="h-5 w-5" />
    </Button>
  )
}

export const OptionsComponent: React.FC = () => {
  const {
    barcodeLength,
    setBarcodeLength,
    barcodeHeight,
    setBarcodeHeight,
    showText,
    setShowText,
    barcodeMargin,
    setBarcodeMargin,
  } = useBarcodeContext()
  const t = useTranslations('Barcode')

  return (
    <div>
      <div className="flex justify-between">
        <span className="label-text text-lg font-semibold">
          {t('options.name')}
        </span>
      </div>

      <div className="xs:text-sm rounded-md  bg-transparent p-3 text-xs shadow-sm">
        <div className="grid grid-cols-1 gap-2 ">
          <div className="md:col-span-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="showText" className="text-sm font-medium">
                {t('options.show-text')}
              </Label>
              <Switch
                id="showText"
                checked={showText}
                onCheckedChange={setShowText}
                className="border-gray-400"
              />
            </div>
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="barcodeLength">{t('options.barcode-length')}</Label>
            <Input
              id="barcodeLength"
              type="number"
              value={barcodeLength}
              onChange={(e) => setBarcodeLength(Number(e.target.value))}
              className="bg-white"
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="barcodeHeight">{t('options.barcode-height')}</Label>
            <Input
              id="barcodeHeight"
              type="number"
              value={barcodeHeight}
              className="bg-white"
              onChange={(e) => setBarcodeHeight(Number(e.target.value))}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="barcodeMargin">{t('options.barcode-margin')}</Label>
            <Input
              id="barcodeMargin"
              type="number"
              value={barcodeMargin}
              className="bg-white"
              onChange={(e) => setBarcodeMargin(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
