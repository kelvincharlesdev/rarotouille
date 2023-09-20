import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { SignUpPassOne } from "../pages/SignUpPassOne";
import { SignUpPassTwo } from "../pages/SignUpPassTwo";
import { ForgetPassword } from "../pages/ForgetPassword";
import { ResetPassword } from "../pages/ResetPassword";
import { routes } from ".";
export const RarotouilleRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Navigate replace to="/" />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signupPassOne} element={<SignUpPassOne />} />
        <Route path={routes.signupPassTwo} element={<SignUpPassTwo />} />
        <Route path={routes.forgetPassword} element={<ForgetPassword />} />
        <Route path={routes.resetPassword} element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
};
