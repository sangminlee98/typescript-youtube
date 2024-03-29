import axios from 'axios'

export const getVideos = async () => {
  const response = await axios.get<FetchVideos>(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=100&key=${process.env.REACT_APP_API_KEY}`);
  return response.data.items;
}

interface FetchVideos {
  kind: string;
  etag: string;
  items: VideoDatas[]
}

export interface VideoDatas {
  kind:    string;
  etag:    string;
  id:      string;
  snippet: GetVideoSnippet;
}

export interface GetVideoSnippet {
  publishedAt:          Date;
  channelId:            string;
  title:                string;
  description:          string;
  thumbnails:           Thumbnails;
  channelTitle:         string;
  tags:                 string[];
  categoryId:           string;
  liveBroadcastContent: string;
}

export interface Thumbnails {
  default:  Default;
  medium:   Default;
  high:     Default;
  standard: Default;
  maxres:   Default;
}

export interface Default {
  url:    string;
  width:  number;
  height: number;
}
