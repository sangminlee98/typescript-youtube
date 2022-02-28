import React, { Dispatch, SetStateAction, useEffect }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../../module';
import { init } from '../../module/selectedVideo';
import { getMostPolularThunk } from '../../module/videos';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';
import Video from '../video/Video';
import styles from './Content.module.css';
import HorizontalVideoCard from '../horizontalVideoCard/HorizontalVideoCard';

type Props = {
  horizon: boolean,
  setHorizon: Dispatch<SetStateAction<boolean>>
}
const Content = ({horizon, setHorizon}: Props) => {
  const parser = new DOMParser();
  const param = useParams();
  const {loading, datas} = useSelector(({videos}: RootState) => ({
    loading: videos.loading,
    datas: videos.datas
  }));
  const {selected} = useSelector(({selectedVideo}: RootState) => ({
    selected: selectedVideo?.selected
  }));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMostPolularThunk());
  },[dispatch]);
  useEffect(() => {
    if(param.id === undefined) {
      dispatch(init());
    }
  },[param,dispatch])
  if(loading) return (
    <div className={styles.loadingContainer}>
      <AiOutlineLoading3Quarters className={styles.loadingIcon}/>
    </div>
  );
  if(horizon) return (
    <div className={selected ? styles.selectedContainer : styles.container}>
      {
        datas && datas.map((video, index) => (
          <div className={styles.horizontalContainer} key={index}>
            <HorizontalVideoCard 
              id={typeof video.id === 'string' ? video.id : video.id.videoId}
              thumbnail={video.snippet.thumbnails.medium.url}
              title={parser.parseFromString(video.snippet.title,'text/html').body.innerHTML}
              channelId={video.snippet.channelId}
              publishedAt={video.snippet.publishedAt}
              video={video}
            />
          </div>
          ))
      }
      <div style={{height:'100px'}}></div>
    </div>
  )
  else return (
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
                video={video}
                setHorizon={setHorizon}
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