import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Todo from "./components/todo/Todo";
import Appbar from "./components/app-bar/Appbar";
import Dashboard from "./components/dashboard/Dashboard";
const AllRoutes = () => {
  return (
    <>
      {/* <Appbar /> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
