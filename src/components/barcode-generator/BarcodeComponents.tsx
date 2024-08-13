import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Settings, Copy } from 'lucide-react'
import { useBarcodeContext } from './BarcodeContext'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { barcodeTypes, findBarcodeCategory } from '@/config/barcode-types'
import { usePathname, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'

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
        className="h-40"
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
    <div className="form-control">
      <label htmlFor="output" className="label">
        <div className="flex justify-between">
          <span className="label-text text-lg font-semibold">
            {t('output.title')}
          </span>
          <span className="label-text-alt flex items-center justify-between gap-4">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => navigator.clipboard.writeText(output)}
            >
              <Copy className="h-5 w-5" />
            </Button>
          </span>
        </div>
      </label>
      <div
        ref={outputRef}
        id="output"
        className="overflow-auto rounded-md border bg-transparent p-3 text-sm shadow-sm"
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
    codeFormat,
  } = useBarcodeContext()
  const t = useTranslations('Barcode')

  const router = useRouter()
  const pathname = usePathname()
  const codeType = findBarcodeCategory(codeFormat)
  const switchCodeFormat = (newCodeFormat: string) => {
    if (newCodeFormat === codeFormat) return
    const newPath = pathname.replace(`/${codeFormat}`, `/${newCodeFormat}`)
    router.push(newPath)
  }
  return (
    <div>
      <div className="flex justify-between">
        <span className="label-text text-lg font-semibold">
          {t('options.name')}
        </span>
        <span className="label-text-alt flex items-center gap-4">
          <Button size="icon" variant="ghost">
            <Settings className="h-5 w-5" />
          </Button>
        </span>
      </div>

      <div className="xs:text-sm h-40 overflow-auto rounded-md border bg-transparent p-3 text-xs shadow-sm">
        <div className="grid grid-cols-2 gap-2 ">
          <div className="md:col-span-1">
            <Label htmlFor="barcodeType">{t('options.code-format')}</Label>
            <Select value={codeFormat} onValueChange={switchCodeFormat}>
              <SelectTrigger id="barcodeType">
                <SelectValue placeholder="Select barcode type" />
              </SelectTrigger>
              <SelectContent>
                {barcodeTypes
                  .filter((barcodeType) => barcodeType.name === codeType)
                  .flatMap((type) => type.types)
                  .map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.value}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-1">
            {/* <div className="flex items-center space-x-4"> */}
            <Label className="whitespace-nowrap">
              {t('options.show-text')} :
            </Label>
            <RadioGroup
              defaultValue={showText ? 'yes' : 'no'}
              onValueChange={(value) => setShowText(value === 'yes')}
              className="flex items-center space-x-4"
            >
              <div className="mt-2 flex items-center space-x-1">
                <RadioGroupItem value="yes" id="showTextYes" />
                <Label htmlFor="showTextYes">{t('options.show-yes')}</Label>
              </div>
              <div className="mt-2 flex items-center space-x-1">
                <RadioGroupItem value="no" id="showTextNo" />
                <Label htmlFor="showTextNo">{t('options.show-no')}</Label>
              </div>
            </RadioGroup>
            {/* </div> */}
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="barcodeLength">{t('options.barcode-length')}</Label>
            <Input
              id="barcodeLength"
              type="number"
              value={barcodeLength}
              onChange={(e) => setBarcodeLength(Number(e.target.value))}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="barcodeHeight">{t('options.barcode-height')}</Label>
            <Input
              id="barcodeHeight"
              type="number"
              value={barcodeHeight}
              onChange={(e) => setBarcodeHeight(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
