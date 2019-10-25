const ALY = require('aliyun-sdk')
const config = require('../src/utils/env')

const g = (key, defaultValue) => process.env[key] || defaultValue || ''

const cdn = new ALY.CDN({
  accessKeyId: g('ALI_ACCESS_ID'),
  secretAccessKey: g('ALI_ACCESS_KEY'),
  endpoint: 'https://cdn.aliyuncs.com',
  apiVersion: '2014-11-11'
})

const refreshObjectCaches = (options) =>
  new Promise((resolve, reject) => {
    if (!config.oss.refresh) {
      resolve()
    }

    console.log(`[REFRESH] ${JSON.stringify(options)}`)
    cdn.refreshObjectCaches(
      options,
      (err, res) => {
        if (err) {
          reject(err)
        }
        resolve(res)
      }
    )
  })

module.exports = async () => {
  await Promise.all([
    refreshObjectCaches({
      ObjectType: 'Directory',
      ObjectPath: `https://${config.host}/ \nhttp://${config.host}/`
    }),
    refreshObjectCaches({
      ObjectType: 'File',
      ObjectPath: `https://cdn.sencdn.com/widget2/static/js/bundle.js \nhttp://cdn.sencdn.com/widget2/static/js/bundle.js`
    })
  ])
}
