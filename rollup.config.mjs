import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import analyze from 'rollup-plugin-analyzer';
import terser from '@rollup/plugin-terser';

export default {
    input: './src/index.js',
    output: [
        // { file: 'dist/main.js', format: 'cjs' },
        {
            file: 'dist/index.es.js',
            format: 'es',
            exports: 'named',
        },
    ],
    external: (id) => {
        if (/style-inject/.test(id)) return false;
        if (/node_modules/.test(id)) return true;
        return false;
    },
    plugins: [
        peerDepsExternal(),
        resolve(),
        // commonjs(),
        postcss({ plugins: [], minimize: true }),
        babel({
            exclude: 'node_modules/**',
            presets: ['@babel/preset-react'],
        }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            preventAssignment: true,
        }),
        terser(),
        analyze({ summaryOnly: true, hideDeps: true }),
    ],
};
