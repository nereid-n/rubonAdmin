<template>
  <v-layout row wrap>
    <v-flex md8 xs12 class="text-xs-center">
      <v-dialog
          v-model="dialog"
          width="850"
      >
        <template v-slot:activator="{ on }">
          <div>
            <v-btn
                v-if="!categoryDone"
                flat
                :class="error === undefined ? 'blue--text' : 'red--text'"
                v-on="on"
                @click="open = true"
            >
              {{data.label}}
            </v-btn>
            <v-btn
                v-else
                :class="error === undefined ? 'blue--text' : 'red--text'"
                v-on="on"
                @click="open = true"
            >
              Изменить категорию
            </v-btn>
            <div class="text-xs-center" v-if="categoryDone">{{nameStr}}</div>
          </div>
        </template>
        <v-card>
          <v-card-title
              class="headline"
              primary-title
          >
            Выберите категорию
            <v-icon class="ml-auto" @click="dialog = false">close</v-icon>
          </v-card-title>
          <v-divider></v-divider>

          <v-card-text v-if="firstCategory">
            <v-layout row wrap class="justify-center">
              <div v-for="item in category"
                   class="category-item"
                   @click="getSecondCategory(item.id, item.name, 'secondCategoryData', 'firstCategory')"
              >
                {{item.name}}
              </div>
            </v-layout>
          </v-card-text>

          <v-card-text v-else-if="secondCategory">
            <v-layout>
              <div class="flex md4">
                <div v-bar class="category-second">
                  <v-list>
                    <v-list-tile :color="item.id == firstCategoryActive ? 'blue' : ''" @click="getSecondCategory(item.id, item.name, 'secondCategoryData', 'firstCategory')" v-for="item in category">
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{item.name}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </div>
              </div>
              <div class="flex md4">
                <div v-bar class="category-second">
                  <v-list>
                    <v-list-tile :color="item.id == secondCategoryActive ? 'blue' : ''" @click="getSecondCategory(item.id, item.name, 'thirdCategoryData', 'secondCategory')" v-for="item in secondCategoryData">
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{item.name}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </div>
              </div>
              <div class="flex md4" v-if="thirdCategoryData.length > 0">
                <div v-bar class="category-second">
                  <v-list>
                    <v-list-tile @click="getSecondCategory(item.id, item.name, '', 'thirdCategory')" v-for="item in thirdCategoryData">
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{item.name}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </div>
              </div>
            </v-layout>
          </v-card-text>
        </v-card>
      </v-dialog>
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
  import store from '../../store/store';

  export default {
    name: "InputCategory",
    components: {FormAlert},
    data () {
      return {
        dialog: false,
        open: false,
        category: [],
        secondCategoryData: [],
        thirdCategoryData: [],
        firstCategory: true,
        secondCategory: false,
        firstCategoryActive: '',
        secondCategoryActive: '',
        name: {},
        nameStr: '',
        categoryDone: false
      }
    },
    methods: {
      getSecondCategory(id, name, category, categoryThis) {
        this.firstCategory = false;
        this.secondCategory = true;
        this.name[categoryThis] = name;
        store.dispatch('category/CATEGORY', {parent: id})
          .then(res => {
            if (res.body.length > 0) {
              this[category] = res.body;
              this[`${categoryThis}Active`] = id;
            }
            else {
              this.getAddField(id);
            }
          });
      },
      getAddField(id) {
        this.value = id;
        this.firstCategory = true;
        this.secondCategory = false;
        this.categoryDone = true;
        this.dialog = false;
        this.nameStr = '';
        for (let key in this.name) {
          if (key !== 'firstCategory') {
            this.nameStr += ' - ';
          }
          this.nameStr += this.name[key];
        }
        this.name = {};
        store.dispatch('category/ADD_FIELD', {id: id})
          .then(res => {
            this.$emit('addFields', res.body, 'category');
          });
      },
    },
    beforeUpdate() {
      if (this.open && !this.dialog) {
        this.input(this.value);
      }
    },
    created() {
      store.dispatch('category/CATEGORY', {parent: 0})
        .then(res => {
          this.category = res.body;
        });
    },
    mixins: [inputMixin]
  }
</script>

<style lang="scss">
  .category-item {
    width: calc(100% / 5);
    padding: 20px 10px;
    text-align: center;
    cursor: pointer;
    @media (max-width: 920px) {
      width: 25%;
    }
    @media (max-width: 768px) {
      width: calc(100% / 3);
    }
    @media (max-width: 576px) {
      width: 50%;
    }
    @media (max-width: 450px) {
      width: 100%;
    }
  }
  .category-second {
    height: 338px;
  }
  .vb-dragger {
    right: 0;
    width: 5px;
    background-color: #2196F3;
  }
  .v-navigation-drawer__border {
    width: 5px;
  }
</style>