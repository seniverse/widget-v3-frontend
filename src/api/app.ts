import axios from 'axios'

const getConfig = () => axios.get('http://localhost:3002/base')

export default {
  getConfig
}
