import {createStore} from 'redux';
import {reducer} from './reducer';

export const store = createStore(reducer)

const x = store.getState().data
