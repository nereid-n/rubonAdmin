<template>
  <v-layout row wrap>
    <v-flex md8 xs12 class="text-xs-center">
      <v-dialog
          v-model="dialog"
          width="850"
      >
        <template v-slot:activator="{ on }">
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
                   @click="getSecondCategory(item.id, item.name, 'secondCategory', 'firstCategory')"
              >
                {{item.name}}
              </div>
            </v-layout>
          </v-card-text>

          <v-card-text v-else-if="secondCategory">
            <v-layout>
              <div class="flex md4" v-if="!smallSizeWindow || activeTab === 'firstCategory'">
                <h2 class="text-xs-center">Рубрики</h2>
                <div v-bar class="category-second">
                  <v-list>
                    <v-list-tile :color="item.id == firstCategoryActive ? 'blue' : ''"
                                 @click="getSecondCategory(item.id, item.name, 'secondCategory', 'firstCategory')"
                                 v-for="item in category"
                                 :key="`categoryModal${item.id}`"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{item.name}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </div>
              </div>
              <div class="flex md4" v-if="!smallSizeWindow || activeTab === 'secondCategory'">
                <h2 class="text-xs-center"
                    @click="activeTab = 'firstCategory'"
                >
                  <v-icon color="black" v-if="smallSizeWindow">arrow_back</v-icon>
                  {{firstCategoryName}}
                </h2>
                <div v-bar class="category-second">
                  <v-list>
                    <v-list-tile :color="item.id == secondCategoryActive ? 'blue' : ''"
                                 @click="getSecondCategory(item.id, item.name, 'thirdCategory', 'secondCategory')"
                                 v-for="item in secondCategoryData"
                                 :key="`categoryModal${item.id}`"
                    >
                      <v-list-tile-content>
                        <v-list-tile-title>
                          {{item.name}}
                        </v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </div>
              </div>
              <div class="flex md4" v-if="thirdCategoryData.length > 0 && !smallSizeWindow || activeTab === 'thirdCategory'">
                <h2 class="text-xs-center"
                    @click="activeTab = 'secondCategory'"
                >
                  <v-icon color="black" v-if="smallSizeWindow">arrow_back</v-icon>
                  {{secondCategoryName}}
                </h2>
                <div v-bar class="category-second">
                  <v-list>
                    <v-list-tile @click="getSecondCategory(item.id, item.name, '', 'thirdCategory')"
                                 v-for="item in thirdCategoryData"
                                 :key="`categoryModal${item.id}`"
                    >
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
        firstCategoryName: '',
        secondCategoryName: '',
        thirdCategoryName: '',
        activeTab: 'firstCategory',
        smallSizeWindow: false,
        nameStr: '',
        categoryDone: false
      }
    },
    methods: {
      getSecondCategory(id, name, category, categoryThis) {
        this.firstCategory = false;
        this.secondCategory = true;
        this[`${categoryThis}Name`] = name;
        this.activeTab = category;
        if (categoryThis === 'firstCategory') {
          this.thirdCategoryData = [];
        }
        store.dispatch('category/CATEGORY', {parent: id})
          .then(res => {
            if (res.body.length > 0) {
              this[`${category}Data`] = res.body;
              this[`${categoryThis}Active`] = id;
            }
            else {
              this.getAddField(id);
            }
          });
      },
      getAddField(id) {
        this.newValue = id;
        this.firstCategory = true;
        this.secondCategory = false;
        this.categoryDone = true;
        this.dialog = false;
        this.nameStr = this.firstCategoryName + ' - ' + this.secondCategoryName;
        if (this.thirdCategoryName !== '') {
          this.nameStr += ' - ' + this.thirdCategoryName;
        }
        this.thirdCategoryName = '';
        store.dispatch('category/ADD_FIELD', {id: id})
          .then(res => {
            this.$emit('addFields', res.body, 'category_id');
          });
      },
    },
    beforeUpdate() {
      if (this.open && !this.dialog) {
        this.input(this.value);
      }
    },
    created() {
      if (window.innerWidth < 920) {
        this.smallSizeWindow = true;
      }
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
</style>