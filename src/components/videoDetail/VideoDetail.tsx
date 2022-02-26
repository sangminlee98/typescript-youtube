import React, { useEffect, useState } from 'react';
import styles from './VideoDetail.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../module';
import processViewCount from '../../utils/processViewCount';
import 'moment/locale/ko';
import * as moment from 'moment';
import { ChannelStatistics, getChannelStatistics } from '../../api/getChannelStatistics';
import processSubscribeCount from '../../utils/processSubscribeCount';
import { Comments, getComments } from '../../api/getComments';
import Comment from '../comment/Comment';
moment.locale('ko');

const VideoDetail = () => {
  const parser = new DOMParser();
  const [channelStatistics, setChannelStatistics] = useState<ChannelStatistics | null>();
  const [comments, setComments] = useState<Comments | null>();
  const {id, snippet, statistics, channelInfo} = useSelector(({selectedVideo}: RootState) => ({
    id: typeof selectedVideo?.id === 'string' ? selectedVideo.id : selectedVideo?.id?.videoId,
    snippet: selectedVideo?.snippet,
    statistics: selectedVideo?.statistics,
    channelInfo: selectedVideo?.channelInfo
  }));
  const onGetChannelStatistics = async (id: string) => {
    const statistics = await getChannelStatistics(id);
    setChannelStatistics(statistics);
  };
  const onGetComments = async (videoId: string) => {
    const commentsData = await getComments(videoId);
    setComments(commentsData);
  }
  useEffect(() => {
    onGetChannelStatistics(snippet?.channelId!);
    id && onGetComments(id);
  },[snippet,id]);
  channelStatistics && console.log(channelStatistics.subscriberCount);
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
      <div className={styles.titleContainer}>
        <h2 className={styles.title}>{parser.parseFromString(snippet!.title,'text/html').body.innerHTML}</h2>
        <div className={styles.metadata}>
          <p className={styles.viewCount}>{processViewCount(statistics!.viewCount)}</p>
          <p className={styles.publishedAt}>{moment.default(snippet?.publishedAt).format('YYYY. MM. DD')}</p>
        </div>
      </div>
      <hr />
      <div className={styles.channelContainer}>
        <img className={styles.channelThumbnail} src={channelInfo?.thumbnails.medium.url} alt="channelThumbnail" />
        <div className={styles.channelInfo}>
          <h3 className={styles.channelTitle}>{channelInfo?.title}</h3>
          {
            channelStatistics?.hiddenSubscriberCount ? null : <p className={styles.channelSubscribe}>{processSubscribeCount(channelStatistics?.subscriberCount!)}</p>
          }
          <p className={styles.describe}>{snippet?.description}</p>
        </div>
      </div>
      <hr />
      <div className={styles.commentsContainer}>
        <h3>댓글 {comments?.pageInfo.totalResults}개</h3>
        {
          comments && comments.items.map(comment => (<Comment key={comment.id} comment={comment.snippet.topLevelComment}/>))
        }
      </div>
      <div style={{height: '100px'}}></div>
    </div>
  );
};

export default VideoDetail;