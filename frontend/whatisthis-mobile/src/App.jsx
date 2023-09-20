import React, { useEffect, useReducer, useRef } from "react";

import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Connection from "./pages/Connection";
import ConnectionResult from "./pages/ConnectionResult";
import HouseDetail from "./pages/HouseDetail";
import HouseList from "./pages/HouseList";
import HouseResult from "./pages/HouseResult";
import Search from "./pages/Search";
import SearchDetail from "./pages/SearchDetail";
import Health from "./pages/Health";

// testpage
import TestPage from "./test/TestPage";
import Camera from "./pages/Camera";

function App() {
  const BASE_NAME = process.env.REACT_APP_BASE_NAME || "";

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/health" element={<Health />} />
        </Routes>
      </BrowserRouter>

      <BrowserRouter basename={BASE_NAME}>
        <Routes>
          <Route path="/test" element={<TestPage />} />
          <Route path="" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connection/:buildingId/:houseId" element={<Connection />} />
          <Route path="/connection/:buildingId/:houseId/result" element={<ConnectionResult />} />
          <Route path="/house/:buildingId/:houseId" element={<HouseDetail />} />
          <Route path="/houselist/:buildingId" element={<HouseList />} />
          <Route path="/house/:buildingId/:houseId/result" element={<HouseResult />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:id" element={<SearchDetail />} />
          <Route path="/camera" element={<Camera />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
