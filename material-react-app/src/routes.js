/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Transaction from "layouts/billing";
//import Notifications from "layouts/notifications";
//import Profile from "layouts/profile";

import UserProfile from "layouts/user-profile";

import Login from "auth/login";
import AddLand from "layouts/Add Land";

// @mui icons
import Icon from "@mui/material/Icon";
import LandsForSale from "layouts/View lands Owned";
import AdminDashboard from "layouts/Admin/AdminDashboard";
import UserRequests from "layouts/UserRequests";
import LandRequests from "layouts/LandRequests";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Lands For Sale",
    key: "Lands For Sale",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Lands-ForSale",
    component: <LandsForSale />,
  },
  {
    type: "collapse",
    name: "Add Land",
    key: "Add Land",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Add-Land",
    component: <AddLand />,
  },
  {
    type: "collapse",
    name: "Transactions",
    key: "transactions",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/Transaction",
    component: <Transaction />,
  },
  {
    type: "examples",
    name: "User Profile",
    key: "user-profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/user-profile",
    component: <UserProfile />,
  },
  {
    type: "auth",
    name: "Login",
    key: "login",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/auth/login",
    component: <Login />,
  },
  
  {
    type: "collapse",
    name: "Admin",
    key: "Admin",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Admin",
    component: <AdminDashboard />,
  },
  {
    type: "collapse",
    name: "User Requests",
    key: "User Requests",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/UserRequests",
    component: <UserRequests />,
  },
  {
    type: "collapse",
    name: "LandRequests",
    key: "LandRequests",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/LandRequests",
    component: <LandRequests />,
  }
];

export default routes;
