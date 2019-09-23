const path = require('path')
const fs = require('fs')

const oss = require('ali-oss')
const ProgressBar = require('progress')
const config = require('../src/utils/env')
const refreshObjectCaches = require('./refresh-cdn')
const g = (key, defaultValue) => process.env[key] || defaultValue || ''
const PUBLIC_PATH = path.resolve(__dirname, '../build')

class Uploader {
  constructor({ getUploadOption }) {
    this.store = oss({
      accessKeyId: g('ALI_ACCESS_ID'),
      accessKeySecret: g('ALI_ACCESS_KEY'),
      bucket: g('ALI_OSS_BUCKET', config.oss.bucket),
      region: g('ALI_OSS_REGION', config.oss.region),
      internal: false
    })
    this.promises = []
    this.bar = null

    this.getUploadOption = getUploadOption
  }

  async uploadFolder({ folder, prefix = '' }) {
    const names = fs.readdirSync(folder)
    for (const name of names) {
      const filepath = path.resolve(folder, name)
      const prefixPath = `${prefix}/${name}`

      if (fs.statSync(filepath).isFile()) {
        const uploadOption = await this.getUploadOption(prefixPath, filepath)
        const { fileName, filePath, option, md5 } = uploadOption

        let shouldUpload = false

        try {
          const { res } = await this.store.head(prefixPath)
          const { headers } = res
          const { etag } = headers
          const ossMd5 = etag.replace(/"/g, '')
          if (ossMd5 !== md5) {
            shouldUpload = true
          }
        } catch (error) {
          shouldUpload = true
        }

        if (shouldUpload) {
          const promise = () => this.store.put(fileName, filePath, option)
          this.promises.push(promise)
        }
      } else {
        await this.uploadFolder({ folder: filepath, prefix: prefixPath })
      }
    }
  }

  async refresh() {
    console.log('\nStart Refresh CDN...')
    await refreshObjectCaches()
    console.log('\nRefresh complete !')
  }

  async upload() {
    const uploadEnv = process.env.UPLOAD_ENV
    console.log(`Upload new static resource to ${JSON.stringify(config.oss)}`)
    console.log(`Folder path: ${uploadEnv}`)
    await this.uploadFolder({
      folder: PUBLIC_PATH,
      prefix: uploadEnv
    })
    this.bar = this.bar = new ProgressBar(':bar :current /:total :percent', {
      total: this.promises.length
    })
    await Promise.all(
      this.promises.map(promise => {
        return promise().then(() => {
          this.bar.tick()
        })
      })
    )
    console.log('\nUpload complete !')
  }

  clean() {
    console.log('Clean OSS files...')
    console.log('Clean complete')
  }
}

module.exports = Uploader
