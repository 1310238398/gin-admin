import React, { PureComponent } from 'react';
import { Card, Divider, Tag } from 'antd';
import DescriptionList from '../../DescriptionList';
import style from './style.less';
import InfoStatus from '../InfoStatus';
import UserShow from '@/components/UserShow';
import { OrgShow } from '@/components/Org';
import ExtraLabel from '../ExtraLabel';
import { ContentShow } from '../../ContentShow';

const { Description } = DescriptionList;
export default class InfoDetailKind2 extends PureComponent {
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

  render() {
    const { dataSource } = this.props;

    const desc = dataSource.desc ? dataSource.desc : {};
    const status = dataSource.status || {};
    const tags = desc.tags || [];
    let fIcons = [];
    const { icon } = desc;
    if (icon && icon.length) {
      fIcons = icon;
    }
    return (
      <Card bordered={false}>
        <DescriptionList size="large" col={2}>
          <Description term="所属栏目">{dataSource.column_name}</Description>
          <Description term="状态">
            <InfoStatus code={status.status} />
          </Description>

          <Description term="所属组织">
            <UserShow uid={desc.org} />
          </Description>
          <Description term="所属用户">
            <OrgShow value={desc.owner} />
          </Description>
        </DescriptionList>
        <Divider />
        <DescriptionList size="large" col={1}>
          <Description term="标签">
            {tags &&
              tags.map((item, index) => {
                const key = `${item}_${index}`;
                return (
                  <Tag key={key} color="blue">
                    {item}
                  </Tag>
                );
              })}
          </Description>
        </DescriptionList>

        <Divider />
        <DescriptionList col={1} size="large" title="详情:">
          <Description>
            <ContentShow content={desc.content} />
          </Description>
        </DescriptionList>
        <Divider />
        {fIcons.length > 0 && (
          <DescriptionList size="large" col={1}>
            <Description term="图片">
              <div className={style.imglist}>
                {fIcons.map((item, index) => {
                  const key = `${item}_${index}`;
                  return (
                    <a key={key} className={style.img} href={`${item}`} target="image">
                      <img key={item} src={`${item}?w=110&h=90`} alt="" />
                    </a>
                  );
                })}
              </div>
            </Description>
          </DescriptionList>
        )}
        <DescriptionList size="large" col={2}>
          {this.showExtra()}
        </DescriptionList>
      </Card>
    );
  }
}
