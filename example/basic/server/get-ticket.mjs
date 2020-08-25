import wx from './wx.mjs'

export default (req, res) => {
  wx.jssdk.getSignature(req.query.url).then(signatureData => {
    res.json(signatureData);
  });
}