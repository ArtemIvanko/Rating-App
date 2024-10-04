import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Outlet } from "@shared/Navigation";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<div>123</div>} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
