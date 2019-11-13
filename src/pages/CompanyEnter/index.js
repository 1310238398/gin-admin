import React, { PureComponent } from 'react';
import { Card, Form, Input, Button, DatePicker, Select } from 'antd';
import CompanyEnterList from './CompanyEnterList';
// import styles from './index.less';
import getMockData from '../../services/s_mockData';

@Form.create()
class CompanyEnter extends PureComponent {
  state = {
    loading: false,
    dataSet: [],
    zsSelectData: [],
  };

  onSearch = formData => {
    this.setState({ loading: true });
    console.log('ggg');
    setTimeout(() => {
      this.setState({ loading: false });
    }, 200);
  };

  componentDidMount() {
    getMockData('companyenterlist_hzd.json').then(data => {
      this.setState({ dataSet: data.dataSet || [] });
      this.setState({ zsSelectData: data.zsSelectData || [] });
    });
  }

  render() {
    return (
      <Card className="park" bodyStyle={{ padding: 0 }}>
        <Form layout="inline" className="searchBar">
          <Form.Item label="企业名称">
            <Input placeholder="请输入企业名称" />
          </Form.Item>
          <Form.Item label="招商阶段">
            <Select
              className="darkSelect"
              dropdownClassName="darkDropdown"
              defaultValue="0"
              style={{ width: 200 }}
            >
              {this.state.zsSelectData.map(v => {
                return (
                  <Select.Option key={v.id} value={v.id}>
                    {v.text}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="入驻时间">
            <DatePicker.RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD"
              placeholder={['开始时间', '结束时间']}
            />
          </Form.Item>
          <Form.Item>
            <Button onClick={this.onSearch}>查询</Button>
            <Button style={{ color: '#fff' }}>重置</Button>
          </Form.Item>
        </Form>
        <CompanyEnterList dataSet={this.state.dataSet} />
      </Card>
    );
  }
}

export default CompanyEnter;
