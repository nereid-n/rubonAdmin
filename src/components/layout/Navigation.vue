<template>
  <v-navigation-drawer
      fixed
      v-model="drawer"
      app
  >
    <v-list dense>
      <v-list-tile v-for="item in items"
                   :to="item.to"
      >
        <v-list-tile-content>
          <v-list-tile-title>{{item.name}}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  export default {
    name: "Navigation",
    data: () => ({
      drawer: null,
      items: [
        {
          name: 'Home',
          to: '/'
        },
      ]
    })
  }
</script>

<style scoped>

</style>