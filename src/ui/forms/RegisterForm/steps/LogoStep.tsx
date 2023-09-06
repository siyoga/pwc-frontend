'use client';

import { authOptions } from 'app/api/auth/[...nextauth]/route';
import { uploadCompanyLogo } from 'app/api/company';
import { RegisterFormContext } from 'context/FormContext';
import { Button } from 'ui/components/Button';

import { RadioGroup } from '@headlessui/react';
import {
  ArrowRightIcon,
  ArrowUpTrayIcon,
  ExclamationCircleIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { produce } from 'immer';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useContext, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import uuid from 'react-uuid';

const { Option } = RadioGroup;

type Props = {
  onNext: () => void;
};

export default function LogoStep({ onNext }: Props) {
  const { form, setForm } = useContext(RegisterFormContext);
  const [imageFile, setImageFile] = useState<File>();
  const { data } = useSession();

  const {
    formState: { errors },
    handleSubmit,
    control,
    setError,
  } = useForm({
    shouldUseNativeValidation: false,
    defaultValues: {
      logoChoice: 'none',
    },
  });

  return (
    <form
      className="w-full sm:px-12"
      onSubmit={handleSubmit(async (value) => {
        let imageLink: string;

        if (value.logoChoice === 'upload' && data !== null) {
          const response = await uploadCompanyLogo(
            imageFile as File,
            data.user.accessToken
          );

          if (!response) {
            setError('logoChoice', {
              type: 'custom',
              message: `Проблема с загрузкой изображения`,
            });
            return false;
          }

          imageLink = response.image as string;
        }

        if (value.logoChoice === 'exist') {
          imageLink = data?.user.image as string;
        }

        if (value.logoChoice === 'none') {
          imageLink = '';
        }

        setForm(
          produce((form) => {
            form.steps.logo = {
              ...form.steps.logo,
              valid: true,
              value: imageLink,
            };
          })
        );

        onNext();
      })}
    >
      <Controller
        control={control}
        name="logoChoice"
        rules={{ required: { value: true, message: 'Это обязательный выбор' } }}
        defaultValue=""
        render={({ field }) => (
          <>
            <RadioGroup {...field} className="space-y-3">
              {form.steps.logo.choices.map((choice) => {
                return (
                  <Option
                    key={uuid()}
                    value={choice.type}
                    className={({ checked }) =>
                      `${
                        checked
                          ? 'bg-green-400/20 ring-2 ring-green-400/40 ring-offset-2'
                          : 'bg-gray-100 hover:bg-gray-200'
                      } flex flex-row items-center justify-between w-full cursor-default rounded-xl h-14 px-5 py-4 outline-none text-black transition-all duration-300 group`
                    }
                  >
                    {({ checked }) => (
                      <>
                        <span className="flex items-center justify-center flex-row gap-2 text-sm sm:text-base">
                          <input
                            type="radio"
                            checked={checked}
                            readOnly={true}
                            className={`checked:bg-green-400 accent-green-600 border-gray-900  w-5 h-5 transition-all duration-300`}
                          />
                          {choice.placeholder}
                        </span>
                        {checked && choice.type === 'upload' ? (
                          <label>
                            {imageFile ? (
                              <span className="flex flex-row items-center justify-center gap-2 bg-green-400/40 px-3 py-2 rounded-lg">
                                <Image
                                  className="rounded-full cursor-default"
                                  alt={imageFile.name}
                                  src={URL.createObjectURL(imageFile)}
                                  width={30}
                                  height={30}
                                />
                                <button
                                  onClick={() => {
                                    setImageFile(undefined);
                                  }}
                                >
                                  <XMarkIcon className="w-6 text-black cursor-pointer transition duration-300 hover:text-gray-800" />
                                </button>
                              </span>
                            ) : (
                              <span className="flex flex-row items-center justify-center tranistion delay-150 duration-300 hover:text-gray-800 group-hover:animate-bounce cursor-pointer">
                                <ArrowUpTrayIcon className="w-6 text-black" />
                              </span>
                            )}
                            <input
                              type="file"
                              name="logo_image"
                              accept="image/*"
                              className="hidden"
                              onChange={(event) => {
                                setImageFile(event.target.files?.[0]);
                              }}
                            />
                          </label>
                        ) : null}
                      </>
                    )}
                  </Option>
                );
              })}
            </RadioGroup>

            {errors.logoChoice && (
              <span
                className="flex flex-row gap-1 text-red-500 items-center mt-2"
                key={uuid()}
              >
                <ExclamationCircleIcon className="w-7" />
                {errors.logoChoice.message}
              </span>
            )}
          </>
        )}
      />

      <Button type="submit" size="md">
        {'Далее'}
        <ArrowRightIcon className="w-5" />
      </Button>
    </form>
  );
}
