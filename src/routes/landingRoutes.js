import React from "react";

// landing pages for this product
import Components from "views/Components/Components.js";
import LoginPage from "views/LoginPage/LoginPage.js";
import LandingPage from "views/LandingPage/LandingPage.js";
import ProfilePage from "views/ProfilePage/ProfilePage.js";

const landingRoutes = [
  {
    path: "/demo",
    name: "Demo",
    component: Components,
    layout: ""
  },
  {
    path: "/landing",
    name: "Landing",
    component: LandingPage,
    layout: ""
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
    layout: ""
  },
  {
    path: "/login",
    name: "Login",
    component: LoginPage,
    layout: ""
  },
];

export default landingRoutes;
