import React from "react";

import resourceTypes from "../../constants/resourceTypes";
import connect from "./connect";
import styles from "./style.css";

const renderResourceTypes = attrs =>
  Object.keys(attrs).map(function(key) {
    let obj = attrs[key];
    return (
      <div className="info" key={key}>{`${resourceTypes[key]}: ${obj}`}</div>
    );
  });

const renderTileInfo = (tile, missionForTile) => {
  let divs = renderResourceTypes(tile.resourceAttributes);

  missionForTile &&
    divs.push(
      <div className="info" key="conquer">{`Conquering in ${
        missionForTile.turnCounter
      } days`}</div>
    );
  return divs;
};

const MainMenu = ({
  missionForSelectedTile,
  activeMissions,
  currentPopulation,
  displayConquerForm,
  food,
  foodGrowth,
  maxPopulation,
  selectedTile,
  showConquerButton,
  turn,
  conquerAction,
  endTurnAction,
  toggleFormAction
}) => {
  return (
    <div>
      <div className="resourceContainer">
        <span className="resource">
          👱: {`${currentPopulation}/${maxPopulation}`}
        </span>
        <span className="resource">🍎: {`${food} (${foodGrowth})`}</span>
      </div>

      <hr />

      <h4 className="selected">
        {selectedTile.displayName}
        {selectedTile.taken ? " ✅🙍🏻‍" : " ❌💀"}
      </h4>
      <div>{renderTileInfo(selectedTile, missionForSelectedTile)}</div>

      {showConquerButton && (
        <div className="buttonContainer">
          <button
            className="button"
            onClick={toggleFormAction}
            disabled={displayConquerForm}
          >
            Conquer tile
          </button>
        </div>
      )}

      <div className="buttonContainer">
        <button
          className="button"
          onClick={() => endTurnAction(activeMissions)}
          disabled={displayConquerForm}
        >
          End day {turn}
        </button>
      </div>
    </div>
  );
};

export default connect(MainMenu);
