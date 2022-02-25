import React from 'react';
import styles from './VideoDetail.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../module';

const VideoDetail = () => {
  const parser = new DOMParser();
  const {id, snippet, statistics, channelInfo} = useSelector(({selectedVideo}: RootState) => ({
    id: selectedVideo?.id,
    snippet: selectedVideo?.snippet,
    statistics: selectedVideo?.statistics,
    channelInfo: selectedVideo?.channelInfo
  }));
  
  return (
    <div className={styles.container}>
      <iframe
        typeof='text/html'
        title='youtube video player'
        width='100%'
        height='500px'
        src={`https://www.youtube.com/embed/${id}`}
        allowFullScreen
      />
      <div className={styles.infoContainer}>
        <h1 className={styles.title}>{parser.parseFromString(snippet!.title,'text/html').body.innerHTML}</h1>
        <div className={styles.metadata}>
          <p>조회수 {statistics?.viewCount}</p>
          <p>{snippet?.publishedAt}</p>
        </div>
      </div>
      
    </div>
  );
};

export default VideoDetail;