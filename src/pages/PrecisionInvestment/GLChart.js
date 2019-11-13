import React from 'react';
import {
  G2,
  Chart,
  Geom,
  Axis,
  Tooltip,
  Coord,
  Label,
  Legend,
  View,
  Guide,
  Shape,
  Facet,
  Util,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import { Card, Button, Checkbox, Icon, Row, Col } from 'antd';

import style from './PrecisionInvestment.less';

const defaultData = {
  name: '正奇金融控股股份有限公司',
  type: 'root',
  children: [
    {
      name: '股东',
      type: 'kind',
      children: [
        { name: '联想控股股份有限公司', value: 28.2, type: '股东' },
        { name: '达孜德善企业管理合伙企业', value: 32.2, type: '股东' },
        { name: '厦门金海峡投资有限公司', value: 39.8, type: '股东' },
        { name: '宁波梅山保税港区道鑫辰骏投资合伙企业', value: 28.2, type: '股东' },
        { name: '西藏德真企业管理合伙企业', value: 32.2, type: '股东' },
      ],
    },
    {
      name: '成员',
      type: 'kind',
      children: [
        { name: '郭文彤', position: '董事', type: '成员' },
        { name: '张生明', position: '董事', type: '成员' },
        { name: '吴绍臣', position: '监事', type: '成员' },
        { name: '黄中山', position: '监事', type: '成员' },
        { name: '吴昊', position: '监事', type: '成员' },
        { name: '俞能宏', position: '董事长', type: '成员' },
        { name: '李蓬', position: '董事', type: '成员' },
        { name: '舒悦', position: '董事', type: '成员' },
      ],
    },
    {
      name: '历史股东',
      type: 'kind',
      children: [
        { name: '天津德信企业管理合伙企业', type: '历史股东' },
        { name: '西藏德真企业', type: '历史股东' },
      ],
    },
    {
      name: '对外投资',
      type: 'kind',
      children: [],
    },
    {
      name: '二级股东',
      type: 'kind',
      children: [
        { name: '厦门国贸集团股份有限公司', type: '二级股东' },
        { name: '厦门启润实业有限公司', type: '二级股东' },
        { name: '黄中山', type: '二级股东' },
        { name: '陈登辉', type: '二级股东' },
        { name: '赵亚彬', type: '二级股东' },
        { name: '胡伟', type: '二级股东' },
        { name: '罗斌', type: '二级股东' },
        { name: '杨荣梅', type: '二级股东' },
        { name: '李德和', type: '二级股东' },
        { name: '宫为军', type: '二级股东' },
        { name: '卜廷川', type: '二级股东' },
        { name: '俞能宏', type: '二级股东' },
        { name: '高家宝', type: '二级股东' },
      ],
    },
    {
      name: '历史法人',
      type: 'kind',
      children: [],
    },
  ],
};
const defaultData1 = {
  name: '北京金信网银金融信息服务有限公司',
  type: 'root',
  children: [
    {
      name: '股东',
      type: 'kind',
      children: [
        { name: '北京汉宇投资有限公司', value: 28.2, type: '股东' },
        { name: '拓尔思信息技术股份有限公司', value: 32.2, type: '股东' },
      ],
    },
    {
      name: '成员',
      type: 'kind',
      children: [
        { name: '邹维', position: '监事', type: '成员' },
        { name: '李崇纲', position: '经理', type: '成员' },
        { name: '施水才', position: '	执行董事', type: '成员' },
      ],
    },
    {
      name: '历史股东',
      type: 'kind',
      children: [{ name: '北京丽泽大数据投资有限公司', type: '历史股东' }],
    },
    {
      name: '对外投资',
      type: 'kind',
      children: [],
    },
    {
      name: '二级股东',
      type: 'kind',
      children: [
        { name: '美联融通资产管理（北京）有限公司', type: '二级股东' },
        { name: '深圳市达晨创业投资有限公司', type: '二级股东' },
        { name: '深圳市创新资本投资有限公司', type: '二级股东' },
        { name: '北京金科高创投资管理咨询有限公司', type: '二级股东' },
        { name: '北京信科互动科技发展有限公司', type: '二级股东' },
        { name: '北京市北信计算机系统工程公司', type: '二级股东' },
        { name: '荣实', type: '二级股东' },
        { name: '李志鹏', type: '二级股东' },
        { name: '毕然', type: '二级股东' },
        { name: '丁亚轩', type: '二级股东' },
        { name: '令狐永兴', type: '二级股东' },
        { name: '程跃明', type: '二级股东' },
        { name: '张涛', type: '二级股东' },
        { name: '江南', type: '二级股东' },
        { name: '马建华', type: '二级股东' },
      ],
    },
    {
      name: '历史法人',
      type: 'kind',
      children: [],
    },
  ],
};
const kinds = ['股东', '成员', '二级股东', '历史股东', '对外投资', '历史法人'];
export default class GLChart extends React.Component {
  state = {
    selectKind: kinds,
    fullScreen: false,
    height: 800,
  };

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  onResize = () => {
    const { fullScreen } = this.state;
    if (fullScreen) {
      this.setState({ height: this.getFitHeight() });
    }
  };

  getFitHeight = () => {
    const { fullScreen } = this.state;
    if (fullScreen) {
      const h1 = window.innerHeight - 80;
      const h2 = 800;
      return h1 < h2 ? h2 : h1;
    }
    return 500;
  };

  onChangeFullScreen = () => {
    const { fullScreen } = this.state;
    this.setState({ fullScreen: !fullScreen, height: this.getFitHeight() }, () => {
      window.setTimeout(() => {
        const event = document.createEvent('HTMLEvents');
        event.initEvent('resize', true, false);
        window.dispatchEvent(event);
      }, 1);
    });
  };

  loadData = () => {
    const { selectKind } = this.state;

    const out = { ...defaultData };
    out.children = defaultData.children.filter(item => {
      return selectKind.indexOf(item.name) >= 0;
    });
    return out;
  };

  render() {
    const { fullScreen, height } = this.state;
    const data = this.loadData();
    const dv = new DataSet.View().source(data, {
      type: 'hierarchy',
    });
    dv.transform({
      type: 'hierarchy.cluster',
    });

    const className = ['chart'];
    if (fullScreen) {
      className.push(style.fullScreen);
    }
    const chartProp = {
      data,
      height,
      forceFit: true,
      padding: [140, 100, 240, 200],
    };

    if (fullScreen) {
      chartProp.padding = [140, 100, 240, 200];
    } else {
      chartProp.padding = [40, 100, 140, 200];
    }
    const fsicon = fullScreen ? 'fullscreen-exit' : 'fullscreen';

    console.log(chartProp.height);
    return (
      <Card
        className={className.join(' ')}
        title={
          <Checkbox.Group
            defaultValue={kinds}
            onChange={value => {
              this.setState({ selectKind: value });
            }}
            className={style.Legend}
          >
            <Row gutter={5}>
              <Col xs={24} sm={12} md={8} xl={4}>
                <Checkbox value="股东">股东</Checkbox>
              </Col>
              <Col xs={24} sm={12} md={8} xl={4}>
                <Checkbox value="成员">成员</Checkbox>
              </Col>
              <Col xs={24} sm={12} md={8} xl={4}>
                <Checkbox value="二级股东">二级股东</Checkbox>
              </Col>
              <Col xs={24} sm={12} md={8} xl={4}>
                <Checkbox value="历史股东">历史股东</Checkbox>
              </Col>
              <Col xs={24} sm={12} md={8} xl={4}>
                <Checkbox value="对外投资">对外投资</Checkbox>
              </Col>
              <Col xs={24} sm={12} md={8} xl={4}>
                <Checkbox value="历史法人">历史法人</Checkbox>
              </Col>
            </Row>
          </Checkbox.Group>
        }
        extra={
          <Button
            style={{
              backgroundColor: 'transparent',
              color: '#fff',
              borderRadius: '15px',
              border: '1px solid transparent',
            }}
            onClick={() => {
              this.onChangeFullScreen();
            }}
          >
            <Icon type={fsicon} />
          </Button>
        }
      >
        <Chart {...chartProp}>
          <Tooltip showTitle={false} />
          <Coord type="polar" />
          <View
            data={dv.getAllLinks().map(link => ({
              x: [link.source.x, link.target.x],
              y: [link.source.y, link.target.y],
              source: link.source.id,
              target: link.target.id,
            }))}
          >
            <Geom
              type="edge"
              position="x*y"
              shape="smooth"
              color="grey"
              opacity={0.5}
              tooltip={false}
            />
          </View>
          <View
            data={dv.getAllNodes().map(node => {
              const out = {
                hasChildren: !!(node.data.children && node.data.children.length),
                name: node.data.name,
                value: node.value,
                depth: node.depth,
                type: node.data.type,
                x: node.x,
                y: node.y,
              };
              switch (node.data.type) {
                case 'root':
                  out.公司 = node.data.name;
                  break;
                case '股东':
                  out.姓名 = node.data.name;
                  out.股份 = `${node.value}%`;
                  break;
                case '成员':
                  out.姓名 = node.data.name;
                  out.职位 = node.data.position;
                  break;
                case '二级股东':
                  out.机构 = node.data.name;
                  break;
                case '历史股东':
                  out.姓名 = node.data.name;
                  break;
                default:
              }
              return out;
            })}
          >
            <Geom
              type="point"
              position="x*y"
              color={[
                'type*name',
                (type, name) => {
                  switch (type) {
                    case 'root':
                      return '#FF5660';
                    case 'kind':
                      switch (name) {
                        case '股东':
                          return '#24CCB8';
                        case '成员':
                          return '#FFC400';
                        case '二级股东':
                          return '#7942C8';
                        case '历史股东':
                          return '#FF9C48';
                        case '对外投资':
                          return '#6248FF';
                        default:
                          return 'red';
                      }
                    case '股东':
                      return '#24CCB8';
                    case '成员':
                      return '#FFC400';
                    case '二级股东':
                      return '#7942C8';
                    case '历史股东':
                      return '#FF9C48';
                    case '对外投资':
                      return '#6248FF';

                    default:
                      return '#223399';
                  }
                },
              ]}
              tooltip="姓名*职位*机构*公司*股份"
              size={[
                'type',
                type => {
                  switch (type) {
                    case 'root':
                      return 12;
                    case 'kind':
                      return 10;
                    case '股东':
                    case '成员':
                    case '二级股东':
                    case '历史股东':
                    case '对外投资':
                      return 8;

                    default:
                      return 6;
                  }
                },
              ]}
              style={{
                stroke: '#888',
                fill: 'black',
              }}
            >
              <Label
                content="name"
                labelEmit
                textStyle={(text, item) => {
                  let { textAlign } = item;

                  if (item.point && item.point.hasChildren) {
                    textAlign = textAlign === 'left' ? 'right' : 'left';
                  }

                  return {
                    fill: '#dfdfdf',
                    fontSize: 12,
                    textAlign,
                  };
                }}
              />
            </Geom>
          </View>
        </Chart>
      </Card>
    );
  }
}
