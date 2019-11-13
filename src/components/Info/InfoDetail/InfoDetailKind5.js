import React, { PureComponent } from 'react';
import { Card, Divider, Tag, Button } from 'antd';
import moment from 'moment';
import DescriptionList from '../../DescriptionList';
import ExtraLabel from '../ExtraLabel';
import style from './style.less';
import UserShow from '../../UserShow';
import InfoStatus from '../InfoStatus';
import { OrgShow } from '@/components/Org';
import { SurveyShowCard } from '../InfoDataEdit/SurveyCard';
import infos from '@/services/s_infoManage';

const defaultFormat = 'YYYY-MM-DD HH:mm:ssZ';
const { Description } = DescriptionList;
export default class InfoDetailKind5 extends PureComponent {
  showExtra = () => {
    const { dataSource } = this.props;

    const { ctrl } = dataSource;
    if (!ctrl) {
      return;
    }
    const { desc } = dataSource;
    return ctrl.map(item => {
      const initv = desc && desc.extras && desc.extras[item.code] ? desc.extras[item.code] : '';
      return [
        <Description term={item.name}>
          <ExtraLabel value={initv} ctrl={item} />
        </Description>,
      ];
    });
  };

  onSurveyChg = a => {
    this.answer = a;
  };

  onSurveyAnswer = () => {
    const { dataSource } = this.props;
    infos.putSurveyAnswer(dataSource.info_id, this.answer);
  };

  render() {
    const { dataSource } = this.props;
    const desc = dataSource.desc || {};
    const status = dataSource.status || {};
    const tags = desc.tags || [];
    let fIcons = [];
    const { banner, icon } = desc;
    if (icon && icon.length) {
      fIcons = icon;
    }
    let listmodestr = '自动';
    const listmodearr = ['自动', '文本模式', '左图右文', '上文下图', '显示旗帜图片'];
    if (desc && desc.list_mode) {
      listmodestr = listmodearr[desc.list_mode];
    }
    const extras = this.showExtra();
    // const content = desc.content ? JSON.parse(desc.content) : null;
    const tmp = desc.content ? JSON.parse(desc.content) : null;
    const questions = tmp && tmp.questions;
    const deadline =
      tmp && tmp.deadline ? moment(tmp.deadline, defaultFormat).format(defaultFormat) : null;
    return (
      <Card bordered={false} title={`[${dataSource.column_name}]${desc.title}`}>
        <DescriptionList size="large" col={2}>
          <Description term="所属栏目">{dataSource.column_name}</Description>
          <Description term="状态">
            <InfoStatus code={status.status} />
          </Description>
          <Description term="副标题">{desc.sub_title}</Description>
          <Description term="来源">{desc.from}</Description>
          <Description term="列表显示模式">{listmodestr}</Description>
          <Description term="标签">
            {tags &&
              tags.map(item => {
                return (
                  <Tag key={item} color="blue">
                    {item}
                  </Tag>
                );
              })}
          </Description>
          <Description term="所属组织">
            <OrgShow value={desc.org} />
          </Description>
          <Description term="所属用户">
            <UserShow uid={desc.owner} />
          </Description>
          <Description term="截止时间">
            <UserShow uid={deadline} />
          </Description>
        </DescriptionList>

        {fIcons.length > 0 &&
          banner && [
            <Divider />,
            <DescriptionList size="large" col={1}>
              {banner && (
                <Description term="旗帜">
                  <a className={style.img} href={`${banner}`} target="image">
                    <img src={banner} alt="" />
                  </a>
                </Description>
              )}
              {fIcons && fIcons.length > 0 && (
                <Description term="图片">
                  <div className={style.imglist}>
                    {fIcons.map(item => {
                      return (
                        <a key={item} className={style.img} href={`${item}`} target="image">
                          <img src={`${item}?w=110&h=90`} alt="" />
                        </a>
                      );
                    })}
                  </div>
                </Description>
              )}
            </DescriptionList>,
          ]}
        {extras &&
          extras.length > 0 && [
            <Divider />,
            <DescriptionList size="large" col={2}>
              {extras}
            </DescriptionList>,
          ]}
        <Divider />
        <DescriptionList col={1} size="large" title="简介">
          <Description>{desc.desc}</Description>
        </DescriptionList>
        <Divider />
        <div>
          <SurveyShowCard questions={questions} onChange={a => this.onSurveyChg(a)} />
          <Button onClick={this.onSurveyAnswer}>提交测试</Button>
        </div>
      </Card>
    );
  }
}
