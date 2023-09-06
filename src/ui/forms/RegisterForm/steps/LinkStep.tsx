'use client';

import { RegisterFormContext } from 'context/FormContext';
import { Button } from 'ui/components/Button';
import { Input } from 'ui/components/Input';

import {
  ArrowRightIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { produce } from 'immer';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

type Props = {
  onNext: () => void;
};

export default function LinkStep({ onNext }: Props) {
  const { form, setForm } = useContext(RegisterFormContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: false,
    defaultValues: {
      link: form.steps.link.value,
    },
  });

  const { ref: linkRef, ...linkControl } = register('link', {
    required: {
      value: true,
      message: 'Это обязательное поле',
    },
  });

  return (
    <form
      onSubmit={handleSubmit((value) => {
        setForm(
          produce((formState) => {
            formState.steps.link = {
              ...formState.steps.link,
              value: value.link,
              valid: true,
            };
          })
        );

        console.log(form);

        onNext();
      })}
    >
      <Input
        ref={linkRef}
        placeholder={form.steps.link.placeholder}
        {...linkControl}
      />
      {errors.link && (
        <span className="flex flex-row gap-1 text-red-500 items-center mt-2">
          <ExclamationCircleIcon className="w-7" />
          {errors.link.message}
        </span>
      )}
      <Button type="submit" size="md">
        {'Далее'}
        <ArrowRightIcon className="w-5" />
      </Button>
    </form>
  );
}
