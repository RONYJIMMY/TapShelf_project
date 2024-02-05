import { put, takeEvery } from "redux-saga/effects";
import {
  FETCH_INVENTORY_INIT_ACTION,
  FETCH_INVENTORY_SUCCESS_ACTION,
  FETCH_INVENTORY_FAIL_ACTION,
  ADD_INVENTORY_INIT_ACTION,
  ADD_INVENTORY_SUCCESS_ACTION,
  ADD_INVENTORY_FAIL_ACTION,
  DELETE_INVENTORY_INIT_ACTION,
  DELETE_INVENTORY_SUCCESS_ACTION,
  DELETE_INVENTORY_FAIL_ACTION,
} from "./action";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { appConfig } from "../../config";
import moment from "moment";

function* fetchInventory() {
  try {
    const res = yield fetch(`${appConfig.ip}/testGetEvents`, {
      method: "POST",
    });
    if (!res.ok) {
      let errJSON = {};
      try {
        errJSON = yield res.json();
      } catch { }
      throw Object.assign(res, errJSON);
    } else {
      const resJSON = yield res.json();
      yield put({
        type: FETCH_INVENTORY_SUCCESS_ACTION,
        payload: resJSON,
      });
    }
  } catch (err) {
    if (err.ok === false) {
      yield put({ type: FETCH_INVENTORY_FAIL_ACTION, error: err });
    } else {
    }
  }
}

function* AddInventory(value) {
  try {
    let inventory = value.value;
    let name = value.names;

    const date = moment(new Date()).format("DD/MM/yyyy");

    const data = {
      title: inventory.title,
      description: inventory.description,
      date_added: date,
      publish: inventory.publish,
      search_tags: inventory.search_tags,
      featured_image: inventory.imgUrl.name,
      inventory_image: name,
    };

    console.log(data);
    let headers = new Headers();
    headers.set("Content-type", "application/json");

    const res = yield fetch(`${appConfig.ip}/testInsertEvent`, {
      method: "POST",
      Accept: "application/json",
      headers: headers,
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      let errJSON = {};
      try {
        errJSON = yield res.json();
      } catch {
        throw Object.assign(res, errJSON);
      }
    } else {
      const resJSON = yield res.json();

      yield put({
        type: ADD_INVENTORY_SUCCESS_ACTION,
        payload: resJSON,
      });
      yield toast.success("Inventory added successfully", {
        autoClose: 3000,
      });
      yield put({
        type: FETCH_INVENTORY_INIT_ACTION,
      });
    }
  } catch (err) {
    if (err.ok === false) {
      console.log(err);
      yield put({
        type: ADD_INVENTORY_FAIL_ACTION,
        error: err,
      });
    }
  }
}

function* deleteInventory(value) {
  const id = value.value;

  let headers = new Headers();
  headers.set("Content-type", "application/json");

  try {
    const res = yield fetch(`${appConfig.ip}/testDeleteEvent`, {
      method: "POST",
      Accept: "application/json",
      headers: headers,
      body: JSON.stringify({ del_id: id }),
    });

    if (!res.ok) {
      let errJSON = {};
      try {
        errJSON = yield res.json();
      } catch { }
      throw Object.assign(res, errJSON);
    } else {
      yield put({
        type: DELETE_INVENTORY_SUCCESS_ACTION,
        payload: id,
      });
      yield toast.success("Deleted successfully", {
        autoClose: 3000,
      });
      yield put({ type: FETCH_INVENTORY_INIT_ACTION });
    }
  } catch (err) {
    if (err.ok === false) {
      yield put({ type: DELETE_INVENTORY_FAIL_ACTION, error: err });
    } else {
    }
  }
}

export function* InventoryActionWatcher() {
  yield takeEvery(FETCH_INVENTORY_INIT_ACTION, fetchInventory);
  yield takeEvery(ADD_INVENTORY_INIT_ACTION, AddInventory);
  yield takeEvery(DELETE_INVENTORY_INIT_ACTION, deleteInventory);
}
