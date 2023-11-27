import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginView from "./pages/LoginView/LoginView";
import Reg from "./pages/register/RegistrationView";
import HomeView from "./pages/home/homeView";
import AccountsHomeView from "./pages/travel/AccountsHomeView";
import TrainHomeView from "./pages/train/TrainHomeView";
import BookingHomeView from "./pages/booking/BookingHomeView";
import Header from "../src/components/Header/Header";
import Footer from "../src/components/Footer/Footer";
import AccountCreateView from "../src/pages/travel/AccountCreateView";
import TrainCreateView from "../src/pages/train/TrainCreateView";
import AccountsView from "../src/pages/travel/AccountsView";
import AccountUpdateView from "../src/pages/travel/AccountUpdateView";
import AccountActivateView from "../src/pages/travel/AccountActivateView";
import AccountDeactivateView from "../src/pages/travel/AccountDeactivateView";
import TrainsView from "../src/pages/train/TrainsView";
import TrainUpdateView from "../src/pages/train/TrainUpdateView";
import BookingView from "../src/pages/booking/view_booking";
import BookingUsersView from "../src/pages/booking/booking_users";
import BookingUserWiseView from "./pages/booking/BookingUserWiseView";
import BookingCreateView from "../src/pages/booking/booking_create";
import BookingUpdateView from "../src/pages/booking/update_booking"
const Layout = ({ childComponent }) => {
  return (
    <div>
      <Header />
      {childComponent}
      <Footer />
    </div>
  );
};

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginView />} />
          <Route path="/RegistrationView" element={<Reg />} />
          <Route path="/home" element={<Layout childComponent={<HomeView />} />} />
          <Route
            path="/userhome"
            element={<Layout childComponent={<AccountsHomeView />} />}
          />
          <Route
            path="/trainhome"
            element={<Layout childComponent={<TrainHomeView />} />}
          />
          <Route
            path="/bookingHome"
            element={<Layout childComponent={<BookingHomeView />} />}
          />
          <Route path="/useracc" element={<Layout childComponent={<AccountCreateView />} />} />
          <Route
            path="/trainadd"
            element={<Layout childComponent={<TrainCreateView />} />}
          />
          <Route
            path="/accview"
            element={<Layout childComponent={<AccountsView />} />}
          />
          <Route
            path="/userupdate/:id"
            element={<Layout childComponent={<AccountUpdateView />} />}
          />
          <Route
            path="/viewactivateacc"
            element={<Layout childComponent={<AccountActivateView />} />}
          />
          <Route
            path="/viewdiactivateacc"
            element={<Layout childComponent={<AccountDeactivateView />} />}
          />
          <Route
            path="/trainview"
            element={<Layout childComponent={<TrainsView />} />}
          />
          <Route
            path="/trainupdate"
            element={<Layout childComponent={<TrainUpdateView />} />}
          />
          <Route
            path="/bview"
            element={<Layout childComponent={<BookingView />} />}
          />
          <Route
            path="/buse"
            element={<Layout childComponent={<BookingUsersView />} />}
          />
          <Route
            path="/bookingview/:id"
            element={<Layout childComponent={<BookingUserWiseView />} />}
          />
          <Route
            path="/bookingadd/:id/:nic"
            element={<Layout childComponent={<BookingCreateView />} />}
          />
          <Route
            path="/bookingupdate"
            element={<Layout childComponent={<BookingUpdateView />} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
