import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "@shared/Navigation";
import { Login, SignUp } from "@shared/auth";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Navigate to="/home" />} />
        <Route path="home" element={<div>123</div>} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="*" element={<div>Not Found</div>} />
      </Route>
    </Routes>
  </BrowserRouter>
);
