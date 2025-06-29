import fs from 'fs'
import sharp from 'sharp'

function getExtension(filename) {
  const ext = filename.split('.')
  return ext[ext.length - 1].replace('jpg', 'jpeg')
}

const minifyFile = (filename) =>
  new Promise((resolve, reject) => {
    fs.readFile(filename, function (err, sourceData) {
      if (err) throw err

      let format = getExtension(filename)

      sharp(sourceData)
        [format]({})
        .toFile(filename, (err, info) => (err ? reject(err) : resolve()))
    })
  })

/**
 * Fetch images maps from args and compress all.
 * Compressing is asynchronous process.
 */
Promise.resolve(process.argv)
  .then((x) => x.slice(2))
  .then((x) => x.map(minifyFile))
  .then((x) => Promise.all(x))
  .catch(() => {
    process.exit(1)
  })
