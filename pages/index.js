import request from 'superagent'

import WP from '../components/WechatProvider'
import Example from '../components/Example'
import config from '../config'


const { appId } = config

const getConfig = (cb) => {
  if (typeof window == 'undefined') {
    return
  }

  const api = `/get-ticket`
  const query = { url: location.href.split('#')[0] }
  request(api)
    .query(query)
    .then((res) => {
      const data = JSON.parse(res.text)
      return {
        ...data,
        appId,
        debug: true,
        jsApiList: [
          'onMenuShareTimeline',
          'onMenuShareAppMessage',
          'onMenuShareQQ',
          'onMenuShareWeibo',
          'onMenuShareQZone',
          'closeWindow',
        ],
      }
    }).then((c) => {
      cb(c)
    }).catch((err) => {
      console.log(err)
    })
}

const success = (wx) => {
  const shareObj = {
    title: '测试标题',
    desc: '测试描述',
    link: location.href.split('#')[0], // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: 'http://wx.qlogo.cn/mmhead/Q3auHgzwzM4R5KBEytrXC1fK8ibpcSSNmgJYs8Yib3icF3FXVLSA1dd6g/64',
    success: () => {
      alert('share success')
    },
    cancel: () => {
      alert('share cancel')
    }
  }

  wx.onMenuShareTimeline(shareObj)
  wx.onMenuShareAppMessage(shareObj)
  wx.onMenuShareQQ(shareObj)
  wx.onMenuShareWeibo(shareObj)
  wx.onMenuShareQZone(shareObj)
  alert('share configed')
}

export default () => (<div>
  <WP config={getConfig} success={success} error={(err) => alert('error')} debug={true}>
    <div>
      <h1>test WechatProvider</h1>
      <Example />
    </div>
  </WP>
</div>)