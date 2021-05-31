<template>
  <div v-on:click="focus()">
    <Header id="header"/>
    <Console id="console" />
  </div>
</template>

<script>
import Header from "./components/Header";
import Console from "./components/Console";

export default {
  name: "App",
  components: {
    Header,
    Console
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  overflow: hidden;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #300a24;
  height: 100%;
  width: 100%;
}

#header {
  height: 5vh;
  max-width: 100%;
}

#console {
  height: 95vh;
  overflow: scroll;
  margin-bottom: 150px;
}

</style>
