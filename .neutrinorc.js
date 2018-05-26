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
    ['@neutrinojs/airbnb', {
      eslint: {
        rules: {
          'semi': 'off',
          'max-len': ["error", { "code": 240 }],
          'brace-style': 0,
          'no-return-assign': 0,
          "react/forbid-prop-types": 0,
          "no-console": ["error", { "allow": ["warn", "error", "log"] }],
          "react/no-array-index-key": 0,
          "no-lonely-if": 0,
          "no-mixed-operators": 0,
          "no-restricted-properties": 0,
          "no-plusplus": 0,
          "class-methods-use-this": ["error", { "exceptMethods":
            ["prepend", "appendZero", "render", "componentWillReceiveProps", "componentWillMount", "componentDidMount", "componentWillUnmount", "_directionCalc", "_precisionRoundCalc", "_qiblaDirectionCalc"]
          }],
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
