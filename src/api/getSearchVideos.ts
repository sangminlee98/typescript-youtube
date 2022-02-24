import axios from 'axios';

export const getSearchVideos = async (query: string) => {
  const response = await axios.get<SearchVideos>(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=${process.env.REACT_APP_API_KEY}`);
  return response.data.items;
}

export interface SearchVideos {
  kind:          string;
  etag:          string;
  nextPageToken: string;
  regionCode:    string;
  pageInfo:      PageInfo;
  items:         SearchVideosData[];
}

export interface SearchVideosData {
  kind:    ItemKind;
  etag:    string;
  id:      ID;
  snippet: Snippet;
}

export interface ID {
  kind:    IDKind;
  videoId: string;
}

export enum IDKind {
  YoutubeVideo = "youtube#video",
}

export enum ItemKind {
  YoutubeSearchResult = "youtube#searchResult",
}

export interface Snippet {
  publishedAt:          Date;
  channelId:            string;
  title:                string;
  description:          string;
  thumbnails:           Thumbnails;
  channelTitle:         string;
  liveBroadcastContent: LiveBroadcastContent;
  publishTime:          Date;
}

export enum LiveBroadcastContent {
  Live = "live",
  None = "none",
}

export interface Thumbnails {
  default: Default;
  medium:  Default;
  high:    Default;
}

export interface Default {
  url:    string;
  width:  number;
  height: number;
}

export interface PageInfo {
  totalResults:   number;
  resultsPerPage: number;
}
