import Wechat from 'wechat-jssdk'
import config from '../config.json'
const wx = new Wechat.Wechat(config)

export default wx