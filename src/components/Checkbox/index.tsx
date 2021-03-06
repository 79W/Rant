import React, { useState, useEffect } from 'react';

import classnames from '../../utils/classNames';

import './index.scss';
import Icon from '../Icons';

export interface IProps {
  checked?: boolean;
  name?: string;
  activeIcon?: string;
  inactiveIcon?: string;
  checkedColor?: string;
  labelText?: string;
  disabled?: boolean;
  labelDisabled?: boolean;
  onChange?: Function;
  onClicked?: Function;
}

const baseClass = 'rant-checkbox';

// TODO: Round/Square checkbox
// TODO: Checkbox groups

const Checkbox = ({
  checked = false,
  onChange,
  onClicked,
  name,
  activeIcon = 'checked',
  checkedColor = '#1989fa',
  labelText,
  inactiveIcon = 'passed',
  disabled,
  labelDisabled
}: IProps) => {
  const [isChecked, handleCheck] = useState(checked);

  const handleClick = (e) => {
    return onClicked && onClicked(e);
  };

  useEffect(() => {
    return onChange && onChange(isChecked);
  }, [isChecked]);

  const handleContainerClick = (e) => {
    e.preventDefault();
    if (!disabled && !labelDisabled) {
      handleCheck(!isChecked);
      handleClick(e);
    }
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    if (!disabled) {
      handleCheck(!isChecked);
      handleClick(e);
    }
  };

  const iconName = isChecked ? activeIcon : inactiveIcon;
  const iconColor = disabled ? '#c8c9cc' : checkedColor;

  return (
    <div
      className={classnames(baseClass, [
        {
          disabled
        }
      ])}
      onClick={handleContainerClick}
    >
      <div className={`${baseClass}__icon-container`} onClick={handleIconClick}>
        <Icon color={iconColor} name={iconName} size='20px' />
      </div>
      <label htmlFor={name}>{labelText}</label>
    </div>
  );
};

export default Checkbox;
