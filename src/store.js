import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    vacancies: [
      {
        "id": 1,
        "label": "Test1",
        "city": "Пермь",
        "metro": "",
        "salary": 100500,
        "employment": "Полная",
        "project": "project test"
      },
      {
        "id": 2,
        "label": "Test2",
        "city": "Москва",
        "metro": "",
        "salary": 10500,
        "employment": "Частичная",
        "project": "project test"
      },
      {
        "id": 3,
        "label": "Test3",
        "city": "Москва",
        "metro": "Бабушкинская",
        "salary": 100500,
        "employment": "Разовые",
        "project": "project test"
      },
      {
        "id": 4,
        "label": "Test4",
        "city": "Москва",
        "metro": "Бабушкинская",
        "salary": 100500,
        "employment": "Полная",
        "project": "project test"
      },
      {
        "id": 5,
        "label": "Test5",
        "city": "Москва",
        "metro": "Бабушкинская",
        "salary": 100500,
        "employment": "Полная",
        "project": "project test"
      }
    ],
    vacancy: [
      {
        "id": 1,
        "label": "Test",
        "type": "Мерчандайзинг стационарный",
        "project": "project test",
        "product_type": "Бытовая химия и уборка",
        "city": "Москва",
        "district": "",
        "metro": "Бабушкинская",
        "description": "",
        "employment": "Полная занятость",
        "schedule": "24/7",
        "point_count": "",
        "point_count_day": "",
        "experience": "Без опыта",
        "duration_internship": 5,
        "total_salary": 100500,
        "salary": 0,
        "prize": 0,
        "weekend": "",
        "m_book": false,
        "mobile": true,
        "auto": false,
        "audio_record": false,
        "fields": [],
        "questions": {
          "q0": "Вы уверены что вам будет удобно работать на территории (#Адрес)?",
          "q1": "Вы уверены что вам подходит график (#График)?",
          "q2": "Вы уверены что вас устраивает заработная плата (#ЗП)?"
        }
      },
      {
        "id": 2,
        "label": "Test",
        "type": "Мерчандайзинг стационарный",
        "project": "project test",
        "product_type": "Бытовая химия и уборка",
        "city": "Москва",
        "district": "",
        "metro": "Бабушкинская",
        "description": "",
        "employment": "Полная занятость",
        "schedule": "24/7",
        "point_count": "",
        "point_count_day": "",
        "experience": "Без опыта",
        "duration_internship": 5,
        "total_salary": 100500,
        "salary": 0,
        "prize": 0,
        "weekend": "",
        "m_book": false,
        "mobile": true,
        "auto": false,
        "audio_record": false,
        "fields": [],
        "questions": {
          "q0": "Вы уверены что вам будет удобно работать на территории (#Адрес)?",
          "q1": "Вы уверены что вам подходит график (#График)?",
          "q2": "Вы уверены что вас устраивает заработная плата (#ЗП)?"
        }
      },
      {
        "id": 3,
        "label": "Test",
        "type": "Мерчандайзинг стационарный",
        "project": "project test",
        "product_type": "Бытовая химия и уборка",
        "city": "Москва",
        "district": "",
        "metro": "Бабушкинская",
        "description": "",
        "employment": "Полная занятость",
        "schedule": "24/7",
        "point_count": "",
        "point_count_day": "",
        "experience": "Без опыта",
        "duration_internship": 5,
        "total_salary": 100500,
        "salary": 0,
        "prize": 0,
        "weekend": "",
        "m_book": false,
        "mobile": true,
        "auto": false,
        "audio_record": false,
        "fields": [],
        "questions": {
          "q0": "Вы уверены что вам будет удобно работать на территории (#Адрес)?",
          "q1": "Вы уверены что вам подходит график (#График)?",
          "q2": "Вы уверены что вас устраивает заработная плата (#ЗП)?"
        }
      },
      {
        "id": 4,
        "label": "Test",
        "type": "Мерчандайзинг стационарный",
        "project": "project test",
        "product_type": "Бытовая химия и уборка",
        "city": "Москва",
        "district": "",
        "metro": "Бабушкинская",
        "description": "",
        "employment": "Полная занятость",
        "schedule": "24/7",
        "point_count": "",
        "point_count_day": "",
        "experience": "Без опыта",
        "duration_internship": 5,
        "total_salary": 100500,
        "salary": 0,
        "prize": 0,
        "weekend": "",
        "m_book": false,
        "mobile": true,
        "auto": false,
        "audio_record": false,
        "fields": [],
        "questions": {
          "q0": "Вы уверены что вам будет удобно работать на территории (#Адрес)?",
          "q1": "Вы уверены что вам подходит график (#График)?",
          "q2": "Вы уверены что вас устраивает заработная плата (#ЗП)?"
        }
      },
      {
        "id": 5,
        "label": "Test",
        "type": "Мерчандайзинг стационарный",
        "project": "project test",
        "product_type": "Бытовая химия и уборка",
        "city": "Москва",
        "district": "",
        "metro": "Бабушкинская",
        "description": "",
        "employment": "Полная занятость",
        "schedule": "24/7",
        "point_count": "",
        "point_count_day": "",
        "experience": "Без опыта",
        "duration_internship": 5,
        "total_salary": 100500,
        "salary": 0,
        "prize": 0,
        "weekend": "",
        "m_book": false,
        "mobile": true,
        "auto": false,
        "audio_record": false,
        "fields": [],
        "questions": {
          "q0": "Вы уверены что вам будет удобно работать на территории (#Адрес)?",
          "q1": "Вы уверены что вам подходит график (#График)?",
          "q2": "Вы уверены что вас устраивает заработная плата (#ЗП)?"
        }
      }
    ],
    user: {
      city: {
        name: ''
      }
    }
  },
  getters: {
    firstVacancies: state => state.vacancies.filter((vacancy, index) => index < 3),
    vacancyInfo: state => id => state.vacancy.find(vacancyItem => vacancyItem.id === id)
  },
  mutations: {

  },
  actions: {

  }
})
