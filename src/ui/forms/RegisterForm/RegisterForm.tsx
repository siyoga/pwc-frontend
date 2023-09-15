'use client';

import { updateCompanyInfo } from 'app/api/company';
import { FORM_STEPS, RegisterFormContext } from 'context/FormContext';
import { NextAuthProvider } from 'providers/NextAuthProvider';

import { Tab } from '@headlessui/react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { produce } from 'immer';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';

import LinkStep from './steps/LinkStep';
import LogoStep from './steps/LogoStep';
import NameStep from './steps/NameStep';

const { Group, List, Panels, Panel } = Tab;

export default function RegisterForm() {
  const { form, setForm } = useContext(RegisterFormContext);
  const router = useRouter();
  const { data, update } = useSession();
  const [completeStatus, setCompleteStatus] = useState<
    'pending' | 'error' | 'idle'
  >('idle');

  const nextStep = useCallback(() => {
    setForm(
      produce((form) => {
        form.selectedStep += 1;
      })
    );
  }, [setForm]);

  const setSpecificStep = useCallback(
    (index: number) => {
      setForm(
        produce((form) => {
          form.selectedStep = index;
        })
      );
    },
    [setForm]
  );

  const selectedIndex = form.selectedStep;

  const onComplete = useCallback(async () => {
    setCompleteStatus('pending');

    const response = await updateCompanyInfo(
      {
        link: form.steps.link.value,
        name: form.steps.name.value,
        image: form.steps.logo.value,
      },
      data?.user.accessToken as string
    );

    if (!response) {
      setCompleteStatus('error');
      return;
    }

    update();
    router.push(`/company/${response.id}`);
  }, [form, data?.user.accessToken, update, router]);

  useEffect(() => {
    const lastStepIndex = FORM_STEPS.length;

    if (form.selectedStep === lastStepIndex) {
      onComplete();
    }
  }, [form.selectedStep, onComplete, form]);

  return (
    <Group selectedIndex={selectedIndex}>
      {completeStatus === 'pending' ? (
        <h1 className="text-lg font-semibold">Обновляем ваш профиль...</h1>
      ) : (
        <>
          <List className="flex flex-row space-x-1 rounded-2xl bg-black py-2 px-2 gap-3 w-11/12 sm:w-5/12">
            {FORM_STEPS.map((step, index) => {
              const isSelectable = Object.values(form.steps)
                .slice(0, index)
                .every((step) => step.valid);

              const isComplete = Object.values(form.steps)
                .splice(index, 1)
                .every((step) => step.value !== '' && step.valid);

              return (
                // Вынести в отдельный компонент
                <Tab
                  key={uuid()}
                  disabled={isSelectable === false}
                  className={({ selected }) =>
                    `w-full rounded-xl py-2 px-3 text-base sm:text-lg flex flex-row items-center justify-center gap-2 font-medium text-black focus:outline-none transition duration-300 ${
                      isComplete ? 'text-green-500' : ''
                    } ${
                      selected
                        ? 'bg-white shadow'
                        : `text-gray-300 hover:bg-white/[0.12] ${
                            isComplete
                              ? 'hover:text-green-500'
                              : 'hover:text-white'
                          } disabled:hover:bg-black disabled:hover:text-gray-300`
                    }`
                  }
                  onClick={() => {
                    if (isSelectable) {
                      setSpecificStep(index);
                    }
                  }}
                >
                  {isComplete ? <CheckCircleIcon className="w-5" /> : null}{' '}
                  {step.label}
                </Tab>
              );
            })}
          </List>

          <Panels className="w-full sm:w-5/12 mt-6 px-12">
            <Panel>
              <NameStep onNext={nextStep} />
            </Panel>

            <Panel>
              <LinkStep onNext={nextStep} />
            </Panel>

            <Panel>
              <LogoStep onNext={nextStep} />
            </Panel>
          </Panels>
        </>
      )}
    </Group>
  );
}
