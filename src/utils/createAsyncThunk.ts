import { Dispatch } from 'react';
import { AsyncActionCreatorBuilder } from 'typesafe-actions';

type AnyCreateAsyncAction = AsyncActionCreatorBuilder<[any, any], [any, any], [any, any]>;

export default function createAsyncThunk<A extends AnyCreateAsyncAction, F extends (...params: any[]) => Promise<any>>(
  asyncActionCreator: A,
  promiseCreator: F
) {
  type Params = Parameters<F>;
  return function thunk(...params: Params) {
    return async (dispatch: Dispatch<any>) => {
      const {request, success, failure} = asyncActionCreator;
      dispatch(request(undefined));
      try {
        const response = await promiseCreator(...params);
        dispatch(success(response));
      } catch (e) {
        dispatch(failure(e));
      }
    }
  }
}