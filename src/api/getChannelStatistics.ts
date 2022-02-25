import axios from 'axios';

export const getChannelStatistics = async (id: string) => {
  const response = await axios.get<GetChannelStatistics>(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${id}&key=${process.env.REACT_APP_API_KEY}`);
  return response.data.items[0].statistics;
}

export interface GetChannelStatistics {
  kind:     string;
  etag:     string;
  pageInfo: PageInfo;
  items:    Item[];
}

export interface Item {
  kind:       string;
  etag:       string;
  id:         string;
  statistics: ChannelStatistics;
}

export interface ChannelStatistics {
  viewCount:             string;
  subscriberCount:       number;
  hiddenSubscriberCount: boolean;
  videoCount:            string;
}

export interface PageInfo {
  totalResults:   number;
  resultsPerPage: number;
}
