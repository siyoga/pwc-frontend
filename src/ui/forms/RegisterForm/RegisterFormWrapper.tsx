'use client';

import { FORM_STATE, RegisterFormContext } from 'context/FormContext';
import { NextAuthProvider } from 'providers/NextAuthProvider';

import { useState } from 'react';

import RegisterForm from './RegisterForm';

export function RegisterFormWrapper() {
  const [form, setForm] = useState(FORM_STATE);

  return (
    <NextAuthProvider>
      <RegisterFormContext.Provider value={{ form, setForm }}>
        <RegisterForm />
      </RegisterFormContext.Provider>
    </NextAuthProvider>
  );
}
