import { useEffect, useState } from 'react';
import { Controller, useForm, useFormState } from 'react-hook-form';

import { ChevronUp, Plus } from 'lucide-react';
import Picker from 'react-mobile-picker';
import PickerScrollGuard from '../../../../components/ui/picker-scroll-guard';

import { cn } from '@/shared/lib/utils';

import { Button } from '../../../../components/ui/button';
import FieldWrapper from '../../../../components/ui/field-wrapper';
import ErrorMessage from '../../../../components/ui/error-message';
import CustomSubscribeImageSelectModal from './custom-subscribe-image-select-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  customServicesSchema,
  type AddCustomServicesReq,
} from '../schemas/custom-services-schema';
import useGetServiceTypes from '@/domains/subscription/services/hooks/queries/use-get-service-types';

interface CustomServicesFormProps {
  defaultValues?: { logoImageUrl: string } & Omit<
    AddCustomServicesReq,
    'defaultImageName' | 'image'
  >;
  onSubmit: (formData: AddCustomServicesReq) => void;
  disabled?: boolean;
}

function CustomServicesForm({
  defaultValues,
  onSubmit,
  disabled = false,
}: CustomServicesFormProps) {
  const { data: types } = useGetServiceTypes();

  const [previewUrl, setPreviewUrl] = useState<string>(
    defaultValues?.logoImageUrl || '',
  );
  const [openPicker, setOpenPicker] = useState(false);

  const [openImageModal, setOpenImageModal] = useState(false);

  const form = useForm<AddCustomServicesReq>({
    resolver: zodResolver(customServicesSchema),
    mode: 'all',
    defaultValues: {
      type: defaultValues?.type || 'OTT',
      name: defaultValues?.name || '',
      image: null,
      defaultImageName: null,
    },
  });

  const { isDirty, isValid } = useFormState({ control: form.control });

  useEffect(() => {
    if (!previewUrl.startsWith('blob:')) return;

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-4"
        id="custom-services-form"
      >
        <Controller
          name="image"
          control={form.control}
          render={() => (
            <>
              <div
                onClick={() => setOpenImageModal(true)}
                className="bg-box-black flex size-25 cursor-pointer items-center justify-center overflow-hidden rounded-xl"
              >
                {previewUrl && (
                  <img src={previewUrl} className="aspect-square" />
                )}
                {!previewUrl && <Plus strokeWidth={2} className="size-10" />}
              </div>

              <CustomSubscribeImageSelectModal
                open={openImageModal}
                onClose={() => setOpenImageModal(false)}
                onSelect={(file: {
                  image: File;
                  defaultImageName: string | null;
                }) => {
                  setOpenImageModal(false);

                  if (file.defaultImageName) {
                    form.setValue('defaultImageName', file.defaultImageName, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    });

                    form.setValue('image', null);
                  } else {
                    form.setValue('defaultImageName', null);

                    form.setValue('image', file.image, {
                      shouldDirty: true,
                      shouldValidate: true,
                      shouldTouch: true,
                    });
                  }
                  setPreviewUrl(URL.createObjectURL(file.image));
                }}
              />
            </>
          )}
        />

        <Controller
          name="type"
          control={form.control}
          render={({ field }) => (
            <FieldWrapper label="서비스 타입" id="type">
              <div className="w-full">
                <div
                  className="flex cursor-pointer items-center justify-between"
                  onClick={() => setOpenPicker((prev) => !prev)}
                >
                  <span className="text-lg">{field.value}</span>
                  <ChevronUp
                    className={cn(
                      'transition-all',
                      openPicker ? '' : 'rotate-180',
                    )}
                  />
                </div>

                <div
                  className={cn(
                    openPicker
                      ? 'border-background-black mt-2 border-t pt-2'
                      : '',
                    'w-full',
                  )}
                >
                  <PickerScrollGuard enabled={openPicker}>
                    <Picker
                      style={{
                        maskImage: 'none',
                        WebkitMaskImage: 'none',
                      }}
                      height={openPicker ? 110 : 0}
                      wheelMode="natural"
                      value={{ servicesType: field.value }}
                      onChange={(nextValue) => {
                        field.onChange(nextValue.servicesType);
                      }}
                      className="flex flex-col transition-all [&>div:last-child]:rounded-sm [&>div:last-child]:bg-[#B1DFDA] [&>div:last-child>div]:hidden"
                    >
                      <Picker.Column name="servicesType" className="z-10">
                        {types?.map((type) => (
                          <Picker.Item value={type} key={type}>
                            {({ selected }) => (
                              <div
                                className={cn(
                                  selected
                                    ? 'text-background-black'
                                    : 'text-sub-font-black',
                                  'w-full pl-4 text-start',
                                )}
                              >
                                {type}
                              </div>
                            )}
                          </Picker.Item>
                        ))}
                      </Picker.Column>
                    </Picker>
                  </PickerScrollGuard>
                </div>
              </div>
            </FieldWrapper>
          )}
        />

        <Controller
          name="name"
          control={form.control}
          render={({ field, fieldState }) => {
            return (
              <div>
                <FieldWrapper
                  error={!!fieldState.error}
                  label="서비스 이름"
                  id="name"
                  className="mb-2"
                >
                  <input
                    className="bg-box-black w-full text-lg outline-none"
                    placeholder="어떤 서비스를 등록할까요?"
                    {...field}
                  />
                </FieldWrapper>
                {fieldState.error && (
                  <ErrorMessage message={fieldState.error!.message!} />
                )}
              </div>
            );
          }}
        />
      </form>

      <Button
        form="custom-services-form"
        className="w-full"
        disabled={!isDirty || !isValid || disabled}
      >
        저장하기
      </Button>
    </>
  );
}

export default CustomServicesForm;
