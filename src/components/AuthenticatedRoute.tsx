import { Redirect, Route, RouteProps } from "react-router-dom";
import useStore from "../hooks/useStore";

export const AuthenticatedRoute = ({ children, ...rest }: RouteProps) => {
  const { user } = useStore();

  return (
    <Route
      {...rest}
      render={({ location }: { location: any }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};
