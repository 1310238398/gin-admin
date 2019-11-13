// import { message } from 'antd';
import request, { baseURLV1 } from '../utils/request';

// 服务名
const serviceName = 'parks';

/**
 * 建筑管理-服务类
 */
export default class ParkService {
  static async get(params) {
    return request(`${baseURLV1}/${serviceName}/${params.record_id}`);
  }

  /**
   * 查询建筑列表
   * @param {查询参数} param
   */
  static async queryBuildings(param) {
    let paramStr = '';
    for (const key in param) {
      if (key in param) {
        paramStr += `${key}=${param[key]}&`;
      }
    }

    return request(`${baseURLV1}/${serviceName}/select/?${paramStr}`);
  }

  /**
   * 插入建筑
   * @param {*} building
   */
  static async insertBuilding(building) {
    return request(`${baseURLV1}/${serviceName}`, {
      method: 'POST',
      body: building,
    });
  }

  /**
   * 编辑建筑
   * @param {*} building
   */
  static async updateBuilding({ building, recordId }) {
    return request(`${baseURLV1}/${serviceName}/${recordId}`, {
      method: 'PUT',
      body: building,
    });
  }

  /**
   * 编辑建筑
   * @param {*} building
   */
  static async deleteBuilding(recordId) {
    return request(`${baseURLV1}/${serviceName}/${recordId}`, {
      method: 'DELETE',
    });
  }

  static async querySubparks(param) {
    let paramStr = '';
    for (const key in param) {
      if (key in param) {
        paramStr += `${key}=${param[key]}&`;
      }
    }
    return request(`${baseURLV1}/${serviceName}/splithistory?${paramStr}`);
  }

  static async saveOperPerson(param) {
    return request(`${baseURLV1}/${serviceName}/splithistory/${param.split_id}`, {
      method: 'PUT',
      body: { split_person: param.split_person, split_time: param.split_time },
    });
  }

  static async detailDoorInfo(recordId) {
    return request(`${baseURLV1}/${serviceName}/${recordId}`);
  }
}
