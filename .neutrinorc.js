module.exports = {
  use: [
    
    // '@neutrinojs/airbnb',
    // '@neutrinojs/airbnb-base',
    // '@neutrinojs/standardjs',
    // ['@neutrinojs/airbnb-base', {
    //   eslint: {
    //     rules: {
    //       'semi': 'off',
    //       'max-len': ["error", { "code": 180 }]
    //     }
    //   }
    // }],
    ['@neutrinojs/standardjs', {
      eslint: {
        rules: {
          'semi': 'off',
          'max-len': ["error", { "code": 180 }],
          'brace-style': 0,
          'no-return-assign': 0
        }
      }
    }],
    [
      '@neutrinojs/react',
      {
        html: {
          title: 'prayer-timetable-react'
        }
      }
    ],
    '@neutrinojs/jest'
  ]
};
