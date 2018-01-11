# react-wechat-provider

## usage

Provider

```
import { Provider as WP } from 'react-wechat-provider'

export default () => (<div>
  <WP config={getConfig} success={success} error={(err) => alert('error')} debug={true}>
    <div>
      <h1>test WechatProvider</h1>
      <Example />
    </div>
  </WP>
</div>)
```

connect

```
import { Component } from 'react'
import { connect } from 'react-wechat-provider'

class Example extends Component {
  render() {
    const { isWxready, isWechat, wx } = this.props

    const data = JSON.stringify({
      isWxready,
      isWechat,
    })

    return (<div>
      <p>{data}</p>
      {isWxready && (<p>
        <button onClick={() => {
          wx.closeWindow()
        }}>close window through SDK</button>
      </p>)}
    </div>)
  }
}

export default connect(Example)
```