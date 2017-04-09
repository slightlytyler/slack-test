module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "airbnb",
  ],
  "env": {
    "browser": true,
  },
  "rules": {
    "arrow-parens": "off",
    "import/extensions": "off",
    "import/imports-first": "off",
    "import/no-extraneous-dependencies": "off",
    "import/no-named-as-default": "off",
    "import/no-unresolved": "off",
    "import/prefer-default-export": "off",
    "jsx-a11y/no-static-element-interactions": "off",
    "no-prototype-builtins": "off",
    "no-underscore-dangle": "off",
    "no-unused-vars": ["error", { "varsIgnorePattern": "UI" }],
    "react/forbid-prop-types": "off",
    "react/jsx-filename-extension": "off",
    "react/jsx-sort-props": 2,
    "react/jsx-wrap-multilines": 2,
    "react/jsx-pascal-case": 2,
    "react/no-unused-prop-types": [2, { skipShapeProps: true }],
    "react/prefer-stateless-function": "off",
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "react/sort-prop-types": 2
  }
}
