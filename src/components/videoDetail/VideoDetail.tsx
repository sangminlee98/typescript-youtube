import React from 'react';
import styles from './VideoDetail.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../module';

const VideoDetail = () => {
  const {id, snippet} = useSelector(({selectedVideo}: RootState) => ({
    id: selectedVideo?.id,
    snippet: selectedVideo?.snippet
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
      <h1>{snippet?.title}</h1>
    </div>
  );
};

export default VideoDetail;