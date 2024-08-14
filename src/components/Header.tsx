import Link from 'next/link'

import { getSiteConfig } from '@/config/site-i18n'
import { ThemeToggle } from '@/components/theme-toggle'
import { Locale } from '@/i18n'
import { LanguageToggle } from './language-toggle'
import { Icons } from '@/components/icons'

interface SiteHeaderProps {
  locale: Locale
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const siteConfig = getSiteConfig(locale)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <LanguageToggle locale={locale} />
        <div className="flex items-center">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <h1 className="max-w-[66vw] truncate text-2xl font-bold normal-case sm:max-w-full sm:text-3xl">
              {siteConfig.name}
            </h1>
          </Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="https://github.com/LeonZeng919/barcode-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary"
          >
            <Icons.gitHub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}
