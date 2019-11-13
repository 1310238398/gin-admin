import request, { oldbaseURLV1 } from '../utils/request';

// 获取模拟数据
export default function getMockData(id) {
  return request(`${oldbaseURLV1}/excel/${id}`);
}

// 驾驶舱数据
export function getCockpitData() {
  return request(`${oldbaseURLV1}/total/mainPage`);
}
