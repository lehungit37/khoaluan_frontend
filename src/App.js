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
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <ManagementLayout path="/quan-ly" component={ManagementMainRouter} />
          <AdminLayout path="/admin" component={AdminMainRouter} />
          <UserLayout path="/" component={UserMainRouter} />
        </Switch>
      </Router>
        <ToastContainer />
    </ThemeProvider>
  );
}

export default App;
