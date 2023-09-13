'use client';

import { RegisterFormContext } from 'context/FormContext';
import { Button } from 'ui/components/Button';
import { Input } from 'ui/components/Input';

import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { produce } from 'immer';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onNext: () => void;
};

export default function NameStep({ onNext }: Props) {
  const { form, setForm } = useContext(RegisterFormContext);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: false,
    defaultValues: {
      name: form.steps.name.value,
    },
  });

  const { ref: nameRef, ...nameControl } = register('name', {
    required: { value: true, message: 'Это обязательное поле' },
  });

  return (
    <form
      noValidate={true}
      onSubmit={handleSubmit((value) => {
        setForm(
          produce((formState) => {
            formState.steps.name = {
              ...formState.steps.name,
              valid: true,
              value: value.name,
            };
          })
        );

        onNext();
      })}
    >
      <Input
        type="text"
        ref={nameRef}
        placeholder={form.steps.name.placeholder}
        {...nameControl}
      />
      {errors.name && (
        <span className="flex flex-row gap-1 text-red-500 items-center mt-2">
          <ExclamationCircleIcon className="w-7" />
          {errors.name.message}
        </span>
      )}
      <Button type="submit" size="md">
        {'Далее'}
        <ArrowRightIcon className="w-5" />
      </Button>
    </form>
  );
}
