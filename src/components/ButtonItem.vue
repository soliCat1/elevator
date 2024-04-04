<template>
  <button
    class="btn"
    @click="changeFloor"
    :class="{ active: floor === this.$store.state.targetFloor }"
  ></button>
</template>

<script>
export default {
  props: {
    floor: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      interval: null,
    };
  },
  methods: {
    changeFloor() {
      if (
        this.$props.floor === this.$store.state.position &&
        !this.$store.state.movement
      ) {
        return
      } else if (
        this.$store.state.floorQueue.includes(this.$props.floor) ||
        (this.$store.state.targetFloor === this.$props.floor &&
          this.$store.state.movement)
      ) {
        return
      }

      if (this.$store.state.movement) {
        this.$store.commit('addToFloorQueue', this.$props.floor);
        return;
      }
      this.$store.commit('addToFloorQueue', this.$props.floor);
      this.moveElevator();
    },
    moveElevator() {
      this.interval = setInterval(() => {
        if (this.$store.state.floorQueue.length === 0) {
          clearInterval(this.interval);
          return;
        }

        const nextFloor = this.$store.state.floorQueue[0];
        if (
          nextFloor !== this.$store.state.position &&
          !this.$store.state.delay
        ) {
          this.$store.commit('setTargetFloor', nextFloor);
          this.$store.commit(
            'setMovementState',
            nextFloor > this.$store.state.position ? 'top' : 'bottom'
          );
          this.$store.commit(
            'moveElevator',
            nextFloor > this.$store.state.position
              ? this.$store.state.position + 1
              : this.$store.state.position - 1
          );
        } else if (
          nextFloor === this.$store.state.position &&
          !this.$store.state.delay
        ) {
          this.$store.commit('setTargetFloor', '');
          this.$store.commit('setMovementState', '');
          this.$store.commit('setDelayState', true);
          setTimeout(() => {
            this.$store.commit('setDelayState', false);
            this.$store.commit('deleteFromFloorQueue');
            this.moveElevator();
          }, 3000);
        }
      }, 1000);
      setTimeout(
        () => clearInterval(this.interval),
        (Math.abs(this.$store.state.position - this.$props.floor) + 3) * 1000
      );
    },
  },
  mounted() {
    const queue = localStorage.getItem('queue');
    if (queue) {
      const queueArr = queue.split(',').map((item) => parseInt(item));
      for (const item of queueArr) {
        this.$store.commit('addToFloorQueue', item);
      }
      this.moveElevator();
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
};
</script>

<style>
.btn {
  width: 40px;
  height: 40px;
  border: 1px solid rgb(117, 117, 189);
  background-color: transparent;
  position: relative;
  border-radius: 4px;
  cursor: pointer;
}

.btn::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 20px;
  height: 20px;
  border: 2px solid rgb(117, 117, 189);
  border-radius: 50%;
  background-color: transparent;
}

.btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgb(117, 117, 189);
}

.active,
.active::after {
  border-color: rgb(187, 75, 71);
}

.active::before {
  background-color: rgb(187, 75, 71);
}
</style>
