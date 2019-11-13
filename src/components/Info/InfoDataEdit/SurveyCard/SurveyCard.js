import React, { Component } from 'react';
import { Button, Input, message, Layout, Tabs } from 'antd';
// import { DragSource } from 'react-dnd';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import style from './style.less';
import QuestionItem from './QuestionItem';
import DragCard from './DragCard';
import SurveyShowCard from './SurveyShowCard';

@DragDropContext(HTML5Backend)
export default class SurveyCard extends Component {
  state = {
    questions: [
      {
        ind: 1,
        title: '',
        kind: 1,
        req: 0,
        options: [{ ind: 1, title: '', write: 0 }],
      },
    ],
    current: 1,
    currentItem: {
      ind: 1,
      title: '',
      kind: 1,
      req: 0,
      options: [{ ind: 1, title: '', write: 0 }],
    },
  };

  constructor(props) {
    super(props);
    const { value } = props;
    const state = {};
    if (value && Array.isArray(value) && value.length > 0) {
      state.questions = [...value];
      const [i0] = value;
      state.currentItem = i0;
      state.current = 1;
      this.state = state;
    } else {
      this.state = {
        questions: [
          {
            ind: 1,
            title: '',
            kind: 1,
            req: 0,
            options: [{ ind: 1, title: '', write: 0 }],
          },
        ],
        current: 1,
        currentItem: {
          ind: 1,
          title: '',
          kind: 1,
          req: 0,
          options: [{ ind: 1, title: '', write: 0 }],
        },
      };
    }
  }

  static getDerivedStateFromProps(nextProps, state) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const { current } = state;
      const s = {};
      const { value } = nextProps;
      if (value && Array.isArray(value) && value.length > 0) {
        s.questions = value;
        s.currentItem = value[current - 1];
        return s;
      } else if (value && typeof value === 'string') {
        s.questions = JSON.parse(value);
        if (s.questions && Array.isArray(s.questions) && s.questions.length > 0) {
          s.currentItem = s.questions[current - 1];
          return s;
        }
      }
    }
    return null;
  }

  onQuestionChange = (ind, value) => {
    const { questions } = this.state;
    questions[ind] = {};
    questions[ind] = { ...value, ind: ind + 1 };
    this.setState({ currentItem: questions[ind] }, () => {
      this.triggerChange(questions);
    });
  };

  onChangeCurrent = index => {
    const { questions } = this.state;
    this.setState({ current: index + 1, currentItem: questions[index] });
  };

  onAddQuestion = index => {
    const { questions } = this.state;
    let { current } = this.state;
    const n = {
      ind: questions.length + 2,
      title: '',
      kind: 1,
      req: 0,
      options: [{ ind: 1, title: '', write: 0 }],
    };
    if (index === undefined || index === null) {
      // 追加
      questions.push(n);
      current = n.ind;
    } else {
      // 插入
      n.ind = index + 1;
      current = n.ind;
      // eslint-disable-next-line for-direction
      for (let i = questions.length - 1; i >= 0; i += -1) {
        if (i > index) {
          questions[i + 1] = questions[i];
        } else if (i === index) {
          questions[i + 1] = questions[i];
          questions[i] = n;
          break;
        } else if (i < index && index === questions.length) {
          questions[index] = n;
          break;
        }
      }
    }
    this.resetSeq(questions, current);
  };

  onDeleteQuestion = index => {
    const { questions, current } = this.state;
    if (questions.length <= 1) {
      message.warn('不能删除所有的问题');
      return;
    }
    this.resetSeq(
      questions.filter((_it, ind) => {
        return ind !== index;
      }),
      current < questions.length - 1 ? current : current - 1
    );
  };

  onUpQuestion = item => {
    const { questions, current } = this.state;

    for (let i = 1; i < questions.length; i += 1) {
      if (questions[i].ind === item.ind) {
        questions[i] = questions[i - 1];
        questions[i - 1] = item;
      }
    }

    this.resetSeq(questions, current > 1 ? current - 1 : 1);
  };

  moveTo = (dragid, dropid) => {
    const { questions } = this.state;
    const dragind = dragid - 1;
    const dropind = dropid - 1;
    const ns = [];
    for (let i = 0; i < questions.length; i += 1) {
      if (i < dragind && i < dropind) {
        ns.push(questions[i]);
      } else if (dropind > dragind) {
        if (i !== dragind) {
          if (i === dropind) {
            ns.push(questions[dragind]);
          }
          ns.push(questions[i]);
        }
      } else {
        if (i === dropind) {
          ns.push(questions[dragind]);
        }
        if (i !== dragind) {
          ns.push(questions[i]);
        }
      }
    }

    this.resetSeq(ns, dropind);
  };

  onDownQuestion = item => {
    const { questions, current } = this.state;

    for (let i = questions.length - 2; i >= 0; i -= 1) {
      if (questions[i].ind === item.ind) {
        questions[i] = questions[i + 1];
        questions[i + 1] = item;
      }
    }

    this.resetSeq(questions, current !== questions.length ? current + 1 : questions.length);
  };

  triggerChange = questions => {
    const { onChange } = this.props;
    if (!onChange) {
      return;
    }
    onChange(questions);
  };

  resetSeq(questions, current) {
    let nextSeq = 1;
    const l = questions.map(it => {
      const ind = nextSeq;
      nextSeq += 1;
      return { ...it, ind };
    });
    this.setState({ current, currentItem: l[current - 1] });
    this.triggerChange(l);
  }

  renderQuestionsSelect = () => {
    return (
      <DragCard
        className="items"
        items={this.renderQuestions()}
        onChange={(dragid, dropid) => {
          this.moveTo(dragid, dropid);
        }}
      />
    );
  };

  renderQuestions = () => {
    const { questions, current } = this.state;
    return questions.map((item, index) => {
      const cname = ['questionCtl'];
      if (item.ind === current) {
        cname.push('select');
      }
      return {
        id: item.ind,
        render: (
          <Input.Group compact className={cname}>
            <Button
              icon="plus"
              onClick={e => {
                if (e && e.stopPropagation) e.stopPropagation();
                this.onAddQuestion(index);
              }}
            />
            <span className="ant-btn" onClick={() => this.onChangeCurrent(index)}>
              题:
              {item.ind}
            </span>
            <Button
              icon="plus"
              onClick={e => {
                if (e && e.stopPropagation) e.stopPropagation();
                this.onAddQuestion(index + 1);
              }}
            />
          </Input.Group>
        ),
      };
    });
  };

  render() {
    const { current, currentItem, questions } = this.state;
    return (
      <Tabs className={style.surveyCard}>
        <Tabs.TabPane key="1" tab="编辑">
          <Layout>
            <Layout.Sider width={185} theme="light">
              {this.renderQuestionsSelect()}
            </Layout.Sider>
            <Layout.Content>
              <QuestionItem
                {...currentItem}
                onChange={value => this.onQuestionChange(current - 1, value)}
                onDelete={() => {
                  this.onDeleteQuestion(current - 1);
                }}
              />
            </Layout.Content>
          </Layout>
        </Tabs.TabPane>
        <Tabs.TabPane key="2" tab="预览">
          <SurveyShowCard questions={questions} />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}
