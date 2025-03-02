import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "../PrivateRoute";
import "./App.css";
import Signin from "./pages/SignIn";
import Order from "./pages/Order";
import AddDish from "./pages/AddDish";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";
import { toast, ToastContainer } from "react-toastify";
import { UserContextProvider } from "./context/UserContext";
import AuthGuard from "./context/AuthGuard";
import OrdersList from "./pages/OrdersList";

function App() {
  return (
    <UserContextProvider>
      <ToastContainer />
      <Router>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/* Public Route */}
          <Route
            path="/auth"
            element={
              <AuthGuard>
                <Signin />
              </AuthGuard>
            }
          />

          {/* Protected Routes Wrapped Inside Dashboard */}
          <Route
            path="/home"
            element={<PrivateRoute component={<Order />} />}
          />

          <Route
            path="/orders"
            element={<PrivateRoute component={<OrdersList />} />}
          />
          <Route
            path="/dish"
            element={<PrivateRoute component={<AddDish />} />}
          />
          <Route
            path="/analytics"
            element={<PrivateRoute component={<Analytics />} />}
          />

          <Route path="*" element={<NotFound />} />

          <Route path="logout" element={<div>Logging out...</div>} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
