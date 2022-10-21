import "swiper/css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/:category/search/:keyword"
          element={
            <>
              <Header />
              <Catalog />
              <Footer />
            </>
          }
        />
        <Route
          path="/:category/:id"
          element={
            <>
              <Header />
              <Detail />
              <Footer />
            </>
          }
        />
        <Route
          path="/:category"
          element={
            <>
              <Header />
              <Catalog />
              <Footer />
            </>
          }
        />
        <Route
          path="/"
          exact
          element={
            <>
              <Header />
              <Home />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
