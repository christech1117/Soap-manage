<template lang="pug">
  .wrapper
    navbar
    sidebar
    .content
      transition(name="move" mode="out-in")
          router-view
</template>

<script>
  import Navbar from './Navbar';
  import Sidebar from './Sidebar';
    
  export default {
    components:{ Navbar, Sidebar }
  }
</script>
