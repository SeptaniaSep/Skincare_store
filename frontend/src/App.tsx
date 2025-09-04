import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import Layout from "./components/layout";
import RegisterPage from "./pages/register";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login tanpa layout */}
        <Route path="/login" element={<LoginPage />} />
         <Route path="/register" element={<RegisterPage />} />

        {/* Dashboard pakai layout */}
        <Route path="/" element={<Layout />}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
