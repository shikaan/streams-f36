import React from 'react';
// TODO: very suboptimal...
import '@contentful/forma-36-fcss/dist/styles.css';
import '@contentful/forma-36-react-components/dist/styles.css';
import './App.css'

import MainTemplate from "./components/MainTemplate/MainTemplate";

export default () => {
  return (
      <MainTemplate/>
  )
}
