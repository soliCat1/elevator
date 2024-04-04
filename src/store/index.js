import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: () => ({
    floors: 5,
    position: 1,
    delay: false,
    targetFloor: '',
    movement: '',
    floorQueue: [],
  }),
  mutations: {
    moveElevator: (state, floor) => {
      state.position = floor;
    },
    setDelayState: (state, value) => {
      state.delay = value;
    },
    setTargetFloor: (state, value) => {
      state.targetFloor = value;
    },
    setMovementState: (state, value) => {
      state.movement = value;
    },
    addToFloorQueue: (state, value) => {
      if (!state.floorQueue.includes(value)) {
        state.floorQueue.push(value);
        localStorage.setItem('queue', state.floorQueue);
      }
      console.log(state.floorQueue);
    },
    deleteFromFloorQueue: (state) => {
      state.floorQueue.shift();
      localStorage.setItem('queue', state.floorQueue);
      console.log(state.floorQueue);
    },
  },
});
