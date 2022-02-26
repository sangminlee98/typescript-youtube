import React from 'react';
import { TopLevelComment } from '../../api/getComments';
import styles from './Comment.module.css';
import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai';
import 'moment/locale/ko';
import * as moment from 'moment';
import processCount from '../../utils/processCount';
moment.locale('ko'); 

type Props = {
  comment: TopLevelComment
}
const Comment = ({comment}: Props) => {
  return (
    <div className={styles.container}>
      <img className={styles.profileImage} src={comment.snippet.authorProfileImageUrl} alt='profileImage' />
      <div className={styles.metadata}>
        <div className={styles.authorInfo}>
          <h4>{comment.snippet.authorDisplayName}</h4>
          <p>{moment.default(comment.snippet.publishedAt).fromNow()}</p>
        </div>
        <p className={styles.comment}>{comment.snippet.textOriginal}</p>
        <div className={styles.commentMetaData}>
          <AiOutlineLike className={styles.icon}/>
          <p className={styles.likeCount}>{processCount(comment.snippet.likeCount)}</p>
          <AiOutlineDislike className={styles.icon}/>
        </div>
      </div>
    </div>
  );
};

export default Comment;