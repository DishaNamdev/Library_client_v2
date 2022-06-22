import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute";
import BookDetails from "./pages/BookDetails";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SearchBook from "./pages/SearchBook";
import Admin from "./pages/Admin";
import { Toaster } from "react-hot-toast";
import EditProfile from "./pages/EditProfile";
function App() {
  return (
    <div className="w-full md:w-4/12 xl:w-3/12 mx-auto bg-gray-50 min-h-screen">
      <Toaster />
      <Routes>
        <Route
          exact
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/book/:id"
          element={
            <PrivateRoute>
              <BookDetails />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/search"
          element={
            <PrivateRoute>
              <SearchBook />
            </PrivateRoute>
          }
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/setting"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
