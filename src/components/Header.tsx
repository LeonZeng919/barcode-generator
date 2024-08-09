import Link from 'next/link'

import { getSiteConfig } from '@/config/site-i18n'
import { ThemeToggle } from '@/components/theme-toggle'
import { Locale } from '@/i18n'
import { LanguageToggle } from './language-toggle'

interface SiteHeaderProps {
  locale: Locale
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const siteConfig = getSiteConfig(locale)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="s container flex h-16 items-center justify-between space-x-4">
        <LanguageToggle locale={locale} />
        <div className="flex items-center">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <h1 className="max-w-[66vw] truncate text-2xl font-bold normal-case sm:max-w-full sm:text-3xl">
              {siteConfig.name}
            </h1>
          </Link>
        </div>
        <ThemeToggle />
      </div>
    </header>
  )
}
