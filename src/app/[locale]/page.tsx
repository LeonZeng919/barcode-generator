import { unstable_setRequestLocale } from 'next-intl/server'
import { redirect } from 'next/navigation'

export default function IndexPage({
  params: { locale },
}: {
  params: { locale: string }
}) {
  unstable_setRequestLocale(locale)
  const defaultBarcodeType = 'CODE128'
  redirect(`/${locale}/${defaultBarcodeType}`)
}
