import React from 'react';

interface Props {
  disabled?: boolean;
  style?: any;
  children?: any;
  [key: string]: any;
}

const defaultStyle = {
  color: '#fff',
  fontWeight: 'bold',
  marginLeft: '20px',
};

export default ({
  disabled = false,
  style = {},
  onClick: propsOnClick,
  children = '',
  ...pathThroughProps
}: Props) => {
  const onClick = () => {
    if (disabled) return;

    propsOnClick?.();
  };

  return (
    <div
      onClick={onClick}
      style={{
        ...defaultStyle,
        color: disabled ? '#777' : '#fff',
        cursor: disabled ? 'none' : 'pointer',
        ...style,
      }}
      {...pathThroughProps}
    >
      {children}
    </div>
  );
};
