import React from 'react';
import { useDispatch } from 'react-redux';
import { getVideos } from '../../api/getVideos';
import { setVideos } from '../../module/videos';
import styles from './Filter.module.css';

// 10 - Music, 25 - News & Politics , 24 - Entertainment

const Filter = () => {
  const originDatas = getVideos();
  const dispatch = useDispatch();
  const onClickFilter = async (e: React.MouseEvent<HTMLElement>) => {
    switch(e.currentTarget.textContent) {
      case '전체':
        dispatch(setVideos(await originDatas));
        break;
      case '음악':
        const musicDatas = (await originDatas).filter(video => video.snippet.categoryId === '10');
        dispatch(setVideos(musicDatas));
        break;
      case '정치':
        const sportsDatas = (await originDatas).filter(video => video.snippet.categoryId === '25');
        dispatch(setVideos(sportsDatas));
        break;
      case '엔터테인먼트':
        const enterDatas = (await originDatas).filter(video => video.snippet.categoryId === '24');
        dispatch(setVideos(enterDatas));
        break;
      default: console.log('not valid');
    }
  }
  return (
    <div className={styles.container}>
      <ul>
        <li onClick={onClickFilter}>전체</li>
        <li onClick={onClickFilter}>음악</li>
        <li onClick={onClickFilter}>정치</li>
        <li onClick={onClickFilter}>엔터테인먼트</li>
      </ul>
    </div>
  );
};

export default Filter;