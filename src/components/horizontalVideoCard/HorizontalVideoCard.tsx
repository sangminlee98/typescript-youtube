import React, { useEffect, useState } from 'react';
import { ChannelInfo, getChannels } from '../../api/getChannels';
import { getStatistics, Statistics } from '../../api/getStatistics';
import processViewCount from '../../utils/processViewCount';
import styles from './HorizontalVideoCard.module.css';
import "moment/locale/ko"
import * as moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';
import { VideoDatas } from '../../api/getVideos';
import { SearchVideosData } from '../../api/getSearchVideos';
import { select, selectChannel, selectStatistics } from '../../module/selectedVideo';
import { Link } from 'react-router-dom';
import { RootState } from '../../module';
moment.locale('ko');
type Props = {
  id: string,
  thumbnail: string,
  title: string,
  channelId: string,
  publishedAt: Date,
  video: VideoDatas | SearchVideosData
}
const HorizontalVideoCard = ({id, thumbnail, title, channelId, publishedAt, video}: Props) => {
  const [statistics, setStatistics] = useState<Statistics | null>();
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>();
  const {selected} = useSelector(({selectedVideo}: RootState) => ({
    selected: selectedVideo?.selected
  }))
  const dispatch = useDispatch();
  const onGetStatistics = async (id: string) => {
    const staitstics = await getStatistics(id);
    setStatistics(staitstics);
  }
  const onGetChannelInfo = async (id: string) => {
    const channelInfo = await getChannels(id);
    setChannelInfo(channelInfo);
  }
  const onClick = () => {
    dispatch(select(video));
    statistics && dispatch(selectStatistics(statistics));
    channelInfo && dispatch(selectChannel(channelInfo));
  }
  useEffect(() => {
    onGetStatistics(id);
    onGetChannelInfo(channelId);
  },[id, channelId]);
  return (
    <Link to={`/video/${id}`}>
      <div className={styles.container} onClick={onClick}>
        <img src={thumbnail} alt="thumbnail" className={styles.thumbnail}/>
        <div className={styles.metadata}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.videoMetadata}>
            <p className={styles.viewCount}>{processViewCount(statistics?.viewCount!)}</p>
            <p className={styles.publishedAt}>{moment.default(publishedAt).fromNow()}</p>
          </div>
          <div className={styles.channelMetadata}>
            <img className={styles.channelThumbnail} src={channelInfo?.thumbnails.medium.url} alt="channelThumbnail"/>
            <p className={styles.channelTitle}>{channelInfo?.title}</p>
          </div>
          <p className={styles.desc}>{video.snippet.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default HorizontalVideoCard;