import React, { Dispatch, SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';
import Content from '../content/Content';
import Menu from '../menu/Menu';
import VideoDetail from '../videoDetail/VideoDetail';
import styles from './Main.module.css';

type Props = {
  horizon: boolean,
  setHorizon: Dispatch<SetStateAction<boolean>>
}
const Main = ({horizon, setHorizon}: Props) => {
  return (
    <Routes>
      <Route path='/' element={
        <div className={styles.container}> 
          <Menu activeMenu='home'/>
          <Content horizon={horizon} setHorizon={setHorizon}/>
        </div>}
      />
      <Route path='/explore' element={
        <div className={styles.container}> 
          <Menu activeMenu='explore'/>
          <Content horizon={horizon} setHorizon={setHorizon}/>
        </div>}
      />
      <Route path='/subscribe' element={
        <div className={styles.container}> 
          <Menu activeMenu='subscribe'/>
          <Content horizon={horizon} setHorizon={setHorizon}/>
        </div>}
      />
      <Route path='/video/:id' element={
        <div className={styles.container}>
          <VideoDetail/>
          <Content horizon={horizon} setHorizon={setHorizon}/>
        </div>}
      />
    </Routes>
    
  );
};

export default Main;