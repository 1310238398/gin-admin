import React, { PureComponent } from 'react';
import { Row, Col, Form } from 'antd';
import style from './FormCard.less';
import FormDivider from './FormDivider';

export default class FormCard extends PureComponent {
  col = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 8,
    xxl: 6,
  };

  oneCol = {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24,
    xxl: 24,
  };

  twoCol = {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 12,
    xl: 12,
    xxl: 12,
  };

  onResetFormClick = () => {
    this.props.form.resetFields();
  };

  render() {
    const { onSubmit } = this.props;
    const onSubmitHandler = e => {
      if (e) {
        e.preventDefault();
      }
      if (onSubmitHandler) {
        return onSubmit(e);
      }
    };
    const children =
      this.props.children && Array.isArray(this.props.children)
        ? this.props.children.filter(item => {
            return item;
          })
        : [];

    const wrap = items => {
      return items.map((item, index) => {
        if (!item) {
          return;
        }
        const key = `key${index}`;

        let colprops = { key };
        if (item && Array.isArray(item)) {
          if (item.length > 0) return wrap(item);
          else return [];
        }
        let { col } = item.props;
        if (item.type === FormDivider && !item.props.col) {
          col = 1;
        }
        if (col === 1) {
          colprops = { ...colprops, ...this.oneCol };
        } else if (col === 2) {
          colprops = { ...colprops, ...this.twoCol };
        } else {
          colprops = { ...colprops, ...this.col };
        }
        const p = col || {};
        colprops = { ...colprops, ...p };
        return <Col {...colprops}>{item}</Col>;
      });
    };

    return (
      <Form onSubmit={onSubmitHandler}>
        <Row className={style.formCard}>{children && wrap(children)}</Row>
      </Form>
    );
  }
}
