import React, { useState, useEffect } from "react";
import { Table, Card, Button } from "react-bootstrap";
import AddInventory from "./AddInventory";
import ViewInventory from "./ViewInventory";
import NodataMsg from "../../Common/NodataMsg";
import CardHeader from "../../Common/CardHeader";
import DeleteModal from "./DeleteModal";
import "../../Common/cmnStyle.css";
import { FaPlus, FaEye, FaTrash } from "react-icons/fa";

function Inventory(props) {
  const [showAddModel, setShowAddModel] = useState(false);
  const [showEditModel, setShowEditModel] = useState(false);
  const [showDelModel, setShowDelModel] = useState(false);
  const [showViewModel, setshowViewModel] = useState(false);
  const [ItemList, setItemList] = useState("");
  const [InventoryList, setInventoryList] = useState("");
  const [page, setPage] = useState("0");

  useEffect(() => {
    console.log("Mountiinngggg");

    props.fetchInventory();
  }, []);

  function handleAddInventory() {
    setShowAddModel(true);
  }
  function closeAddModel() {
    setShowAddModel(false);
    setItemList("");
  }
  function handleDelModel(item) {
    setShowDelModel(true);
    setItemList(item);
  }

  function closeDelModel() {
    setShowDelModel(false);
    setItemList("");
  }
  function handleViewModel(item) {
    setshowViewModel(true);
    setItemList(item);
  }
  function closeViewModel() {
    setshowViewModel(false);
    setItemList("");
  }

  let p = page + 1;

  return (
    <div>
      <div>
        <div>
          <div className="userDiv">
            <Card>
              <Card.Header>
                <CardHeader title="Inventory" hasSearch={false} />
              </Card.Header>
              <Card.Body>
                <Button
                  className="btn_cmn"
                  style={{ marginBottom: "15px" }}
                  onClick={() => handleAddInventory()}
                >
                  <FaPlus />
                  <span style={{ marginLeft: "5px", fontWeight: "bold" }}>
                    ADD
                  </span>
                </Button>
                {showAddModel ? (
                  <AddInventory
                    showAddModel={showAddModel}
                    addInventory={props.addInventory}
                    closeAddModel={closeAddModel}
                    ItemList={ItemList}
                  />
                ) : null}
                <Table responsive className="cmnMainTable">
                  <thead>
                    <tr className="cmnMainTableHd">
                      <th>Sl No</th>
                      <th>Title</th>
                      <th>Short Description</th>
                      <th>Publish</th>
                      <th>Created Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.InventoryList &&
                      props.InventoryList.map((item, i) => (
                        <tr key={i}>
                          <td>{10 * (p - 1) + i + 1}</td>

                          <td className="cmn_Cap">
                            {item !== null && item.title}
                          </td>

                          <td className="cmn_Cap">
                            {item !== null && item.short_descripton}
                          </td>
                          <td className="cmn_Cap">
                            {item !== null && item.publish}
                          </td>
                          <td className="cmn_Cap">
                            {item !== null &&
                              item.date_added !== null &&
                              item.date_added}
                          </td>

                          <td className="cmnViewIcon">
                            <div
                              style={{
                                display: "flex"
                              }}
                            >
                              <FaEye
                                size={20}
                                style={{ paddingTop: 5 }}
                                onClick={() => handleViewModel({ item: item })}
                              />
                              <FaTrash
                                size={23}
                                style={{
                                  paddingLeft: 10,

                                }}
                                onClick={() => handleDelModel(item)}
                              />
                              {showDelModel ? (
                                <DeleteModal
                                  showDelModel={showDelModel}
                                  closeDelModel={closeDelModel}
                                  ItemList={ItemList}
                                  deleteInventory={props.deleteInventory}
                                />
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
                {(props.InventoryList === undefined ||
                  (props.InventoryList && props.InventoryList.length === 0)) && <NodataMsg />}

                {showViewModel ? (
                  <ViewInventory
                    showViewModel={showViewModel}
                    closeViewModel={closeViewModel}
                    ItemList={ItemList}
                  />
                ) : null}
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
  // }
}

export default Inventory;
