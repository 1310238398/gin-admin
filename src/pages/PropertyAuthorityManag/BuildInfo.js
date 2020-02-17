import React, { PureComponent } from 'react';
import { Form, Modal, Select, Row, Col, Button, message } from 'antd';
// import { formatTimestamp } from "../../../utils/utils";

import { connect } from 'dva';
import * as builingService from '@/services/propertyAuthority';
import { DicSelect } from '@/components/Dictionary';

const { Option } = Select;

@Form.create()
@connect(state => ({
  enterprise: state.enterprise,
}))
export default class BuildingInfo extends PureComponent {
  state = {
    floorList: [],
    building_name: '',
  };

  componentWillMount() {
    builingService.queryBuilding().then(data => {
      this.setState({ floorList: data.list ? data.list : [] });
    });
  }

  //  TODO
  onAddBuildCloseCallback = () => {
    const { onAddBuildCloseCallback } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };

        const { floorList } = this.state;
        const fobj = {};
        for (let i = 0; i < floorList.length; i += 1) {
          fobj[floorList[i].record_id] = floorList[i];
        }

        const buildingNames = formData.building_id.map(v => {
          return fobj[v].name;
        });
        formData.building_name = buildingNames.join(',');
        formData.building_id = formData.building_id.join(',');

        // if (Array.isArray(this.state.building_name)) {
        //   formData.building_name = this.state.building_name.join(',');
        // } else {
        //   formData.building_name = this.state.building_name;
        // }
        onAddBuildCloseCallback(formData);
      }
    });
  };

  /**
   * 界面渲染
   */
  render() {
    const { floorList } = this.state;
    const {
      form: { getFieldDecorator },
      // enterprise :{TreeNodeData},
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const footerJsx = [
      <Button key="close" onClick={this.props.onBuildCloseCallback}>
        关闭
      </Button>,
      <Button key="submit" type="primary" onClick={this.onAddBuildCloseCallback}>
        添加
      </Button>,
    ];

    const resultJsx = (
      <Modal
        visible
        title="添加授权区域"
        destroyOnClose
        maskClosable={false}
        onCancel={this.props.onBuildCloseCallback}
        footer={footerJsx}
      >
        <Form>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="区域">
                {getFieldDecorator('building_id')(
                  <Select mode="multiple">
                    {floorList &&
                      floorList.map(v => {
                        return (
                          <Option key={v.record_id} value={v.record_id}>
                            {v.name}
                          </Option>
                        );
                      })}
                  </Select>
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col md={24} sm={24}>
              <Form.Item {...formItemLayout} label="用户标签">
                {getFieldDecorator('tag')(
                  <DicSelect
                    vmode="string"
                    pcode="ops$#datarole"
                    selectProps={{ placeholder: '请选择' }}
                  />
                )}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
    return resultJsx;
  }
}
