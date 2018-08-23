import {cosSign} from '../../../server/index'

var uploadFile = function () {
  // 请求用到的参数
  var Bucket = 'test-1251126190';
  var Region = 'ap-guangzhou';
  var prefix = 'https://' + Bucket + '.cos.' + Region + '.myqcloud.com/';

  // 计算签名
  var getAuthorization = function (options, callback) {
    cosSign({
      method: options.method,
      pathname: options.pathname,
    },(er,res)=>{
      callback(res.data.data);
    })
  };

  // 上传文件
  var uploadFile = function (filePath) {
    var Key = filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
    getAuthorization({method: 'post', pathname: '/'}, function (AuthData) {
      console.log( AuthData )
      var requestTask = wx.uploadFile({
        url: prefix,
        name: 'file',
        filePath: filePath,
        formData: {
          'key': Key,
          'success_action_status': 200,
          'Signature': AuthData.sign,
          // 'x-cos-security-token': AuthData.XCosSecurityToken,
          'Content-Type': '',
        },
        success: function (res) {
          var Location = prefix + Key;
          if (res.statusCode === 200) {
            wx.showModal({title: '上传成功', content: Location, showCancel: false});
          } else {
            wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
          }
        },
        fail: function (res) {
          wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
        }
      });
      requestTask.onProgressUpdate(function (res) {
        console.log('正在进度:', res);
      });
    });
  };


  console.log('aksdjalksjdaklsjd')
  // 选择文件
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ['original'], // 可以指定是原图还是压缩图，这里默认用原图
    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    success: function (res) {
      uploadFile(res.tempFilePaths[0]);
    }
  })
};

export default  uploadFile;
