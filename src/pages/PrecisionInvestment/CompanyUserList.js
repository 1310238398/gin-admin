import React, { PureComponent } from 'react';
import { Table, Modal, Card, Button } from 'antd';
import { connect } from 'dva';
import getMockData from '@/services/s_mockData';
import style from './PrecisionInvestment.less';
@connect(state => ({
  listCompanies: state.listCompanies,
}))
export default class CompanyUserList extends PureComponent {
  state = {
    selectedRowKeys: [],
    data: [],
  };

  componentDidMount() {
    getMockData('enterpris_user.json').then(data => {
      let list = data || [];

      list = list.map(v => {
        return {
          ...v,
        };
      });
      this.setState({ data: list });
    });
  }

  selectRow = record => {
    const selectedRowKeys = [...this.state.selectedRowKeys];
    if (selectedRowKeys.indexOf(record.key) >= 0) {
      selectedRowKeys.splice(selectedRowKeys.indexOf(record.key), 1);
    } else {
      selectedRowKeys.push(record.key);
    }
  };

  showCheckUserInfo = rec => {
    console.log(rec);
    Modal.confirm({
      title: '操作确认',
      content: `确认要确认此为${rec.name}负责人吗？`,
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.handleCancel.bind(),
    });
  };

  handleCancel = () => {
    const { onCloseInfo } = this.props;
    onCloseInfo();
  };

  render() {
    const rowSelection = {
      onChange: selectedRowKeys => {
        this.setState({
          selectedRowKeys,
        });
      },
      getCheckboxProps: record => ({
        record, // Column configuration not to be checked
        // recommend: record.recommend,
      }),
    };
    const footerJsx = [
      <Button key="close" onClick={this.handleCancel}>
        关闭
      </Button>,
      <Button key="writeoff" type="danger" onClick={this.handleCancel}>
        确定
      </Button>,
    ];
    const { visible } = this.props;
    const columns = [
      { title: '用户名', dataIndex: 'name' },
      { title: '电话', dataIndex: 'tel' },
      {
        title: '操作',
        key: 'action',
        render: rec => (
          <a
            onClick={() => {
              this.showCheckUserInfo(rec);
            }}
          >
            设为负责人
          </a>
        ),
      },
    ];

    const data1 = [
      {
        id: '1',
        name: '田念收',
        tel: '15564565788',
        socailtiy: '赵老师',
      },
      {
        id: '2',
        name: '刘晶',
        tel: '15764565788',
        socailtiy: '赵老师',
      },

      {
        id: '3',
        name: '扬言好',
        tel: '15864565788',
        socailtiy: '赵老师',
      },
      {
        id: '4',
        name: '王静茹',
        tel: '18764515788',
        socailtiy: '赵老师',
      },

      {
        id: '5',
        name: '韩振东',
        tel: '15764561288',
        socailtiy: '赵老师',
      },
      {
        id: '6',
        name: '侯婷婷',
        tel: '15664875878',
        socailtiy: '赵老师',
      },
      {
        id: '7',
        name: '张龙',
        tel: '18745659597',
        socailtiy: '赵老师',
      },
    ];
    console.log(JSON.stringify(data1));

    return (
      <Modal
        title="选择招商负责人"
        width={850}
        visible={visible}
        destroyOnClose
        onCancel={this.handleCancel}
        footer={null}
        className="darkModal"
        style={{ top: 20 }}
      >
        <Card className="park">
          <Table
            size="small"
            columns={columns}
            rowKey={record => record.id}
            dataSource={this.state.data}
            style={{ height: '520px' }}
            pagination={false}
            className={style.selectTable}
            rowSelection={rowSelection}
          />
        </Card>
      </Modal>
    );
  }
}
