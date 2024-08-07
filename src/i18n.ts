import { notFound } from 'next/navigation'
import { getRequestConfig } from 'next-intl/server'

// Can be imported from a shared config
export const locales = ['en', 'zh', 'fr']
export const languageNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  fr: 'français'
}

export type Locale = (typeof locales)[number]
export const defaultLocale = 'en'
// Use the default: `always`，设置为 as-needed可不显示默认路由
export const localePrefix = 'always';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound()

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
