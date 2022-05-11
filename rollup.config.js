import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';

export default [
    {
        input: './src/Form/Form.js',
        output: { file: 'dist/index.es.js', format: 'es', exports: 'named' },
        plugins: [
            postcss({ plugins: [], minimize: true }),
            external(),
            resolve({ extensions: ['.js'] }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('development'),
                preventAssignment: true,
            }),
            babel({ exclude: 'node_modules/**', presets: ['@babel/preset-react'] }),
            commonjs(),
        ],
    },
];
