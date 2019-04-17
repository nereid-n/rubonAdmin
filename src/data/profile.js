export default [
  {
    component: 'InputText',
    rules: {
      max: 255
    },
    data: {
      name: 'Profile[name]',
      label: 'Имя',
      hint: ''
    }
  },
  {
    component: 'InputText',
    rules: {
      email: true
    },
    data: {
      name: 'Profile[public_email]',
      label: 'Публичный email',
      hint: ''
    }
  },
  {
    component: 'InputText',
    rules: {
      url: true
    },
    data: {
      name: 'Profile[website]',
      label: 'Вебсайт',
      hint: ''
    }
  },
  {
    component: 'InputUpload',
    data: {
      name: 'Profile[avatar]',
      label: 'Аватар',
      multiple: false
    }
  },
]
