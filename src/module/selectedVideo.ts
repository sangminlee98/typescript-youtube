import { SearchSnippet } from './../api/getSearchVideos';
import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { ID, SearchVideosData } from '../api/getSearchVideos';
import { GetVideoSnippet, VideoDatas } from '../api/getVideos';
import { Statistics } from '../api/getStatistics';
import { ChannelInfo } from '../api/getChannels';

const SELECT = 'selectedVideo/SELECT';
const INIT = 'selectedVideo/INIT';
const SELECT_STATISTICS = 'selectedVideo/SELECT_STATISTICS';
const SELECT_CHANNEL = 'selectedVideo/SELECT_CHANNEL';
export type SelectVideo = VideoDatas | SearchVideosData;
export const select = createAction(SELECT)<SelectVideo>();
export const init = createAction(INIT)();
export const selectStatistics = createAction(SELECT_STATISTICS)<Statistics>();
export const selectChannel = createAction(SELECT_CHANNEL)<ChannelInfo>();

const actions = {select, init, selectStatistics, selectChannel};
export type SelectActionType = ActionType<typeof actions>;

export type SelectedVideoState = {
  selected: boolean ,
  id?: string | ID | null,
  snippet?: GetVideoSnippet | SearchSnippet | null,
  statistics?: Statistics | null,
  channelInfo?: ChannelInfo | null
}
const initialState: SelectedVideoState| null = {
  selected: false,
  id: null,
  snippet: null,
  statistics: null,
  channelInfo: null
}

const selectedVideo = createReducer<SelectedVideoState | null, SelectActionType>(initialState, {
  [SELECT]: (state, action) => ({
    ...state,
    selected: true,
    id: typeof action.payload.id === 'string' ? action.payload.id : action.payload.id.videoId,
    snippet: action.payload.snippet
  }),
  [INIT]: state => ({
    ...state,
    selected: false,
    id: null,
    snippet: null,
    statistics: null,
    channelInfo: null,
  }),
  [SELECT_STATISTICS]: (state, action) => ({
    ...state,
    selected: true,
    statistics: action.payload
  }),
  [SELECT_CHANNEL]: (state, action) => ({
    ...state,
    selected: true,
    channelInfo: action.payload
  })
});

export default selectedVideo;



