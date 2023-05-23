//basic imports
import * as React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
//component imports
import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";
import Button from "../../Shared/components/Form-Elements/Button";
import TankCatalogueTable from "../../Shared/components/Extra-Elements/TankCatalogueTable";
import LoadingSpinner from "../../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../../Shared/components/UI-Elements/ErrorModal";
import Paginate from "../../Shared/components/Extra-Elements/Pagination";
//Material UI Imports
import {Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, createFilterOptions, TextField, Pagination, PaginationItem, Paper, Slider, Container,} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
//hook import
import { useHttpClient } from "../../Shared/Hooks/http-hook";
//context import
import { LoginContext } from "../../Shared/Context/login-context";

//assign the imported Material UI function "createFilterOptions" to a variable
const filter = createFilterOptions();

//uses the "useLocation" function to extract the current search from the URL
function useQuery() {
  return new URLSearchParams(useLocation().search);
};

//is used for the slider search option
function valueText(value) {
  return `${value}°C`;
}

function TankSearch() {
  //login context
  const loginContext = React.useContext(LoginContext);
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest,clearError} = useHttpClient();

  //collection of page search states and their data
  const [search, setSearch] = React.useState("");
  const [nationSearch, setNationSearch] = React.useState("");
  const [userNationsSearch, setUserNationsSearch] = React.useState("");
  const [combatRoleSearch, setCombatRoleSearch] = React.useState("");
  const [eraSearch, setEraSearch] = React.useState("");
  const [ageSearch, setAgeSearch] = React.useState([null,null]);
  const [serviceStateSearch, setServiceStateSearch] = React.useState("");
  const [generationSearch, setGenerationSearch] = React.useState("");
  const [prevSearch, setPrevSearch] = React.useState("");

  //collection of other page states and data
  //  loaded tanks state
  const [loadedTanks, setLoadedTanks] = React.useState("");
  //  page numerical state
  const [page, setPage] = React.useState(1);
  //  current page count
  const [pageCount, setPageCount] = React.useState();
  //  "useHistory" variable
  const history = useHistory();
  //  "useQuery" variable
  const query = useQuery();
  //!NOT USED YET
  const searchQuery = query.get(search);

  //all filter options
  const [searchByName, setSearchByName] = React.useState(true);
  const [searchByNation, setSearchByNation] = React.useState(false);
  const [searchByUserNation, setSearchByUserNation] = React.useState(false);
  const [searchByCombatRole, setSearchByCombatRole] = React.useState(false);
  const [searchByEra, setSearchByEra] = React.useState(false);
  const [searchByAge, setSearchByAge] = React.useState(false);
  const [searchByServiceState, setSearchByServiceState] = React.useState(false);
  const [searchByGeneration, setSearchByGeneration] = React.useState(false);

  //useEffect - fetch tanks separated to pages depending on what that the user searches
  React.useEffect(() => {
    const fetchTanks = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/getSearchTanks?page=${page}`
        );
        setPageCount(responseData.numberOfPages);
        setLoadedTanks(responseData.tanks);
      } catch (err) {}
    };
    fetchTanks();
  }, [sendRequest, page]);

  //a function that checks if the provided array "a" is equal to array "b" with every element that it contains
  const compareArrays = (a, b) => a.length === b.length && a.every((element, index) => element === b[index]);

  //returns a boolean depending on if the current search is different from the prev search
  const isUniqueSearch = () => {
    try {
      return (
        prevSearch === search.tankName ||
        prevSearch === nationSearch.nation ||
        prevSearch === searchByUserNation.userNations ||
        prevSearch === combatRoleSearch.combatRole ||
        prevSearch === eraSearch.era ||
        compareArrays(prevSearch,ageSearch) ||
        prevSearch === serviceStateSearch.serviceState ||
        prevSearch === generationSearch.generation
      );
    } catch (err) {
      return false;
    }
  };

  //// const isValidSearch = () => {
  ////   return (
  ////     typeof search.tankName === 'string' ||
  ////     typeof nationSearch.nation === 'string' ||
  ////     typeof searchByUserNation.userNations === 'string' ||
  ////     typeof combatRoleSearch.combatRole === 'string' ||
  ////     typeof eraSearch.era === 'string' ||
  ////     typeof serviceStateSearch.serviceState === 'string' ||
  ////     typeof generationSearch.generation === 'string'
  ////     );
  //// }

  //sets the prev search one of the variables that isn't empty
  const setPervSearches = () => {
    setPrevSearch(
      search.tankName ||
      nationSearch.nation ||
      userNationsSearch.userNations ||
      combatRoleSearch.combatRole ||
      eraSearch.era ||
      serviceStateSearch.serviceState ||
      generationSearch.generation ||
      ageSearch
    );
  };

  //searches for the tanks by the user \ admins input and filter
  const searchTank = async () => {
    if (!isUniqueSearch()) {
      try {
        setPervSearches();
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/Search?searchQuery=${search.tankName||null}&searchNation=${nationSearch.nation||null}&searchUserNations=${userNationsSearch.userNations||null}&searchCombatRole=${combatRoleSearch.combatRole||null}&searchEra=${eraSearch.era||null}&searchAge=${ageSearch||null}&searchServiceState=${serviceStateSearch.serviceState||null}&searchGeneration=${generationSearch.generation||null}`
        );
        console.log(responseData.tanks);
        setPageCount(responseData.tanks.length <= 9 ? 1 : 1 + responseData.tanks.length / 9);
        setLoadedTanks(responseData.tanks);
      } catch (err) {
        console.log("- - - Searching Failed - - -");
        console.log(err);
      }
      history.push(`/MainPage/Search?searchQuery=${search.tankName ||nationSearch.nation || userNationsSearch.userNations || combatRoleSearch.combatRole || eraSearch.era || ageSearch.age || serviceStateSearch.serviceState || generationSearch.generation || "none"}`);
    } else {
      console.log("- - - Did Not Preform Search! - - -");
      console.log("Prev Search = " + prevSearch);
      console.log("Prev Type = " + typeof prevSearch);
      console.log("Failed To Search = " + search.tankName ||nationSearch.nation || userNationsSearch.userNations || combatRoleSearch.combatRole || eraSearch.era || ageSearch.age || serviceStateSearch.serviceState || generationSearch.generation);
      history.push("/MainPage/Search");
    }
  };

  //resets all search variables to default state
  const resetAllSearches = () => {
    setSearch("");
    setNationSearch("");
    setUserNationsSearch("");
    setCombatRoleSearch("");
    setEraSearch("");
    setAgeSearch([null,null]);
    setServiceStateSearch("");
    setGenerationSearch("");
    setPrevSearch(null);
  };

  //resets the current search and fills the loaded tanks with the default fetch
  const resetSearch = async () => {
    if (isUniqueSearch()) {
      try {
        console.log("- - - Refreshed List - - -");
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/getSearchTanks?page=${page}`
        );
        setPageCount(responseData.numberOfPages);
        setLoadedTanks(responseData.tanks);
        resetAllSearches();
        history.push("/MainPage/Search");
      } catch (err) {}
    }
  };

  //resets the filters that the user picked
  const resetFilter = async () => {
    setSearch("");
    setSearchByName(true);
    setSearchByUserNation(false);
    setUserNationsSearch("");
    setSearchByNation(false);
    setNationSearch("");
    setSearchByCombatRole(false);
    setCombatRoleSearch("");
    setSearchByEra(false);
    setEraSearch("");
    setSearchByAge(false);
    setAgeSearch([]);
    setServiceStateSearch("");
    setSearchByServiceState(false);
    setGenerationSearch("");
    setSearchByGeneration(false);
    setPrevSearch(null);
  };

  //responds to the click of the "enter" key for searching
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      searchTank();
    }
  };

  //handles a page state
  const handleChange = (event, value) => {
    setPage(value);
  };

  //handles the slider's change if user picks to search with a slider
  const handleSliderChange = (event, newValue, activeThumb) => {
    const minDistance = 5;
    if (!Array.isArray(newValue)) {
      return;
    }
    if (activeThumb === 0) {
      setAgeSearch([
        Math.min(newValue[0], ageSearch[1] - minDistance),
        ageSearch[1],
      ]);
    } else {
      setAgeSearch([
        ageSearch[0],
        Math.max(newValue[1], ageSearch[0] + minDistance),
      ]);
    }
  };

  //!see if possible to change to one function
  //changes filter according to the picked filter option(Tank Name)
  const handleNameFilterChange = (event) => {
    setSearchByName(event.target.checked);
    setSearchByNation(false);
    setSearchByUserNation(false);
    setSearchByCombatRole(false);
    setSearchByEra(false);
    setSearchByAge(false);
    setSearchByServiceState(false);
    setSearchByGeneration(false);
    resetAllSearches();
  };
  //changes filter according to the picked filter option(Nation Name)
  const handleNationFilterChange = (event) => {
    setSearchByNation(event.target.checked);
    setSearchByName(false);
    setSearchByUserNation(false);
    setSearchByCombatRole(false);
    setSearchByEra(false);
    setSearchByAge(false);
    setSearchByServiceState(false);
    setSearchByGeneration(false);
    resetAllSearches();
  };
  //changes filter according to the picked filter option(Name Of Nation That Used Tanks)
  const handleUserNationFilterChange = (event) => {
    setSearchByUserNation(event.target.checked);
    setSearchByName(false);
    setSearchByNation(false);
    setSearchByCombatRole(false);
    setSearchByEra(false);
    setSearchByAge(false);
    setSearchByServiceState(false);
    setSearchByGeneration(false);
    resetAllSearches();
  };
  //changes filter according to the picked filter option(Combat Role Name)
  const handleCombatRoleFilterChange = (event) => {
    setSearchByCombatRole(event.target.checked);
    setSearchByName(false);
    setSearchByNation(false);
    setSearchByUserNation(false);
    setSearchByEra(false);
    setSearchByAge(false);
    setSearchByServiceState(false);
    setSearchByGeneration(false);
    resetAllSearches();
  };
  //changes filter according to the picked filter option(Era Name)
  const handleEraFilterChange = (event) => {
    setSearchByEra(event.target.checked);
    setSearchByName(false);
    setSearchByNation(false);
    setSearchByUserNation(false);
    setSearchByCombatRole(false);
    setSearchByAge(false);
    setSearchByServiceState(false);
    setSearchByGeneration(false);
    resetAllSearches();
  };
  //changes filter according to the picked filter option(Age)
  const handleAgeFilterChange = (event) => {
    setSearchByAge(event.target.checked);
    setSearchByName(false);
    setSearchByNation(false);
    setSearchByUserNation(false);
    setSearchByCombatRole(false);
    setSearchByEra(false);
    setSearchByServiceState(false);
    setSearchByGeneration(false);
    resetAllSearches();
    setAgeSearch([10,25]);
  };
  //changes filter according to the picked filter option(Service State Name)
  const handleServiceStateFilterChange = (event) => {
    setSearchByServiceState(event.target.checked);
    setSearchByName(false);
    setSearchByNation(false);
    setSearchByUserNation(false);
    setSearchByCombatRole(false);
    setSearchByEra(false);
    setSearchByAge(false);
    setSearchByGeneration(false);
    resetAllSearches();
  };
  //changes filter according to the picked filter option(Generation)
  const handleGenerationFilterChange = (event) => {
    setSearchByGeneration(event.target.checked);
    setSearchByName(false);
    setSearchByNation(false);
    setSearchByUserNation(false);
    setSearchByCombatRole(false);
    setSearchByEra(false);
    setSearchByAge(false);
    setSearchByServiceState(false);
    resetAllSearches();
  };

  // const handleFilterChange = (id,event) => {
  //   const {id: name} = event.currentTarget;
  //   if(name === "NameFilter"){
  //     console.log("Filter Changed");
  //     setSearchByName(event.target.checked);
  //   }
  //   else if(name === "NationFilter"){setSearchByNation(event.target.checked);}
  //   else if(name === "CombatRoleFilter"){setSearchByCombatRole(event.target.checked);}
  //   else if(name === "ServeStatFilter"){setSearchByServeStat(event.target.checked);}
  //   else if(name === "EraFilter"){setSearchByEra(event.target.checked);}
  //   else if(name === "AgeFilter"){setSearchByAge(event.target.checked);}
  //   else if(name === "GenFilter"){setSearchByGen(event.target.checked);}
  // };

  // const options = loginContext.tankNationsArray.map((option) => {
  //   const firstLetter = option[0].toUpperCase();
  //   return {
  //     firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
  //     ...option,
  //   };
  // });

  //!need to create function for filtering

  return (
    <React.Fragment>
      <div>
        <ErrorModal error={error} onClear={clearError} />
        <Text element="h1" value="Tank Search Tab!:" />
        <Card>
          <Grid2 container spacing={1}>
            <Grid2 xs={4}>
              <Card>
              <Text element="h3" value="Our Tank Search Engine:" />
            {searchByName && (
              <React.Fragment>
                <Autocomplete
                  id="tankNameSearch"
                  value={search}
                  options={loginContext.tankNamesArray}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  sx={{ width: 300 }}
                  onKeyPress={handleKeyPress}
                  onChange={(event, newSearch) => {
                    if (typeof newSearch === "string") {
                      setSearch({
                        tankName: newSearch,
                      });
                    } else if (newSearch && newSearch.inputSearch) {
                      setSearch({
                        tankName: newSearch.inputSearch,
                      });
                    } else {
                      setSearch(newSearch);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    let inputSearch;
                    try {
                      inputSearch = search.tankName;
                    } catch (err) {
                      inputSearch = "None Found!";
                    }
                    const isExisting = options.some(
                      (option) => inputSearch === option.tankName
                    );
                    if (inputSearch !== "" && !isExisting) {
                      filtered.push(inputSearch);
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputSearch) {
                      return option.inputSearch;
                    }
                    return option.tankName;
                  }}
                  renderOption={(props, option) => (
                    <React.Fragment>
                      <hr />
                      <li {...props}>
                        <strong>{`${option}`}</strong>
                      </li>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Search By Name" />
                  )}
                />
              </React.Fragment>
            )}
            {searchByNation && (
              <React.Fragment>
                <Autocomplete
                  id="tankNameSearch"
                  value={nationSearch}
                  options={loginContext.tankNationsArray}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  sx={{ width: 300 }}
                  onKeyPress={handleKeyPress}
                  onChange={(event, newSearch) => {
                    if (typeof newSearch === "string") {
                      setNationSearch({
                        nation: newSearch,
                      });
                    } else if (newSearch && newSearch.inputSearch) {
                      setNationSearch({
                        nation: newSearch.inputSearch,
                      });
                    } else {
                      setNationSearch(newSearch);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    let inputSearch;
                    try {
                      inputSearch = nationSearch.nation;
                    } catch (err) {
                      inputSearch = "None Found!";
                    }
                    const isExisting = options.some(
                      (option) => inputSearch === option.nation
                    );
                    if (inputSearch !== "" && !isExisting) {
                      filtered.push(inputSearch);
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputSearch) {
                      return option.inputSearch;
                    }
                    return option.nation;
                  }}
                  renderOption={(props, option) => (
                    <React.Fragment>
                      <hr />
                      <li {...props}>
                        <strong>{`${option}`}</strong>
                      </li>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Search By Nation" />
                  )}
                />
              </React.Fragment>
            )}
            {searchByUserNation && (
              <React.Fragment>
                <Autocomplete
                  id="tankNameSearch"
                  value={userNationsSearch}
                  options={loginContext.allNationsArray}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  sx={{ width: 300 }}
                  onKeyPress={handleKeyPress}
                  onChange={(event, newSearch) => {
                    if (typeof newSearch === "string") {
                      setUserNationsSearch({
                        userNations: newSearch,
                      });
                    } else if (newSearch && newSearch.inputSearch) {
                      setUserNationsSearch({
                        userNations: newSearch.inputSearch,
                      });
                    } else {
                      setUserNationsSearch(newSearch);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    let inputSearch;
                    try {
                      inputSearch = userNationsSearch.userNations;
                    } catch (err) {
                      inputSearch = "None Found!";
                    }
                    const isExisting = options.some(
                      (option) => inputSearch === option.userNations
                    );
                    if (inputSearch !== "" && !isExisting) {
                      filtered.push(inputSearch);
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputSearch) {
                      return option.inputSearch;
                    }
                    return option.userNations;
                  }}
                  renderOption={(props, option) => (
                    <React.Fragment>
                      <hr />
                      <li {...props}>
                        <strong>{`${option}`}</strong>
                      </li>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Search By User Nation" />
                  )}
                />
              </React.Fragment>
            )}
            {searchByCombatRole && (
              <React.Fragment>
                <Autocomplete
                  id="tankCombatRoleSearch"
                  value={combatRoleSearch}
                  options={loginContext.tankCombatRolesArray}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  sx={{ width: 300 }}
                  onKeyPress={handleKeyPress}
                  onChange={(event, newSearch) => {
                    if (typeof newSearch === "string") {
                      setCombatRoleSearch({
                        combatRole: newSearch,
                      });
                    } else if (newSearch && newSearch.inputSearch) {
                      setCombatRoleSearch({
                        combatRole: newSearch.inputSearch,
                      });
                    } else {
                      setCombatRoleSearch(newSearch);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    let inputSearch;
                    try {
                      inputSearch = combatRoleSearch.combatRole;
                    } catch (err) {
                      inputSearch = "None Found!";
                    }
                    const isExisting = options.some(
                      (option) => inputSearch === option.combatRole
                    );
                    if (inputSearch !== "" && !isExisting) {
                      filtered.push(inputSearch);
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputSearch) {
                      return option.inputSearch;
                    }
                    return option.combatRole;
                  }}
                  renderOption={(props, option) => (
                    <React.Fragment>
                      <hr />
                      <li {...props}>
                        <strong>{`${option}`}</strong>
                      </li>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Search By Combat Role" />
                  )}
                />
              </React.Fragment>
            )}
            {searchByEra && (
              <React.Fragment>
                <Autocomplete
                  id="tankEraSearch"
                  value={eraSearch}
                  options={loginContext.tankErasArray}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  sx={{ width: 300 }}
                  onKeyPress={handleKeyPress}
                  onChange={(event, newSearch) => {
                    if (typeof newSearch === "string") {
                      setEraSearch({
                        era: newSearch,
                      });
                    } else if (newSearch && newSearch.inputSearch) {
                      setEraSearch({
                        era: newSearch.inputSearch,
                      });
                    } else {
                      setEraSearch(newSearch);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    let inputSearch;
                    try {
                      inputSearch = eraSearch.era;
                    } catch (err) {
                      inputSearch = "None Found!";
                    }
                    const isExisting = options.some(
                      (option) => inputSearch === option.era
                    );
                    if (inputSearch !== "" && !isExisting) {
                      filtered.push(inputSearch);
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputSearch) {
                      return option.inputSearch;
                    }
                    return option.era;
                  }}
                  renderOption={(props, option) => (
                    <React.Fragment>
                      <hr />
                      <li {...props}>
                        <strong>{`${option}`}</strong>
                      </li>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Search By Era" />
                  )}
                />
              </React.Fragment>
            )}
            {searchByAge && (
              <React.Fragment>
                <Text
                  element="text"
                  label="Pick age range in which to search for a tank:"
                  value={`Look For A Tank Between ${ageSearch[0]} Years And ${ageSearch[1]} Years`}
                />
                <br/>
                <br/>
                <Slider
                  getAriaLabel={() => "Minimum distance"}
                  value={ageSearch}
                  max={150}
                  onChange={handleSliderChange}
                  getAriaValueText={valueText}
                  valueLabelDisplay="on"
                  marks
                  step={5}
                  disableSwap
                />
              </React.Fragment>
            )}
            {searchByServiceState && (
              <React.Fragment>
                <Autocomplete
                  id="tankServStateSearch"
                  value={serviceStateSearch}
                  options={loginContext.tankServiceStatesArray}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  sx={{ width: 300 }}
                  onKeyPress={handleKeyPress}
                  onChange={(event, newSearch) => {
                    if (typeof newSearch === "string") {
                      setServiceStateSearch({
                        serviceState: newSearch,
                      });
                    } else if (newSearch && newSearch.inputSearch) {
                      setServiceStateSearch({
                        serviceState: newSearch.inputSearch,
                      });
                    } else {
                      setServiceStateSearch(newSearch);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    let inputSearch;
                    try {
                      inputSearch = serviceStateSearch.serviceState;
                    } catch (err) {
                      inputSearch = "None Found!";
                    }
                    const isExisting = options.some(
                      (option) => inputSearch === option.serviceState
                    );
                    if (inputSearch !== "" && !isExisting) {
                      filtered.push(inputSearch);
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputSearch) {
                      return option.inputSearch;
                    }
                    return option.serviceState;
                  }}
                  renderOption={(props, option) => (
                    <React.Fragment>
                      <hr />
                      <li {...props}>
                        <strong>{`${option}`}</strong>
                      </li>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Search By Service State" />
                  )}
                />
              </React.Fragment>
            )}
            {searchByGeneration && (
              <React.Fragment>
                <Autocomplete
                  id="tankGenSearch"
                  value={generationSearch}
                  options={loginContext.tankGenerationsArray}
                  selectOnFocus
                  clearOnBlur
                  handleHomeEndKeys
                  freeSolo
                  sx={{ width: 300 }}
                  onKeyPress={handleKeyPress}
                  onChange={(event, newSearch) => {
                    if (typeof newSearch === "string") {
                      setGenerationSearch({
                        generation: newSearch,
                      });
                    } else if (newSearch && newSearch.inputSearch) {
                      setGenerationSearch({
                        generation: newSearch.inputSearch,
                      });
                    } else {
                      setGenerationSearch(newSearch);
                    }
                  }}
                  filterOptions={(options, params) => {
                    const filtered = filter(options, params);
                    let inputSearch;
                    try {
                      inputSearch = generationSearch.generation;
                    } catch (err) {
                      inputSearch = "None Found!";
                    }
                    const isExisting = options.some(
                      (option) => inputSearch === option.generation
                    );
                    if (inputSearch !== "" && !isExisting) {
                      filtered.push(inputSearch);
                    }
                    return filtered;
                  }}
                  getOptionLabel={(option) => {
                    if (typeof option === "string") {
                      return option;
                    }
                    if (option.inputSearch) {
                      return option.inputSearch;
                    }
                    return option.generation;
                  }}
                  renderOption={(props, option) => (
                    <React.Fragment>
                      <hr />
                      <li {...props}>
                        <strong>{`${option}`}</strong>
                      </li>
                    </React.Fragment>
                  )}
                  renderInput={(params) => (
                    <TextField {...params} label="Search By Generation" />
                  )}
                />
              </React.Fragment>
            )}
            <Button onClick={searchTank}>Search</Button>
            <Button onClick={resetSearch}>Reset Search</Button>
              </Card>
            </Grid2>
            <Grid2 container xs={8}>
              <Card>
            <FormControl component="fieldset" required={true}>
              <Text element="h3" value="Filter Options:" />
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox checked={searchByName}sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Name"
                  labelPlacement="end"
                  onChange={handleNameFilterChange}
                />
                <FormControlLabel control={<Checkbox checked={searchByNation}sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Nation"
                  labelPlacement="end"
                  onChange={handleNationFilterChange}
                />
                <FormControlLabel control={<Checkbox checked={searchByUserNation}sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By User Nation"
                  labelPlacement="end"
                  onChange={handleUserNationFilterChange}
                />
                <FormControlLabel control={<Checkbox checked={searchByCombatRole}sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Combat Role"
                  labelPlacement="end"
                  onChange={handleCombatRoleFilterChange}
                />
                <FormControlLabel control={<Checkbox checked={searchByEra}sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Era"
                  labelPlacement="end"
                  onChange={handleEraFilterChange}
                />
                <FormControlLabel control={<Checkbox checked={searchByAge}sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Age"
                  labelPlacement="end"
                  onChange={handleAgeFilterChange}
                />
                <FormControlLabel control={<Checkbox checked={searchByServiceState}sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Service Status"
                  labelPlacement="end"
                  onChange={handleServiceStateFilterChange}
                />
                <FormControlLabel control={<Checkbox checked={searchByGeneration}sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Generation"
                  labelPlacement="end"
                  onChange={handleGenerationFilterChange}
                />
                <Button onClick={resetFilter}>Filter Reset Button</Button>
              </FormGroup>
            </FormControl>
          </Card>
            </Grid2>
          </Grid2>
          <Card>
            {isLoading && !loadedTanks && (
              <div>
                <LoadingSpinner />
              </div>
            )}
            {!isLoading && !loadedTanks && (
              <div>
                <Text element="h1" value="No Tanks Found!" />
              </div>
            )}
            {!isLoading && loadedTanks.length === 0 && (
              <div>
                <Text element="h1" value={`No tanks were found!`} />
              </div>
            )}
            {!isLoading && loadedTanks && (
              <Container fixed>
                <div>
                  <TankCatalogueTable tanks={loadedTanks} />
                </div>
              </Container>
            )}
          </Card>
          <Paper elevation={6}>
            <Pagination
              defaultPage={1}
              count={pageCount}
              onChange={handleChange}
              renderItem={(item) => (
                <PaginationItem
                  slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                  {...item}
                  component={Link}
                  to={`/MainPage/Search?page=${page}`}
                />
              )}
            />
          </Paper>
          <Paginate />
          <Button to="/MainPage">Go Back</Button>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default TankSearch;
