import md5 from 'md5';
import axios from 'axios';
import forge from 'node-forge';
import { message } from 'antd';

// 初始化imos视频SDK
// extra扩展参数："{\"vmip\":\"124.128.7.236\",\"port\":\"8088\",\"name\":\"appyonghu\",\"passwd\":\"HYJGapp123\"}"
export function initImosSdk(extra, success) {
  if (!extra || extra === '') {
    return;
  }

  const obj = JSON.parse(extra);
  if (obj.vmip === '' || obj.name === '' || obj.passwd === '') {
    return;
  }

  const key = md5(`${obj.vmip}-${obj.name}-${obj.passwd}`);
  if (window[key]) {
    if (success) {
      success();
    }
    return;
  }

  callLoginV2(obj, null, v1 => {
    const signData = {
      UserName: obj.name,
      AccessCode: v1.AccessCode,
      LoginSignature: calcSignature(obj, v1.AccessCode),
    };
    callLoginV2(obj, signData, v2 => {
      if (v2.ErrCode) {
        if (v2.ErrCode === 50004) {
          message.warn('密码错误');
        } else if (v2.ErrCode === 12351) {
          message.warn('用户不存在');
        } else {
          message.warn('调用视频服务发生错误');
        }
        return;
      }

      window.token = v2.AccessToken;
      window.imosSdk
        .init(obj.vmip, window.token, 16, '/js/imosSdk.html')
        .then(() => {
          window[key] = window.token;
          if (success) {
            success();
          }
        })
        .catch(() => {
          message.warn('监控初始化失败');
        });
    });
  });
}

// 计算签名
function calcSignature(params, accessCode) {
  const md5Pwd = forge.md.md5.create();
  md5Pwd.update(params.passwd);

  const signValue = window.btoa(params.name) + accessCode + md5Pwd.digest().toHex();

  const md5Sign = forge.md.md5.create();
  md5Sign.update(signValue);
  return md5Sign.digest().toHex();
}

function callLoginV2(params, data, callback) {
  let host = params.vmip;
  if (params.port && params.port !== '') {
    host += `:${params.port}`;
  }
  const obj = {
    method: 'POST',
    url: `http://${host}/VIID/login/v2`,
    headers: {
      'Content-Type': 'application/json; charset=utf8',
    },
    responseType: 'json',
  };
  if (data) {
    obj.data = data;
  }
  axios(obj)
    .then(res => {
      callback(res.data);
    })
    .catch(() => {
      message.warn('视频监控服务连接出现异常');
    });
}
