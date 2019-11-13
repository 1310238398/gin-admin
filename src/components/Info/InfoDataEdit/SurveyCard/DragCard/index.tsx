import * as React from 'react';
import Card from './Card';

export interface ContainerProps {
  items: any[];
  onChange: (dragid: number, dropid: number) => { index: number };
  className: string;
}

export interface ContainerState {
  cards: any[];
}

export default class Container extends React.Component<ContainerProps, ContainerState> {
  public render() {
    const { items, className } = this.props;

    return (
      <div className={className}>
        {items.map(item => (
          <Card
            key={item.id}
            id={`${item.id}`}
            show={item.render}
            moveCard={this.moveCard}
            findCard={this.findCard}
          />
        ))}
      </div>
    );
  }

  private moveCard = (id: string, atIndex: number) => {
    const { item } = this.findCard(id);
    const { onChange, items } = this.props;
    if (item.id !== items[atIndex].id) onChange(item.id, items[atIndex].id);
  };

  private findCard = (id: string) => {
    const { items } = this.props;
    const item = items.filter(c => `${c.id}` === id)[0];

    return {
      item,
      index: items.indexOf(item),
    };
  };
}
