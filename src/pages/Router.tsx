import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Outlet } from "@shared/Navigation";
import { Home } from "@/pages/Home";
import { ItemDetail } from "@shared/Feedback";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Outlet />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<Home />} />
        <Route path="item/:itemId" element={<ItemDetail />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
