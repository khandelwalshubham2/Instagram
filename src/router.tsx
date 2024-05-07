import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RootLayout from "./root/RootLayout";
import SigninForm from "./auth/form/SigninForm";
import SignupForm from "./auth/form/SignupForm";
import AuthLayout from "./auth/AuthLayout.tsx";
import { CreatePost, EditPost, Home } from "./root/pages/index.ts";
import App from "./App.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/create-post" element={<CreatePost />}></Route>
        <Route path="/update-post/:id" element={<EditPost />} />
      </Route>
      <Route element={<AuthLayout />}>
        <Route path="sign-in" element={<SigninForm />} />
        <Route path="sign-up" element={<SignupForm />} />
      </Route>
    </Route>
  )
);

export default router;
