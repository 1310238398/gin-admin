import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Icon, Card, Button, Modal } from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import ClassifiedEditors from './ClassifiedEditors/ClassifiedEditors';
// import AttrProductsAttr from './ProductsAttr/addProductsAttr';

const { SubMenu } = Menu;
@connect(state => ({
  commodityClassificationmanagement: state.commodityClassificationmanagement,
}))
export default class CommodityClassificationManagement extends PureComponent {
  state = {
    classifiedEditorsFrame: {
      visible: false,
      data: null,
      mode: null,
    },
    // classifiedAttrFrame: {
    //   visible: false,
    //   data: null,
    //   categoryId: null,
    // },
    // productClassObject: {},
  };

  componentDidMount() {
    // this.props.dispatch({ type: 'commodityClassificationmanagement/queryShopstatue' });
    this.BtnSearch();
  }

  // 1是编辑，2是新建
  handleClickedit = data => {
    this.props.dispatch({
      type: 'commodityClassificationmanagement/queryAttrList',
      payload: data.goods_category_id,
    });
    // console.log(data);
    this.setState({
      classifiedEditorsFrame: {
        visible: true,
        data,
        mode: 1,
      },
      // classifiedAttrFrame: {
      //   visible: true,
      //   data: this.props.commodityClassificationmanagement.attrList,
      //   categoryId: data.goods_category_id,
      // },
      // productClassObject: {
      //   category_name: data.category_name,
      //   parent_id: data.parent_id,
      //   image_path: data.image_path,
      // },
    });
  };

  handleClickdele = () => {
    // this.props.dispatch({
    //     type: 'shopChangeaudit/writeOff',
    //     recordId: rec.record_id,
    //   });
    // 重新加载表格数据
    this.queryListData(this.queryForm, this.pagination);
  };

  closeSubFrame = () => {
    // 关闭窗口
    this.setState({
      classifiedEditorsFrame: {
        visible: false,
        data: null,
        mode: null,
      },
    });
  };

  // 新建
  NewClassifiedEditors = () => {
    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.BtnSearch();
  };

  // 编辑
  EditClassifiedEditors = () => {
    // 关闭窗口
    this.closeSubFrame();

    // // 重新加载表格数据
    // this.BtnSearch();
  };

  onNewparten = () => {
    this.setState({
      classifiedEditorsFrame: {
        visible: true,
        data: {
          Delivery: 1,
          category_name: '',
          category_id: '',
          image_path: '',
          is_leaf: '',
          parent_id: '',
        },
        mode: 2,
      },
    });
  };

  deleClickdel = rec => {
    Modal.confirm({
      title: '操作确认',
      content: '确认要删除此分类？',
      okType: 'danger',
      okText: '确定',
      cancelText: '取消',
      onOk: this.deleOff.bind(this, rec),
    });
  };

  /**
   * 删除传值
   */
  deleOff = rec => {
    this.props.dispatch({
      type: 'commodityClassificationmanagement/DeleOff',
      category: rec,
    });
    // 重新加载表格数据
    this.BtnSearch();
  };

  BtnSearch() {
    this.props.dispatch({
      type: 'commodityClassificationmanagement/queryShopStatueTotalInfo',
    });
  }

  // submit = () => {
  //   // this.props.dispatch({
  //   //   type: ''
  //   // })
  //   this.setState({
  //     productClassObject: {
  //       // "category_name":
  //     },
  //   });
  // };

  render() {
    const {
      commodityClassificationmanagement: { CommdityClassisfication },
    } = this.props;

    const resultJsx = (
      <div>
        <PageHeaderLayout title="商品分类管理">
          <Card bordered={false}>
            <div>
              <Button icon="plus" type="primary" onClick={() => this.onNewparten()}>
                新建
              </Button>
            </div>
            <div style={{ display: 'flex', flex: 'wrap' }}>
              <Menu
                style={{ width: 256 }}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
              >
                {CommdityClassisfication &&
                  CommdityClassisfication.map(item => {
                    return (
                      <SubMenu
                        key={item.category_name}
                        title={
                          <span onClick={() => this.handleClickedit(item)}>
                            <span>{item.category_name}</span>
                            {/* <Icon type="edit" onClick={() => this.handleClickedit(item)} /> */}
                            <Icon
                              type="close"
                              onClick={e => {
                                e.stopPropagation();
                                this.deleClickdel(item.goods_category_id);
                              }}
                            />
                          </span>
                        }
                      >
                        {item.children &&
                          item.children.map(children => {
                            return (
                              <Menu.Item key={children.category_name}>
                                <span onClick={() => this.handleClickedit(children)}>
                                  {children.category_name}{' '}
                                  <span>
                                    <Icon
                                      type="edit"
                                      onClick={() => this.handleClickedit(children)}
                                    />
                                    <Icon
                                      type="close"
                                      onClick={() => this.deleClickdel(children.goods_category_id)}
                                    />
                                  </span>
                                </span>
                              </Menu.Item>
                            );
                          })}
                      </SubMenu>
                    );
                  })}
              </Menu>
              <div style={{ flex: 3 }}>
                {this.state.classifiedEditorsFrame.visible && (
                  <ClassifiedEditors
                    data={this.state.classifiedEditorsFrame.data}
                    mode={this.state.classifiedEditorsFrame.mode}
                    onClassifiedEditorsFrameCloseCallback={this.closeSubFrame}
                    onNewClassifiedEditors={this.NewClassifiedEditors}
                    onEditClassifiedEditors={this.EditClassifiedEditors}
                  />
                )}
                {/* {this.state.classifiedAttrFrame.visible && (
                  <AttrProductsAttr
                    data={this.state.classifiedAttrFrame.data}
                    productClassObject={this.state.productClassObject}
                  />
                )} */}
              </div>
            </div>
          </Card>
        </PageHeaderLayout>
      </div>
    );
    return resultJsx;
  }
}
