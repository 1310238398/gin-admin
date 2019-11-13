const data = {
  zsSelectData: [
    { id: '0', text: '全部' },
    { id: '1', text: '已入驻' },
    { id: '2', text: '未入驻' },
    { id: '3', text: '入驻装修中' },
    { id: '4', text: '未入驻' },
  ],
  dataSet: [
    {
      name: '山东国学国际旅游发展集团有限公司',
      stage: '意向客户',
      status: '已入驻',
      signTime: '2018-01-23',
      endTime: '2018-03-23',
      qylxr: '李海勇',
      zsfzr: '韩乐',
      phone: '18363018952',
      unDoCount: 4,
      doCount: 1,
      unAggree: 6,
      doAggree: 3,
      question: {
        des: '各管线接合位需做好防渗漏措施',
        detail:
          '各管线接合位需做好防渗漏措施，管线与墙体或层板接合部位需使用防水材料，加强封固，该企业未做好防渗漏措施',
        attach: [],
      },
      process: [
        {
          id: '1',
          name: '问题上报',
          zsfzr: '张三',
          addr: '招商地点',
          time: '2019/02/23',
          desc: '当前这个客户非常中意我们的',
          phone: '18363018952',
          attach: '客户资料详情',
        },
        {
          id: '2',
          name: '问题已解决',
          zsfzr: '张三',
          addr: '招商地点',
          time: '2019/02/23',
          phone: '1444',
          desc: '当前这个客户非常中意我们的',
          attach: '客户资料详情',
        },
      ],
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
    {
      name: '山东安乐能源科技有限公司',
      stage: '意向客户',
      status: '已入驻',
      signTime: '2018-01-23',
      endTime: '2018-06-23',
      qylxr: '张淑平',
      zsfzr: '李伟',
      unDoCount: 4,
      phone: '18363018952',
      doCount: 1,
      unAggree: 6,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
    {
      name: '山东海洋投资有限公司',
      stage: '意向客户',
      status: '已入驻',
      signTime: '2018-04-13',
      endTime: '2018-07-23',
      qylxr: '王海燕',
      zsfzr: '徐思仁',
      unDoCount: 7,
      phone: '18363018952',
      doCount: 3,
      unAggree: 4,
      doAggree: 1,
      type_name: '事件',
      mbwy: 'A5-2栋1层',
    },
    {
      name: '济南科技创新促进中心',
      stage: '意向客户',
      status: '未入驻',
      signTime: '2019-01-21',
      endTime: '2019-03-23',
      qylxr: '宋仁卫',
      zsfzr: '张果冻',
      phone: '18363018952',
      unDoCount: 6,
      doCount: 1,
      unAggree: 2,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A6-1栋2层',
    },
    {
      name: '山东腾盈信息技术有限公司',
      stage: '意向客户',
      status: '未入驻',
      signTime: '2018-01-23',
      endTime: '2018-03-23',
      qylxr: '田思国',
      zsfzr: '杨乐乐',
      unDoCount: 3,
      phone: '18363018952',
      doCount: 1,
      unAggree: 1,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
    {
      name: '金浩美术工作室',
      stage: '意向客户',
      status: '已入驻',
      signTime: '2018-01-23',
      endTime: '2018-06-23',
      qylxr: '武和美',
      zsfzr: '徐文才',
      phone: '18363018952',
      unDoCount: 6,
      doCount: 1,
      unAggree: 2,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
    {
      name: '山东省装饰集团总公司',
      stage: '意向客户',
      status: '未入驻',
      signTime: '2018-01-23',
      endTime: '2018-08-23',
      qylxr: '郑春光',
      zsfzr: '王平',
      unDoCount: 4,
      phone: '18363018952',
      doCount: 3,
      unAggree: 9,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
    {
      name: '湖南蚁巡网络科技有限公司济南分公司',
      stage: '意向客户',
      status: '已入驻',
      signTime: '2018-01-23',
      qylxr: '李海勇',
      zsfzr: '韩东',
      unDoCount: 4,
      phone: '18363018952',
      doCount: 1,
      unAggree: 6,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
    {
      name: '善誉招标有限公司',
      stage: '意向客户',
      status: '已入驻',
      signTime: '2018-01-23',
      qylxr: '李海勇',
      zsfzr: '韩东',
      unDoCount: 4,
      phone: '18363018952',
      doCount: 1,
      unAggree: 6,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
    {
      name: '山东天际云泰数字技术有限公司',
      stage: '意向客户',
      status: '已入驻',
      signTime: '2018-01-23',
      endTime: '2018-06-13',
      qylxr: '王静茹',
      zsfzr: '韩东',
      phone: '18363018952',
      unDoCount: 2,
      doCount: 3,
      unAggree: 6,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
    {
      name: '北京市中银（济南）律师事务所',
      stage: '意向客户',
      status: '未入驻',
      signTime: '2018-01-23',
      endTime: '2018-09-23',
      qylxr: '李勇',
      phone: '18363018952',
      zsfzr: '韩思',
      unDoCount: 4,
      doCount: 1,
      unAggree: 2,
      doAggree: 3,
      type_name: '事件',
      mbwy: 'A1-3栋6层',
    },
  ],
};
export default data;
