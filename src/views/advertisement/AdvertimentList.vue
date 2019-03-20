<template>
  <div>
    <v-btn color="blue white--text" to="/ad/add">Добавить объявление</v-btn>
    <div>
      <v-btn v-for="btn in links"
             depressed
             :to="btn.to"
      >
        {{btn.name}}
      </v-btn>
    </div>
    <v-data-table hide-actions
                  :items="items"
                  :total-items="totalPages"
                  class="mt-3"
                  :headers="headers"
                  select-all
    >
      <template slot="headers" slot-scope="props">
        <tr>
          <th class="pr-2">
            <v-checkbox
                primary
                hide-details
                @click.native="toggleAll"
                v-model="selectAll"
            ></v-checkbox>
          </th>
          <th
              v-for="header in props.headers"
              :key="header.text"
          >
            {{ header.text }}
          </th>
        </tr>
      </template>
      <template slot="items" slot-scope="props">
        <td class="pr-2">
          <v-checkbox
              primary
              hide-details
              :input-value="props.item.selected"
          ></v-checkbox>
        </td>
        <td class="table-img-preview-wrap">
          <div class="table-img-preview">
            <img :src="props.item.img" alt="">
          </div>
        </td>
        <td v-html="props.item.title" class="first-td"></td>
        <td v-html="props.item.category"></td>
        <td v-html="props.item.price"></td>
        <td v-html="props.item.created"></td>
        <td v-html="props.item.updated"></td>
        <td>
          <template v-if="props.item.rest > 0">
            <v-progress-linear :value="100 / 15 * props.item.rest"></v-progress-linear>
            <span>{{props.item.rest}} / 15</span>
          </template>
        </td>
        <td>
          <div class="last-td">
            <v-btn :to="`/ad/update/${props.item.id}`" flat icon color="blue" class="ma-0">
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn :to="`/ad/${props.item.id}`" flat icon color="blue" class="ma-0">
              <v-icon>visibility</v-icon>
            </v-btn>
          </div>
        </td>
      </template>
    </v-data-table>
    <div class="text-xs-center pt-2">
      <v-pagination total-visible="10"
                    v-model="page"
                    :length="totalPages"
                    @input="changePage"
      >
      </v-pagination>
    </div>
  </div>
</template>

<script>
  import store from '../../store/store';

  export default {
    name: "AdvertimentList",
    data() {
      return {
        selectAll: false,
        items: [],
        totalPages: 1,
        page: 1,
        selected: [],
        headers: [
          {
            text: 'Изображение',
            sortable: false
          },
          {
            text: 'Название',
            sortable: false,
          },
          {
            text: 'Категория',
            sortable: false,
          },
          {
            text: 'Цена',
            sortable: false,
          },
          {
            text: 'Добавлено',
            sortable: false,
          },
          {
            text: 'Обновлено',
            sortable: false,
          },
          {
            text: 'Осталось дней',
            sortable: false,
          },
          {
            text: '',
            sortable: false,
          }
        ],
        links: [
          {
            name: 'Активные',
            to: '/ads/active'
          },
          {
            name: 'Неактивные',
            to: '/ads/inactive'
          },
          {
            name: 'На проверке',
            to: '/ads/moder'
          },
          {
            name: 'Удалённые',
            to: '/ads/deleted'
          },
        ]
      }
    },
    methods: {
      toggleAll() {
        for (let value of this.items) {
          value.selected = this.selectAll;
        }
      },
      changePage() {
        this.getDataApi();
      },
      getDataApi() {
        let params = {
          data: {
            page: this.page,
            status: this.$route.meta.status
          }
        };
        store.dispatch('ad/AD_LIST', params)
          .then(res => {
            this.items = [];
            this.totalPages = 1;
            this.totalPages = res.body._meta.pageCount;
            if(res.body.ads.length > 0) {
              for (let value of res.body.ads) {
                value.dt_add = new Date(value.dt_add * 1000);
                let created = value.dt_add.toLocaleDateString();
                value.dt_update = new Date(value.dt_update * 1000);
                let updated = value.dt_update.toLocaleDateString();
                let today = new Date();
                let end = new Date(value.dt_update.getTime() + 24 * 3600000 * 15);
                let rest = Math.ceil((end.getTime() - today.getTime()) / (24 * 3600000));
                let img = '';
                if (value.adsImgs.length > 0) {
                  img = value.adsImgs[0].img;
                }
                this.items.push({
                  img: img,
                  title: value.title,
                  category: value.categoryAds.name,
                  price: value.price,
                  created: created,
                  updated: updated,
                  rest: rest,
                  id: value.id,
                  selected: false
                });
              }
            }
          })
      }
    },
    created() {
      this.getDataApi();
    },
    beforeRouteUpdate(to, from, next) {
      next();
      this.getDataApi();
      this.page = 1;
    },
  }
</script>

<style lang="scss">
  .v-table {
    min-width: 1075px;
  }
  .v-pagination {
    flex-wrap: wrap;
  }
  .last-td {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .table-img-preview {
    width: 210px;
    height: 160px;
    &-wrap {
      width: 220px;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .v-input--checkbox .fa {
    width: 24px;
    text-align: center;
    font-size: 24px;
  }
</style>