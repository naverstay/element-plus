const fs = require('fs')
const path = require('path')

const pkgPath = path.resolve(__dirname, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))

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

if (publishPkg.dependencies) {
  for (const dep in publishPkg.dependencies) {
    if (publishPkg.dependencies[dep].startsWith('workspace:')) {
      delete publishPkg.dependencies[dep]
    }
  }
}

const distPath = path.resolve(__dirname, 'dist')
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true })
}

const outPath = path.join(distPath, 'package.json')
const json = JSON.stringify(publishPkg, null, 2)
fs.writeFileSync(outPath, json)

console.log(`package.json for publishing was created in ${outPath}\n\n${json}`)
