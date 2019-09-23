const crypto = require('crypto')
const Uploader = require('./Uploader')
var fs = require('fs')

const getFileMd5 = filePath =>
  new Promise(resolve => {
    const stream = fs.createReadStream(filePath)
    const hash = crypto.createHash('md5')

    stream.on('data', function(d) {
      hash.update(d)
    })

    stream.on('end', function() {
      var md5 = hash.digest('hex')
      resolve(md5.toString().toUpperCase())
    })
  })

const getFileName = path => {
  if (path === '/index.html') {
    return '/index.html'
  }
  if (path === '/404.html') {
    return '/404.html'
  }
  return path.replace('.html', '')
}

const getUploadOption = async (originName, originPath) => {
  let res
  if (originName.match(/.html$/)) {
    const fileName = getFileName(originName)
    res = {
      fileName,
      filePath: originPath,
      option: {
        headers: {
          'Content-Type': 'text/html'
        }
      },
      md5: await getFileMd5(originPath)
    }
  } else {
    res = {
      fileName: originName,
      filePath: originPath,
      md5: await getFileMd5(originPath)
    }
  }
  return res
}

const process = async () => {
  const uploader = new Uploader({ getUploadOption })
  await uploader.upload()
  await uploader.refresh()
}

process()
