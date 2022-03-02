import React, { Dispatch, SetStateAction } from 'react';
import { Route, Routes } from 'react-router-dom';
import Content from '../content/Content';
import Menu from '../menu/Menu';
import VideoDetail from '../videoDetail/VideoDetail';
import styles from './Main.module.css';

type Props = {
  toggleMenu: boolean,
  horizon: boolean,
  setHorizon: Dispatch<SetStateAction<boolean>>
}
const Main = ({toggleMenu, horizon, setHorizon}: Props) => {
  return (
    <Routes>
      <Route path='/' element={
        <div className={styles.container}> 
          {toggleMenu ? null : <Menu activeMenu='home'/>}
          <Content toggleMenu={toggleMenu} horizon={horizon} setHorizon={setHorizon}/>
        </div>}
      />
      <Route path='/explore' element={
        <div className={styles.container}> 
          {toggleMenu ? null : <Menu activeMenu='explore'/>}
          <Content toggleMenu={toggleMenu} horizon={horizon} setHorizon={setHorizon}/>
        </div>}
      />
      <Route path='/subscribe' element={
        <div className={styles.container}> 
          {toggleMenu ? null : <Menu activeMenu='subscribe'/>}
          <Content toggleMenu={toggleMenu} horizon={horizon} setHorizon={setHorizon}/>
        </div>}
      />
      <Route path='/video/:id' element={
        <div className={styles.container}>
          <VideoDetail/>
          <Content toggleMenu={toggleMenu} horizon={horizon} setHorizon={setHorizon}/>
        </div>}
      />
    </Routes>
    
  );
};

export default Main;