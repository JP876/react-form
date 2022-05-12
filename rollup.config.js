import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: './src/index.js',
    output: { file: pkg.main, format: 'cjs', exports: 'named' },
    plugins: [
        postcss({ plugins: [], minimize: true }),
        babel({ exclude: '/node_modules/', presets: ['@babel/preset-react'] }),
        external(),
        resolve({ extensions: ['.js'] }),
        replace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            preventAssignment: true,
        }),
        commonjs(),
    ],
    external: ['react', 'react-dom'],
};
