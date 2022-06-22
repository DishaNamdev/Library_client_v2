const path = require("path");

const pathAlias = [
  { alias: "@", path: "src/" },
  { alias: "@components", path: "src/components" },
  { alias: "@animations", path: "src/animation" },
  { alias: "@context", path: "src/context" },
  { alias: "@front", path: "src/front" },
  { alias: "@pages", path: "src/pages" },
  { alias: "@hooks", path: "src/hooks" },
  { alias: "@ui", path: "src/ui" },
  { alias: "@layout", path: "src/layout" },
  { alias: "@utils", path: "src/utils" },
  { alias: "@dashboard", path: "src/Dashboard" },
  { alias: "@disha", path: "src/disha" },
];

module.exports = {
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
  webpack: {
    alias: (() => {
      const paths = {};
      pathAlias.forEach(
        (curr) => (paths[curr.alias] = path.resolve(__dirname, curr.path))
      );
      return paths;
    })(),
  },
};
