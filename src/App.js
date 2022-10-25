import "swiper/css";
import "./assets/boxicons-2.0.7/css/boxicons.min.css";
import "./App.scss";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { createContext, useState } from "react";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Catalog from "./pages/Catalog";
import Detail from "./pages/detail/Detail";
import Home from "./pages/Home";
import Auth from "./pages/auth/Auth";
import Cast from "./pages/cast/Cast";

export const UserContext = createContext({
  user: null,
  setUser: () => {},
});

function App() {
  const [user, setUser] = useState(null);
  const value = { user, setUser };
  return (
    <BrowserRouter>
      <UserContext.Provider value={value}>
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
            path="/cast"
            element={
              <>
                <Header />
                <Cast />
                <Footer />
              </>
            }
          />
          <Route
            path="/cast/search/:keyword"
            element={
              <>
                <Header />
                <Cast />
                <Footer />
              </>
            }
          />
          <Route
            path="/login"
            exact
            element={
              <>
                <Auth />
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
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
