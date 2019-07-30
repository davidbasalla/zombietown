// NOOP reducer, just passing it so we can have a handle on the
// scene object from within Redux
const scene = (state = {}, action) => {
  return state;
};
export default scene;
