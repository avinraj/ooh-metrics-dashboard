import { combineReducers } from 'redux';

// reducer import
import selectedMenuReducer from './selectedMenuReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  selectedMenu: selectedMenuReducer,
});

export default reducer;
