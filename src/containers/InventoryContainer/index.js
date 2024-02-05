import * as React from "react";
import { connect } from "react-redux";

import Inventory from "../../components/inventory";
import { fetchInventory, AddInventory, DeleteInventory } from "./action";
class InventoryContainer extends React.Component<Props, State> {
  render() {
    return (
      <Inventory
        fetchInventory={this.props.fetchInventory}
        addInventory={this.props.addInventory}
        InventoryList={this.props.InventoryList}
        deleteInventory={this.props.deleteInventory}
      />
    );
  }
}
function bindAction(dispatch) {
  return {
    fetchInventory: () => {
      dispatch(fetchInventory());
    },
    addInventory: (inventory, name) => {
      dispatch(AddInventory(inventory, name));
    },
    deleteInventory: (id) => {
      dispatch(DeleteInventory(id));
    },
  };
}

const mapStateToProps = (state) => {
  return {
    InventoryList: state.InventoryReducer.InventoryList,
  };
};

export default connect(mapStateToProps, bindAction)(InventoryContainer);
