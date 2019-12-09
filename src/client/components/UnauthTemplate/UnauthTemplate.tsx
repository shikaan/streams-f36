import React, {ReactNode} from 'react';
import cn from 'classnames';

const style = require('./UnauthTemplate.scss');

interface UnauthTemplateProps {
  children: ReactNode,
  className?: string
}

const UnauthTemplate = ({children, className}: UnauthTemplateProps) => {
  return (
    <main className={cn(style['UnauthTemplate'], className)}>
      {children}
    </main>
  );
};

export default UnauthTemplate;
