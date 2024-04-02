<template>
    <button class="btn" @click="changeFloor"></button>
</template>

<script>
export default {
  props: {
    floor: {
      type: Number,
      required: true
    }
  },
  methods: {
    changeFloor() {
      // sessionStorage.setItem(this.$store.state.id, this.$props.floor)
      // this.$store.commit("setId")
      // let keys = Object.keys(sessionStorage);
      // for(let key of keys) {
      //   const value = sessionStorage.getItem(key)
      //   console.log(value)
      // }
      if (this.$props.floor > this.$store.state.position && !this.$store.state.delay) {
        setTimeout(() => {
          this.$store.commit("moveElevator", this.$store.state.position + 1)
          this.$store.commit("setTargetFloor", this.$props.floor)
          this.$store.commit("setMovementState", "top")
          this.changeFloor()
        }, 1000)
      } else if (this.$props.floor < this.$store.state.position && !this.$store.state.delay) {
        setTimeout(() => {
          this.$store.commit("moveElevator", this.$store.state.position - 1)
          this.$store.commit("setTargetFloor", this.$props.floor)
          this.$store.commit("setMovementState", "bottom")
          this.changeFloor()
        }, 1000)
      } 
      else if (this.$props.floor === this.$store.state.position && !this.$store.state.delay) {
        this.$store.commit("setDelayState", true)
        this.$store.commit("setTargetFloor", "")
        this.$store.commit("setMovementState", "")
        setTimeout(() => {
          this.$store.commit("setDelayState", false)
        }, 3000)
      }
    }
  }
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
  content: "";
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
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: rgb(117, 117, 189);
}
</style>
