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

const renderTileInfo = tile => {
  let divs = renderResourceTypes(tile.resourceAttributes);
  tile.conquerCounter &&
    divs.push(
      <div className="info" key="conquer">{`Conquering in ${
        tile.conquerCounter
      } days`}</div>
    );
  return divs;
};

const MainMenu = ({
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

      <h4 className="selected">{selectedTile.displayName}</h4>
      <div>{renderTileInfo(selectedTile)}</div>

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
          onClick={endTurnAction}
          disabled={displayConquerForm}
        >
          End day {turn}
        </button>
      </div>
    </div>
  );
};

export default connect(MainMenu);
