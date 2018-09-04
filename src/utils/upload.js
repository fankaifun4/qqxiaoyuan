import {cosSign} from '../server/index'
var uploadFile = function () {
  // 请求用到的参数
  var Bucket = 'test-1251126190';
  var Region = 'ap-guangzhou';
  var prefix = 'https://' + Bucket + '.cos.' + Region + '.myqcloud.com/';

  // 计算签名
  var getAuthorization = function (options, callback) {
    cosSign({
      method: options.method,
      path: options.pathname,
    },(er,res)=>{
      callback(res.data.data);
    })
  };

  // 上传文件
  var uploadFile = function (filePath,callback,process) {
    var Key = 'qqXiaoYuan/'+filePath.substr(filePath.lastIndexOf('/') + 1); // 这里指定上传的文件名
    getAuthorization({ method: 'post', pathname: "/"}, function (AuthData) {
      var requestTask = wx.uploadFile({
        url: prefix,
        name: 'file',
        filePath: filePath,
        formData: {
          'key': Key,
          'success_action_status': 200,
          'Signature': AuthData.sign,
          'x-cos-security-token': AuthData.sessionToken,
          'Content-Type': '',
        },
        success: function (res) {
          var Location = prefix + Key;

          if (res.statusCode === 200) {
            callback(res,Location)
          } else {
            callback(res)
          }
        },
        fail: function (res) {
          wx.showModal({title: '上传失败', content: JSON.stringify(res), showCancel: false});
          callback(res)
        }
      });
      requestTask.onProgressUpdate(function (res) {
        process(res)
      });
    });
  };
  return function(path,cb,process){
    uploadFile(path,cb,process)
  }

};

export default  uploadFile;
