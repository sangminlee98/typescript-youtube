import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Header from './components/Header';
import { RootState } from './module';
import { getMostPolularThunk } from './module/mostPopular';

function App() {
  // const {loading, datas} = useSelector(({mostPopular}: RootState) => ({
  //   loading: mostPopular.loading,
  //   datas: mostPopular.datas
  // }));
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getMostPolularThunk());
  // },[dispatch]);
  // if(loading) return (<p>로딩중...</p>);
  // datas && console.log(datas)
  return (
    <div>
      <Header/>
    </div>
  );
}

export default App;
