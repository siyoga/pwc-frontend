'use client';

import { useState } from 'react';

import { Button } from './components/Button';
import Input from './components/Input';

export default function RegisterFlow() {
  const [name, setName] = useState('');

  return (
    <div className="flex flex-col justify-center items-center w-3/12">
      <h1 className="text-2xl text-center font-semibold mb-8">
        Создайте страницу вашей компании
      </h1>
      <form onSubmit={}>
        <Input placeholder="Название компании" />
        <Button type="button">Далее</Button>
      </form>
    </div>
  );
}
