<template>
  <v-form v-if="getDataDone">
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
  import store from '../../store/store';

  export default {
    name: "Profile",
    components: {InputUpload, InputText},
    data() {
      return {
        profileData: {},
        value: {},
        getDataDone: false
      }
    },
    methods: {
      submit() {
        this.$validator.validateAll();
      },
    },
    created() {
      this.profileData = profile;
      let params = {
        data: {
          expand: 'profile'
        }
      };
      store.dispatch('user/USER', params)
        .then(res => {
          for (let value of this.profileData) {
            if (res.body.profile[value.data.name] !== undefined) {
              if (value.data.name !== 'avatar') {
                this.value[value.data.name] = res.body.profile[value.data.name];
              }
              else {
                if (res.body.profile[value.data.name]  !== null) {
                  this.value[value.data.name] = ['https://rub-on.ru/' + res.body.profile[value.data.name]];
                }
              }
            }
          }
          this.getDataDone = true;
        });
    }
  }
</script>

<style scoped>

</style>