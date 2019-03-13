<template>
  <v-container grid-list-xl>
    <v-form>
      <component v-for="input in getDataForm()"
                 :is="input.component"
                 :key="input.data.name"
                 :data="input.data"
                 :data-vv-name="input.data.name"
                 :error="errors.first(input.data.name)"
                 v-model="value[input.data.name]"
                 v-validate="input.rules"
                 @addFields="addFields"
      />
      <v-btn color="info" class="ma-0" @click.prevent="submit">Сохранить</v-btn>
    </v-form>
  </v-container>
</template>

<script>
  import dataForm from '../data/mainForm';
  import InputText from "../components/form/InputText";
  import InputTextarea from "../components/form/InputTextarea";
  import InputPhone from "../components/form/InputPhone";
  import InputCheckbox from "../components/form/InputCheckbox";
  import InputAutocomplete from "../components/form/InputAutocomplete";
  import InputCategory from "../components/form/InputCategory";
  import InputUpload from "../components/form/InputUpload";

  export default {
    name: "Form",
    components: {InputUpload, InputCategory, InputAutocomplete, InputCheckbox, InputPhone, InputTextarea, InputText},
    data() {
      return {
        value: {}
      }
    },
    methods: {
      getDataForm() {
        return dataForm;
      },
      submit() {
        this.$validator.validateAll();
      },
      addFields(fields, name) {
        for (let key in dataForm) {
          if (dataForm[key].data.name === name) {
            console.log(key)
          }
        }
      }
    }
  }
</script>

<style scoped>

</style>