import axios from 'axios';
import { notification } from 'antd';

export const baseURL = '/oper/web';

// 定义基础路由
// export const cmsURLV1 = '/cms_svc/v1';
export const mallURLV1 = '/mall/svc/v1';
export const jobURLV1 = '/job/svc/v1';
export const walletURLV1 = '/wallet/svc/v1';
export const mallDic = 'oper/svc/v1';

export const baseURLV1 = '/oper/web/v1';
export const newBaseUrl = '/ops/web/v1';
export const cmsURLV1 = '/cms/ops/v1';
export const cmsURLoper = '/cms/oper/v1';
export const baseUrlMall = '/mall/web/v1';
export const oldbaseURLV1 = '/oldoper/web/v1';
export default async function request(url, options) {
  let showNotify = true;
  const opts = {
    url,
    validateStatus() {
      return true;
    },
    ...options,
  };
  if (opts.notNotify) {
    showNotify = false;
  }

  const defaultHeader = {
    ParkID: 'e5c85e03-22f8-4135-9992-89f8fa44bc2b',
  };
  if (opts.method === 'POST' || opts.method === 'PUT') {
    defaultHeader['Content-Type'] = 'application/json; charset=utf-8';
    opts.data = opts.body;
  }
  opts.headers = { ...defaultHeader, ...opts.headers };

  return axios.request(opts).then(response => {
    const { status, data } = response;
    if (status >= 200 && status < 300) {
      return data;
    }

    if (status === 401) {
      /* eslint-disable no-underscore-dangle */
      window.g_app._store.dispatch({ type: 'login/logout' });
      return {};
    }

    const error = {
      code: 0,
      message: '服务器发生错误',
    };
    if (status === 504) {
      error.message = '未连接到服务器';
    } else if (data) {
      if (data.error) {
        const {
          error: { message, code },
        } = data;
        error.message = message;
        error.code = code;
      } else {
        const { message, code } = data;
        error.message = message;
        error.code = code;
      }
    } else if (status >= 400 && status < 500) {
      error.message = '请求发生错误';
    }

    if (showNotify) {
      notification.error({
        message: error.message,
      });
    }

    return { error, status };
  });
}
