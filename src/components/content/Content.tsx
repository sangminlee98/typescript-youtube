import React, { useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../module';
import { getMostPolularThunk } from '../../module/videos';
import Video from '../video/Video';
import styles from './Content.module.css';

const Content = () => {
  const parser = new DOMParser();
  const {loading, datas} = useSelector(({videos}: RootState) => ({
    loading: videos.loading,
    datas: videos.datas
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMostPolularThunk());
  },[dispatch]);
  if(loading) return (
    <div className={styles.container}>
      <p>로딩중...</p>
    </div>
  );
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {
          datas && datas.map((video, index) => (
            <div className={styles.gridItem} key={index}>
              <Video 
                id={typeof video.id === 'string' ? video.id : video.id.videoId}
                thumbnail={video.snippet.thumbnails.medium.url}
                title={parser.parseFromString(video.snippet.title,'text/html').body.innerHTML}
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