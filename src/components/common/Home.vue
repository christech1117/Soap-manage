<template lang="pug">
    .wrapper
        navbar
        sidebar
        .content
            transition(name="move" mode="out-in")
                router-view
</template>

<script>
    import Navbar from './Navbar.vue';
    import Sidebar from './Sidebar.vue';
    export default {
        components:{
            Navbar, Sidebar
        }
    }
</script>
