import styles from "./App.module.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Invites from "./components/Invites/Invites";
import RSVP from "./components/RSVP/RSVP";
import Footer from "./components/Footer/Footer";
import Admin from "./components/Admin/Admin";

import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  return (
    <>
      {isAdminRoute ? (
        <Routes>
          <Route path="/admin" element={<Admin />} />
        </Routes>
      ) : (
        <div className={styles.grid}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/invites" element={<Invites />} />
            <Route path="/rsvp" element={<RSVP />} />
          </Routes>
          <Footer />
        </div>
      )}
    </>
  );
}

export default App;
