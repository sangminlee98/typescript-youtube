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
      <div className={styles.grid}>
        {
          datas && datas.map(video => (
            <div className={styles.gridItem}>
              <Video 
                key={video.id}
                id={video.id}
                thumbnail={video.snippet.thumbnails.medium.url}
                title={video.snippet.title}
                channelId={video.snippet.channelId}
                publishedAt={video.snippet.publishedAt}
              />
            </div>
          ))
        }
      </div>
      <div style={{height:'100px'}}></div>
    </div>
  );
};

export default Content;