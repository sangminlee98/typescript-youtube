import React, { useEffect, useState } from 'react';
import { getStatistics, Statistics } from '../../api/getStatistics';
import styles from './Video.module.css';

type Props = {
  id: string,
  thumbnail: string,
  title: string
}
const Video = ({id, thumbnail, title}: Props) => {
  const [statistics, setStatistics] = useState<Statistics | null>();
  const onGetStatistics = async (id: string) => {
    const staitstics = await getStatistics(id);
    setStatistics(staitstics);
  }
  useEffect(() => {
    onGetStatistics(id);
  },[id]);
  return (
    <div className={styles.container}>
      <img src={thumbnail} alt="thumbnail" className='thumbnail' />
      <h3>{title}</h3>
      <p>조회수: {statistics && statistics.viewCount}</p>
      <p>좋아요 수: {statistics && statistics.likeCount}</p>
    </div>
  );
};

export default Video;