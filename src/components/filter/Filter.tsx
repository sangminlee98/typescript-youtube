import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getVideos } from '../../api/getVideos';
import { setVideos } from '../../module/videos';
import styles from './Filter.module.css';

// 10 - Music, 25 - News & Politics , 24 - Entertainment
type FilterName = '전체' | '음악' | '정치' | '엔터';
const Filter = () => {
  const [filterName, setFilterName] = useState<FilterName>('전체');
  const originDatas = getVideos();
  const dispatch = useDispatch();
  const onClickFilter = async (e: React.MouseEvent<HTMLElement>) => {
    switch(e.currentTarget.textContent) {
      case '전체':
        dispatch(setVideos(await originDatas));
        setFilterName('전체');
        break;
      case '음악':
        const musicDatas = (await originDatas).filter(video => video.snippet.categoryId === '10');
        dispatch(setVideos(musicDatas));
        setFilterName('음악');
        break;
      case '정치':
        const sportsDatas = (await originDatas).filter(video => video.snippet.categoryId === '25');
        dispatch(setVideos(sportsDatas));
        setFilterName('정치');
        break;
      case '엔터테인먼트':
        const enterDatas = (await originDatas).filter(video => video.snippet.categoryId === '24');
        dispatch(setVideos(enterDatas));
        setFilterName('엔터');
        break;
      default: console.log('not valid');
    }
  }
  return (
      <ul className={styles.container}>
        <li onClick={onClickFilter} className={filterName === '전체' ? styles.active : ''}>전체</li>
        <li onClick={onClickFilter} className={filterName === '음악' ? styles.active : ''}>음악</li>
        <li onClick={onClickFilter} className={filterName === '정치' ? styles.active : ''}>정치</li>
        <li onClick={onClickFilter} className={filterName === '엔터' ? styles.active : ''}>엔터테인먼트</li>
      </ul>
  );
};

export default Filter;