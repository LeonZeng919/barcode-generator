import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale, localePrefix } from './i18n'

export default createMiddleware({
  // A list of all locales that are supported
  locales,
  localePrefix,
  // Used when no locale matches
  defaultLocale,
})

export const config = {

  matcher: [
    '/((?!api|_next|_vercel|.*\\..*).*)'],
}
