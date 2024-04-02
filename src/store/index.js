import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: () => ({
    floors: 5,
    position: 1,
    delay: false,
    id: 0,
    targetFloor: '',
    movement: ''
  }),
  mutations: {
    moveElevator: (state, floor) => {
      state.position = floor
    },
    setDelayState: (state, value) => {
      state.delay = value
    },
    setId: (state) => {
      state.id++
    },
    setTargetFloor: (state, value) => {
      state.targetFloor = value
    },
    setMovementState: (state, value) => {
      state.movement = value
    }
  },
});
