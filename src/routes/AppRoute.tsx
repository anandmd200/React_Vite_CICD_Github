import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";

// const Setting = lazy(() => import("./pages/dashboard/Setting"));
// const Analytics = lazy(() => import("./pages/dashboard/Analytics"));
const Todo = lazy(() => import("../Practice/components/Todo"));

const AppRoute = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="login" element={<h1>Login Component</h1>} />
          <Route path="todo" Component={Todo} />
          <Route path="/" Component={Layout}>
            <Route index Component={Home}></Route>
            <Route path="user/:userId" Component={UserProfile} />
            <Route path="dashboard" Component={ProtectedRoute}>
              <Route index Component={DashboardHome} />
              <Route path="settings" Component={Setting} />
              <Route path="analytics" Component={Analytics} />
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoute;

const Layout = () => {
  return (
    <>
      <h1>This is my layout component</h1>
      <Outlet />
    </>
  );
};

const Home = () => {
  return (
    <>
      <h1>This is my Home Component</h1>
    </>
  );
};

const ProtectedRoute = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

const Setting = () => {
  return (
    <>
      <h1>This is my setting component after logged verification Component</h1>
    </>
  );
};

const Analytics = () => {
  return (
    <>
      <h1>This is my Home Component</h1>
    </>
  );
};

const DashboardHome = () => {
  return <h1>this is dashboard home component</h1>;
};

function UserProfile() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();

  return (
    <div>
      <h1>User Profile: {userId}</h1>
      <button onClick={() => navigate("/")}>Go Home</button>
      <button onClick={() => navigate(-1)}>Go Back</button>
    </div>
  );
}
