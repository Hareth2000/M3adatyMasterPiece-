
import React, { Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Home = React.lazy(() => import("./components/Home/HomePage"));
const Navbar = React.lazy(() => import("./components/Navbar/Navbar"));
const AdminDash = React.lazy(() => import("./components/AdminDashboard/AdminDashboard"));
const RegisterPartner = React.lazy(() => import("./components/RegisterPartner/RegisterPartner"));
const EquipmentCreationPage = React.lazy(() => import("./components/EquipmentCreationPage/EquipmentCreationPage"));
const EquipmentDetailPage = React.lazy(() => import("./components/EquipmentDetailPage/EquipmentDetailPage"));
const FavoritesPage = React.lazy(() => import("./components/FavoritesPage/FavoritesPage"));
const EquipmentCategoryPage = React.lazy(() => import("./components/EquipmentCategoryPage/EquipmentCategoryPage"));
const UserProfile = React.lazy(() => import("./components/UserProfile/UserProfile"));
const PartnerProfile = React.lazy(() => import("./components/PartnerProfile/PartnerProfile"));
const AboutUsPage = React.lazy(() => import("./components/AboutUsPage/AboutUsPage"));
const ContactUsPage = React.lazy(() => import("./components/ContactUsPage/ContactUsPage"));
const PaymentPage = React.lazy(() => import("./components/PaymentPage/Payment"));
const Footer = React.lazy(() => import("./components/Footer/Footer"));
const AuthContainer = React.lazy(() => import("./components/Login/AuthContainer"));

const ConditionalLayout = ({ children }) => {
  const location = useLocation();
  const noNavbarFooterPaths = ["/admin-dashboard"];
  const shouldShowNavbarAndFooter = !noNavbarFooterPaths.some((path) =>
    location.pathname.startsWith(path)
  );
  return (
    <div className="App font-cairo">
      {shouldShowNavbarAndFooter && (
        <Suspense fallback={<div>Loading Navbar...</div>}>
          <Navbar />
        </Suspense>
      )}
      {children}
      {shouldShowNavbarAndFooter && (
        <Suspense fallback={<div>Loading Footer...</div>}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
};

function App() {
  return (
    <GoogleOAuthProvider clientId="your-client-id">
      <Router>
        <ConditionalLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin-dashboard" element={<AdminDash />} />
              <Route path="/Auth" element={<AuthContainer />} />
              <Route path="/register-partner" element={<RegisterPartner />} />
              <Route path="/create-equipment" element={<EquipmentCreationPage />} />
              <Route path="/equipment/:id" element={<EquipmentDetailPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/categories" element={<EquipmentCategoryPage />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/partner/:id" element={<PartnerProfile />} />
              <Route path="/about" element={<AboutUsPage />} />
              <Route path="/contact" element={<ContactUsPage />} />
              <Route path="/payment" element={<PaymentPage />} />
            </Routes>
          </Suspense>
        </ConditionalLayout>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
