<template>
  <v-form>
    <component v-for="input in accountData"
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
  import account from '../../data/account';
  import InputText from "../../components/form/InputText";

  export default {
    name: "Account",
    components: {InputText},
    data() {
      return {
        accountData: {},
        value: {}
      }
    },
    created() {
      this.accountData = account;
    }
  }
</script>

<style scoped>

</style>