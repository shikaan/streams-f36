import React, {Component} from 'react';
import cn from 'classnames';

const styles = require('./ViewFolder.scss');

/**
 * ViewFolderHeader
 */

interface ViewFolderHeaderProps {
  title?: string,
  className?: string;
  testId?: string;
}

function ViewFolderHeader(props: ViewFolderHeaderProps) {
  return (
    <div
      className={cn(styles['ViewFolder__header'], props.className)}
      data-test-id={props.testId}
    >
      {
        props.title && (
          <div
            data-test-id="view-folder-title"
            className={cn(styles['ViewFolder__title'], props.className)}
          >
            {props.title}
          </div>
        )
      }
    </div>
  )
}

interface ViewFolderItemProps {
  title?: string;
  className?: string;
  testId?: string;
  isActive?: boolean,
  onClick?: Function
}

function ViewFolderItem(props: ViewFolderItemProps) {
  return (
    <li className={cn(styles['ViewFolder__item'], {
      [styles['ViewFolder__item--active']]: props.isActive
    })}
        onClick={() => {
          if (typeof props.onClick === 'function') {
            props.onClick();
          }
        }}>
      <div className={cn(styles['ViewFolder__item-title'], props.className)}>
        {props.title}
      </div>
    </li>
  )
}

/**
 * ViewFolderList
 */

interface ViewFolderListProps {
  children?: React.ReactNode;
  className?: string;
  testId?: string;
}

class ViewFolderList extends Component<ViewFolderListProps> {
  render() {
    const {className, children, testId, ...otherProps} = this.props;

    const classNames = cn(styles['ViewFolder__list'], className);
    const childrenList = React.Children.toArray(children);

    const items = childrenList.filter((child: any) => {
      return child &&  child.type.name === ViewFolderItem.name
    });

    return (
      <ul {...otherProps} className={classNames} data-test-id={testId}>
        {items}
      </ul>
    )
  }
}

export interface ViewFolderProps {
  /**
   * Class names to be appended to the className prop of the component
   */
  className?: string;
  /**
   * Child nodes to be rendered in the component
   */
  children?: React.ReactNode;
  /**
   * An ID used for testing purposes applied as a data attribute (data-test-id)
   */
  testId?: string
}

const defaultProps: Partial<ViewFolderProps> = {
  testId: 'cf-ui-view-folder'
};

export class ViewFolder extends Component<ViewFolderProps> {
  static defaultProps = defaultProps;

  static Header = ViewFolderHeader;
  static List = ViewFolderList;
  static Item = ViewFolderItem;

  render() {
    const {className, children, testId, ...otherProps} = this.props;

    const childrenList = React.Children.toArray(children);
    const classNames = cn(styles['ViewFolder'], className);

    const header = childrenList.find((child: any) => {
      return child &&  child.type.name === ViewFolderHeader.name
    });

    const list = childrenList.find((child: any) => {
      return child &&  child.type.name === ViewFolderList.name
    });

    return (
      <div {...otherProps} className={classNames} data-test-id={testId}>
        {header}
        {list}
      </div>
    )
  }
}

export default ViewFolder;
