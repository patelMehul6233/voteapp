import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
  ReducerManager
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { reducer, appReducerState} from './appReducer';
export interface State {

}
export interface AppState {
  appReducer: appReducerState; 
};
export const reducers: ActionReducerMap<AppState> = {
  appReducer : reducer
};
export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
