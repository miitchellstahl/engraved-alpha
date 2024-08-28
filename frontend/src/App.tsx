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
import { NavigationProvider } from "./NavigationContext";
import DeceasedUserAlbumsPage from "./pages/DeceasedUserAlbumsPage";
import DeceasedUserPhotosPage from "./pages/DeceasedUserPhotosPage";
import DeceasedUserMementosPage from "./pages/DeceasedUserMementosPage";
import DeceasedUserPlacesPage from "./pages/DeceasedUserPlacesPage";
import DeceasedUserPetsPage from "./pages/DeceasedUserPetsPage";
import DeceasedUserAlbumPage from "./pages/DeceasedUserAlbumPage";
import ObituaryServiceSelectPage from "./pages/ObituaryServiceSelectPage";
import SelectOnboardUser from "./pages/SelectOnboardUser";

function App() {
  return (
    <UserContextProvider>
      <NavigationProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<IndexPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/createaccount" element={<CreateAccountPage />} />
            <Route path="/select" element={<ObituaryServiceSelectPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/create" element={<CreateObituaryPage />} />
              <Route path="/create/users" element={<SelectOnboardUser />} />
              <Route
                path="/create/:onboardingId"
                element={<CreateObituaryPage />}
              />
              {/* <Route
              path="/confirm-pinned"
              element={<CreatePinnedSectionPage />}
            /> */}
            </Route>
            <Route
              path="/profile/:deceasedUserId"
              element={
                <NavigationProvider>
                  <DeceasedUserPage />
                </NavigationProvider>
              }
            />
            <Route
              path="/profile/:deceasedUserId/photos"
              element={
                <NavigationProvider>
                  <DeceasedUserPhotosPage />{" "}
                </NavigationProvider>
              }
            />
            <Route
              path="/profile/:deceasedUserId/albums"
              element={
                <NavigationProvider>
                  <DeceasedUserAlbumsPage />{" "}
                </NavigationProvider>
              }
            />
            <Route
              path="/profile/:deceasedUserId/mementos"
              element={
                <NavigationProvider>
                  <DeceasedUserMementosPage />{" "}
                </NavigationProvider>
              }
            />
            <Route
              path="/profile/:deceasedUserId/places"
              element={
                <NavigationProvider>
                  <DeceasedUserPlacesPage />{" "}
                </NavigationProvider>
              }
            />
            <Route
              path="/profile/:deceasedUserId/pets"
              element={
                <NavigationProvider>
                  <DeceasedUserPetsPage />{" "}
                </NavigationProvider>
              }
            />
            <Route
              path="/profile/:deceasedUserId/album/:albumId"
              element={
                <NavigationProvider>
                  <DeceasedUserAlbumPage />{" "}
                </NavigationProvider>
              }
            />
          </Route>
        </Routes>
      </NavigationProvider>
    </UserContextProvider>
  );
}

export default App;
