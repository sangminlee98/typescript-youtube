import { SearchSnippet } from './../api/getSearchVideos';
import { createAction, ActionType, createReducer } from 'typesafe-actions';
import { ID, SearchVideosData } from '../api/getSearchVideos';
import { GetVideoSnippet, VideoDatas } from '../api/getVideos';

const SELECT = 'selectedVideo/SELECT';
export type SelectVideo = VideoDatas | SearchVideosData;
export const select = createAction(SELECT)<SelectVideo>();
export type SelectActionType = ActionType<typeof select>;

export type SelectedVideoState = {
  id: string | ID,
  snippet: GetVideoSnippet | SearchSnippet;
}
const initialState: SelectedVideoState| null = null;

const selectedVideo = createReducer<SelectedVideoState | null, SelectActionType>(initialState, {
  [SELECT]: (state, action) => ({
    id: typeof action.payload.id === 'string' ? action.payload.id : action.payload.id.videoId,
    snippet: action.payload.snippet
  })
});

export default selectedVideo;



