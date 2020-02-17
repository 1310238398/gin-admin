/* eslint-disable react/react-in-jsx-scope */
import React, { PureComponent } from 'react';
import { Card, Form, Row, Col, Input, Button, Modal, Icon, DatePicker, Tabs } from 'antd';
import { connect } from 'dva';
import PicturesWall from '@/components/PicturesWall/PicturesWall';
import AgentSelect from '@/components/AgentSelect/AgentSelect';
import AdvertQualifaication from './Qualifaication';
import { DicSelect } from '@/components/Dictionary';
import styles from './Advertiser.less';

@Form.create()
@connect(state => ({
  advertiser: state.advertiser,
}))
export default class AdvertiserEdit extends PureComponent {
  state = {};

  id = 0;

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'advertiser/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'advertiser/changeFormVisible',
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
        formData.logo = values.logo[0];
        this.qualifaication.validateFields((errbill, valuesbill) => {
          if (!errbill) {
            const { keys, data } = valuesbill;
            console.log(data);
            console.log(keys.map(k => data[k]));
            formData.qualifications = keys.map(k => {
              const v = { ...data[k] };
              v.file_url = v.file_url.length > 0 ? v.file_url[0] : '';
              return v;
            });
            console.log(formData);
          }
        });

        this.props.dispatch({
          type: 'advertiser/submit',
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
      advertiser: { formData, formTitle, formVisible },
      form: { getFieldDecorator },
    } = this.props;

    const col = {
      sm: 24,
      md: 12,
    };
    const colCjy = {
      sm: 24,
      md: 24,
    };
    const footerJsx = [
      <Button key="close" onClick={this.props.callback}>
        关闭
      </Button>,
      <Button type="primary" onClick={() => this.onBtnDataClick(1)}>
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
                <Form.Item label="代理商">
                  {getFieldDecorator('agent_id', {
                    initialValue: formData.agent_id || '',
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(<AgentSelect />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="广告主名称">
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
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="行业类别">
                  {getFieldDecorator('category', {
                    initialValue: formData.category || '',
                    rules: [
                      {
                        required: true,
                        message: '请选择',
                      },
                    ],
                  })(
                    <DicSelect
                      vmode="string"
                      pcode="OPER$#enterprise_category_industry"
                      selectProps={{ placeholder: '请选择' }}
                    />
                  )}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="公司地址">
                  {getFieldDecorator('address', {
                    initialValue: formData.address || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="200" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={32}>
              <Col {...col}>
                <Form.Item label="电话">
                  {getFieldDecorator('phone', {
                    initialValue: formData.phone || '',
                    rules: [
                      {
                        required: true,
                        whitespace: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="50" />)}
                </Form.Item>
              </Col>
              <Col {...col}>
                <Form.Item label="联系人">
                  {getFieldDecorator('contacter', {
                    initialValue: formData.contacter || '',
                    rules: [
                      {
                        required: true,
                        message: '请输入',
                      },
                    ],
                  })(<Input placeholder="请输入" maxLength="50" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col {...col}>
                <Form.Item label="Logo（图片上传格式jpg,jpeg,png)">
                  {getFieldDecorator('logo', {
                    initialValue: formData.logo ? [formData.logo] : '',
                    rules: [
                      {
                        required: false,
                        message: '请上传',
                      },
                    ],
                  })(<PicturesWall num={1} bucket="mall" listType="picture-card" />)}
                </Form.Item>
              </Col>

              <Col {...col}>
                <Form.Item label="备注">
                  {getFieldDecorator('memo', {
                    initialValue: formData.memo || '',
                    rules: [
                      {
                        required: false,
                        message: '请输入',
                      },
                    ],
                  })(<Input.TextArea placeholder="请输入" autosize={{ minRows: 2, maxRows: 6 }} />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card title="资质信息" bordered={false}>
          <AdvertQualifaication
            ref={el => {
              this.qualifaication = el;
            }}
            value={formData.qualifications}
          />
        </Card>
        <div className={styles.callout}>
          <p>1.可以上传图片文件类型为:jpg,jpeg,png,gif,bmp.</p>
          <p> 2.组织机构证大小不超过200KB，其它图片大小不超过2M，压缩包文件不超过10M.</p>
          <p> 3.请确保至少提交营业执照、法人身份证、ICP证，否则不予审核.</p>
          <p>
            4.具体资质要求及审核流程请下载广告资质审核文档. 5.可以上传压缩文件类型为:zip,rar,7z.
          </p>
        </div>
      </Modal>
    );
    return resultJsx;
  }
}
