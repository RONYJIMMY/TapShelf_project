import { combineReducers } from 'redux';
import InventoryReducer from '../containers/InventoryContainer/reducer';

const rootReducer = combineReducers({
    InventoryReducer,
});

export default rootReducer;