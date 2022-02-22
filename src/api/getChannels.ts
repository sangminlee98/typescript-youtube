import axios from 'axios';

export const getChannels = async (id: string) => {
  const response = await axios.get<ChannelData>(`https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${id}&key=${process.env.REACT_APP_API_KEY}`);
  return response.data.items[0].snippet;
};

export interface ChannelData {
  kind:     string;
  etag:     string;
  pageInfo: PageInfo;
  items:    Item[];
}

export interface Item {
  kind:    string;
  etag:    string;
  id:      string;
  snippet: ChannelInfo;
}

export interface ChannelInfo {
  title:       string;
  description: string;
  customUrl:   string;
  publishedAt: Date;
  thumbnails:  Thumbnails;
  localized:   Localized;
}

export interface Localized {
  title:       string;
  description: string;
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
