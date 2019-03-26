<template>
  <v-layout row wrap>
    <v-flex md8 xs12 class="pos-relative">
      <v-text-field
          :label="data.label"
          :name="data.name"
          @focus="focus"
          @blur="blur"
      >
      </v-text-field>

      <input type="file"
             class="input-upload"
             @input="change"
             accept="image/*"
             :multiple="data.multiple"
      >
      <v-btn class="btn-upload">Browse</v-btn>
    </v-flex>

    <v-flex md8 xs12 v-if="newValue.length > 0">
      <div v-if="smallSizeWindow" class="layout row wrap">
        <v-flex md4
                sm6
                xs12
                v-for="(file, index) in newValue"
                :key="`${data.name}${index}`"
        >
          <v-card>
            <v-img v-if="typeof file === 'string'" :src="file"/>
            <v-img v-else :src="preview(file)"/>

            <v-card-title>
              {{ file.name }}
              <v-icon class="ml-auto" @click.prevent="drop(index)">close</v-icon>
            </v-card-title>
          </v-card>
        </v-flex>
      </div>
      <draggable v-else class="layout row wrap">
        <v-flex md4
                sm6
                xs12
                v-for="(file, index) in newValue"
                :key="`${data.name}${index}`"
        >
          <v-card>
            <v-img v-if="typeof file === 'string'" :src="file"/>
            <v-img v-else :src="preview(file)"/>

            <v-card-title>
              {{ file.name }}
              <v-icon class="ml-auto" @click.prevent="drop(index)">close</v-icon>
            </v-card-title>
          </v-card>
        </v-flex>
      </draggable>
    </v-flex>
  </v-layout>
</template>

<script>
  import inputMixin from '../../mixins/inputMixin';
  import draggable from 'vuedraggable'

  export default {
    name: "InputUpload",
    components: {draggable},
    data() {
      return {
        newValue: [],
        smallSizeWindow: false,
      }
    },
    methods: {
      change(e) {
        for (let i = 0; i < e.target.files.length; i++) {
          let file = e.target.files.item(i);
          // let formData = new FormData();
          // formData.append('file', file);
          if (this.data.multiple) {
            // this.newValue.push(formData);
            this.newValue.push(file);
          }
          else {
            this.newValue = [];
            // this.newValue[0] = formData;
            this.newValue[0] = file;
          }
          this.input(this.newValue);
        }
      },
      preview(file) {
        // return URL.createObjectURL(file.get('file'));
        return URL.createObjectURL(file);
      },
      drop(index) {
        this.newValue.splice(index, 1);
        this.input(this.newValue);
      },
    },
    created() {
      if (this.value !== '') {
        this.newValue = this.value;
      }
      else {
        this.newValue = [];
      }
      if (window.innerWidth < 920) {
        this.smallSizeWindow = true;
      }
    },
    mixins: [inputMixin],
  }
</script>

<style scoped>
  .input-upload {
    position: absolute;
    z-index: 3;
    top: 28px;
    height: 33px;
    width: calc(100% - 23px);
    opacity: 0;
  }
  .btn-upload {
    position: absolute;
    top: 28px;
    right: 11px;
    height: 32px;
    margin: 0;
    box-shadow: none !important;
  }
</style>