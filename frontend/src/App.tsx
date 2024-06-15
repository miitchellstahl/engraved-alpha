import { Route, Routes } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layouts/Layout";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import CreateAccountPage from "./pages/CreateAccountPage";
import CreateObituaryPage from "./pages/CreateObituaryPage";
import DeceasedUserPage from "./pages/DeceasedUserPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/createaccount" element={<CreateAccountPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-obituary" element={<CreateObituaryPage />} />
            {/* <Route
              path="/confirm-pinned"
              element={<CreatePinnedSectionPage />}
            /> */}
            <Route
              path="/profile/:deceasedUserId"
              element={<DeceasedUserPage />}
            />
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
