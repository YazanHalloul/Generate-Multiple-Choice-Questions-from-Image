import React, { useContext } from "react";
import { UserContext } from "../Pages/Context/Context";
import UnLogged from "../Pages/Error/unlogged";

const PrivateRoute = ({children}) => {
  const { auth } = useContext(UserContext);

  return auth.id ? (
    children
  ) : (
    <UnLogged />
  );
};

export default PrivateRoute;

