import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import createStyledComponentsTransformer from "typescript-plugin-styled-components";

const packageJson = require("./package.json");

const styledComponentsTransformer = createStyledComponentsTransformer({
  displayName: true,
});

export default {
  input: "src/index.ts",
  output: [
    {
      file: packageJson.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      useTsconfigDeclarationDir: true,
      transformers: [
        () => ({
          before: [styledComponentsTransformer],
        }),
      ],
    }),
    postcss({
      extensions: [".css"],
    }),
  ],
};
