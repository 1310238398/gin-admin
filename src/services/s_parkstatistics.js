import { stringify } from 'qs';
import request, { baseURLV1 } from '../utils/request';
import isError from '../utils/utils';

const buRouter = 'park_statistics';
export default class ParkStatisticsService {
  // 新的接口
  static async contentBasia(params) {
    return request(`${baseURLV1}/${buRouter}?${stringify(params)}`, {
      method: 'GET',
    });
  }

  // 统计园区企业行业分布
  static async IndustryData(params) {
    return request(`${baseURLV1}/${buRouter}?${stringify(params)}`, {
      method: 'GET',
    });
  }

  // 统计园区企业规模
  static async ScaleData(params) {
    return request(`${baseURLV1}/${buRouter}?${stringify(params)}`, {
      method: 'GET',
    });
  }

  // 统计园区企业星级
  static async StartData(params) {
    return request(`${baseURLV1}/${buRouter}?${stringify(params)}`, {
      method: 'GET',
    });
  }

  // 旧的
  static async totalUsers(code) {
    return request(`/v1/total/user?code=${code || ''}`, {
      method: 'GET',
    }).then(response => {
      if (isError(response)) {
        return {};
      }
      return response;
    });
  }

  static async totalEnterprise(code) {
    return request(`/v1/total/enterprise?code=${code || ''}`, {
      method: 'GET',
    }).then(response => {
      if (isError(response)) {
        return {};
      }
      return response;
    });
  }

  static async totalArea(code) {
    return request(`/v1/total/area/business?code=${code || ''}`, {
      method: 'GET',
    }).then(response => {
      if (isError(response)) {
        return {};
      }
      return response;
    });
  }

  static async totalBuilding(code) {
    return request(`/v1/parks/building?code=${code || ''}`, {
      method: 'GET',
    }).then(response => {
      if (isError(response)) {
        return [];
      }
      return response;
    });
  }

  static async doorAttract(id) {
    return request(`/v1/total/door/attract/${id}`, {
      method: 'GET',
    }).then(response => {
      if (isError(response)) {
        return {};
      }
      return response;
    });
  }

  static async emptyDoor({ code, floor, area }) {
    const param = {};
    if (floor) {
      param.floor = floor;
    }
    if (area) {
      param.area = area;
    }
    return request(`/v1/total/building/${code}/emptyDoor?${stringify(param)}`, {
      method: 'GET',
    }).then(response => {
      if (isError(response)) {
        return {};
      }
      return response;
    });
  }
}
