import React from 'react';
import Content from '../content/Content';
import Menu from '../menu/Menu';
import styles from './Main.module.css';

const Main = () => {
  return (
    <div className={styles.container}>
      <Menu/>
      <Content/>
      <div></div>
    </div>
  );
};

export default Main;