import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUpPassOne } from "../pages/SignUpPassOne";
import { SignUpPassTwo } from "../pages/SignUpPassTwo";
import { ForgetPassword } from "../pages/ForgetPassword";
import { ResetPassword } from "../pages/ResetPassword";
import { routes } from ".";
import { Home } from "../pages/Home";
import { DishDetails } from "../pages/DishDetails";
import { DishesList } from "../pages/DishesList";
import { Favorites } from "../pages/Favorites";
import { Orders } from "../pages/Orders";
import { Profile } from "../pages/Profile";
import { useAuthContext } from "../contexts/AuthContext";
export const RarotouilleRoutes = () => {
  //TODO trocar pelo contexto dps
  const { isAuthenticated } = useAuthContext();
  return (
    <BrowserRouter>
      <Routes>
        {isAuthenticated ? (
          <>
            <Route path="/*" element={<Navigate replace to="/home" />} />
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.dishDetails()} element={<DishDetails />} />
            <Route path={routes.dishesList} element={<DishesList />} />
            <Route path={routes.favorites} element={<Favorites />} />
            <Route path={routes.orders} element={<Orders />} />
            <Route path={routes.profile} element={<Profile />} />
          </>
        ) : (
          <>
            <Route path="/*" element={<Navigate replace to="/" />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.signupPassOne} element={<SignUpPassOne />} />
            <Route path={routes.signupPassTwo} element={<SignUpPassTwo />} />
            <Route path={routes.forgetPassword} element={<ForgetPassword />} />
            <Route path={routes.resetPassword} element={<ResetPassword />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};
