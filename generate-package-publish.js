const fs = require('fs')
const path = require('path')

const inputPath = path.resolve(__dirname, 'package.json')
const outputPath = path.resolve(__dirname, 'dist', 'package.json')

const pkg = JSON.parse(fs.readFileSync(inputPath, 'utf-8'))

const allowedFields = [
  'name',
  'version',
  'description',
  'license',
  'main',
  'module',
  'types',
  'typings',
  'files',
  'dependencies',
  'peerDependencies',
  'sideEffects',
  'engines',
  'exports',
]

const publishPkg = {}
for (const key of allowedFields) {
  if (pkg[key] !== undefined) {
    publishPkg[key] = pkg[key]
  }
}

if (!fs.existsSync(path.dirname(outputPath))) {
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
}

fs.writeFileSync(outputPath, JSON.stringify(publishPkg, null, 2))

console.log(`package.json for publishing was created in ${outputPath}`)
