//basic import
import * as React from "react";
//component imports
import Text from "../../Shared/components/Visual-Elements/Text";
import Card from "../../Shared/components/UI-Elements/Card";
import Button from "../../Shared/components/Form-Elements/Button";
import LoadingSpinner from "../../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../../Shared/components/UI-Elements/ErrorModal";
import RankingsTable from "./components/RankingsTable";
//Material UI Imports
import { Autocomplete, Checkbox, FormControl, FormControlLabel, FormGroup, TextField, createFilterOptions, Slider} from "@mui/material";
import { blue, grey } from "@mui/material/colors";
//Imported Hooks
import { useHistory, useLocation } from "react-router-dom";
import { useHttpClient } from "../../Shared/Hooks/http-hook";
//context import
import { LoginContext } from "../../Shared/Context/login-context";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

//TODO : need to link both imported components so that they can communicate and respond to each other
//assign the imported Material UI function "createFilterOptions" to a variable
const filter = createFilterOptions();

//uses the "useLocation" function to extract the current search from the URL
function useQuery(){
  return new URLSearchParams(useLocation().search);
}

//is used for the slider search option
function valueText(value) {
  return `${value}°C`;
}

function Rankings() {
  //login context
  const loginContext = React.useContext(LoginContext);
  //deconstruction of the http client hook
  const {isLoading,error,sendRequest,clearError} = useHttpClient();
  
  //collection of page search states and their data
  const [search,setSearch] = React.useState("");
  const [nationSearch, setNationSearch] = React.useState("");
  const [userNationsSearch, setUserNationsSearch] = React.useState("");
  const [combatRoleSearch, setCombatRoleSearch] = React.useState("");
  const [eraSearch, setEraSearch] = React.useState("");
  const [ageSearch, setAgeSearch] = React.useState([null,null]);
  const [serviceStateSearch, setServiceStateSearch] = React.useState("");
  const [generationSearch, setGenerationSearch] = React.useState("");
  const [prevSearch,setPrevSearch] = React.useState("");

  //collection of other page states and data
  //  loaded tanks state
  const [loadedTanks,setLoadedTanks] = React.useState("");
  //  "useHistory" variable
  const history = useHistory();
  //  "useQuery" variable
  const query = useQuery();
  //!not used atm
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

  //useEffect - fetches tanks that are sorted by their ranking
  React.useEffect(() => {
    const fetchTanks = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/getTanksByRankings`
        );
        setLoadedTanks(responseData.tanks);
      } catch (err) {}
    };
    fetchTanks();
  },[sendRequest]);

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
  }

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
  }

  //searches for the tanks by ranking using user \ admin's input //!is not finished yet and does regular search
  const searchTankByRankings = async () => {
    if (!isUniqueSearch()) {
      try {
        setPervSearches();
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/Search?searchQuery=${search.tankName||null}&searchNation=${nationSearch.nation||null}&searchUserNations=${userNationsSearch.userNations||null}&searchCombatRole=${combatRoleSearch.combatRole||null}&searchEra=${eraSearch.era||null}&searchAge=${ageSearch||null}&searchServiceState=${serviceStateSearch.serviceState||null}&searchGeneration=${generationSearch.generation||null}`
        );
        console.log(responseData.tanks);
        setLoadedTanks(responseData.tanks);
      } catch (err) {
        console.log("- - - Searching Failed - - -");
        console.log(err);
      }
      history.push(`/MainPage/Rankings?searchQuery=${search.tankName || nationSearch.nation || userNationsSearch.userNations || combatRoleSearch.combatRole || eraSearch.era || ageSearch.age || serviceStateSearch.serviceState || generationSearch.generation || "none"}`);
    } else {
      console.log("- - - Did Not Search! - - -")
      history.push("/MainPage/Rankings");
    }
  }

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
  }

  //resets the current search and fills the loaded tanks with the default fetch
  const resetRankingsSearch = async () => {
    if (isUniqueSearch()) {
      try {
        console.log("- - - Refreshed List - - -");
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/getTanksByRankings`
        );
        setLoadedTanks(responseData.tanks);
        resetAllSearches();
        history.push("/MainPage/Rankings");
      } catch (err) {}
    }
  };

  //resets the filters that the user picked
  const resetRankingsFilter = async () => {
    setSearch("");
    setSearchByName(true);
    setSearchByNation(false);
    setNationSearch("");
    setSearchByUserNation(false);
    setUserNationsSearch("");
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
  }

  //responds to the click of the "enter" key for searching
  const handleKeyPress = (event) => {
    if (event.keyCode === 13) {
      searchTankByRankings();
    }
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
  }
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
  }
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
  }
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
  }
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
  }
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
  }
  //changes filter according to the picked filter option(Service State Name)
  const handleServeStateFilterChange = (event) => {
    setSearchByServiceState(event.target.checked);
    setSearchByName(false);
    setSearchByNation(false);
    setSearchByUserNation(false);
    setSearchByCombatRole(false);
    setSearchByEra(false);
    setSearchByAge(false);
    setSearchByGeneration(false);
    resetAllSearches();
  }
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
  }

  return (
    <React.Fragment>
      <div>
        <ErrorModal error={error} onClear={clearError} to="/MainPage"/>
        <Text element="h1" value="Rankings Tab: " />
        <Card>
          <Grid2 container spacing={1}>
            <Grid2 xs={4}>
            <Card>
            <Text element="h3" value="Our Rankings Search Engine:"/>
            {searchByName && (
              <Autocomplete 
              id="tankNameSearch" value={search} options={loginContext.tankNamesArray}
              selectOnFocus clearOnBlur handleHomeEndKeys freeSolo sx={{ width: 300 }}
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
                try { inputSearch = search.tankName } catch (err) { inputSearch = "Not Found!";} 
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
                  <hr/>
                  <li {...props}>
                    <strong>{`${option}`}</strong>
                  </li>
                </React.Fragment>
                
              )}
              renderInput={(params) => (
                <TextField {...params} label="Search By Name" />
              )}/>
            )}
            {searchByNation && (
              <Autocomplete 
              id="tankNationSearch" value={nationSearch} options={loginContext.tankNationsArray}
              selectOnFocus clearOnBlur handleHomeEndKeys freeSolo sx={{ width: 300 }}
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
                  inputSearch = nationSearch.nation
                } catch (err) { 
                  inputSearch = "Not Found!";
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
                  <hr/>
                  <li {...props}>
                    <strong>{`${option}`}</strong>
                  </li>
                </React.Fragment>
                
              )}
              renderInput={(params) => (
                <TextField {...params} label="Search By Nation" />
              )}/>
            )}
            {searchByUserNation && (
              <Autocomplete 
              id="tankNationSearch" value={userNationsSearch} options={loginContext.allNationsArray}
              selectOnFocus clearOnBlur handleHomeEndKeys freeSolo sx={{ width: 300 }}
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
                  inputSearch = userNationsSearch.userNations
                } catch (err) { 
                  inputSearch = "Not Found!";
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
                  <hr/>
                  <li {...props}>
                    <strong>{`${option}`}</strong>
                  </li>
                </React.Fragment>
                
              )}
              renderInput={(params) => (
                <TextField {...params} label="Search By User Nation" />
              )}/>
            )}
            {searchByCombatRole && (
              <Autocomplete
                id="tankCombatRoleSearch" value={combatRoleSearch} options={loginContext.tankCombatRolesArray}
                selectOnFocus clearOnBlur handleHomeEndKeys freeSolo sx={{ width: 300 }}
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
                      inputSearch = combatRoleSearch.combatRole
                    } catch (err) { 
                      inputSearch = "Not Found!";
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
                      <hr/>
                      <li {...props}>
                        <strong>{`${option}`}</strong>
                      </li>
                    </React.Fragment>
                )}
                renderInput={(params) => (
                  <TextField {...params} label="Search By Combat Role" />
                )} 
              />
            )}
            {searchByEra && (
              <Autocomplete
              id="tankEraSearch" value={eraSearch} options={loginContext.tankErasArray}
              selectOnFocus clearOnBlur handleHomeEndKeys freeSolo sx={{ width: 300 }}
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
                  inputSearch = eraSearch.era
                } catch (err) { 
                  inputSearch = "Not Found!";
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
                  <hr/>
                  <li {...props}>
                    <strong>{`${option}`}</strong>
                  </li>
                </React.Fragment>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Search By Era" />
              )}
            />
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
              id="tankGenSearch"
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
                  <hr/>
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
                  <hr/>
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
            <Button onClick={searchTankByRankings}>Search</Button>
            <Button onClick={resetRankingsSearch}>Reset</Button>
            </Card>
            </Grid2>
            <Grid2  container xs={8}>
            <Card>
              <FormControl component="fieldset" required={true}>
              <Text element="h3" value="Filter Options:" />
              <FormGroup aria-label="position" row>
                <FormControlLabel
                  control={<Checkbox checked={searchByName} sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Name"
                  labelPlacement="end"
                  onChange={handleNameFilterChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={searchByNation} sx={{ color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Nation"
                  labelPlacement="end"
                  onChange={handleNationFilterChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={searchByUserNation} sx={{ color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By User Nation"
                  labelPlacement="end"
                  onChange={handleUserNationFilterChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={searchByCombatRole} sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Combat Role"
                  labelPlacement="end"
                  onChange={handleCombatRoleFilterChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={searchByEra} sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Era"
                  labelPlacement="end"
                  onChange={handleEraFilterChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={searchByAge} sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Age"
                  labelPlacement="end"
                  onChange={handleAgeFilterChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={searchByServiceState} sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Service Status"
                  labelPlacement="end"
                  onChange={handleServeStateFilterChange}
                />
                <FormControlLabel
                  control={<Checkbox checked={searchByGeneration} sx={{color: grey[600],"&.Mui-checked": { color: blue[800] },}}/>}
                  label="Filter By Generation"
                  labelPlacement="end"
                  onChange={handleGenerationFilterChange}
                />
                <Button onClick={resetRankingsFilter}>Filter Reset Button</Button>
              </FormGroup>
            </FormControl>
            </Card>
            </Grid2>
          </Grid2>
          
          <Card>
            {isLoading && !loadedTanks && (
              <div>
                <LoadingSpinner/>
              </div>
            )}
            {!isLoading && !loadedTanks && (
              <div>
                <Text element="h1" value="No Tanks Found!"/>
              </div>
            )}
            {!isLoading && loadedTanks.length === 0 && (
              <div>
                <Text element="h1" value="No tanks were found!"/>
              </div>
            )}
            {!isLoading && loadedTanks && (
              <div>
                <RankingsTable tanks={loadedTanks}/>
              </div>
            )}
          </Card>
        </Card>
      </div>
    </React.Fragment>
  );
}

export default Rankings;
