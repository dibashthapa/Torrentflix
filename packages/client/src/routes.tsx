import { BrowserRouter, Routes as ReactRoutes, Route } from "react-router-dom";
import { PrivateElement } from "./components/PrivateRoute";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { Video } from "./pages/videos";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path={"/"} element={<PrivateElement element={<Home />} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/videos" element={<Video />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
