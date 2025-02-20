import { createContext, useState } from "react";

export  const UserContext  = createContext({});

function UserProvider({children}){
    const [auth, setAuth] = useState({})
    return(
        <UserContext.Provider value={{auth, setAuth}}>{children}</UserContext.Provider>
    )
};

export default UserProvider;