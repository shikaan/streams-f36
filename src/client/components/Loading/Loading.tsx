import React from 'react';
import cn from 'classnames';
import {Heading, Spinner} from '@contentful/forma-36-react-components'

const style = require('./Loading.scss');

interface LoadingProps {
  className?: string
}

const Loading = ({className}: LoadingProps) => {
  return (
    <main className={cn(style['Loading'], className)}>
      <section className={cn(style['Loading__wrapper'], className)}>
        <Spinner customSize={72} color={"white"}/>
        <Heading className={cn(style['Loading__text'], className)}>Loading</Heading>
      </section>
    </main>
  );
};

export default Loading;
