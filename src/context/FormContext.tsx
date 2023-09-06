import { createContext } from 'react';

export const FORM_STATE = {
  selectedStep: 0,
  steps: {
    name: {
      placeholder: 'Название вашей компании',
      value: '',
      valid: false,
      warningMsg: {
        alreadyExist: 'Такая компания уже существует',
        emptyName: 'Это обязательное поле',
      },
    },
    link: {
      placeholder: 'Сайт вашей компании',
      value: '',
      valid: false,
      warningMsg: {
        wrongLink: 'Эта ссылка недействительная',
        emptyName: 'Это обязательное поле',
      },
    },
    logo: {
      value: '',
      valid: false,
      choices: [
        {
          placeholder: 'Загрузить логотип',
          type: 'upload',
        },
        {
          placeholder: 'Использовать аватар как логотип',
          type: 'exist',
        },
        {
          placeholder: 'Без логотипа',
          type: 'none',
        },
      ],
      warningMsg: {
        wrongLink: 'Эта ссылка недействительная',
        emptyName: 'Это обязательное поле',
      },
    },
  },
};

export const FORM_STEPS = [
  {
    label: 'Название',
  },
  {
    label: 'Сайт',
  },
  {
    label: 'Логотип',
  },
];

type Form = typeof FORM_STATE;

export const RegisterFormContext = createContext({
  form: FORM_STATE,
  setForm: (form: Form | ((form: Form) => Form)) => {},
});
