import { Locale } from '@/i18n'

type SiteConfig = {
  name: string
  description: string
  mainNav: { title: string; href: string }[]
  links: {
    twitter: string
    github: string
    docs: string
  }
}

const siteConfigBase: Record<Locale, SiteConfig> = {
  en: {
    name: "NSIT",
    description: "This is a modern web development starter template that integrates Next.js, Tailwind CSS, ShadcnUI, and internationalization features, designed for quickly building efficient, customizable, and multilingual front-end projects.",
    mainNav: [
      {
        title: "Home",
        href: "/",
      },
      {
        title: "About",
        href: "/about",
      },
    ],
    links: {
      twitter: "https://twitter.com/leonzeng2024",
      github: "https://github.com/LeonZeng919/next-shadcn-intl-template",
      docs: "/docs",
    },
  },
  zh: {
    name: "NSIT",
    description: "这是一个集成了Next.js、Tailwind CSS、ShadcnUI和国际化功能的现代化Web开发启动模板，旨在快速搭建高效、可定制且多语言支持的前端项目。",
    mainNav: [
      {
        title: "首页",
        href: "/",
      },
      {
        title: "关于",
        href: "/about",
      },
    ],
    links: {
      twitter: "https://twitter.com/leonzeng2024",
      github: "https://github.com/LeonZeng919/next-shadcn-intl-template",
      docs: "/docs",
    },
  },
  fr: {
    name: "NSIT",
    description: "Ceci est un modèle de démarrage de développement web moderne qui intègre Next.js, Tailwind CSS, ShadcnUI et des fonctionnalités d'internationalisation, conçu pour construire rapidement des projets front-end efficaces, personnalisables et multilingues.",
    mainNav: [
      {
        title: "Accueil",
        href: "/",
      },
      {
        title: "À propos",
        href: "/about",
      },
    ],
    links: {
      twitter: "https://twitter.com/leonzeng2024",
      github: "https://github.com/LeonZeng919/next-shadcn-intl-template",
      docs: "/docs",
    },
  },

  // 添加其他语言的配置...
}

export function getSiteConfig(locale: Locale): SiteConfig {
  return siteConfigBase[locale] || siteConfigBase.en;
}