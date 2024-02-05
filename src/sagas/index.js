import { call, all } from 'redux-saga/effects'
import { InventoryActionWatcher } from '../containers/InventoryContainer/saga'

function* rootSaga() {
  yield all([
    call(InventoryActionWatcher),
  ])
}

export default rootSaga