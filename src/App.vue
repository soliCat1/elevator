<template>
  <div class="container">
    <FloorItem
      v-for="floor in this.$store.state.floors"
      :key="floor"
      :floor="floor"
    ></FloorItem>
  </div>
</template>

<script>
import FloorItem from "@/components/FloorItem.vue";
export default {
  name: "App",
  components: {
    FloorItem,
  }
};
</script>

<style>
*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  display: flex;
  flex-direction: column-reverse;
  height: 100vh;
}
</style>
