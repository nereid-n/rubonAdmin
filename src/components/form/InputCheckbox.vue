<template>
  <v-layout row wrap>
    <v-flex xs12 :class="data.hint !== undefined ? 'md8' : ''">
      <v-checkbox :label="data.label"
                  :value="value"
                  @focus="focus"
                  @change="input"
                  @blur="blur"
      />
    </v-flex>
    <v-flex>
      <v-flex md4 xs12 v-if="data.hint !== undefined">
        <FormAlert
            :error="error"
            :hint="data.hint"
            :showHint="showHint"
        />
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
  import inputMixin from '../../mixins/inputMixin';
  import FormAlert from "./FormAlert";

  export default {
    name: "InputCheckbox",
    components: {FormAlert},
    mixins: [inputMixin]
  }
</script>

<style scoped>

</style>