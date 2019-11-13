import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Breadcrumb, Layout, Table, Divider, Row, Col, Tag, message } from 'antd';
import { parseBuildingStatusText } from '../../../utils/utils';
import FloorTopContent from './FloorTopContent';
import FloorLeftConten from './FloorLeftConten';
import FloorRightTopContent from './FloorRightTopContent';
import FloorContenWindow from './FloorContenWindow';
import FloorContentInfoEdit from './FloorContentInfoEdit';
import styles from './FloorFrame.less';

const { Content, Sider } = Layout;
@connect(state => ({
  building: state.building,
  loading: state.loading.models.building,
}))
class FloorFrame extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dataDetail: false,
      dataInfo: false,
      infoId: null,
      InfoDetailId: null,
      InfoType: null,
    };
  }

  async componentDidMount() {
    // 查看详情
    this.props.dispatch({
      type: 'building/queryTypeDetail',
      payload: this.props.match.params.id
        ? this.props.match.params.id
        : 'f0108094-c017-436a-a48d-b1d8f9e8e434',
      buildingType: 'floor',
    });
    this.props.dispatch({
      type: 'building/queryTypeList',
      payload: {
        q: 'list',
        parent_id: this.props.match.params.id
          ? this.props.match.params.id
          : 'f0108094-c017-436a-a48d-b1d8f9e8e434',
      },
      buildingType: 'floor',
    });
  }

  onItemViewClick = record => {
    this.setState({
      dataDetail: true,
      InfoDetailId: record,
    });
  };

  // 规划用途: 1:出售 2:自持 3:混合
  planPurpose = status => {
    switch (status) {
      case 1:
        return '出售';
      case 2:
        return '自持';
      case 3:
        return '混合';
      default:
        return '';
    }
  };

  onDataDetailCallback = () => {
    this.setState({
      dataDetail: false,
      InfoDetailId: null,
    });
  };

  onItemEditClick = (type, value) => {
    this.setState({
      dataInfo: true,
      infoId: value,
      InfoType: type,
    });
  };

  onDataInfoCallback = () => {
    this.setState({
      dataInfo: false,
      infoId: null,
      InfoType: null,
    });
  };

  onSaveInfoCallback = data => {
    this.props.dispatch({
      type: 'building/submit',
      payload: data,
    });
    this.onDataInfoCallback();
  };

  statusPurpose = state => {
    switch (state) {
      case 10:
        return '自用';
      case 20:
        return '整售';
      case 21:
        return '分售';
      case 22:
        return '待售';
      case 30:
        return '整租';
      case 31:
        return '分租';
      case 32:
        return '待租';
      case 40:
        return '已租售';
      case 41:
        return '待租售';
      default:
        return '';
    }
  };

  renderDataDetail = () => {
    if (this.state.dataDetail) {
      return (
        <FloorContenWindow
          id={this.state.InfoDetailId}
          callback={this.onDataDetailCallback}
          visible
        />
      );
    }
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return (
        <FloorContentInfoEdit
          infoId={this.state.infoId}
          callback={this.onDataInfoCallback}
          visible
          infoType={this.state.InfoType}
          onSubmit={this.onSaveInfoCallback}
        />
      );
    }
  };

  layerDeatailList = data => {
    this.props.dispatch({
      type: 'building/queryTypeDetail',
      payload: data.record_id,
      buildingType: 'layer',
    });
    this.props.dispatch({
      type: 'building/queryTypeList',
      payload: {
        q: 'list',
        parent_id: data.record_id,
      },
      buildingType: 'layer',
    });
  };

  buildArchitectural = () => {
    message.warn('暂无信息');
  };

  render() {
    const {
      loading,
      building: { typeList, typeDetail, layerDetail, layerList },
    } = this.props;
    const columns = [
      {
        title: '操作',
        dataIndex: 'name',
        render: (text, record) => (
          <span>
            <a onClick={() => this.onItemViewClick(record.record_id)}>查看</a>
            <Divider type="vertical" />
            <a onClick={() => this.onItemEditClick('plate', record.record_id)}>编辑</a>
          </span>
        ),
      },
      {
        title: '门牌号',
        dataIndex: 'name',
      },
      {
        title: '产权方',
        dataIndex: 'building_sale',
        render: value => {
          return <span>{value ? value.owner_name : null}</span>;
        },
      },
      {
        title: '建筑面积',
        dataIndex: 'floor_area',
      },
      {
        title: '状态',
        dataIndex: '',
        render: record => {
          return <Tag>{parseBuildingStatusText(record)}</Tag>;
        },
      },
    ];

    return (
      <div>
        <Breadcrumb>
          <Breadcrumb.Item>建筑管理</Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="/building/building">3D建筑场景</a>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <a href="">楼栋详情</a>
          </Breadcrumb.Item>
        </Breadcrumb>
        <FloorTopContent ontypeDetail={typeDetail} />

        <Layout style={{ background: '#fff' }}>
          <Sider width={300} style={{ background: '#fff' }}>
            <FloorLeftConten onTypeList={typeList} onlayerDetail={this.layerDeatailList} />
          </Sider>
          {layerDetail && layerList && layerList.length > 0 ? (
            <Content style={{ minHeight: 280 }}>
              <FloorRightTopContent onLayerDetailone={layerDetail} />
              <div className={styles.btnThrd}>
                <Button type="primary" onClick={this.buildArchitectural}>
                  建筑剖面图
                </Button>
              </div>
              <div className="lightTable" style={{ padding: '0 21px' }}>
                <Table
                  loading={loading}
                  rowKey={record => record.record_id}
                  dataSource={layerList}
                  columns={columns}
                  pagination={false}
                />
              </div>
            </Content>
          ) : (
            <Content>
              <Row gutter={24}>
                <Col
                  span={24}
                  style={{
                    textAlign: 'center',
                    height: '520px',
                    lineHeight: '520px',
                  }}
                >
                  点击楼层,查看详情
                </Col>
              </Row>
            </Content>
          )}
        </Layout>
        {this.renderDataDetail()}
        {this.renderDataInfo()}
      </div>
    );
  }
}
export default FloorFrame;
