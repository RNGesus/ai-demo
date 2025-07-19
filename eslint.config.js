import antfu from '@antfu/eslint-config'
import pluginRouter from '@tanstack/eslint-plugin-router'

export default antfu(
  {
    formatters: true,
    typescript: true,
    react: true,
  },
  ...pluginRouter.configs['flat/recommended'],
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      'src/routeTree.gen.ts',
      'tsconfig.json',
    ],
  },
)
