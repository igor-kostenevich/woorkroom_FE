import { resolve } from 'path';
const IS_DEV_MODE = process.env.NODE_ENV === 'development';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Woorkroom CRM - Your Ultimate CRM Solution',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Nunito+Sans:ital,opsz,wght@0,6..12,200..1000;1,6..12,200..1000&display=swap',
        },
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      ],

      meta: [
        { charset: 'utf-8' },
        {
          name: 'viewport',
          content:
            'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
        },
        {
          'http-equiv': 'Cache-control',
          content: 'no-cache, no-store, must-revalidate',
        },
        { 'http-equiv': 'Pragma', content: 'no-cache' },
        { name: 'theme-color', content: '#000' },
      ],

      noscript: [{ innerHTML: 'JavaScript is required' }],
    },
  },

  build: {
    analyze: {
      brotliSize: true,
    },
  },

  sourcemap: {
    server: IS_DEV_MODE,
    client: IS_DEV_MODE,
  },

  future: {
    compatibilityVersion: 4,
  },

  alias: {
    images: '../public/images',
    icons: '../public/icons',
    '~app': resolve(__dirname, './app'),
  },

  runtimeConfig: {
    public: {
      serverUrl: 'https://woorkroom.family-love-haven.com/api',
      tgBotId: '',
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    'nuxt-security',
    '@pinia/nuxt',
    '@nuxtjs/fontaine',
    '@nuxtjs/i18n',
    ...(IS_DEV_MODE ? ['@nuxt/eslint', '@nuxtjs/stylelint-module'] : []),
  ],
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', name: 'English', file: 'en.json' },
      { code: 'uk', name: 'Українська', file: 'ua.json' },
    ],
  },
  security: {
    headers: {
      contentSecurityPolicy: {
        'img-src': ["'self'", 'blob:', "'self'", 'data:'],
      },
      crossOriginEmbedderPolicy: 'unsafe-none',

      crossOriginOpenerPolicy: 'same-origin-allow-popups',
    },
  },
  components: false,

  features: {
    inlineStyles: false,
  },

  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  /**
   * Global Styles Imports
   * https://nuxt.com/docs/getting-started/assets#global-styles-imports
   */
  css: ['~app/assets/styles/tailwind.css', '~app/assets/styles/main.css'],

  compatibilityDate: '2024-11-01',
  nitro: {
    /**
     * Sets Cache-Control headers for assets
     * https://nitro.build/config#publicassets
     */
    publicAssets: [
      {
        baseURL: 'images',
        dir: resolve('./public/images'),
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      },
      {
        baseURL: 'icons',
        dir: resolve('./public/icons'),
        maxAge: 1000 * 60 * 60 * 24 * 365, // 1 year
      },
    ],
    compressPublicAssets: {
      brotli: true,
      gzip: false,
    },

    /**
     * Disable source map generation
     * https://nitro.build/config#sourcemap
     */
    sourceMap: false,
  },

  vite: {
    css: {
      preprocessorOptions: {},
    },
    build: {
      reportCompressedSize: true,
      assetsInlineLimit: 0,
    },

    esbuild: {
      legalComments: 'none',
    },
    server: {
      allowedHosts: ['.trycloudflare.com'],
    },
  },
  experimental: {
    defaults: {
      nuxtLink: {
        externalRelAttribute: 'noopener noreferrer nofollow',
      },
    },
  },
  telemetry: false,
  hooks: {
    'build:manifest'(manifest) {
      for (const item of Object.values(manifest)) {
        item.dynamicImports = [];
        item.prefetch = false;
        item.preload = false;
      }
    },
  },
});
