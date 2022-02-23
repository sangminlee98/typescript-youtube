import { combineReducers } from 'redux';
import videos from './videos';
const rootReducer = combineReducers({
  videos
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;