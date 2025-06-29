export default {
  extends: [
    'stylelint-prettier/recommended',
    'stylelint-config-standard-scss',
    'stylelint-config-recommended-vue/scss',
    'stylelint-config-tailwindcss',
  ],
  rules: {
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    'scss/double-slash-comment-whitespace-inside': null,
    'custom-property-pattern': null,
    'selector-class-pattern': null,
    'scss/operator-no-newline-after': null,
    'value-keyword-case': null,
    'scss/comment-no-empty': null,
    'scss/at-mixin-pattern': null,
    'selector-id-pattern': null,
    'block-no-empty': [true, { severity: 'warning' }],
    'no-descending-specificity': null,
    'declaration-block-no-redundant-longhand-properties': [
      true,
      {
        ignoreShorthands: ['grid-template'],
      },
    ],
    // if used tailwind
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: [
          'tailwind',
          'apply',
          'variants',
          'responsive',
          'screen',
          'layer',
        ],
      },
    ],
    'scss/at-rule-no-unknown': null,
  },
};
