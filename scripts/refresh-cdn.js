const ALY = require('aliyun-sdk')
const config = require('../src/utils/env')

const g = (key, defaultValue) => process.env[key] || defaultValue || ''

const cdn = new ALY.CDN({
  accessKeyId: g('ALI_ACCESS_ID'),
  secretAccessKey: g('ALI_ACCESS_KEY'),
  endpoint: 'https://cdn.aliyuncs.com',
  apiVersion: '2014-11-11'
})

const refreshObjectCaches = () =>
  new Promise((resolve, reject) => {
    if (!config.oss.refresh) {
      resolve()
    }

    const objectPath = `https://${config.host}/ \nhttp://${config.host}/`
    console.log(objectPath)

    cdn.refreshObjectCaches(
      {
        ObjectType: 'Directory',
        ObjectPath: objectPath
      },
      (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
    )
  })

module.exports = refreshObjectCaches
