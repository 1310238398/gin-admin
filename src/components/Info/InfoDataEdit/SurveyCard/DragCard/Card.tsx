import * as React from 'react';
import {
  DragSource,
  DropTarget,
  ConnectDragSource,
  ConnectDropTarget,
  DragSourceMonitor,
  DropTargetMonitor,
} from 'react-dnd';
import ItemTypes from './ItemTypes';

const cardSource = {
  beginDrag(props: CardProps) {
    return {
      id: props.id,
      originalIndex: props.findCard(props.id).index,
    };
  },

  endDrag(props: CardProps, monitor: DragSourceMonitor) {
    const { id: droppedId, originalIndex } = monitor.getItem();
    const didDrop = monitor.didDrop();

    if (!didDrop) {
      props.moveCard(droppedId, originalIndex);
    }
  },
};

const cardTarget = {
  canDrop() {
    return true;
  },

  drop(props: CardProps, monitor: DropTargetMonitor) {
    const { id: draggedId } = monitor.getItem();
    const { id: overId } = props;

    if (draggedId !== overId) {
      const { index: overIndex } = props.findCard(overId);
      props.moveCard(draggedId, overIndex);
    }
  },
};

export interface CardProps {
  id: string;
  show: React.Component;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
}

interface CardSourceCollectedProps {
  connectDragSource: ConnectDragSource;
  isDragging: boolean;
}

interface CardTargetCollectedProps {
  connectDropTarget: ConnectDropTarget;
  canDrop: boolean;
  isOver: boolean;
}

class Card extends React.Component<
  CardProps & CardSourceCollectedProps & CardTargetCollectedProps
> {
  public render() {
    const { connectDragSource, connectDropTarget } = this.props;

    return connectDragSource(connectDropTarget(this.renderShow()));
  }
  private renderShow() {
    const { show, isDragging, canDrop, isOver } = this.props;
    const opacity = isDragging ? 0 : 1;
    const cname = ['item'];
    if (isOver) {
      cname.push('over');
    }
    if (isDragging) {
      cname.push('dragging');
    }
    if (canDrop) {
      cname.push('drop');
    }
    return (
      <div className={cname.join(' ')} style={{ opacity }}>
        {show}
      </div>
    );
  }
}

export default DropTarget<CardProps, CardTargetCollectedProps>(
  ItemTypes.CARD,
  cardTarget,
  (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })
)(
  DragSource<CardProps, CardSourceCollectedProps>(
    ItemTypes.CARD,
    cardSource,
    (connect, monitor) => ({
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging(),
    })
  )(Card)
);
