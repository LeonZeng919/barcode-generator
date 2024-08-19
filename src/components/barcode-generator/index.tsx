'use client'
import React from 'react'
import { BarcodeProvider, useBarcodeContext } from './BarcodeContext'
import { BarcodeCarousel } from './BarcodeCarousel'
import {
  InputComponent,
  OptionsComponent,
  OutputComponent,
} from './BarcodeComponents'
import { Locale } from '@/i18n'

const BarcodeGeneratorContent: React.FC = () => {
  const { codeFormat } = useBarcodeContext()
  return (
    <div className="mx-auto w-full max-w-5xl p-5">
      <div className="grid grid-cols-1 gap-2">
        <div className="col-span-1">
          <BarcodeCarousel />
        </div>
        <div className=" col-span-1 ">
          <OptionsComponent />
        </div>
        <div className=" col-span-1 ">
          <InputComponent />
        </div>
        <div className="col-span-1">
          <OutputComponent />
        </div>
      </div>
    </div>
  )
}

const BarcodeGenerator: React.FC<{
  codeFormat: string
  initialData: string
  locale: Locale
}> = ({ codeFormat, initialData, locale }) => {
  return (
    <BarcodeProvider value={{ initCodeFormat: codeFormat, initialData }}>
      <BarcodeGeneratorContent />
    </BarcodeProvider>
  )
}

export default BarcodeGenerator
