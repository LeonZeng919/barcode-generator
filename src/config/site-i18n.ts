import { Locale } from '@/i18n'

type SiteConfig = {
  name: string
  description: string
  // mainNav: { title: string; href: string }[]
  // links: {
  //   twitter: string
  //   github: string
  //   docs: string
  // }
}

const siteConfigBase: Record<Locale, SiteConfig> = {
  en: {
    name: "Free Barcode Generator",
    description: "Free Barcode Generator is an online tool that allows users to easily create various formats of barcodes and QR codes. It supports multiple encoding types and enables users to generate barcodes in real-time and in bulk, completely free of charge."
  },
  zh: {
    name: "免费条码生成器",
    description: "免费条码生成器是一个在线工具，可以让用户轻松创建各种格式的条码和二维码。它支持多种编码类型，并允许用户实时批量生成条码，完全免费使用。"
  },
  ja: {
    name: "無料バーコード生成ツール",
    description: "無料バーコード生成ツールは、ユーザーが簡単に様々な形式のバーコードとQRコードを作成できるオンラインツールです。複数のエンコーディングタイプをサポートし、リアルタイムおよび一括でバーコードを生成することができ、完全に無料で利用できます。"
  },
  de: {
    name: "Kostenloser Barcode-Generator",
    description: "Der kostenlose Barcode-Generator ist ein Online-Tool, mit dem Benutzer einfach verschiedene Formate von Barcodes und QR-Codes erstellen können. Es unterstützt mehrere Codierungstypen und ermöglicht Benutzern, Barcodes in Echtzeit und in großen Mengen zu generieren, völlig kostenlos."
  },
  fr: {
    name: "Générateur de codes-barres gratuit",
    description: "Le générateur de codes-barres gratuit est un outil en ligne qui permet aux utilisateurs de créer facilement différents formats de codes-barres et de codes QR. Il prend en charge plusieurs types d'encodage et permet aux utilisateurs de générer des codes-barres en temps réel et en masse, totalement gratuitement."
  },
  es: {
    name: "Generador de códigos de barras gratis",
    description: "El generador de códigos de barras gratis es una herramienta en línea que permite a los usuarios crear fácilmente varios formatos de códigos de barras y códigos QR. Admite múltiples tipos de codificación y permite a los usuarios generar códigos de barras en tiempo real y en lotes, completamente gratis."
  },
  it: {
    name: "Generatore di codici a barre gratuito",
    description: "Il generatore di codici a barre gratuito è uno strumento online che consente agli utenti di creare facilmente diversi formati di codici a barre e codici QR. Supporta molteplici tipi di codifica e permette agli utenti di generare codici a barre in tempo reale e in batch, completamente gratis."
  },
  nl: {
    name: "Gratis barcodegenerator",
    description: "De gratis barcodegenerator is een online tool waarmee gebruikers eenvoudig verschillende formaten barcodes en QR-codes kunnen maken. Het ondersteunt meerdere coderingstypes en stelt gebruikers in staat om realtime en in bulk barcodes te genereren, volledig gratis."
  },
  sv: {
    name: "Gratis streckkodsgenerator",
    description: "Den gratis streckkodsgeneratorn är ett onlineverktyg som låter användare enkelt skapa olika format av streckkoder och QR-koder. Den stöder flera kodningstyper och låter användare generera streckkoder i realtid och i bulk, helt gratis."
  },
  ko: {
    name: "무료 바코드 생성기",
    description: "무료 바코드 생성기는 사용자가 쉽게 다양한 형식의 바코드와 QR 코드를 만들 수 있는 온라인 도구입니다. 여러 가지 인코딩 유형을 지원하며 사용자가 실시간으로 그리고 일괄적으로 바코드를 생성할 수 있게 해주며, 완전히 무료입니다."
  },
  ru: {
    name: "Бесплатный генератор штрих-кодов",
    description: "Бесплатный генератор штрих-кодов - это онлайн-инструмент, который позволяет пользователям легко создавать различные форматы штрих-кодов и QR-кодов. Он поддерживает несколько типов кодирования и позволяет пользователям генерировать штрих-коды в режиме реального времени и пакетно, совершенно бесплатно."
  }

  // 添加其他语言的配置...
}



export function getSiteConfig(locale: Locale): SiteConfig {
  return siteConfigBase[locale] || siteConfigBase.en;
}