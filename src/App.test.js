import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import test from 'tape';
import { put, call } from 'redux-saga/effects';

import { createHuman } from '../src/sagas';

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });

test('createHuman Saga test', assert => {
  const gen = createHuman();
  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  );
});
