
import React, { useEffect, useState } from 'react';
import { ChannelInfo, getChannels } from '../../api/getChannels';
import { getStatistics, Statistics } from '../../api/getStatistics';
import processViewCount from '../../utils/processViewCount';
import styles from './Video.module.css';
import "moment/locale/ko"
import * as moment from 'moment'
moment.locale('ko');

type Props = {
  id: string,
  thumbnail: string,
  title: string,
  channelId: string,
  publishedAt: Date
}
const Video = ({id, thumbnail, title, channelId, publishedAt}: Props) => {
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
      <img src={thumbnail} alt="thumbnail" className={styles.thumbnail} />
      <div className={styles.info}>
        <img src={channelInfo?.thumbnails.medium.url} alt="channelThumbnail" className={styles.channelThumbnail}/>
        <div className={styles.metadata}>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.channelTitle}>{channelInfo?.title}</p>
          <div className={styles.desc}>
            <span className={styles.viewCount}>{processViewCount(statistics?.viewCount!)}</span>
            <span className={styles.publishedAt}>{moment.default(publishedAt).fromNow()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Video;