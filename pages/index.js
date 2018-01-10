import request from 'superagent'

import WP from '../components/WechatProvider'
import config from '../config'


const { appId } = config

const getConfig = (cb) => {
  if(typeof window == 'undefined'){
    return
  }
  
  const api = `/get-ticket`
  request(api)
  .query({url:location.href})
  .then((data) => {
    return {
      ...data,
      appId,
      debug: true,
    }
  }).then((c) => {
    cb(c)
  }).catch((err) => {
    console.log(err)
  })
}

export default () => (<div>
  <WP config={getConfig} success={(wx) => alert('success')} error={(err) => alert('error')} debug={true}>
    <h1>test WechatProvider</h1>

  </WP>
</div>)