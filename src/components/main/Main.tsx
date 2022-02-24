import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Content from '../content/Content';
import Menu from '../menu/Menu';
import VideoDetail from '../videoDetail/VideoDetail';
import styles from './Main.module.css';

const Main = () => {
  return (
    <Routes>
      <Route path='/' element={
        <div className={styles.container}> 
          <Menu/>
          <Content/>
        </div>}
      />
      <Route path='/video' element={
        <div className={styles.container}>
          <VideoDetail/>
          <Content/>
        </div>}
      />
    </Routes>
    
  );
};

export default Main;