'use client'
import React, { useEffect } from 'react'
import { BarcodeProvider, useBarcodeContext } from './BarcodeContext'
import { BarcodeCarousel } from './BarcodeCarousel'
import {
  InputComponent,
  OptionsComponent,
  OutputComponent,
} from './BarcodeComponents'
import { useBarcodeGenerator } from './useBarcodeGenerator'
import { Locale } from '@/i18n'

const BarcodeGeneratorContent: React.FC = () => {
  useBarcodeGenerator()

  return (
    <div className="mx-auto w-full max-w-5xl p-5">
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
        <div className="col-span-1 md:col-span-2">
          <BarcodeCarousel />
        </div>
        <div className=" order-2 col-span-1 ">
          <InputComponent />
        </div>
        <div className=" order-1 col-span-1 md:order-2">
          <OptionsComponent />
        </div>
        <div className=" order-2 col-span-1 md:col-span-2">
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
