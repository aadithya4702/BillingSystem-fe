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
import { UserContextProvider } from "./context/userContext";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Routes>
          {/* Redirect root to login */}
          <Route path="/" element={<Navigate to="/auth" />} />

          {/* Public Route */}
          <Route path="/auth" element={<Signin />} />

          {/* Protected Routes Wrapped Inside Dashboard */}
          <Route
            path="/home"
            element={<PrivateRoute component={<Order />} />}
          />
          <Route
            path="/dish"
            element={<PrivateRoute component={<AddDish />} />}
          />
          <Route
            path="/analytics"
            element={<PrivateRoute component={<Analytics />} />}
          />

          <Route path="logout" element={<div>Logging out...</div>} />
        </Routes>
      </Router>
    </UserContextProvider>
  );
}

export default App;
