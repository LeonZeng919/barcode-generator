import Link from 'next/link'

import { getSiteConfig } from '@/config/site-i18n'
import { ThemeToggle } from '@/components/theme-toggle'
import { Locale } from '@/i18n'
import { LanguageToggle } from './language-toggle'
import { Icons } from '@/components/icons'
import { useTranslations } from 'next-intl'

interface SiteHeaderProps {
  locale: Locale
  codeFormat: string
}

export function SiteHeader({ locale, codeFormat }: SiteHeaderProps) {
  const t = useTranslations('Barcode')
  return (
    <header className="w-full bg-background">
      <div className="container flex h-16 items-center justify-between space-x-4">
        <div className="flex items-center">
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <h1 className="max-w-[66vw] truncate text-2xl font-bold normal-case sm:max-w-full sm:text-3xl">
              {t('title', { type: codeFormat })}
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
          {/* <ThemeToggle /> */}
          <LanguageToggle locale={locale} />
        </div>
      </div>
    </header>
  )
}
