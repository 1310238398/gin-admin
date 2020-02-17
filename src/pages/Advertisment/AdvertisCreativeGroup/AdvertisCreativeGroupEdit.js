/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import {
  Card,
  Form,
  Row,
  Col,
  Input,
  Button,
  Modal,
  Icon,
  DatePicker,
  Tabs,
  Select,
  InputNumber,
} from 'antd';
import { connect } from 'dva';
import CreateGroup from './CreateGrup';
import AdvertiserSelect from '@/components/AdvertiserSelect/AdvertiserSelect';

@Form.create()
@connect(state => ({
  advertisCreativeGroup: state.advertisCreativeGroup,
}))
export default class AdvertisCreativeGroupEdit extends PureComponent {
  state = {};

  id = 0;

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'advertisCreativeGroup/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'advertisCreativeGroup/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  // 保存，暂存
  onBtnDataClick() {
    const { callback } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const formData = { ...values };
        this.creatives.validateFields((errbill, valuesbill) => {
          if (!errbill) {
            const { keys, data } = valuesbill;
            formData.creatives = keys.map(k => {
              const v = { ...data[k] };
              if (v.file_type === 1) {
                v.file_url = v.img_file_url.length > 0 ? v.img_file_url[0] : '';
                delete v.img_file_url;
              } else if (v.file_type === 2) {
                v.file_url = v.video_file_url;
                delete v.video_file_url;
              }
              return v;
            });
            console.log(formData);
          }
        });

        this.props.dispatch({
          type: 'advertisCreativeGroup/submit',
          payload: formData,
        });
        callback();
      }
    });
  }

  /**
   * 界面渲染
   */
  render() {
    const {
      advertisCreativeGroup: { formData, formTitle, formVisible },
      form: { getFieldDecorator, getFieldValue },
    } = this.props;

    const col = {
      sm: 24,
      md: 8,
    };

    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick()}>
        保存
      </Button>,
    ];
    const resultJsx = (
      <Modal
        visible={formVisible}
        title={formTitle}
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.callback}
        footer={footerJsx}
        width={1000}
        style={{ top: 20 }}
        bodyStyle={{
          paddingRight: 30,
          paddingLeft: 30,
          height: 550,
          overflowY: 'scroll',
          paddingBottom: 0,
          paddingTop: 0,
        }}
      >
        <Card title="基本信息" bordered={false}>
          <Form layout="vertical">
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="广告主">
                  {getFieldDecorator('advertiser_id', {
                    initialValue: formData.advertiser_id || '',
                    rules: [
                      {
                        required: true,
                        message: '请填写',
                      },
                    ],
                  })(<AdvertiserSelect />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="创意组名称">
                  {getFieldDecorator('name', {
                    initialValue: formData.name || '',
                    rules: [
                      {
                        required: true,
                        message: '请填写',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="100" />)}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item label="交互类型">
                  {getFieldDecorator('interaction_type', {
                    initialValue: formData.interaction_type || 1,
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <Select style={{ width: '100%' }} defaultValue={1}>
                      <Select.Option value={1}>打开网页</Select.Option>
                      <Select.Option value={2}>Android应用下载</Select.Option>
                      <Select.Option value={3}>iOS应用下载</Select.Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col
                {...col}
                style={{
                  display: getFieldValue('interaction_type') !== 1 ? 'block' : 'none',
                }}
              >
                <Form.Item label="应用名">
                  {getFieldDecorator('app_name', {
                    initialValue: formData.app_name || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="200" />)}
                </Form.Item>
              </Col>

              <Col
                {...col}
                style={{
                  display: getFieldValue('interaction_type') !== 1 ? 'block' : 'none',
                }}
              >
                <Form.Item label="应用包名">
                  {getFieldDecorator('phonapp_pkg_namee', {
                    initialValue: formData.app_pkg_name || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="50" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="曝光监测地址">
                  {getFieldDecorator('mille_addr', {
                    initialValue: formData.mille_addr || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="50" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="点击监测地址">
                  {getFieldDecorator('click_addr', {
                    initialValue: formData.click_addr || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="广告创意信息" bordered={false}>
          <CreateGroup
            ref={el => {
              this.creatives = el;
            }}
            value={formData.creatives}
          />
        </Card>
      </Modal>
    );
    return resultJsx;
  }
}
