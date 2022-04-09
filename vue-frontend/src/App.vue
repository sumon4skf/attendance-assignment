<template>
  <Header title="VueApp"/>
  <div class="container">
    <router-view :showAddTask="showAddTask"></router-view>
  </div>
  <Footer />
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "App",
  data() {
    return {
      showAddTask: false,
    };
  },
  components: {
    Header,
    Footer,
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
</style>
