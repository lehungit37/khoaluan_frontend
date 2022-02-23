import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { Button, Typography } from "@mui/material";
import theme from "./theme";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserLayout from "./layout/user_layout";
import UserMainRouter from "./router/user";

function App() {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <UserLayout path="/" component={UserMainRouter} />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
