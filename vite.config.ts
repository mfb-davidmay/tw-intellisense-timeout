import terser from '@rollup/plugin-terser';
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import { fileURLToPath } from 'node:url';
import { extname, relative, resolve } from 'path';
import { UserConfig, defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  let config: UserConfig = {
    plugins: [
      react(),
      libInjectCss(),
      dts({
        include: ['src'],
        exclude: ['src/**/*.{fixture,stories,test,spec}.{ts,tsx}'],
        compilerOptions: { declarationMap: true },
      }),
    ],
    build: {
      copyPublicDir: false,
      emptyOutDir: false,
      lib: {
        name: 'onionui',
        formats: ['umd'],
        entry: resolve(__dirname, 'src/main.ts'),
      },
      rollupOptions: {
        plugins: [
          terser({
            format: {
              comments: 'some',
            },
          }),
        ],
        external: [
          ...Object.keys(packageJson.peerDependencies),
          'react/jsx-runtime',
        ],
        output: {
          assetFileNames: 'assets/[name].umd[extname]',
          entryFileNames: '[name].umd.js',
          inlineDynamicImports: false,
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'react/jsx-runtime',
          },
        },
      },
    },
  };

  if (mode === 'esm') {
    config = {
      ...config,
      build: {
        ...config.build,
        lib: {
          ...(config.build.lib && config.build.lib),
          formats: ['es'],
        },
        rollupOptions: {
          ...config.build.rollupOptions,
          input: Object.fromEntries(
            glob
              .sync('src/**/*.{ts,tsx}', {
                ignore: 'src/**/*.{fixture,stories,test,spec}.{ts,tsx}',
              })
              .map((file) => [
                // The name of the entry point
                // lib/nested/foo.ts becomes nested/foo
                relative(
                  'src',
                  file.slice(0, file.length - extname(file).length)
                ),
                // The absolute path to the entry file
                // lib/nested/foo.ts becomes /project/lib/nested/foo.ts
                fileURLToPath(new URL(file, import.meta.url)),
              ])
          ),
          output: {
            ...config.build.rollupOptions.output,
            assetFileNames: 'assets/[name].esm[extname]',
            entryFileNames: '[name].esm.js',
          },
        },
      },
    };
  }

  return config;
});
