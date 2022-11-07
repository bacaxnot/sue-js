import path from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: [
            {
                find: '@',
                replacement: path.resolve(__dirname, 'src'),
            },
            {
                find: '@interfaces',
                replacement: path.resolve(__dirname, 'src/entities/interfaces'),
            },
            {
                find: '@classes',
                replacement: path.resolve(__dirname, 'src/entities/classes'),
            },
            {
                find: '@types',
                replacement: path.resolve(__dirname, 'src/entities/types'),
            },
            {
                find: '@utils',
                replacement: path.resolve(__dirname, 'src/entities/utils'),
            },
            {
                find: '@config',
                replacement: path.resolve(__dirname, 'src/config'),
            },
            {
                find: '@views',
                replacement: path.resolve(__dirname, 'src/views'),
            },
            {
                find: '@components',
                replacement: path.resolve(__dirname, 'src/components'),
            },
        ],
    },
})
