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
    <main className="mx-auto w-full max-w-5xl p-5">
      <div className="grid grid-cols-2 gap-2 ">
        <div className="col-span-2">
          <BarcodeCarousel />
        </div>
        <div className="col-span-1">
          <InputComponent />
        </div>
        <div className="col-span-1">
          <OptionsComponent />
        </div>
        <div className="col-span-2">
          <OutputComponent />
        </div>
        <div className="md:col-span-1 lg:col-span-1">
          {/* <ShareButton /> */}
        </div>
      </div>
    </main>
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
