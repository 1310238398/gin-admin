import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Avatar, Modal, Card, Button, Tag } from 'antd';
import { DicShow } from '@/components/Dictionary';
import DescriptionList from '../../../components/DescriptionList';
import { parseUtcTime } from '../../../utils/utils';
import styles from './InfoDaily.less';

const { Description } = DescriptionList;
@connect(state => ({
  dailyHealth: state.dailyHealth,
}))
@Form.create()

//  企业入驻的模态对话框组件。
export default class DailyHealthDetail extends PureComponent {
  state = {};

  //  默认的组件挂载时的初始化。
  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'dailyHealth/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  onModalCancelClick = () => {
    this.props.dispatch({
      type: 'dailyHealth/changeFormVisible',
      payload: false,
    });
    this.props.callback();
  };

  statusRender = status => {
    switch (status) {
      case 1:
        return <Tag color="blue">待审核</Tag>;
      case 2:
        return <Tag color="green">申请通过</Tag>;
      case 3:
        return <Tag color="red">申请驳回</Tag>;
      default:
        return '';
    }
  };

  renderBuildingType = value => {
    switch (value) {
      case 1:
        return <Tag color="blue">购买</Tag>;
      case 2:
        return <Tag color="green">租赁</Tag>;
      case 3:
        return <Tag color="yellow">自用</Tag>;
      default:
        return '';
    }
  };

  renderStatus = status => {
    switch (status) {
      case 1:
        return '身份证';
      case 2:
        return '港澳通行证';
      case 3:
        return '护照';
      default:
        return '';
    }
  };

  renderLeftjinan = status => {
    switch (status) {
      case 1:
        return '自驾';
      case 2:
        return '火车';
      case 3:
        return '客车';
      case 4:
        return '飞机';
      case 5:
        return '轮渡';
      case 6:
        return '其他';

      default:
        return '';
    }
  };

  renderFirstView = () => {
    const {
      dailyHealth: { formData },
      data,
    } = this.props;

    return (
      <div className={styles.main}>
        {data.fill_in === 1 ? (
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="姓名">{formData.name}</Description>
              <Description term="性别">{formData.gender === '1' ? '男' : '女'}</Description>
              <Description term="企业名称">{formData.enterprise_name}</Description>
            </DescriptionList>

            <DescriptionList title="" size="large" col={4} style={{ marginBottom: 32 }}>
              <Description term="是否到岗">{data.is_working === 1 ? '是' : '否'}</Description>
              <Description term="是否接触疑似/确诊人群">
                {data.meet_patient === 1 ? '是' : '否'}
              </Description>
              <Description term="是否处于隔离期">
                {data.in_quarantine === 1 ? '是' : '否'}
              </Description>
              <Description term="今日体温">{data.fever === 1 ? '正常' : '异常'}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="证件类型">
                {this.renderStatus(formData.certificate_type)}
              </Description>
              <Description term="证件号码">{formData.license_num}</Description>
              <Description term="联系方式">{formData.phone}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="是否湖北籍">
                {formData.native_hubei === 1 ? '是' : '否'}
              </Description>
              <Description term="是否假期离济">
                {formData.left_jinan === 1 ? '是' : '否'}
              </Description>
              {formData.left_jinan === 1 ? (
                <Description term="离济时间">
                  {formData.left_time ? parseUtcTime(formData.left_time, 'YYYY-MM-DD') : ''}
                </Description>
              ) : (
                ''
              )}
              {formData.left_jinan === 1 ? (
                <Description term="离济方式">
                  {this.renderLeftjinan(formData.left_type)}
                </Description>
              ) : (
                ''
              )}

              {formData.left_jinan === 1 &&
              (formData.left_type !== 1 && formData.left_type !== 6) ? (
                [
                  <Description term="离开车次/班次">{formData.left_vehicle_num}</Description>,
                  <Description term="目的地">{formData.aim}</Description>,
                ]
              ) : (
                <Description term="目的地">{formData.aim}</Description>
              )}
            </DescriptionList>
            {formData.left_jinan === 1 ? (
              <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
                <Description term="是否返回济南">
                  {formData.back_jinan === 1 ? '是' : '否'}
                </Description>
                <Description term="是否从省外返回">
                  {formData.out_province === 1 ? '是' : '否'}
                </Description>

                <Description term="计划返济时间">
                  {formData.back_time ? parseUtcTime(formData.back_time, 'YYYY-MM-DD') : ''}
                </Description>
                <Description term="返济方式">
                  {this.renderLeftjinan(formData.back_type)}
                </Description>
                {formData.back_type !== 1 && formData.back_type !== 6
                  ? [<Description term="返回车次/班次">{formData.back_vehicle_num}</Description>]
                  : ''}
              </DescriptionList>
            ) : (
              ''
            )}
          </div>
        ) : (
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="姓名">{formData.name}</Description>
              <Description term="性别">{formData.gender === '1' ? '男' : '女'}</Description>
              <Description term="企业名称">{formData.enterprise_name}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="证件类型">
                {this.renderStatus(formData.certificate_type)}
              </Description>
              <Description term="证件号码">{this.renderStatus(formData.license_num)}</Description>
              <Description term="联系方式">{formData.phone}</Description>
            </DescriptionList>
          </div>
        )}
      </div>
    );
  };

  render() {
    const {
      dailyHealth: { formVisible, submitting },
    } = this.props;

    return (
      <Modal
        title="员工每日健康"
        width={873}
        visible={formVisible}
        maskClosable={false}
        confirmLoading={submitting}
        destroyOnClose
        onCancel={this.onModalCancelClick}
        footer={[
          <Button key="back" onClick={this.onModalCancelClick}>
            关闭
          </Button>,
        ]}
        style={{ top: 20 }}
        bodyStyle={{ height: 550, overflowY: 'scroll' }}
      >
        {this.renderFirstView()}
      </Modal>
    );
  }
}
