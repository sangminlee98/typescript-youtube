import axios from 'axios';

export const getComments = async (videoId: string) => {
  const response = await axios.get<Comments>(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoId}&key=${process.env.REACT_APP_API_KEY}`);
  return response.data;
}

export interface Comments {
  kind:          string;
  etag:          string;
  nextPageToken: string;
  pageInfo:      PageInfo;
  items:         Item[];
}

export interface Item {
  kind:    ItemKind;
  etag:    string;
  id:      string;
  snippet: ItemSnippet;
}

export enum ItemKind {
  YoutubeCommentThread = "youtube#commentThread",
}

export interface ItemSnippet {
  videoId:         VideoID;
  topLevelComment: TopLevelComment;
  canReply:        boolean;
  totalReplyCount: number;
  isPublic:        boolean;
}

export interface TopLevelComment {
  kind:    TopLevelCommentKind;
  etag:    string;
  id:      string;
  snippet: TopLevelCommentSnippet;
}

export enum TopLevelCommentKind {
  YoutubeComment = "youtube#comment",
}

export interface TopLevelCommentSnippet {
  videoId:               VideoID;
  textDisplay:           string;
  textOriginal:          string;
  authorDisplayName:     string;
  authorProfileImageUrl: string;
  authorChannelUrl:      string;
  authorChannelId:       AuthorChannelID;
  canRate:               boolean;
  viewerRating:          ViewerRating;
  likeCount:             number;
  publishedAt:           Date;
  updatedAt:             Date;
}

export interface AuthorChannelID {
  value: string;
}

export enum VideoID {
  JBYU6Oe2EE = "JB_yU6Oe2eE",
}

export enum ViewerRating {
  None = "none",
}

export interface PageInfo {
  totalResults:   number;
  resultsPerPage: number;
}
