import React, { useEffect, useState } from 'react';
import { ChannelInfo, getChannels } from '../../api/getChannels';
import { getStatistics, Statistics } from '../../api/getStatistics';
import styles from './Video.module.css';

type Props = {
  id: string,
  thumbnail: string,
  title: string,
  channelId: string
}
const Video = ({id, thumbnail, title, channelId}: Props) => {
  const [statistics, setStatistics] = useState<Statistics | null>();
  const [channelInfo, setChannelInfo] = useState<ChannelInfo | null>();
  const onGetStatistics = async (id: string) => {
    const staitstics = await getStatistics(id);
    setStatistics(staitstics);
  }
  const onGetChannelInfo = async (id: string) => {
    const channelInfo = await getChannels(id);
    setChannelInfo(channelInfo);
  }
  useEffect(() => {
    onGetStatistics(id);
    onGetChannelInfo(channelId);
  },[id, channelId]);
  return (
    <div className={styles.container}>
      <img src={thumbnail} alt="thumbnail" className='thumbnail' />
      <h3>{title}</h3>
      <p>조회수: {statistics && statistics.viewCount}</p>
      <p>좋아요 수: {statistics && statistics.likeCount}</p>
      <img src={channelInfo?.thumbnails.medium.url} alt="channelThumbnail" />
      <p>채널이름 : {channelInfo && channelInfo.title}</p>
    </div>
  );
};

export default Video;