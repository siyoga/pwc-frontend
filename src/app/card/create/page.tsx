'use client';

import { NextAuthProvider } from 'providers/NextAuthProvider';
import documentSvg from 'public/document.svg';
import { Button } from 'ui/components/Button';

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import uuid from 'react-uuid';

export default function CreateCard() {
  const [logo, setLogo] = useState<File>();
  const [desc, setDesc] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    shouldUseNativeValidation: false,
  });
  const { data } = useSession();

  return (
    <form
      className="w-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit((data) => {
        console.log(data);
      })}
    >
      <div className="py-5 px-7 flex flex-col lg:w-9/12 xl:w-7/12 2xl:w-6/12 w-full border-4 border-gray-300 rounded-xl">
        <span className="flex xl:flex-row flex-col justify-between items-center gap-3 xl:gap-0">
          <label className="transition duration-300 hover:bg-gray-200 p-3 rounded-full border-2 border-gray-500">
            {logo ? (
              <Image
                alt={`${logo.name}_logo`}
                src={URL.createObjectURL(logo)}
                width={40}
                height={40}
              />
            ) : (
              <Image
                alt="default_logo"
                src={documentSvg}
                width={40}
                height={40}
              />
            )}
            <input
              type="file"
              name="logo_image"
              accept="image/*"
              className="hidden"
              onChange={(event) => {
                setLogo(event.target.files?.[0]);
              }}
            />
          </label>
          <input
            {...register('name', {
              required: {
                value: true,
                message: 'Пожалуйста, объявите название',
              },
            })}
            type="text"
            className="text-xl text-black font-semibold border-none outline-none text-center"
            placeholder="Название продукта"
          />
          <input
            {...register('url', {
              required: {
                value: true,
                message: 'Предоставьте ссылку на ваш продукт.',
              },
            })}
            type="url"
            className="text-md border-b-2 transition duration-200 focus:border-black outline-none text-gray-500 lg:w-5/12 xl:w-8/12 2xl:w-4/12 text-center"
            placeholder="Ссылка на продукт"
          />
        </span>
        <div className="my-6">
          <h3 className="pb-3 font-semibold text-lg text-gray-500">Описание</h3>
          <textarea
            {...register('description', {
              required: {
                value: true,
                message: 'Опишите ваш продукт',
              },
            })}
            onChange={(e) => {
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            role="textbox"
            defaultValue=""
            className="block w-full outline-none transition duration-200 border-2 border-gray-300 focus:border-black resize-none p-3 h-15 rounded-xl overflow-y-hidden text-gray-500"
          />
        </div>
        <span className="flex lg:flex-row flex-col lg:justify-between lg:items-center items-start w-full">
          <span className="flex flex-row gap-3 pb-4 lg:pb-0">
            <Image
              alt={`${data?.user.name}_logo`}
              src={data?.user.image as string}
              width={25}
              height={20}
            />
            {data?.user.name}
          </span>
          <span className="flex flex-row justify-center items-center">
            <h3 className="text-lg font-semibold">Цена:</h3>
            <input
              {...register('price', {
                required: {
                  value: true,
                  message: 'Задайте цену на продукт',
                },
              })}
              type="text"
              className="text-lg text-black font-semibold border-none outline-none text-center"
              placeholder="бесплатно"
            />
          </span>
        </span>
      </div>
      <div className="flex flex-col items-start px-6 text-sm py-3">
        {Object.keys(errors).map((fieldName) => (
          <span
            className="flex flex-row gap-1 text-red-500 items-center mt-2 flex-nowrap"
            key={uuid()}
          >
            <ExclamationCircleIcon className="w-5" />
            {errors[fieldName]?.message as string}
          </span>
        ))}
      </div>
      <Button size="lg" variant="default" type="submit">
        Создать
        <CheckCircleIcon className="w-6" />
      </Button>
    </form>
  );
}
