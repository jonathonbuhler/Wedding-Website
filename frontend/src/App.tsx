import styles from "./App.module.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Invites from "./components/Invites/Invites";
import Gifts from "./components/Gifts/Gifts";
import { RSVP, RSVPForm } from "./components/RSVP/RSVP";
import Footer from "./components/Footer/Footer";
import { Admin, Login } from "./components/Admin/Admin";

import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className={styles.grid}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/invites" element={<Invites />} />
        <Route path="/gifts" element={<Gifts />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="/rsvp-form" element={<RSVPForm />} />
        <Route path="/admin-login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
