<template>
	<div v-if="load">
		<v-btn color="blue white--text" class="ml-0" to="/cabinet/ad/add">Добавить объявление</v-btn>
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
				<td v-html="props.item.updated"></td>
				<td>
					<div class="last-td">
						<v-btn :to="`/cabinet/ad/${props.item.id}`" flat icon color="blue" class="ma-0">
							<v-icon>visibility</v-icon>
						</v-btn>
						<v-btn @click="deleteAdvertisement(props.item.id)" flat icon color="blue" class="ma-0">
							<v-icon>delete</v-icon>
						</v-btn>
					</div>
				</td>
			</template>
		</v-data-table>
	</div>
	<Loader v-else/>
</template>

<script>
  import store from '../../store/store';
  import Loader from "../../components/Loader";

  export default {
    name: "AdvertimentFavorites",
    components: {Loader},
    data() {
      return {
        load: false,
        selectAll: false,
        items: [],
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
            text: 'Обновлено',
            sortable: false,
          },
          {
            text: '',
            sortable: false,
          }
        ],
        categories: [],
        categoryValue: '',
        routeStatus: ''
      }
    },
    methods: {
      categoryFilter(e) {
        console.log(e)
      },
      toggleAll() {
        for (let value of this.items) {
          value.selected = this.selectAll;
        }
      },
      getDataApi() {
        let params = {
          data: {
            id: this.$store.state.user.id
          }
        };
        store.dispatch('ad/AD_FAVOURITE', params)
          .then(res => {
            this.items = [];
            if (res.body.ads.length > 0) {
              for (let value of res.body.ads) {
                value.dt_add = new Date(value.dt_add * 1000);
                value.dt_update = new Date(value.dt_update * 1000);
                let updated = value.dt_update.toLocaleDateString();
                let img = '';
                if (value.adsImgs.length > 0) {
                  img = value.adsImgs[0].img;
                }
                this.items.push({
                  img: img,
                  title: value.title,
                  category: value.categoryAds.name,
                  price: value.price,
                  updated: updated,
                  id: value.id,
                  selected: false,
                });
              }
            }
            this.load = true;
          })
      },
      deleteAdvertisement(id) {
        let params = {
					id: id
        };
        let index = this.items.findIndex(function (element) {
          return element.id == id;
        });
        store.dispatch('ad/AD_DELETE', params)
          .then(res => {
            this.items.splice(index, 1);
          })
			}
    },
    created() {
      this.getDataApi();
      this.routeStatus = this.$route.meta.status;
      store.dispatch('category/CATEGORY', {parent: 0})
        .then(res => {
          for (let value of res.body) {
            this.categories.push({
              value: value.name,
              id: value.id
            });
          }
        });
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