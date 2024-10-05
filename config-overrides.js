let react = require("react-app-rewire-alias");
const { alias } = react;

module.exports = function override(config) {
  alias({
    "@": "src",
    "@shared": "src/components",
    "@utils": "src/components/utils",
    "@assets": "src/assets",
  })(config);

  return config;
};
