import React from "react";
import { Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";
import Eventi from "./pages/Eventi";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import CreaEvento from "./components/CreaEvento";
import AreaPersonale from "./pages/AreaPersonale";
import Accedi from "./pages/Accedi";
import ChiSiamo from "./pages/ChiSiamo";

const App = () => {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/eventi" element={<Eventi />} />
        <Route path="/accedi" element={<Accedi />} />
        <Route path="/chiSiamo" element={<ChiSiamo />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/CreaEvento" element={<CreaEvento />} />
        <Route path="/areapersonale" element={<AreaPersonale />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
