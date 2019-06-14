module.exports = {
  "root": true,
  "env": {
    "node": true
  },
  "extends": [
    "plugin:vue/essential"
  ],
  "rules": {
    "semi": [
      1,
      "always"
    ],
    "quotes": [
      1,
      "single",
      {
        "avoidEscape": true
      }
    ]
  },
  "parserOptions": {
    "parser": "babel-eslint"
  }
};
