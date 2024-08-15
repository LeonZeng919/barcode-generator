import { useTranslations } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import BarcodeGenerator from '@/components/barcode-generator'
import { notFound } from 'next/navigation'
import { locales } from '@/i18n'
import { barcodeTypes } from '@/config/barcode-types'
import MarkdownContent from '@/components/MarkdownContent'
import { SiteHeader } from '@/components/Header'
import Footer from '@/components/footer'
import ScrollControls from '@/components/ScrollControls'

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
      .includes(barcodeType.toUpperCase())
  ) {
    notFound()
  }

  const initialData =
    typeof searchParams.data === 'string' ? searchParams.data : ''

  return (
    <>
      <SiteHeader locale={locale} codeFormat={barcodeType} />
      <main className="flex flex-1 justify-center">
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
      </main>
      <Footer />
      <ScrollControls />
    </>
  )
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    barcodeTypes
      .flatMap((barcodeType) => barcodeType.types)
      .map((barcode) => ({ locale, barcodeType: barcode.value })),
  )
}
