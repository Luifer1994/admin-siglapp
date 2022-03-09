<template>
  <Nav v-if="$route.name !== 'Login'"></Nav>
  <div class="content">
    <sidebar v-if="$route.name !== 'Login'"></sidebar>

    <router-view />

    <Footer v-if="$route.name !== 'Login'"></Footer>
  </div>
</template>
<script>
import Nav from "./components/Nav.vue";
import Sidebar from "./components/Sidebar.vue";
import Footer from "./components/Footer.vue";
export default {
  components: {
    Nav,
    Sidebar,
    Footer,
  },
};
</script>
<style>
.router-link-exact-active {
  color: rgb(226, 6, 19) !important;
  font-weight: bold;
}
</style>
