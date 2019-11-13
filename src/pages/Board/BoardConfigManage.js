import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Card, Button, TreeSelect, Form, Icon } from 'antd';

const FormItem = Form.Item;
@connect(state => ({
  boardManage: state.boardManage,
}))
@Form.create()
export default class BoardConfigManage extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      columnids: props.boardManage.orgdata.desc.columnids,
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'boardManage/queryColumnTree1',
    });
  }

  componentDidUpdate(_p, _s, snapshot) {
    if (snapshot !== null) {
      this.updateColumnids(snapshot.orgdata.desc.columnids);
    }
  }

  getSnapshotBeforeUpdate(prevProps) {
    if (this.props.boardManage !== prevProps.boardManage) {
      return this.props.boardManage;
    }
    return null;
  }

  formSubmit = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const formData = { ...values };

        this.props.dispatch({
          type: 'boardManage/submitColumns',
          payload: formData,
        });
      }
    });
  };

  updateColumnids(ids) {
    this.setState({
      columnids: ids,
    });
  }

  render() {
    const {
      boardManage: { configTreeData, submitting },
      form: { getFieldDecorator },
    } = this.props;

    const { columnids } = this.state;
    const tProps = {
      treeData: configTreeData,
      multiple: true,
      // treeCheckable: true,
      showCheckedStrategy: TreeSelect.SHOW_ALL,
      treeCheckStrictly: true,
      dropdownStyle: { maxHeight: 400, overflow: 'auto' },
      placeholder: '请选择栏目',
      treeDefaultExpandAll: true,
      allowClear: true,
    };
    return (
      <Card
        title="展板首页一级导航配置"
        loading={submitting}
        actions={[
          <Button onClick={this.formSubmit}>
            <Icon type="save" />
            保存
          </Button>,
        ]}
      >
        <Form>
          <FormItem label="栏目">
            {getFieldDecorator('columnids', {
              initialValue: columnids,
              // rules: [
              //   {
              //     required: true,
              //     message: '请选择显示栏目',
              //   },
              // ],
            })(<TreeSelect {...tProps} />)}
          </FormItem>
        </Form>
      </Card>
    );
  }
}
