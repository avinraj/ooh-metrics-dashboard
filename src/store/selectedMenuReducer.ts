import * as actionTypes from './actions';

interface SelectedMenuState {
  selectedMenu: string | null;
}

const initialState: SelectedMenuState = {
  selectedMenu: null,
};

type SelectedMenuAction = {
  type: typeof actionTypes.SET_SELECTED_MENU;
  selectedMenu: string | null;
};

const selectedMenuReducer = (
  state: SelectedMenuState = initialState,
  action: SelectedMenuAction,
): SelectedMenuState => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: action.selectedMenu,
      };
    default:
      return state;
  }
};

export default selectedMenuReducer;
