import { createContext } from "react";

export const LoginContext = createContext({
    isLoggedIn: false,
    currentUser: null,
    isAdmin: null,
    refreshUser: () => {},
    login: () => {},
    logout: () => {}
});