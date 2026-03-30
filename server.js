const { existsSync } = require('fs')
const path = require('path')
const { spawn } = require('child_process')

const standaloneServer = path.join(__dirname, '.next', 'standalone', 'server.js')

if (existsSync(standaloneServer)) {
  require(standaloneServer)
} else {
  const nextStart = path.join(
    __dirname,
    'node_modules',
    'next',
    'dist',
    'bin',
    'next'
  )

  const child = spawn(process.execPath, [nextStart, 'start'], {
    stdio: 'inherit',
    env: process.env,
  })

  child.on('exit', (code) => {
    process.exit(code ?? 0)
  })
}
