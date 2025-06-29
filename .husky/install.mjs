if (process.env.NODE_ENV === 'production' || process.env.CI === 'true') {
  process.exit(0)
}

import { execSync } from 'node:child_process'

execSync('npx husky install', { stdio: 'inherit' })