import * as THREE from "three";
import { flatten, isEmpty } from "ramda";

import { combineReducers } from "redux";

import {
  addEventMessage,
  addPerson,
  conquer,
  createZombieHorde,
  endTurn,
  moveZombieHorde,
  removeZombieHorde,
  loseTile,
  selectTile,
  updateFoodAmount
} from "../actions";

import displayConquerForm from "./displayConquerForm";
import foodAmount from "./foodAmount";
import missions from "./missions";
import people from "./people";
import scene from "./scene";
import selectedTile from "./selectedTile";
import tiles from "./tiles";
import turn from "./turn";
import ui from "./ui";
import zombieHordes from "./zombieHordes";

import { createOutlineTile } from "../models";
import resourceTypes from "../constants/resourceTypes";

const DEGREES_90 = 1.5708;
const COLOR_RED = 0xff0000;
const COLOR_GREY_DARK = 0x404040;

// main reducer
const reducer = combineReducers({
  displayConquerForm,
  foodAmount,
  missions,
  people,
  scene,
  selectedTile,
  tiles,
  turn,
  ui,
  zombieHordes
});

// TODO ThreeJS code doesn't really belong here, move somewhere else
const createZombieTile = (scene, position) => {
  const geometry = new THREE.PlaneGeometry(7, 7, 32);
  const multiplier = 23.4;

  const material = new THREE.MeshBasicMaterial({
    opacity: 1,
    transparent: true,
    side: THREE.DoubleSide
  });
  material.map = new THREE.TextureLoader().load(
    "../assets/icons/zombie_128x128.png"
  );

  const iconTile = new THREE.Mesh(geometry, material);
  iconTile.castShadow = false;
  iconTile.receiveShadow = false;
  iconTile.rotation.y = DEGREES_90 * 0.5;
  iconTile.position.set(
    position.x * multiplier + 28,
    15,
    position.z * multiplier + 6
  );

  scene.add(iconTile);

  var redTileGeo = createOutlineTile();
  var redTileMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    opacity: 0.5,
    transparent: true
  });
  var redTile = new THREE.Mesh(redTileGeo, redTileMat);

  redTile.castShadow = false;
  redTile.receiveShadow = false;
  redTile.rotation.x = DEGREES_90;
  redTile.position.set(
    position.x * multiplier + 0.5,
    0.6,
    position.z * multiplier + 1
  );

  scene.add(redTile);

  return [iconTile, redTile];
};

// TODO ThreeJS code doesn't really belong here, move somewhere else
const createHourglassTile = (scene, position) => {
  const geometry = new THREE.PlaneGeometry(7, 7, 32);
  const multiplier = 23.4;

  const material = new THREE.MeshBasicMaterial({
    opacity: 1,
    transparent: true,
    side: THREE.DoubleSide
  });
  material.map = new THREE.TextureLoader().load(
    "../assets/icons/hourglass_128x128.png"
  );

  const iconTile = new THREE.Mesh(geometry, material);
  iconTile.castShadow = false;
  iconTile.receiveShadow = false;
  iconTile.rotation.y = DEGREES_90 * 0.5;
  iconTile.position.set(
    position.x * multiplier + 28,
    15,
    position.z * multiplier + 6
  );

  scene.add(iconTile);

  return iconTile;
};

// thunks
export const processEndOfTurn = currentState => {
  // NOTE is currentState needed if we have getState? Redux question
  return (dispatch, getState) => {
    dispatch(endTurn(getActiveMissions(getState()), getState().scene));

    // PROCESS TAKEN TILES /////////////////////////////////////////////////////////
    // Add event messages for taken tiles
    const oldTakenTiles = currentState.tiles.filter(tile => tile.taken);
    const oldTakenTilesIds = oldTakenTiles.map(t => t.id);
    const newTakenTiles = getState().tiles.filter(tile => tile.taken);

    const tilesToAdd = newTakenTiles.filter(
      t => !oldTakenTilesIds.includes(t.id)
    );

    tilesToAdd.forEach(tile => {
      const message = `${tile.displayName} was conquered`;
      const messages = [message];

      tile.resourceAttributes &&
        Object.keys(tile.resourceAttributes).forEach(key => {
          messages.push(
            `You have gained ${tile.resourceAttributes[key]} ${resourceTypes[
              key
            ].toLowerCase()}`
          );
        });

      // Add a person
      const undiscoveredPeople = getUndiscoveredPeople(currentState);
      const person = undiscoveredPeople.length && undiscoveredPeople[0];
      const personName =
        person && `${person.firstName} ${person.lastName} ${person.icon}`;
      const peopleMessage = `You found a survivor, ${personName}`;
      if (person) {
        dispatch(addPerson(person));
        messages.push(peopleMessage);
      }

      dispatch(addEventMessage(messages.join(". ")));
    });

    // PROCESS FOOD AMOUNT /////////////////////////////////////////////////////////

    // ...use currentState rather than getState as we only want to apply
    // the food growth _next_ turn
    const amount = getFoodGrowth(currentState);

    dispatch(updateFoodAmount(amount));
    if (currentState.foodAmount <= 1 && amount <= 0)
      dispatch(
        addEventMessage(
          "❌ There is no more food. People are passing out from hunger!"
        )
      );

    // Create zombie horde, hardcoded to happen on turn 2
    if (currentState.turn == 2) {
      dispatch(addEventMessage("A zombie horde is advancing!! 😱"));

      const position = { x: -2, z: -4 };
      const geos = createZombieTile(currentState.scene, position);
      dispatch(createZombieHorde(position, geos));
    }

    const zombieHordes = getZombieHordes(currentState);
    if (!isEmpty(getZombieHordes(currentState))) {
      console.log("HANDLE ZOMBIE MOVEMENT");
      // find nearest taken tile
      const takenTiles = currentState.tiles.filter(tile => tile.taken);

      zombieHordes.forEach((horde, index) => {
        const reducer = (accumulator, currentValue) => {
          // accumulator is the current closest tile
          // currentValue is the tile under test
          const currentClosestDistX = horde.position.x - accumulator.position.x;
          const currentClosestDistZ = horde.position.z - accumulator.position.z;
          const currentClosestDist =
            Math.abs(currentClosestDistX) + Math.abs(currentClosestDistZ);

          const currentDistX = horde.position.x - currentValue.position.x;
          const currentDistZ = horde.position.z - currentValue.position.z;
          const currentDist = Math.abs(currentDistX) + Math.abs(currentDistZ);

          return currentDist < currentClosestDist ? currentValue : accumulator;
        };

        const closestTile = takenTiles.reduce(reducer);

        // Calc the new position - TODO Extract to separate method
        const xDir = horde.position.x - closestTile.position.x;
        const zDir = horde.position.z - closestTile.position.z;

        const getMove = distance => {
          if (distance === 0) {
            return 0;
          }

          if (distance > 0) {
            return -1;
          }

          if (distance < 0) {
            return 1;
          }
        };

        const xMove = getMove(xDir);
        const zMove = xMove === 0 ? getMove(zDir) : 0; // only calc new z if horde has not moved along x

        const newPosition = {
          x: horde.position.x + xMove,
          z: horde.position.z + zMove
        };

        dispatch(moveZombieHorde(horde, newPosition));

        // PROCESS ZOMBIE FIGHT //////////////////////////////////////////////////
        const zombiesAboutToArrive = Math.abs(xDir) <= 1 && Math.abs(zDir) <= 1;
        if (zombiesAboutToArrive) {
          const calcFight = () =>
            // TODO - to be replaced by some sort of algorithm
            ({ victory: false });

          const result = calcFight();

          if (result.victory) {
            horde.geos.forEach(geo => currentState.scene.remove(geo));
            dispatch(removeZombieHorde(horde));
          } else {
            // TODO set the tile back to unconquered

            closestTile.assets.forEach(asset => {
              asset.material.color.set(COLOR_GREY_DARK);
            });
            dispatch(loseTile(closestTile, currentState.tiles));

            horde.geos.forEach(geo => currentState.scene.remove(geo));
            dispatch(removeZombieHorde(horde));
          }

          const outcome = result.victory ? "You won!" : "You lost!";
          dispatch(addEventMessage(`ZOMBIE FIGHT!!! ${outcome}`));
        }
      });
    }
  };
};

export const processSelectTile = (tiles, tile) => {
  return (dispatch, getState) => {
    // Side effects for tile selection
    // TODO There should only be one select tile instead of one for each tile
    tiles.forEach(x => (x.displayTile.material.opacity = 0));
    tile.displayTile.material.opacity = 0.5;

    dispatch(selectTile(tile));
  };
};

export const processInitiateConquer = (tile, people, conquerCounter) => {
  return (dispatch, getState) => {
    const position = {
      x: tile.position.x,
      z: tile.position.z
    };
    const hourglassIcon = createHourglassTile(getState().scene, position);

    return dispatch(
      conquer(tile, people, conquerCounter, getState().tiles, hourglassIcon)
    );
  };
};

// selector for food growth
export const getFoodGrowth = state => {
  const addFoodGrowth = (total, tile) => {
    const amount = tile.resourceAttributes.foodGrowth
      ? tile.resourceAttributes.foodGrowth
      : 0;
    return (total += amount);
  };

  const takenTiles = state.tiles.filter(tile => tile.taken);
  const grossGrowth = takenTiles.reduce(addFoodGrowth, 0);
  const netGrowth = grossGrowth - getDiscoveredPeople(state).length;
  return netGrowth;
};

// selector for max population
export const getMaxPopulation = state => {
  const takenTiles = state.tiles.filter(tile => tile.taken);

  const addPopulationSpace = (total, tile) => {
    const amount = tile.resourceAttributes.populationSpace
      ? tile.resourceAttributes.populationSpace
      : 0;
    return (total += amount);
  };

  return takenTiles.reduce(addPopulationSpace, 0);
};

// selector for active missions
export const getActiveMissions = state =>
  state.missions.filter(
    mission => mission.turnCounter && mission.turnCounter > 0
  );

// selector for people on missions
export const getDiscoveredPeople = state => {
  return state.people.filter(p => p.discovered);
};

// selector for undiscovered people on missions
export const getUndiscoveredPeople = state => {
  return state.people.filter(p => !p.discovered);
};

// selector for people on missions
export const getPeopleOnMissions = state => {
  const activeMissions = getActiveMissions(state);
  const peopleInMissions = flatten(
    activeMissions.map(mission => mission.people)
  );
  const peopleInMissionsIds = peopleInMissions.map(person => person.id);
  return getDiscoveredPeople(state).filter(person =>
    peopleInMissionsIds.includes(person.id)
  );
};

// selector for available people
export const getAvailablePeople = state => {
  const activeMissions = getActiveMissions(state);
  const peopleInMissions = flatten(
    activeMissions.map(mission => mission.people)
  );

  const peopleInMissionsIds = peopleInMissions.map(person => person.id);

  return getDiscoveredPeople(state).filter(
    person => !peopleInMissionsIds.includes(person.id)
  );
};

export const getZombieHordes = state => {
  return state.zombieHordes;
};

export default reducer;
