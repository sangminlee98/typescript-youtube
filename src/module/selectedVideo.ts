import { SearchSnippet } from './../api/getSearchVideos';
import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { ID, SearchVideosData } from '../api/getSearchVideos';
import { GetVideoSnippet, VideoDatas } from '../api/getVideos';

const SELECT = 'selectedVideo/SELECT';
const INIT = 'selectedVideo/INIT';
export type SelectVideo = VideoDatas | SearchVideosData;
export const select = createAction(SELECT)<SelectVideo>();
export const init = createAction(INIT)();

const actions = {select, init};
export type SelectActionType = ActionType<typeof actions>;

export type SelectedVideoState = {
  selected: boolean ,
  id: string | ID | null,
  snippet: GetVideoSnippet | SearchSnippet | null;
}
const initialState: SelectedVideoState| null = {
  selected: false,
  id: null,
  snippet: null
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
    snippet: null
  })
});

export default selectedVideo;



