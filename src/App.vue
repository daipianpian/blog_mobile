<template>
  <div id="app">
    <keep-alive>
        <!-- 会被缓存的组件 -->
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <!-- 不会被缓存的组件 -->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
