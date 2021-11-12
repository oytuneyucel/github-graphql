import { PersistGate } from "zustand-persist";
import { positions, Provider as AlertProvider } from "react-alert";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { AuthenticatedRoute, MainLayout } from "./components";
import { Search, Login } from "./pages";

import "./App.css";

const theme = {
  main: {
    bluePurple: "#BBA0FF",
    coral: "#FA4B4B",
    orangeYellow: "#FFB203",
    algaeGreen: "#26BE6C",
    black: "#000000",
    warmGrey: "#919191",
    greyish: "#B7B7B7",
    white: "#FFFFFF",
    redPink: "#e6344d",
    cerulean: "#0099d0",
    lightGrey: "#c7c7c7"
  }
};

const alertOptions = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

function App() {
  return (
    <PersistGate>
      <ThemeProvider theme={theme}>
        <AlertProvider {...alertOptions}>
          <BrowserRouter>
            <Switch>
              <Route exact={true} path="/login" component={Login} />

              <AuthenticatedRoute exact={true} path="/">
                <MainLayout>
                  <Search />
                </MainLayout>
              </AuthenticatedRoute>
            </Switch>
          </BrowserRouter>
        </AlertProvider>
      </ThemeProvider>
    </PersistGate>
  );
}

export default App;
