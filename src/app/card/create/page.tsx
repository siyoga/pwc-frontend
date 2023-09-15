'use client';

import { createCard, uploadCardLogo } from 'app/api/card';
import { getCompanyInfo } from 'app/api/company';
import { NextAuthProvider } from 'providers/NextAuthProvider';
import documentSvg from 'public/document.svg';
import LoadingIcon from 'public/LoadingIcon';
import { Button } from 'ui/components/Button';

import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import uuid from 'react-uuid';

export default function CreateCard() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    shouldUseNativeValidation: false,
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'unauthenticated') {
    return <p>Войдите в систему...</p>;
  }

  return (
    <form
      className="w-full flex flex-col justify-center items-center"
      onSubmit={handleSubmit(async (data) => {
        setIsLoading(true);
        const createResponse = await createCard(
          data.name,
          data.url,
          '',
          data.description,
          data.price,
          session?.user.accessToken as string
        );

        if (!createResponse) {
          setError('name', {
            type: 'custom',
            message: 'Что-то пошло не так...',
          });
          setIsLoading(false);
          return;
        }

        if ('text' in createResponse) {
          setError('name', { type: 'custom', message: createResponse.text });
          setIsLoading(false);
          return;
        }

        router.push(`/company/${session?.user.id as string}`);
      })}
    >
      <div className="py-5 px-7 flex flex-col lg:w-9/12 xl:w-7/12 2xl:w-6/12 w-full border-4 border-gray-300 rounded-xl">
        <span className="flex xl:flex-row flex-col justify-between items-center gap-3 xl:gap-0">
          <input
            {...register('name', {
              required: {
                value: true,
                message: 'Пожалуйста, объявите название',
              },
            })}
            type="text"
            className="text-xl text-black font-semibold border-none outline-none"
            placeholder="Название продукта"
          />
          <input
            {...register('url', {
              required: {
                value: true,
                message: 'Предоставьте ссылку на ваш продукт.',
              },
            })}
            type="text"
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
              alt={`${session?.user.name}_logo`}
              src={session?.user.image as string}
              width={25}
              height={20}
            />
            {session?.user.name}
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
      <Button size="lg" variant="default" type="submit" disabled={isLoading}>
        {isLoading ? 'Загрузка' : 'Создать'}
        {isLoading ? (
          <span className="animate-spin">
            <LoadingIcon />
          </span>
        ) : (
          <CheckCircleIcon className="w-6" />
        )}
      </Button>
    </form>
  );
}
