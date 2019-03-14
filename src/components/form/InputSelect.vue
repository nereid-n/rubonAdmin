<template>
  <v-layout row wrap>
    <v-flex md8 xs12>
      <v-select
          :label="data.label"
          :name="data.name"
          :items="data.items"
          item-text="value"
          item-value="id"
          @focus="focus"
          @input="input"
          @blur="blur"
      >
      </v-select>
    </v-flex>
    <v-flex md4 xs12>
      <FormAlert
          :error="error"
          :hint="data.hint"
          :showHint="showHint"
      />
    </v-flex>
  </v-layout>
</template>

<script>
  import inputMixin from '../../mixins/inputMixin';
  import FormAlert from "./FormAlert";

  export default {
    name: "InputSelect",
    components: {FormAlert},
    mixins: [inputMixin]
  }
</script>

<style scoped>

</style>