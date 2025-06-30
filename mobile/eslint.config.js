// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");

module.exports = defineConfig([
  {
    ...expoConfig[0],
    settings: {
      'import/resolver': {
        alias: {
          map: [['@', './']],
          extensions: ['.js', '.jsx', '.ts', '.tsx']
        }
      }
    }
  },
  ...expoConfig.slice(1),
  {
    ignores: ["dist/*"],
  },
]);
