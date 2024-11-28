import * as actionTypes from './actions';

interface AdTypeOption {
  label: string;
  icon: JSX.Element | null;
  value: string;
}

interface SelectedAdTypeState {
  selectedAdType: AdTypeOption | null; // Match the structure of the payload
}

const initialState: SelectedAdTypeState = {
  selectedAdType: null,
};

type SelectedAdTypeAction = {
  type: typeof actionTypes.SET_SELECTED_ADTYPE;
  selectedAdType: AdTypeOption | null; // Match the structure
};

const selectedAdTypeReducer = (
  state: SelectedAdTypeState = initialState,
  action: SelectedAdTypeAction,
): SelectedAdTypeState => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_ADTYPE:
      return {
        ...state,
        selectedAdType: action.selectedAdType,
      };
    default:
      return state;
  }
};

export default selectedAdTypeReducer;
