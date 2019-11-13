import React, { PureComponent } from 'react';
import { List, Card } from 'antd';
import StageDialog from '../StageDialog';
import EntriespriseDialog from '@/pages/PrecisionInvestment/EntriespriseDialog';
import getMockData from '@/services/s_mockData';
import styles from './index.less';

export default class EnterpriseList extends PureComponent {
  state = {
    stageVisible: false,
    enterpriseVisible: false,
    activeItem: {},
    data: [
      {
        id: '1',
        name: '济南左邻科技股份有限公司',
        qylxr: '张三',
        mbwy: 'A1-3栋6层',
        zsfzr: '王五',
        stage: '意向客户',
        type_name: '事件',
      },
      {
        id: '2',
        name: '济南左邻科技股份有限公司',
        qylxr: '张三',
        mbwy: 'A1-3栋6层',
        zsfzr: '王五',
        stage: '意向客户',
        type_name: '事件',
      },
      {
        id: '3',
        name: '济南左邻科技股份有限公司',
        qylxr: '张三',
        mbwy: 'A1-3栋6层',
        zsfzr: '王五',
        stage: '意向客户',
        type_name: '事件',
      },
      {
        id: '4',
        name: '济南左邻科技股份有限公司',
        qylxr: '张三',
        mbwy: 'A1-3栋6层',
        zsfzr: '王五',
        stage: '意向客户',
        type_name: '事件',
      },
      {
        id: '5',
        name: '济南左邻科技股份有限公司',
        qylxr: '张三',
        mbwy: 'A1-3栋6层',
        zsfzr: '王五',
        stage: '意向客户',
        type_name: '事件',
      },
    ],
  };

  componentDidMount() {
    getMockData('b_enterprise_zs_list.json').then(data => {
      this.setState({ data });
    });
  }

  componentWillReceiveProps(nextProps) {
    const { search } = nextProps;
    getMockData('b_enterprise_zs_list.json').then(data => {
      let list = data || [];
      if (search && list.length > 2) {
        list = list.slice(0, 2);
      }
      this.setState({ data: list });
    });
  }

  handleDetailClick = item => {
    this.setState({ stageVisible: true, activeItem: item });
  };

  handleDetailCancel = () => {
    this.setState({ stageVisible: false });
  };

  handleItemCancel = () => {
    this.setState({ enterpriseVisible: false });
  };

  handleItemClick = item => {
    this.setState({ enterpriseVisible: true, activeItem: item });
  };

  renderItem = item => {
    return (
      <Card
        className="chart"
        title={
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => {
              this.handleItemClick(item);
            }}
          >
            {item.name}
          </span>
        }
        extra={
          <div className={styles.topExtra}>
            <span>{item.stage}</span>
          </div>
        }
      >
        <ul className={styles.itemContent}>
          <li>
            <span>企业联系人：</span>
            <span>{item.qylxr}</span>
          </li>
          <li>
            <span>目标物业：</span>
            <span>{item.mbwy}</span>
          </li>
          <li>
            <span>招商负责人：</span>
            <span>{item.zsfzr}</span>
          </li>
        </ul>
        <div className={styles.itemDetail}>
          <span
            onClick={() => {
              this.handleDetailClick(item);
            }}
          >
            查看详情
          </span>
        </div>
      </Card>
    );
  };

  render() {
    const { data, stageVisible, enterpriseVisible, activeItem } = this.state;
    return (
      <List
        rowKey="id"
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 2,
          lg: 3,
          xl: 4,
          xxl: 4,
        }}
        className={styles.list}
        dataSource={data}
        renderItem={item => <List.Item>{this.renderItem(item)}</List.Item>}
      >
        <StageDialog
          visible={stageVisible}
          item={activeItem}
          onCancel={() => {
            this.handleDetailCancel();
          }}
        />
        <EntriespriseDialog
          visible={enterpriseVisible}
          name={activeItem.name}
          onCancel={() => {
            this.handleItemCancel();
          }}
        />
      </List>
    );
  }
}
