//basic imports
import React, { useEffect, useState } from "react";
//hook import
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
//component import
import TankCatalogueButton from "../../../Shared/components/Extra-Elements/TankCatalogueButton";
import Card from "../../../Shared/components/UI-Elements/Card";
import Text from "../../../Shared/components/Visual-Elements/Text";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";

function RecommendationWindow(props) {
  //deconstruction of the http client hook
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  //loaded tank state
  const [loadedTanks, setLoadedTanks] = useState();

  //useEffect - fetches three random tanks as options in the tank's page
  useEffect(() => {
    const fetchRandomTanks = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/MainPage/Admin/TanksDatabase/GetThreeRandomTanks/${props.currentTank}`
        );
        setLoadedTanks(responseData.tanks);
      } catch (err) {}
    };
    fetchRandomTanks();
  }, [sendRequest]);

  return (
    <div>
      <Text
        element="h3"
        value="Similar Tanks From The Same Nation That You Might Like"
      />
      <Card>
        <ErrorModal error={error} onClear={clearError} to="/MainPage"/>
        {isLoading && (
          <div>
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && loadedTanks && (
          <div>
            {loadedTanks.map((tank) => {
              return (
                <TankCatalogueButton
                  tankId={tank._id}
                  tankName={tank.tankName}
                  image={tank.tankImagePfp}
                  alt={"uploads/stockImages/tankStockIcon.jpg"}
                  style={{ width: "100px", hight: "100px" }}
                />
              );
            })}
          </div>
        )}
        {!isLoading && !loadedTanks && (
          <div>
            <h1>Could Not Fetch Three Random Tanks!</h1>
          </div>
        )}
      </Card>
    </div>
  );
}

export default RecommendationWindow;
