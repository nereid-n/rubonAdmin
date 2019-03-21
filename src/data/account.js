export default [
  {
    component: 'InputText',
    rules: {
      required: true,
      email: true
    },
    data: {
      name: 'settings-form[email]',
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
      name: 'settings-form[username]',
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
      name: 'settings-form[new_password]',
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
      name: 'settings-form[old_password]',
      label: 'Старый пароль',
      hint: '',
      type: 'password'
    }
  },
]