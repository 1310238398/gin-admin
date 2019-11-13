/* eslint-disable jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import { Collapse, Statistic, Card, Modal, Icon } from 'antd';
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts';
import { Pie } from '../../Charts';
import infos from '@/services/s_infoManage';
import TableList from '@/components/TableList';
import UserShow from '@/components/UserShow';
import { parseUtcTime } from '@/utils/utils';

const emptySvg = () => <svg width="1em" height="1em" fill="currentColor" viewBox="0 0 32 32" />;
export default class SurveyCard extends PureComponent {
  state = {
    totals: [],
    list: [],
    pagination: {},
    listload: true,
    detail: {},
    showDetail: false,
  };

  componentDidMount() {
    this.fetchTotal();
    this.fetchDetails({});
  }

  getSurveyContent = () => {
    const { dataSource } = this.props;
    if (dataSource && dataSource.desc) {
      return JSON.parse(dataSource.desc.content);
    }
    return [];
  };

  onTableChange = page => {
    this.fetchDetails(page);
  };

  fetchDetails = async page => {
    const { value } = this.props;
    if (value) {
      this.setState({ listload: true });
      const resp = await infos.queryPageSurveyDetails(value, page);
      this.setState({ list: resp.list, pagination: resp.pagination, listload: false });
    }
  };

  fetchTotal = async () => {
    const { value } = this.props;
    if (value) {
      const resp = await infos.getSurveyTotal(value);
      this.setState({ totals: resp });
    }
  };

  showDetail = record => {
    this.setState({ detail: record, showDetail: true });
  };

  renderSingleOptions = (options, totals) => {
    const salesPieData = options.map(item => {
      return {
        x: item.title,
        y: totals && totals[item.ind] ? totals[item.ind].num : 0,
      };
    });

    return (
      <Pie
        hasLegend
        title="总数量"
        subTitle="参与人数"
        total={() => salesPieData.reduce((pre, now) => now.y + pre, 0)}
        data={salesPieData}
        //  valueFormat={val => <span dangerouslySetInnerHTML={{ __html: val }} />}
        height={150}
      />
    );
  };

  renderMultipleOptions = (options, totals) => {
    const {
      totals: { num },
    } = this.state;
    const salesPieData = options.map(item => {
      return {
        x: item.title,
        y: totals && totals[item.ind] ? totals[item.ind].num : 0,
      };
    });
    const cols = {};
    return (
      <Chart height={400} data={salesPieData} scale={cols} forceFit>
        <Axis name="x" />
        <Axis name="y" />
        <Tooltip
          crosshairs={{
            type: 'y',
          }}
        />
        <Legend />
        <Geom
          type="interval"
          position="x*y"
          color="x"
          tooltip={[
            'x*y',
            (x, y) => {
              const v = `人数占比: ${(y / num) * 100}%`;
              const n = `选择数量: ${y}`;
              return {
                // 自定义 tooltip 上显示的 title 显示内容等。
                title: `${x}`,
                name: n,
                value: `${v}`,
              };
            },
          ]}
        />
      </Chart>
    );
  };

  renderQuestions = () => {
    const { dataSource } = this.props;
    const { totals } = this.state;
    if (!totals || totals.length === 0 || totals.num === 0) {
      return '';
    }
    const { question } = totals;
    const tmp = dataSource ? JSON.parse(dataSource.desc.content) : null;
    const survey = tmp && tmp.questions;
    if (!survey || survey.length === 0) {
      return [];
    }
    return survey.map(item => {
      const q = question && question[item.ind] && question[item.ind].options;
      return (
        <Card key={`card_${item.ind}`} title={`${item.ind}.${item.title}`}>
          {item.kind === 1 && this.renderSingleOptions(item.options, q)}
          {item.kind === 2 && this.renderMultipleOptions(item.options, q)}
        </Card>
      );
    });
  };

  renderDetailSingleOptions = (options, answer) => {
    return options.map(item => {
      const selected = answer && (answer[item.ind] || answer[item.ind] === '');
      const r = selected && answer[item.ind];
      return (
        <li key={`li_${item.ind}`}>
          <label className="sqo">
            {selected && <Icon type="check-circle" theme="twoTone" />}
            {!selected && <Icon component={emptySvg} />}
            <span className="sqo_title">{item.title}</span>
            {item.write === 1 && <span className="sqo_input"> {r}</span>}
          </label>
        </li>
      );
    });
  };

  renderDetailMultipleOptions = (options, answer) => {
    return options.map(item => {
      const selected = answer && (answer[item.ind] || answer[item.ind] === '');
      const r = selected && answer[item.ind];
      return (
        <li key={`li_${item.ind}`}>
          <label className="sqo">
            {selected && <Icon type="check-square" theme="twoTone" />}
            {!selected && <Icon component={emptySvg} />}
            <span className="sqo_title">{item.title}</span>
            {item.write === 1 && <span className="sqo_input"> {r}</span>}
          </label>
        </li>
      );
    });
  };

  renderDetailQuestion = () => {
    const { detail } = this.state;
    const { dataSource } = this.props;
    const { answers } = detail;

    const tmp = dataSource ? JSON.parse(dataSource.desc.content) : null;
    const survey = tmp && tmp.questions;
    if (!survey || survey.length === 0) {
      return [];
    }

    return survey.map(item => {
      const q = answers && answers[item.ind] && answers[item.ind].options;
      return (
        <Card key={`card_${item.ind}`} title={`${item.ind}.${item.title}`}>
          {item.kind === 1 && this.renderDetailSingleOptions(item.options, q)}
          {item.kind === 2 && this.renderDetailMultipleOptions(item.options, q)}
          {item.kind === 3 && (
            <span>{answers && answers[item.ind] && answers[item.ind].remark}</span>
          )}
        </Card>
      );
    });
  };

  renderDetail = () => {
    const { showDetail } = this.state;

    return (
      <Modal
        title="问卷明细"
        width="50vw"
        visible={showDetail}
        // maskClosable={false}
        // confirmLoading={submitting}
        destroyOnClose
        onOk={null}
        onCancel={() => {
          this.setState({ showDetail: false });
        }}
        style={{ top: '5vh' }}
        bodyStyle={{ height: '80vh', overflowY: 'scroll' }}
      >
        {showDetail && this.renderDetailQuestion()}
      </Modal>
    );
  };

  renderDetails = () => {
    const { pagination, list, listload } = this.state;
    const paginationProps = {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => {
        return <span> 共 {total}条 </span>;
      },
      ...pagination,
    };
    const columns = [
      {
        title: '参与人',
        dataIndex: 'uid',
        width: 100,
        render: val => {
          return <UserShow uid={val} />;
        },
      },
      {
        title: '操作时间',
        dataIndex: 'cre_time',
        width: 200,
        render: val => {
          return <span> {parseUtcTime(val)} </span>;
        },
      },
      // {
      //   title: '操作行为',
      //   dataIndex: 'desc.action',
      //   width: 200,
      //   render: val => {
      //     return <DicShow pcode={pcode} code={[val]} />;
      //   },
      // },
    ];
    const prop = {
      listload,
      rowKey: record => record.srid,
      columns,
      onRow: record => {
        return {
          onClick: () => {
            this.showDetail(record);
          },
        };
      },
      pagination: paginationProps,
      onChange: this.onTableChange,
      dataSource: list,
    };
    return <TableList {...prop} />;
  };

  render() {
    const { totals } = this.state;
    return (
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel header="统计信息" key="1">
          <Statistic title="参与人数" value={totals.num} />
          {this.renderQuestions()}
        </Collapse.Panel>
        <Collapse.Panel header="问卷明细" key="2">
          {this.renderDetails()}
          {this.renderDetail()}
        </Collapse.Panel>
      </Collapse>
    );
  }
}
