<template>
  <div>
    <p class="text-xs-center">Вы можете подключить несколько аккаунтов, чтобы использовать их для входа.</p>
    <div class="layout justify-center">
      <v-btn
          v-for="(social, i) in socials"
          :key="i"
          :color="social.color"
          class="white--text"
          fab
          icon
          small
      >
        <v-icon>{{ social.icon }}</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Networks",
    data() {
      return {
        socials: [
          {
            icon: 'fa fa-vk',
            color: 'blue darken-3'
          },
          {
            icon: 'fa fa-facebook',
            color: 'indigo'
          },
          {
            icon: 'fa fa-twitter',
            color: 'blue lighten-1'
          },
          {
            icon: 'fa fa-google-plus',
            color: 'red darken-3'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>