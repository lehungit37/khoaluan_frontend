import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import theme from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLayout from "./layout/user_layout";
import UserMainRouter from "./router/user";
import AdminLayout from "./layout/admin_layout";
import AdminMainRouter from "./router/admin";
import ManagementLayout from "./layout/management_layout";
import ManagementMainRouter from "./router/management";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-loading-skeleton/dist/skeleton.css";
import Login from "./layout/Login";
import { createBrowserHistory } from "history";
import { SkeletonTheme } from "react-loading-skeleton";
import moment from "moment";
import "animate.css";

import "moment/locale/vi"; // without this line it didn't work
moment.locale("vi");

export const history = createBrowserHistory();
function App() {
  return (
    <ThemeProvider theme={theme}>
      <SkeletonTheme baseColor="#ccc" highlightColor="#f3f3f3">
        <Router history={history}>
          <Switch>
            <ManagementLayout
              path="/quan-ly"
              component={ManagementMainRouter}
            />
            <AdminLayout path="/admin" component={AdminMainRouter} />
            <UserLayout path="/" component={UserMainRouter} />
          </Switch>
        </Router>
        <ToastContainer limit={5} />
      </SkeletonTheme>
    </ThemeProvider>
  );
}

export default App;
