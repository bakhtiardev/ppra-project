import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Todo from "./components/todo/Todo";
import Appbar from "./components/app-bar/Appbar";
const AllRoutes = () => {
  return (
    <>
      <Appbar />
      <Routes>
        <Route path="/" element={<Todo />} />
      </Routes>
    </>
  );
};

export default AllRoutes;
