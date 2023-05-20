import { createContext } from "react";

export const LoginContext = createContext({
    isLoggedIn: false,
    currentUser: null,
    token: null,
    isAdmin: null,
    tankNamesArray: [],
    tankNationsArray: [],
    allNationsArray: [],
    tankCombatRolesArray: [],
    tankErasArray: [],
    tankServiceStatesArray: [],
    tankGenerationsArray: [],
    refreshUser: () => {},
    login: () => {},
    logout: () => {},
});