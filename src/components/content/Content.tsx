import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../module';
import { getMostPolularThunk } from '../../module/mostPopular';
import Video from '../video/Video';
import styles from './Content.module.css';

const Content = () => {
  const {loading, datas} = useSelector(({mostPopular}: RootState) => ({
    loading: mostPopular.loading,
    datas: mostPopular.datas
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMostPolularThunk());
  },[dispatch]);
  if(loading) return <p>로딩중...</p>;
  return (
    <div className={styles.container}>
      {
        datas && datas.map(video => (
          <Video 
            key={video.id}
            id={video.id}
            thumbnail={video.snippet.thumbnails.medium.url}
            title={video.snippet.title}
          />
        ))
      }
    </div>
  );
};

export default Content;