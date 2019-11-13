import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Avatar, Tag } from 'antd';
// import { parseUtcTime } from '../../utils/utils';
import DescriptionList from '../../components/DescriptionList';
import { DicShow } from '@/components/Dictionary';
// import Toggle from '../../Mall/Store/BasicInfo/Toggle';
import styles from './PersonnelInfo.less';

const { Description } = DescriptionList;

@connect(state => ({
  personnel: state.personnel,
}))
class PersonnelInfo extends PureComponent {
  state = {
    // bigImage: false,
    // ShowUrl: null,
    // bigImageyingye: false,
    // ShowUrlyingye: null,
  };

  componentDidMount() {
    const { id, type } = this.props;
    this.props.dispatch({
      type: 'personnel/loadForm',
      payload: {
        id,
        type,
      },
    });
  }

  //   handleToggleClick = value => {
  //     this.props.dispatch({
  //       type: 'store/toggleStatus',
  //       payload: value,
  //     });
  //   };

  tranSchange = value => {
    return value !== '' ? parseFloat(value).toFixed(2) : '';
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

  render() {
    const {
      personnel: { formData },
    } = this.props;
    let headerImgUrl = null;
    if (formData.photo) {
      headerImgUrl = formData.photo;
    } else {
      headerImgUrl = '/s/mall/noimage.jpg';
    }

    return (
      <div className={styles.main}>
        <Card title="个人基本信息" bordered={false}>
          <div className={styles.topInfo}>
            <div className={styles.topInfoLeft}>
              <Avatar
                src={formData.headerImgUrl}
                shape="circle"
                size={100}
                style={{ marginLeft: 49 }}
                onClick={() => this.shouBigImage(headerImgUrl)}
              />
            </div>

            <div className={styles.topInfoCenter}>
              <span>{formData.name}</span>
              <span>
                联系电话：
                {formData.phone}
                {/* 邮箱：
                {formData.email} */}
              </span>
              {/* <span>
                入驻园区：
                {formData.address}
              </span>
              <span>
                企业：
                {formData.memo}
              </span> */}
            </div>
          </div>
          <div className={styles.form} style={{ marginTop: 25 }}>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="角色">
                {
                  <DicShow
                    pcode="OPER$#enterprise_category_industry"
                    code={[formData.category]}
                    show={name}
                  />
                }
              </Description>
              {/* <Description term="企业">
                {<DicShow pcode="OPER$#enterprise_scale" code={[formData.size]} show={name} />}
              </Description> */}

              <Description term="真实姓名">{formData.real_name}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" col={3} style={{ marginBottom: 32 }}>
              <Description term="部门名称">{formData.dept_name}</Description>
              <Description term="昵称">{formData.nickname}</Description>
            </DescriptionList>
            <DescriptionList title="" size="large" style={{ marginBottom: 32 }}>
              <Description term="性别">{formData.gender === 1 ? '男' : '女'}</Description>
              {/* <Description term="入驻企业时间">
                {parseUtcTime(formData.entry_date, 'YYYY-MM-DD')}
              </Description> */}
            </DescriptionList>
          </div>
        </Card>
      </div>
    );
  }
}

export default PersonnelInfo;
