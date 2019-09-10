import axios from 'axios'

const get = async (url: string) => {
  const res = await axios.get(url)
  if (res && res.data) {
    return res.data
  }
  return null
}

const getConfig = () =>
  get('http://localhost:3001/api/weather/f42ea168-0c67-4728-95ae-434cfe46d649')

export default {
  getConfig
}
