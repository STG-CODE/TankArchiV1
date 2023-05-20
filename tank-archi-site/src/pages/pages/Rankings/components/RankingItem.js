//basic imports
import React,{ useState , useContext } from "react";
//hook import
import { useHttpClient } from "../../../Shared/Hooks/http-hook";
//component imports
import Button from "../../../Shared/components/Form-Elements/Button";
import ErrorModal from "../../../Shared/components/UI-Elements/ErrorModal";
import LoadingSpinner from "../../../Shared/components/UI-Elements/LoadingSpinner";
import Text from "../../../Shared/components/Visual-Elements/Text";
import Image from "../../../Shared/components/Visual-Elements/Image";

function RankingItem(props) {
    //deconstruction of the http client hook
    const {isLoading,error,sendRequest,clearError} = useHttpClient();

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError}/>
            {isLoading && <LoadingSpinner asOverlay/>}
            <tr>
                <th>
                    <Text element="h4" value={`#${props.rank}`}/>
                </th>
                <th>
                    <Image
                     image={`http://localhost:5000/${props.image || 
                     "uploads/stockImages/stockSuggestionPic.png"}`}
                     alt={"No Tank Image Found"}
                     style={props.style}
                    />
                </th>
                <th>
                    <Text element="h4" value={props.tankName}/>
                </th>
                <th>
                    <Text element="h4" value={props.nation}/>
                </th>
                <th>
                    <Text element="h4" value={props.combatRole}/>
                </th>
                <th>
                    <Text element="h4" value={props.era}/>
                </th>
                <th>
                    <Text element="h4" value={props.startDate}/>
                </th>
                <th>
                    <Text element="h4" value={props.endDate}/>
                </th>
                <th>
                    <Text element="h4" value={props.avgRating}/>
                </th>
                <th>
                    <Text element="h4" value={props.votes}/>
                </th>
                <Button>Go To Tank</Button>
            </tr>
        </React.Fragment>
    )
}

export default RankingItem;