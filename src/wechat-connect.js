import { Component } from "react"
import PropTypes from 'prop-types'

const connect = (ComponentToWrap) => {
  return class WxComponent extends Component {

    static contextTypes = {
      isWxready: PropTypes.any,
      isWechat: PropTypes.any,
      onWxReady: PropTypes.any,
      wx: PropTypes.any,
    }

    render() {
      const {
        isWxready,
        isWechat,
        onWxReady,
        wx,
      } = this.context

      const p = {
        ...this.props,
        isWxready,
        isWechat,
        onWxReady,
        wx,
      }

      return (
        <ComponentToWrap {...p} />
      )
    }
  }
}
export default connect