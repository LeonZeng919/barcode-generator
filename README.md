# next-shadcn-intl-template

This is a [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/), [ShadcnUI](https://ui.shadcn.com/), [NextIntl](https://next-intl-docs.vercel.app/) starter website template. It comes pre-configured with basic i18n, shadcn ui configuration.

## Motivation

I noticed there are certain default configuration that I tend to reuse across different projects both at my professional work and personal world. These default configs usually takes a couple of hours to bootstrap and/ or copy paste from previous projects, thus it made sense to have a template preconfigured with them. I wanted to have a template which will allow me to clone and immediately start building new features.

## Features

- Next.js with Typescript
- Easy styling customization with Tailwind 3.0
- Sane default for all common UI components with ShadCN UI
- Automatic locale detection and internationalization with `next-intl`
- Auto class sorting with [prettier-plugin-tailwindcss](https://github.com/tailwindlabs/prettier-plugin-tailwindcss)
- Code formatting with husky pre-commit hook

## Quick Start Guide

```bash
npx create-next-app -e https://github.com/LeonZeng919/next-shadcn-intl-template
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/[locale]/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

```bash
.
├── LICENSE
├── README.md
├── components.json --> shadcn components config
├── messages    --> i18n messages
│   ├── en.json
│   ├── fr.json
│   └── zh.json
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── public
│   ├── next.svg
│   └── vercel.svg
├── src
│   ├── app
│   │   ├── [locale]
│   │   │   ├── layout.tsx
│   │   │   └── page.tsx
│   │   ├── error.tsx
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── components
│   │   ├── icons.tsx
│   │   ├── language-toggle.tsx
│   │   ├── main-nav.tsx
│   │   ├── site-header.tsx
│   │   ├── tailwind-indicator.tsx
│   │   ├── theme-provider.tsx
│   │   ├── theme-toggle.tsx
│   │   └── ui  --> components installed from shadcn
│   │       ├── button.tsx
│   │       ├── dropdown-menu.tsx
│   │       └── select.tsx
│   ├── config
│   │   └── site-i18n.ts
│   ├── i18n.ts  --> i18n configs
│   ├── lib
│   │   ├── fonts.ts
│   │   └── utils.ts
│   ├── middleware.ts   --> i18n middleware
│   ├── navigation.ts   --> i18n navigation components exports (ex: Link, useParams, ...etc)
│   ├── styles
│   │   └── globals.css  --> ui components color configs
│   └── types
│       └── nav.ts
├── tailwind.config.ts
├── tsconfig.json
└── yarn.lock
```

## Customize

- `components.json` contains configuration for shadcn ui components, update this to your liking before installing new ui components from shadcn, you may have to reinstall the button component as well.
- `i18n.ts` contains configuration for `next-intl`, update settings available here such as `defaultLocale`, `locales` supported, and `localePrefix` strategy to your liking.
- `middleware.ts` contains middleware function created by `next-intl` for automatic locale detection and route matching.
- `navigation.ts` contains exports for i18n supported navigation components. By default it is configured with `prefix: always` and `sharedPathname` strategy. Visit [next-intl documentation](https://next-intl-docs.vercel.app/) for more information.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## License

[MIT](https://github.com/duy-the-developer/nextjs-tailwind-shadcn-i18n-template/blob/production/LICENSE)
