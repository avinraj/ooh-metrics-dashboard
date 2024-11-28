import { combineReducers } from 'redux';

// reducer import
import selectedMenuReducer from './selectedMenuReducer';
import selectedAdTypeReducer from './selectedAdTypeReducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  selectedMenu: selectedMenuReducer,
  selectedAdType: selectedAdTypeReducer
});

export default reducer;
