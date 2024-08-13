import { getSiteConfig } from '@/config/site-i18n'
import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import BarcodeGenerator from '@/components/barcode-generator'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import { barcodeTypes } from '@/config/barcode-types'
import MarkdownContent from '@/components/MarkdownContent'

export default function BarcodePage({
  params: { locale, barcodeType },
  searchParams,
}: {
  params: { locale: string; barcodeType: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  unstable_setRequestLocale(locale)

  const t = useTranslations('content')

  // Validate barcodeType
  if (
    !barcodeTypes
      .flatMap((barcodeType) => barcodeType.types)
      .map((barcode) => barcode.value.toUpperCase())
      .includes(barcodeType)
  ) {
    notFound()
  }

  const initialData =
    typeof searchParams.data === 'string' ? searchParams.data : ''

  return (
    <div className="max-w-3xl">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex items-center gap-4">
          <BarcodeGenerator
            codeFormat={barcodeType}
            initialData={initialData}
            locale={locale}
          />
        </div>
      </section>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <MarkdownContent content={t('faq')} />
      </section>
    </div>
  )
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    barcodeTypes
      .flatMap((barcodeType) => barcodeType.types)
      .map((barcode) => ({ locale, barcodeType: barcode.value })),
  )
}
