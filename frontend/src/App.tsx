import styles from "./App.module.css";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Invites from "./components/Invites/Invites";
import RSVP from "./components/RSVP/RSVP";
import Footer from "./components/Footer/Footer";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className={styles.grid}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/invites" element={<Invites />} />
          <Route path="/rsvp" element={<RSVP />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
