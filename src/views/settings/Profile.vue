<template>
  <v-form>
    <component v-for="input in profileData"
               :is="input.component"
               :key="input.data.name"
               :data="input.data"
               :data-vv-name="input.data.name"
               :error="errors.first(input.data.name)"
               v-model="value[input.data.name]"
               v-validate="input.rules"
    />
    <v-btn color="info" class="ma-0" @click.prevent="submit">Сохранить</v-btn>
  </v-form>
</template>

<script>
  import profile from '../../data/profile';
  import InputText from "../../components/form/InputText";
  import InputUpload from "../../components/form/InputUpload";

  export default {
    name: "Profile",
    components: {InputUpload, InputText},
    data() {
      return {
        profileData: {},
        value: {}
      }
    },
    created() {
      this.profileData = profile;
    }
  }
</script>

<style scoped>

</style>