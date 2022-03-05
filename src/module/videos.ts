import { getSearchVideos, SearchVideosData } from './../api/getSearchVideos';
import { getVideos, VideoDatas } from '../api/getVideos';
import {ActionType, createAction, createAsyncAction, createReducer} from 'typesafe-actions';
import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';

const GET_VIDEOS = 'mostPopular/GET_VIDEOS';
const GET_VIDEOS_SUCCESS = 'mostPopular/GET_VIDEOS_SUCCESS';
const GET_VIDEOS_FAILURE = 'mostPopular/GET_VIDEOS_FAILURE';

const GET_SEARCH = 'getSearch/GET_SEARCH';
const GET_SEARCH_SUCCESS = 'getSearch/GET_SEARCH_SUCCESS';
const GET_SEARCH_FAILURE = 'getSearch/GET_SEARCH_FAILURE';

const SET_VIDEOS = 'setVideo/SET_VIDEOS';

export const getMostPopularAsync = createAsyncAction(
  GET_VIDEOS,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAILURE
)<undefined, VideoDatas[], AxiosError>();
export const getSearchVideoAsync = createAsyncAction(
  GET_SEARCH,
  GET_SEARCH_SUCCESS,
  GET_SEARCH_FAILURE
)<undefined, SearchVideosData[], AxiosError>();
export const setVideos = createAction(SET_VIDEOS)<VideoDatas[]>();

export type MostPopularAction = ActionType<typeof getMostPopularAsync>;
export type SearchVideosAction = ActionType<typeof getSearchVideoAsync>;
export type SetVideosAction = ActionType<typeof setVideos>;

export type VideoState = {
  loading: boolean,
  datas: VideoDatas[] | SearchVideosData[] | null,
  error?: Error | null
}

export const getMostPolularThunk = (): ThunkAction<Promise<void>, RootState, null, MostPopularAction> => {
  return async dispatch => {
    const {request, success, failure} = getMostPopularAsync;
    dispatch(request());
    try {
      const videoDatas = await getVideos();
      dispatch(success(videoDatas));
    } catch (e) {
      dispatch(failure(e as AxiosError));
    }
  }
}

export const getSearchVideosThunk = (query: string): ThunkAction<Promise<void>, RootState, null, SearchVideosAction> => {
  return async dispatch => {
    const {request, success, failure} = getSearchVideoAsync;
    dispatch(request());
    try {
      const searchDatas = await getSearchVideos(query);
      dispatch(success(searchDatas));
    } catch (e) {
      dispatch(failure(e as AxiosError));
    }
  }
}

const initialState: VideoState = {
  loading: false,
  datas: null,
  error: null
}

const videos = createReducer<VideoState, MostPopularAction | SearchVideosAction | SetVideosAction >(initialState, {
  [GET_VIDEOS]: state => ({
    ...state,
    loading: true
  }),
  [GET_VIDEOS_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    datas: action.payload
  }),
  [GET_VIDEOS_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [GET_SEARCH]: state => ({
    ...state,
    loading: true
  }),
  [GET_SEARCH_SUCCESS]: (state, action) => ({
    ...state,
    loading: false,
    datas: action.payload
  }),
  [GET_SEARCH_FAILURE]: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
  [SET_VIDEOS]: (state, action) => ({
    ...state,
    datas: action.payload
  })
})

export default videos;