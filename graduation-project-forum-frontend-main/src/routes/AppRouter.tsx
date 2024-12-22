import { Routes, Route, Navigate } from "react-router";
import RestrictedRoute from "../components/RestrictedRoute";
import PrivateRoute from "../components/PrivateRoute";
import React from "react";
const Home = React.lazy(() => import("../views/Home"));
const Login = React.lazy(() => import("../views/Login"));
const Issue = React.lazy(() => import("../views/Issue"));
const SingleIssue = React.lazy(() => import("../views/SingleIssue"));
const SinglePost = React.lazy(() => import("../views/SinglePost"));
const Appendix = React.lazy(() => import("../views/Appendix"));
const ListPostOfIssue = React.lazy(() => import("../views/ListPostOfIssue"));

function AppRouter() {
  return (
    <Routes>
      <Route
        index
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/post/:id"
        element={
          <PrivateRoute>
            <SinglePost />
          </PrivateRoute>
        }
      />
      <Route
        path="/issue/:id"
        element={
          <PrivateRoute>
            <SingleIssue />
          </PrivateRoute>
        }
      />
      <Route
        path="/issue"
        element={
          <PrivateRoute>
            <Issue />
          </PrivateRoute>
        }
      />
      <Route
        path="/issue/:id/posts"
        element={
          <PrivateRoute>
            <ListPostOfIssue />
          </PrivateRoute>
        }
      />
      <Route
        path="/appendix"
        element={
          <PrivateRoute>
            <Appendix />
          </PrivateRoute>
        }
      />
      <Route
        path="/login"
        element={
          <RestrictedRoute>
            <Login />
          </RestrictedRoute>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRouter;
