import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { message, Drawer, Badge, Tag, Card, Divider, Collapse, Spin, Button, Input } from 'antd';
import DescriptionList from '../../components/DescriptionList';
import { DicShow } from '@/components/Dictionary';
import { parseUtcTime } from '../../utils/utils';
import UserShow from '@/components/UserShow';
import { InfoCard } from '@/components/Info';
import { ContentShow } from '@/components/ContentShow';

const { Description } = DescriptionList;

@connect(state => ({
  reportManage: state.reportManage,
  target: state.target1,
}))
export default class ReportCard extends PureComponent {
  state = {
    dataInfo: false,
    dataInfoID: '',
  };

  componentDidMount() {
    const { callback, id } = this.props;
    this.props.dispatch({
      type: 'reportManage/saveFormCallback',
      payload: {
        callback,
      },
    });
    this.props.dispatch({
      type: 'reportManage/getInfo',
      payload: {
        id,
        callback,
      },
    });
  }

  onClose = () => {
    this.props.callback();
  };

  onModalOKClick = () => {
    this.props.callback();
  };

  showExtra = () => {
    const {
      reportManage: { formData },
    } = this.props;

    const { ctrl } = formData;
    if (!ctrl) {
      return;
    }
    const { desc } = formData;
    return ctrl.map(item => {
      const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
      return <Description term={item.name}>{initv}</Description>;
    });
  };

  onPublish = record => {
    this.props.dispatch({
      type: 'reportManage/publish',
      payload: record.info_id,
    });
  };

  onInfoViewClick = id => {
    this.setState({
      dataInfo: true,
      dataInfoID: id,
    });
  };

  handlerDo = () => {
    if (!this.value) {
      message.warning('处理意见不能为空。');
      return;
    }
    this.props.dispatch({
      type: 'reportManage/do',
      payload: { id: this.props.id, result: this.value },
    });
  };

  showStatus = code => {
    const s = ['processing', 'success'];
    let status = 'processing';
    if (code >= 0) {
      status = s[code] ? s[code] : status;
    }
    return (
      <DicShow
        pcode="cms$#report$#status"
        code={[code]}
        show={(name, cval) => <Badge key={`${name}_${cval}`} status={status} text={name} />}
      />
    );
  };

  chgTarget = keys => {
    let ok = false;
    for (const k of keys) {
      if (k === '1') {
        ok = true;
      }
    }
    if (!ok) return;
    const {
      target: { data, loading },
      reportManage: {
        formData: { desc },
      },
    } = this.props;
    if (loading) return;
    if (data.info_id) return;
    if (desc && desc.target_type === 1) {
      this.props.dispatch({
        type: 'target/fetchInfo',
        payload: { infoid: desc.target_id },
      });
    }
  };

  onDataInfoCallback = () => {
    this.setState({
      dataInfo: false,
      dataInfoID: '',
    });
  };

  renderDataInfo = () => {
    if (this.state.dataInfo) {
      return <InfoCard id={this.state.dataInfoID} callback={this.onDataInfoCallback} />;
    }
  };

  renderInfo = () => {
    const {
      target: { data, loading },
      reportManage: {
        formData: { desc },
      },
    } = this.props;
    if (loading) {
      return <Spin />;
    }
    if (!data.info_id || !desc) return;
    return (
      <DescriptionList col="1">
        <Description term="目标类型">
          {<DicShow pcode="cms$#report$#targettype" code={[desc.target_type]} />}-
          {<DicShow pcode="cms$#infos$#kind" code={[data.desc.kind]} />}
        </Description>
        {data.desc.title && (
          <Description term="目标标题" onClick={() => this.onInfoViewClick(desc.target_id)}>
            {data.desc.title}
          </Description>
        )}
        {!data.desc.title && (
          <Description term="目标内容">
            <a onClick={() => this.onInfoViewClick(desc.target_id)}>
              <ContentShow content={data.desc.content} />
            </a>
          </Description>
        )}
      </DescriptionList>
    );
  };

  render() {
    const {
      reportManage: {
        formData: { desc, result },
      },
    } = this.props;

    // const desc = formData.desc ? formData.desc : {};

    return (
      <Drawer
        title="投诉举报"
        placement="right"
        destroyOnClose
        closable={false}
        onClose={this.onClose}
        visible
        width="50%"
      >
        <Card loading={!desc}>
          <Collapse defaultActiveKey={['2', '3']} onChange={this.chgTarget}>
            <Collapse.Panel header="举报目标" key="1">
              {desc && desc.target_type === 1 && this.renderInfo(desc.target_id)}
            </Collapse.Panel>
            {desc && (
              <Collapse.Panel header="举报内容" key="2">
                <DescriptionList col="2">
                  <Description term="状态">{this.showStatus(desc.status)}</Description>
                  <Description term="举报时间">{parseUtcTime(desc.rep_time)}</Description>
                  <Description term="举报用户">
                    <UserShow uid={desc.uid} />
                  </Description>
                </DescriptionList>
                <DescriptionList col="1">
                  <Description term="标签">
                    <DicShow
                      pcode="cms$#report$#type"
                      code={desc.tags}
                      show={name => {
                        return <Tag>{name}</Tag>;
                      }}
                    />
                  </Description>
                </DescriptionList>
                <Divider />
                <DescriptionList col="1">
                  <Description term="内容">
                    <ContentShow content={desc.content} />
                  </Description>
                </DescriptionList>
              </Collapse.Panel>
            )}
            <Collapse.Panel header="举报目标" key="3">
              {desc && desc.status === 1 && (
                <DescriptionList col="2">
                  <Description term="处理人">
                    <UserShow uid={result.proc_uid} />
                  </Description>
                  <Description term="处理时间">
                    <UserShow uid={parseUtcTime(result.proc_time)} />
                  </Description>
                </DescriptionList>
              )}
              {desc && desc.status === 1 && (
                <DescriptionList col="1">
                  <Description term="处理意见">{result.result}</Description>
                </DescriptionList>
              )}
              {desc && desc.status === 0 && (
                <Card
                  title="处理意见"
                  actions={[<Button onClick={() => this.handlerDo()}>处理完成</Button>]}
                >
                  <Input.TextArea
                    onChange={e => {
                      this.value = e.target.value;
                    }}
                  />
                </Card>
              )}
            </Collapse.Panel>
          </Collapse>
        </Card>
        {this.renderDataInfo()}
      </Drawer>
    );
  }
}
