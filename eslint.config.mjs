/**
 * Refreshed Nuxt ESLint Integrations - https://nuxt.com/blog/eslint-module
 * ESLint Module - https://eslint.nuxt.com/packages/module
 *
 * Run "npx @eslint/config-inspector" to inspect the resolved ESLint config
 */

import { createConfigForNuxt } from '@nuxt/eslint-config/flat';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import vueI18nPlugin from '@intlify/eslint-plugin-vue-i18n';

export default createConfigForNuxt({
  features: {
    stylistic: false,
    tooling: false,
    formatters: false,
  },
})
  .prepend({
    ignores: [
      './app/libs/slider/nouislider.mjs',
      './scripts/*',
      './node_modules/*',
    ],
  })
  .override('nuxt/typescript/rules', {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    },
  })
  .override('nuxt/vue/single-root', {
    rules: {
      'vue/no-multiple-template-root': 'off',
    },
  })
  .override('nuxt/vue/rules', {
    rules: {
      'vue/no-multiple-template-root': 'off',
      'vue/no-v-html': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'off',
      'vue/html-self-closing': [
        'warn',
        {
          html: {
            void: 'any',
            normal: 'always',
            component: 'always',
          },
          svg: 'always',
          math: 'always',
        },
      ],
    },
  })
  .append(
    {
      ignores: ['**/node_modules/**', '**/.husky'],
    },
    {
      files: ['**/*.js', '**/*.mjs', '**/*.ts', '**/*.vue'],
      rules: {
        'no-console': [
          'error',
          {
            allow: ['warn', 'error'],
          },
        ],
      },
      plugins: {
        ...eslintPluginPrettierRecommended.plugins,
      },
    }
  )
  .append({
    files: ['./app/**/*.vue'],
    plugins: {
      'vue-i18n': vueI18nPlugin,
    },
    settings: {
      'vue-i18n': {
        localeDir: './**/_/*.json',
      },
    },
    rules: {
      'vue-i18n/no-missing-keys': 'error',
      'vue-i18n/no-duplicate-keys-in-locale': 'error',
      'vue-i18n/no-missing-keys-in-other-locales': 'error',
      'vue-i18n/no-unknown-locale': 'error',
      'vue-i18n/no-unused-keys': 'error',
      // 'vue-i18n/no-raw-text': [
      //   'error',
      //   {
      //     ignorePattern: '^(?![^a-zA-Z]*[a-zA-Z]{2,})[\\s\\S]*$',
      //     ignoreText: ['0', '00', '-'],
      //   },
      // ],
    },
  });
