export const endTurn = activeMissions => ({
  type: "END_TURN",
  activeMissions
});

export const selectTile = tileName => ({
  type: "SELECT_TILE",
  tileName
});

export const addTiles = tiles => ({
  type: "ADD_TILES",
  tiles
});

export const conquer = (tile, people) => ({
  type: "CONQUER_TILE",
  tile,
  people
});

export const toggleForm = () => ({
  type: "TOGGLE_CONQUER_FORM"
});

export const cancel = () => ({
  type: "CANCEL"
});

export const updatePersonOnConquerForm = person => ({
  type: "UPDATE_PERSON_ON_CONQUER_FORM",
  person
});

export const clearSelectedPeople = () => ({
  type: "CLEAR_SELECTED_PEOPLE"
});

export const setConquerFormError = message => ({
  type: "SET_ERROR_ON_CONQUER_FORM",
  message
});

export const updateFoodAmount = foodAmount => ({
  type: "UPDATE_FOOD_AMOUNT",
  foodAmount
});

export const removeEventMessage = () => ({
  type: "REMOVE_EVENT_MESSAGE"
});
