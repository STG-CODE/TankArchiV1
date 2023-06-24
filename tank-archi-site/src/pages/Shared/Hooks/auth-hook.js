import { useState, useCallback, useEffect ,useContext} from "react";
import { useHttpClient } from "./http-hook";

let logoutTimer;

export const useAuth = () => {
  const {sendRequest} = useHttpClient();
  const [token,setToken] = useState(false);
  const [tokenExpirationDate,setTokenExpirationDate] = useState();
  const [currentUser,setCurrentUser] = useState(false);
  const [isAdmin,setIsAdmin] = useState(false);
  const [tankNamesArray,setTankNamesArray] = useState([]);
  const [tankNationsArray,setTankNationsArray] = useState([]);
  const [tankAllNationsArray,setTankAllNationsArray] = useState([]);
  const [tankCombatRolesArray,setTankCombatRolesArray] = useState([]);
  const [tankErasArray,setTankErasArray] = useState([]);
  const [tankServiceStatesArray,setTankServiceStatesArray] = useState([]);
  const [tankGenerationsArray,setTankGenerationsArray] = useState([]);
  
  const refreshUser = useCallback((user) =>{
    console.log("Refreshing User Information!");
    setCurrentUser(user);
  },[]);

  const login = useCallback( async (user,token,expDate) => {
    console.log("User logged in!");
    setToken(token);
    setCurrentUser(user);
    setIsAdmin(user.isAdmin);
    const tokenExpDate = expDate || new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpDate);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        user: user, 
        token: token , 
        expDate: tokenExpDate.toISOString()
      })
    );
    try {
      const namesData = await sendRequest(
        'http://localhost:5000/MainPage/Admin/TanksDatabase/getUniqueNames'
      );
      const nationsData = await sendRequest(
        'http://localhost:5000/MainPage/Admin/TanksDatabase/getUniqueNations'
      );
      const allNationsData = await sendRequest(
        'http://localhost:5000/MainPage/Admin/TanksDatabase/getAllUniqueUserNations'
      );
      const combatRolesData = await sendRequest(
        'http://localhost:5000/MainPage/Admin/TanksDatabase/getUniqueCombatRoles'
      );
      const erasData = await sendRequest(
        'http://localhost:5000/MainPage/Admin/TanksDatabase/getUniqueEras'
      );
      const serviceStateData = await sendRequest(
        'http://localhost:5000/MainPage/Admin/TanksDatabase/getUniqueServiceStates'
      );
      const generationData = await sendRequest(
        'http://localhost:5000/MainPage/Admin/TanksDatabase/getUniqueGenerations'
      );
      setTankNamesArray(namesData.names);
      setTankNationsArray(nationsData.nations);
      setTankAllNationsArray(allNationsData.allNations);
      setTankCombatRolesArray(combatRolesData.combatRoles);
      setTankErasArray(erasData.eras);
      setTankServiceStatesArray(serviceStateData.allServiceStates);
      setTankGenerationsArray(generationData.generations);
      console.log("Successfully fetched the uniques!");
    } catch (err) {
      console.log("Failed To Get Uniques!")
      console.log(err)
    }
  },[]);

  const logout = useCallback(() => {
    console.log("User logged out!");
    // sendRequest(`http://localhost:5000/MainPage/User/UpdateLastLogin/${currentUser.id}`);
    setToken(null);
    setTokenExpirationDate(null);
    setCurrentUser(null);
    setIsAdmin(null);
    localStorage.removeItem('userData');
  },[]);

  useEffect(() => {
    if(token && tokenExpirationDate){
      const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
      logoutTimer = setTimeout(logout,remainingTime);
    } else {
      // sendRequest(`http://localhost:5000/MainPage/User/UpdateLastLogin/${currentUser.id}`);
      clearTimeout(logoutTimer);
    }
  },[token,logout,tokenExpirationDate])

  useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(
        storedData && 
        storedData.token && 
        new Date(storedData.expDate) > new Date()
        ){
        login(storedData.user,storedData.token, new Date(storedData.expDate));
      }
  },[login]);

  return {
    token,
    login,
    logout,
    currentUser,
    isAdmin,
    tankNamesArray,
    tankNationsArray,
    tankAllNationsArray,
    tankCombatRolesArray,
    tankErasArray,
    tankServiceStatesArray,
    tankGenerationsArray, 
    refreshUser
  }
};