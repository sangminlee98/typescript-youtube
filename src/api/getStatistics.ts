import axios from 'axios';

export const getStatistics = async (id: string) => {
  const response = await axios.get<VideoStatistics>(`https://www.googleapis.com/youtube/v3/videos?key=${process.env.REACT_APP_API_KEY}&id=${id}&part=statistics`);
  return response.data.items[0].statistics;
};

export interface VideoStatistics {
  kind:     string;
  etag:     string;
  items:    Item[];
  pageInfo: PageInfo;
}

export interface Item {
  kind:       string;
  etag:       string;
  id:         string;
  statistics: Statistics;
}

export interface Statistics {
  viewCount:     number;
  likeCount:     string;
  favoriteCount: string;
  commentCount:  string;
}

export interface PageInfo {
  totalResults:   number;
  resultsPerPage: number;
}