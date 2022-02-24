import { combineReducers } from 'redux';
import selectedVideo from './selectedVideo';
import videos from './videos';
const rootReducer = combineReducers({
  videos,
  selectedVideo
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;