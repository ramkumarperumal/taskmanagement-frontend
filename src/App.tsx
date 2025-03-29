import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Header } from "./components/Header";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { HomePage } from "./pages/HomePage";
import { TaskForm } from "./pages/HomePage/TaskForm";
import { NotFound } from "./pages/NotFound";

function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          // Define default options
          duration: 2000,
        }}
      />
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/add-task" element={<TaskForm />} />
          <Route path="/edit-task/:id" element={<TaskForm />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
