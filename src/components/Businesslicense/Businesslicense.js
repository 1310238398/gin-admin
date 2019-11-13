import React, { PureComponent } from 'react';
import { Checkbox, DatePicker } from 'antd';
import moment from 'moment';

export default class Businesslicense extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: props.value || '',
    };
  }

  static getDerivedStateFromProps(nextProps, state) {
    if ('value' in nextProps) {
      return { ...state, value: nextProps.value || '' };
    }
    return state;
  }

  handleDateChange = value => {
    let v = '';
    if (value) {
      v = value.format('YYYY-MM-DD');
    }
    this.setState({ value: v });
    this.triggerHandle(v);
  };

  handleCheckboxChange = e => {
    let v = '';
    if (e.target.checked) {
      v = '长期有效';
    }
    this.setState({ value: v });
    this.triggerHandle(v);
  };

  triggerHandle = value => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
  };

  render() {
    const { value } = this.state;
    const { ondisabled } = this.props;
    return (
      <React.Fragment>
        <div style={{ display: 'flex' }}>
          {(value === '' || value !== '长期有效') && (
            <div style={{ flex: '1' }}>
              <DatePicker
                format="YYYY-MM-DD"
                placeholder="请选择"
                onChange={this.handleDateChange}
                disabled={ondisabled}
                value={value !== '' ? moment(value) : ''}
              />
            </div>
          )}
          {(value === '' || value === '长期有效') && (
            <div style={{ flex: '1', paddingLeft: '10px' }}>
              <Checkbox
                value="长期有效"
                onChange={this.handleCheckboxChange}
                disabled={ondisabled}
                checked={value === '长期有效'}
              >
                长期有效
              </Checkbox>
            </div>
          )}
        </div>
      </React.Fragment>
    );
  }
}
