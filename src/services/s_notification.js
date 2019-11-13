import { stringify } from 'querystring';
import request from '../utils/request';

const serviceName = 'message';

export default class NotificationService {
  static async fetchUnReadCount() {
    return request(`svc/v1/${serviceName}/count`);
  }

  static async fetchNotices(param) {
    return request(`svc/v1/${serviceName}/page?${stringify(param)}`);
  }

  static async changeNoticeReadState(messageID) {
    return request(`svc/v1/${serviceName}/mark-read?record_id=${messageID}`, {
      method: 'PUT',
    });
  }

  static async clearNotices(messageType) {
    return request(`svc/v1/${serviceName}/mark-deleted?message_type=${messageType}`, {
      method: 'PUT',
    });
  }
}
