<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
    </div> -->
    <router-view />
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
input {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans,
    Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  // border: 1px solid rgb(0, 148, 174);
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  border: none;
  display: flex;
  align-items: center;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  font-size: 1rem;
  // font-weight: bold;
  padding: 0.1em 0.2em;
  color: #2c3e50;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  // убираем сини фон при клике
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-sizing: border-box;
  // ===============
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
}
// #nav {
//   padding: 30px;

//   a {
//     font-weight: bold;
//     color: #2c3e50;

//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
