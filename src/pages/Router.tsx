import { BrowserRouter, Route, Routes } from "react-router-dom";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Home page</div>} />
      <Route path="*" element={<div>Not Found</div>} />
    </Routes>
  </BrowserRouter>
);
