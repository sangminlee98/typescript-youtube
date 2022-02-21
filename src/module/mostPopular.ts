import { getVideos, VideoDatas } from './../api/getVideos';
import {ActionType, createAsyncAction, createReducer} from 'typesafe-actions';
import { AxiosError } from 'axios';
import { ThunkAction } from 'redux-thunk';
import { RootState } from './index';

const GET_VIDEOS = 'mostPopular/GET_VIDEOS';
const GET_VIDEOS_SUCCESS = 'mostPopular/GET_VIDEOS_SUCCESS';
const GET_VIDEOS_FAILURE = 'mostPopular/GET_VIDEOS_FAILURE';

export const getMostPopularAsync = createAsyncAction(
  GET_VIDEOS,
  GET_VIDEOS_SUCCESS,
  GET_VIDEOS_FAILURE
)<undefined, VideoDatas[], AxiosError>();

export type MostPopularAction = ActionType<typeof getMostPopularAsync>;

export type VideoState = {
  loading: boolean,
  datas: VideoDatas[] | null,
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

const initialState: VideoState = {
  loading: false,
  datas: null,
  error: null
}

const mostPoular = createReducer<VideoState, MostPopularAction>(initialState, {
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
  })
})

export default mostPoular;