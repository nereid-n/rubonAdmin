export default [
  {
    component: 'InputText',
    rules: {
      required: true,
      email: true
    },
    data: {
      name: 'email',
      label: 'Email',
      hint: ''
    }
  },
  {
    component: 'InputText',
    rules: {
      required: true,
      max: 255
    },
    data: {
      name: 'username',
      label: 'Имя пользователя',
      hint: ''
    }
  },
  {
    component: 'InputText',
    rules: {
      max: 255
    },
    data: {
      name: 'new_password',
      label: 'Новый пароль',
      hint: '',
      type: 'password'
    }
  },
  {
    component: 'InputText',
    rules: {
      max: 255
    },
    data: {
      name: 'old_password',
      label: 'Старый пароль',
      hint: '',
      type: 'password'
    }
  },
]