import { Component, Children } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import { isFunction } from 'lodash'
import WechatJSSDK from './client'

class WechatProvider extends Component {

  static propTypes = {
    config: PropTypes.any.isRequired,
    debug: PropTypes.bool,
    success: PropTypes.func,
    error: PropTypes.func,
  }

  static childContextTypes = {
    isWxready: PropTypes.bool,
    isWechat: PropTypes.bool,
    onWxReady: PropTypes.func,
    wx: PropTypes.any,
  }

  constructor(props) {
    super(props)

    const isWechat = true //typeof navigator != 'undefined' && /micromessenger/.test(navigator.userAgent.toLowerCase())
    this.state = {
      ready: false,
      isWechat,
    }

    this.readyListenners = []
    this.wx = null
  }

  getChildContext() {
    const { ready, isWechat } = this.state
    const onWxReady = (callback) => this.addOnReady(callback)
    return {
      isWxready: ready,
      isWechat,
      onWxReady,
      wx: this.wx,
    }
  }

  render() {
    return Children.only(this.props.children)
  }

  componentWillMount() {
    const { isWechat } = this.state
    const { config } = this.props
    if (!isWechat || !config) {
      return
    }

    if (isFunction(config)) {
      config((c) => this.initWx(c))
    } else {
      this.initWx(config)
    }
  }

  addOnReady(callback) {
    const { ready } = this.state

    this.readyListenners.push(callback)

    if (ready) {
      callback(this.wx)
    }
  }

  initWx(config) {
    const { success = () => { }, error = () => { }, debug = false } = this.props
    const s = () => {
      this.setState({
        ready: true,
      })
      this.readyListenners.forEach((x) => x(this.wx))
      success(this.wx)
    }

    this.wx = new WechatJSSDK({
      ...config,
      success: s,
      error,
      debug,
    })
  }

}

export default WechatProvider