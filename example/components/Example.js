import { Component } from 'react'
import { connect } from '../../dist'

class Example extends Component {
  constructor(props) {
    super(props)
    this.state = {
      info: 'constructed',
    }
    this.toClean = []
  }

  componentDidMount() {
    const { onWxReady, unbindWxReady } = this.props
    this.setState({
      info: 'onWxReady',
    })
    const cb = () => {
      this.setState({
        info: 'sdk ready',
      })
    }
    onWxReady(cb)
    this.toClean.push(() => {
      unbindWxReady(cb)
    })
  }

  componentWillUnmount() {
    this.toClean.forEach(x => x())
  }

  render() {
    const { isWxready, isWechat, wx } = this.props
    const { info } = this.state

    const data = JSON.stringify({
      isWxready,
      isWechat,
    })

    return (<div>
      <p>info:{info}</p>
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

