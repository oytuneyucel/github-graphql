import { PersistGate } from "zustand-persist";
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
    lightGrey: "#c7c7c7",
  },
};

function App() {
  return (
    <PersistGate>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </PersistGate>
  );
}

export default App;
