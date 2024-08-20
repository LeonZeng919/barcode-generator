import React from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Copy, Sliders } from 'lucide-react'
import { useBarcodeContext } from './BarcodeContext'

import { useTranslations } from 'next-intl'
import { ShareButton } from './share-button'
import { Switch } from '@/components/ui/switch'
import ScrollControls from './ScrollControls'
import ImportData from './ImportData'

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

  return (
    <div className="form-control flex flex-col">
      <label htmlFor="output" className="label">
        <div className="flex justify-between">
          <span className="label-text text-lg font-semibold">
            {t('output.title')}
          </span>
          <span className="label-text-alt flex items-center justify-between gap-4">
            <ShareButton size="icon" variant="ghost" />
            <ScrollControls outputRef={outputRef} />
          </span>
        </div>
      </label>
      <div
        ref={outputRef}
        id="output"
        className="flex aspect-square max-h-[480px] flex-col items-center overflow-auto rounded-md border bg-indigo-100 bg-transparent bg-opacity-30 p-3 text-sm shadow-sm"
        dangerouslySetInnerHTML={{ __html: output }}
      />
    </div>
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
  } = useBarcodeContext()
  const t = useTranslations('Barcode')

  return (
    <div>
      <div className="flex justify-between">
        <span className="label-text text-lg font-semibold">
          {t('options.name')}
        </span>
        <span className="label-text-alt flex items-center gap-4">
          <Button size="icon" variant="ghost">
            <Sliders className="h-5 w-5" />
          </Button>
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
        </div>
      </div>
    </div>
  )
}
