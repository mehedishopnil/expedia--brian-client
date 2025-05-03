import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main/Main";
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import Registration from "../pages/Registration/Registration";
import Hotels from "../pages/Hotels/Hotels";
import SingleResortPage from "../components/SingleResortPage/SingleResortPage";
import HotelSearch from "../components/HotelSearch/HotelSearch";
import Payment from "../components/Payment/Payment";
import Checkout from "../components/Checkout/Checkout";
import Account from "../pages/Account/Account";
import UserDashboard from "../layout/UserDashboard/UserDashboard";
import Profile from "../pages/Profile/Profile";
import Communications from "../pages/Communications/Communications";
import ConfirmBooking from "../components/ConfirmBooking/ConfirmBooking";
import UserOverview from "../pages/UserOverview/UserOverview";
import MyBookings from "../pages/MyBookings/MyBookings";
import AdminPanel from "../layout/AdminPanel/AdminPanel";
import AdminOverview from "../pages/AdminOverview/AdminOverview";
import UsersBookings from "../pages/UsersBookings/UsersBookings";
import UserControl from "../pages/UserControl/UserControl";
import AdminControl from "../pages/AdminControl/AdminControl";
import NotFound from "../components/NotFound/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "signin",
        element: <SignIn />,
      },
      {
        path: "signup",
        element: <Registration />,
      },
      {
        path: "hotels",
        element: <Hotels />,
      },
      {
        path: "singleResortPage/:_id",
        element: <SingleResortPage />,
      },
      {
        path: "hotel-search",
        element: <HotelSearch />,
      },
      {
          path: "/account",
          element: <Account />,
        },
        {
          path: "profile",
          element: <Profile />,
        },
        {
          path: "communications",
          element: <Communications />,
        },
      {
        path: "payment",
        element: <Payment />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
          path: "confirm-booking",
          element: <ConfirmBooking />,
      },
      {
        path: "*",
        element: <NotFound />,
      }
      
    ],
  },

  {
    path: "/user-dashboard",
    element: <UserDashboard />,
    children: [
      {
        path: "user-overview",
        element: <UserOverview />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      }
    ]
  },
  
  {
    path: "/admin-panel",
    element: <AdminPanel />,
    children: [
      {
        path: "admin-overview",
        element:<AdminOverview />,
      },
      {
        path: "users-bookings",
        element: <UsersBookings />,
      },
      {
        path: "user-control",
        element: <UserControl />,
      },
      {
        path: "admin-control",
        element: <AdminControl />,
      }
    ]
  }
]);
