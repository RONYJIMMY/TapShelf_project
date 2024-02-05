import Sidebar from "./components/Sidebar";
import Inventory from "./containers/InventoryContainer";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "./bootstrap.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="con">
      <ToastContainer hideProgressBar={true} />
      <Router>
        <Sidebar>
          <Routes>
            <Route path="/inventory" element={<Inventory />} />
          </Routes>
        </Sidebar>
      </Router>
    </div>
  );
}

export default App;
