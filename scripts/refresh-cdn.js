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
    const uploadEnv = process.env.UPLOAD_ENV

    console.log(
      `https://${config.host}${uploadEnv} \nhttp://${config.host}${uploadEnv}`
    )

    cdn.refreshObjectCaches(
      {
        ObjectType: 'Directory',
        ObjectPath: `https://${config.host}/${uploadEnv}/ \n http://${config.host}/${uploadEnv}/`
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
