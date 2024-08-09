import React, { useEffect, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Settings, Copy } from 'lucide-react'
import { useBarcodeContext } from './BarcodeContext'
import AutoScroll from './auto-scroll'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select'
import { barcodeTypes, findBarcodeCategory } from '@/config/barcode-types'
import { usePathname, useRouter } from 'next/navigation'

export const InputComponent: React.FC = () => {
  const { input, setInput } = useBarcodeContext()
  return (
    <div className="form-control">
      <label htmlFor="input" className="label">
        <span className="label-text text-lg font-semibold">Input</span>
        <span className="label-text-alt flex gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(input)}
          >
            <Copy className="h-5 w-5" />
          </Button>
        </span>
      </label>
      <Textarea
        id="input"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="h-48"
        placeholder="Enter values here, one per line"
      />
    </div>
  )
}

export const OutputComponent: React.FC = () => {
  const { output, hasOverflow, setHasOverflow } = useBarcodeContext()
  const outputRef = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    const checkOverflow = () => {
      if (outputRef.current) {
        setHasOverflow(
          outputRef.current.scrollHeight > outputRef.current.clientHeight,
        )
      }
    }

    checkOverflow()
  }, [output, setHasOverflow])
  return (
    <div className="form-control">
      <label htmlFor="output" className="label">
        <span className="label-text text-lg font-semibold">Output</span>
        <span className="label-text-alt flex items-center justify-between gap-4">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => navigator.clipboard.writeText(output)}
          >
            <Copy className="h-5 w-5" />
          </Button>
          {hasOverflow && <AutoScroll targetRef={outputRef} />}
        </span>
      </label>
      <div
        ref={outputRef}
        id="output"
        className="h-48 overflow-auto rounded-md border bg-transparent p-3 text-sm shadow-sm"
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
      <span className="label-text text-lg font-semibold">Options</span>
      <span className="label-text-alt flex items-center gap-4">
        <Button size="icon" variant="ghost">
          <Settings className="h-5 w-5" />
        </Button>
      </span>
      <div className="h-48 overflow-auto rounded-md border bg-transparent p-3 text-sm shadow-sm">
        <div className="grid grid-cols-2 gap-2 ">
          <div className="md:col-span-1">
            <Label htmlFor="barcodeType">Code Format</Label>
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
            <Label className="whitespace-nowrap">Show Text :</Label>
            <RadioGroup
              defaultValue={showText ? 'yes' : 'no'}
              onValueChange={(value) => setShowText(value === 'yes')}
              className="flex items-center space-x-4"
            >
              <div className="mt-2 flex items-center space-x-2">
                <RadioGroupItem value="yes" id="showTextYes" />
                <Label htmlFor="showTextYes">Yes</Label>
              </div>
              <div className="mt-2 flex items-center space-x-2">
                <RadioGroupItem value="no" id="showTextNo" />
                <Label htmlFor="showTextNo">No</Label>
              </div>
            </RadioGroup>
            {/* </div> */}
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="barcodeLength">Barcode Length (mm)</Label>
            <Input
              id="barcodeLength"
              type="number"
              value={barcodeLength}
              onChange={(e) => setBarcodeLength(Number(e.target.value))}
            />
          </div>
          <div className="md:col-span-1">
            <Label htmlFor="barcodeHeight">Barcode Height (mm)</Label>
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
