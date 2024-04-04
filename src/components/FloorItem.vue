<template>
  <div class="floor">
    <div class="shaft"
      :class="{ elevator: this.$store.state.position === floor,
      delay: this.$store.state.delay && this.$store.state.position === floor}">
      <div class="monitor" v-if="this.$store.state.position === floor"
       :class="{top: this.$store.state.movement === 'top', bottom: this.$store.state.movement === 'bottom'}">
        {{ this.$store.state.targetFloor }}
      </div>
    </div>
    <div class="button-container">
      <span class="floor-number">{{ floor }}</span>
      <ButtonItem :floor="floor"></ButtonItem>
    </div>
  </div>
</template>

<script>
import ButtonItem from "@/components/ButtonItem.vue";
export default {
  components: {
    ButtonItem,
  },
  props: {
    floor: {
      type: Number,
      required: true,
    },
  }
};
</script>

<style>
.floor {
  flex-grow: 1;
  display: flex;
  border-bottom: 1px solid rgba(73, 73, 73, 0.2);
}

.floor:last-of-type {
  border-top: 1px solid rgba(73, 73, 73, 0.2);
}

.shaft {
  width: 20%;
  height: 100%;
  background-color: rgba(209, 209, 209, 0.3);
  border-left: 5px solid rgba(73, 73, 73, 0.5);
  border-right: 5px solid rgba(73, 73, 73, 0.5);
}

.elevator {
  background-color: rgb(117, 117, 189);
}

@keyframes blink {
    0% {
        opacity: 1;
    }
    50% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}

.delay {
    animation: blink 1s;
    animation-iteration-count: infinite;
}

.monitor {
  width: 60px;
  height: 30px;
  background-color: #ffffff;
  margin: 20px auto auto auto;
  font-size: 20px;
  font-weight: 700;
  padding: 5px 10px;
  position: relative;
}

.bottom::after {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  content: "";
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-top: 20px solid rgb(117, 117, 189);
}

.top::after {
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  content: "";
	width: 0;
	height: 0;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	border-bottom: 20px solid rgb(117, 117, 189);
}

.button-container {
  padding: 20px;
}

.floor-number {
  display: block;
  margin-bottom: 10px;
  font-size: 20px;
}
</style>
