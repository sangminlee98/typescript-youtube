import axios from 'axios'

export const getVideos = async () => {
  try {
    const response = await axios.get<FetchVideos>(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=${process.env.REACT_APP_API_KEY}`);
    return response.data.items;
  } catch (e) {
    return ;
  }
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
  snippet: Snippet;
}

export interface Snippet {
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
