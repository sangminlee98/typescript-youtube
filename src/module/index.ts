import { combineReducers } from 'redux';
import mostPopular from './mostPopular';
const rootReducer = combineReducers({
  mostPopular
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;