import React, { PureComponent } from 'react';
import { Row, Col, Form, Button, Icon } from 'antd';
import style from './SearchCard.less';

export default class SearchCard extends PureComponent {
  col = {
    sm: 24,
    md: 12,
    lg: 8,
    xl: 8,
    xxl: 6,
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
  };

  render() {
    const { onSearch, onReset, onDownload } = this.props;
    const onSch = e => {
      if (e) {
        e.preventDefault();
      }
      if (onSearch) {
        return onSearch(e);
      }
    };
    const onDown  = e => {
      if (e) {
        e.preventDefault();
      }
      if (onDownload) {
        return onDownload(e);
      }
    };
    const col = {
      ...this.col,
      ...(this.props.col || {}),
    };
    let children;
    if(this.props.children.filter) {
      children = this.props.children.filter(item => {
        return item;
      });
    }else{
      children = [this.props.children]
    }
    return (
      <Form onSubmit={onSch}>
        <Row className={style.searchCard}>
          {children &&
            children.map((item, index) => {
              const key = `key${index}`;
              return (
                <Col key={key} {...col}>
                  {item}
                </Col>
              );
            })}
          <Col {...col} className={style.buttonArea}>
            <Button type="primary" htmlType="submit">
              <Icon type="search" /> 查询
            </Button>
            {onDownload &&  (
            <Button style={{ marginLeft: 8 }} onClick={onDown}>
              <Icon type="file-excel" /> 导出
            </Button>
)
            }
            <Button style={{ marginLeft: 8 }} onClick={onReset || this.onResetFormClick}>
              <Icon type="undo" /> 重置
            </Button>
          </Col>
        </Row>
      </Form>
    );
  }
}
