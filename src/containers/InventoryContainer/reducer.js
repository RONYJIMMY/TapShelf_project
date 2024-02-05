import {
  FETCH_INVENTORY_SUCCESS_ACTION,
  DELETE_INVENTORY_SUCCESS_ACTION,
} from "./action";

const initialState = {
  error: false,
};

export default function (state: any = initialState, action: Function) {
  switch (action.type) {
    case FETCH_INVENTORY_SUCCESS_ACTION:
      return {
        ...state,
        InventoryList: action.payload.event_list,
      };

    case DELETE_INVENTORY_SUCCESS_ACTION:
      return {
        ...state,
        InventoryList: state.InventoryList.filter(
          (item) => item.id !== action.payload
        ),
      };

    default:
      return {
        ...state,
      };
  }
}
