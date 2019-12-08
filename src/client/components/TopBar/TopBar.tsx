import React, {Component, useState} from "react";
import cn from 'classnames';
import {Button, Dropdown, DropdownList, DropdownListItem, Illustration} from "@contentful/forma-36-react-components";

const styles = require('./TopBar.scss');

interface AccountMenuProps {
  className?: string,
}

function AccountMenu({className}: AccountMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      isAutoalignmentEnabled
      toggleElement={
        <Button
          className={cn(styles['TopBar__account-menu-button'], className)}
          indicateDropdown
          buttonType={"muted"}
          size={"small"}
          onClick={() => setIsOpen(!isOpen)}>
          <img
            className={cn(styles['TopBar__account-menu-button-avatar'], className)}
            src="https://avatars1.githubusercontent.com/u/17052868?v=4"
            alt="User Avatar"/>
        </Button>
      }
    >
      <DropdownList>
        <DropdownListItem>
          Logout
        </DropdownListItem>
      </DropdownList>
    </Dropdown>
  )
}

interface SpacerProps {
  className?: string,
}

// TODO: this will be a nav one day
function Spacer({className}: SpacerProps) {
  return (
    <div className={cn(styles['TopBar__spacer'], className)}/>
  )
}

interface LogoProps {
  className?: string,
}

function Logo({className}: LogoProps) {
  return (
    <div className={cn(styles['TopBar__logo'], className)}>
      <Illustration illustration={"Image"}/>
      <div className={cn(styles['TopBar__logo-text'], className)}>
        <span>Lol Company</span>
      </div>
    </div>
  )
}

interface TopBarProps {
  className?: string,
  testId?: string
}

class TopBar extends Component<TopBarProps> {
  static AccountMenu = AccountMenu;

  render() {
    const {className, testId} = this.props;

    return (
      <div className={cn(styles['TopBar'], className)} data-test-id={testId}>
        <Logo/>
        <Spacer/>
        <AccountMenu/>
      </div>
    )
  }
}

export default TopBar;
