import wx from './wx'

export default (req, res) => {
  wx.jssdk.getSignature(req.query.url).then(signatureData => {
    res.json(signatureData);
  });
}