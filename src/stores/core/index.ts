import { ISagaModule } from 'redux-dynamic-modules-saga';
import { CoreState, reducer, saga } from './';

export * from './actions';
export * from './reducers';
export * from './sagas';
export * from './types';

export function storeModule(): ISagaModule<CoreState> {
  return {
    id: 'core',
    reducerMap: {
      core: reducer
    } as any,
    sagas: [saga],
    initialActions: [],
    finalActions: []
  };
}
