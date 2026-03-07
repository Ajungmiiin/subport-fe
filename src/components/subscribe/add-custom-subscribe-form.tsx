import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { ChevronUp, Plus } from 'lucide-react';
import Picker from 'react-mobile-picker';

import { cn } from '@/lib/utils';

import type { AddCustomSubscribeReq } from '@/types/subscribe';

import useGetSubscribeTypes from '@/hooks/queries/use-get-subscribe-types';

import { Button } from '../ui/button';
import FieldWrapper from '../ui/field-wrapper';
import ErrorMessage from '../ui/error-message';
import CustomSubscribeImageSelectModal from '../modal/custom-subscribe-image-select-modal';

type SelectTypeState = {
  subscribeType: string;
};

type CustomSubscribeForm = {
  onSubmit: (formData: AddCustomSubscribeReq) => void;
  disabled?: boolean;
  type?: string;
  name?: string;
  image?: File;
  prevLogoImage?: string;
};
function AddCustomSubscribeForm({
  prevLogoImage,
  onSubmit,
  disabled = false,
  type,
  name,
  image,
}: CustomSubscribeForm) {
  const { data: types } = useGetSubscribeTypes();

  const [selectImage, setSelectImage] = useState<string | null>(
    prevLogoImage || null,
  );
  const [openPicker, setOpenPicker] = useState(false);

  const [openImageModal, setOpenImageModal] = useState(false);
  const [selectType, setSelectType] = useState<SelectTypeState>({
    subscribeType: type ?? 'OTT',
  });

  const form = useForm<AddCustomSubscribeReq>({
    mode: 'all',
    defaultValues: {
      type: type || 'OTT',
      name: name || '',
      image: image ?? null,
    },
  });

  return (
    <>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-4"
        id="add-custom-subscribe"
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
                {selectImage && (
                  <img src={selectImage} className="aspect-square" />
                )}
                {!selectImage && <Plus strokeWidth={2} className="size-10" />}
              </div>
              <CustomSubscribeImageSelectModal
                open={openImageModal}
                onClose={() => setOpenImageModal(false)}
                onSelect={(file) => {
                  if (selectImage) {
                    URL.revokeObjectURL(selectImage);
                  }
                  setSelectImage(URL.createObjectURL(file));
                  setOpenImageModal(false);
                  form.setValue('image', file);
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
                  <Picker
                    style={{
                      maskImage: 'none',
                      WebkitMaskImage: 'none',
                    }}
                    height={openPicker ? 110 : 0}
                    wheelMode="natural"
                    value={selectType}
                    onChange={(nextValue) => {
                      setSelectType(nextValue);
                      field.onChange(nextValue.subscribeType);
                    }}
                    className="flex flex-col transition-all [&>div:last-child]:rounded-sm [&>div:last-child]:bg-[#B1DFDA] [&>div:last-child>div]:hidden"
                  >
                    <Picker.Column name="subscribeType" className="z-10">
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
                </div>
              </div>
            </FieldWrapper>
          )}
        />

        <Controller
          name="name"
          control={form.control}
          rules={{
            validate: (v) =>
              v.trim().length > 0 || '서비스 이름은 최소 1글자 이상입니다.',
            required: {
              value: true,
              message: '서비스 이름을 입력해주세요',
            },
            maxLength: {
              value: 10,
              message: '서비스 이름은 최대 10글자 입니다',
            },
            minLength: {
              value: 1,
              message: '서비스 이름은 최소 1글자 이상입니다',
            },
          }}
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
                    onFocus={() => {
                      if (fieldState.error) {
                        form.clearErrors('name');
                      }
                    }}
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
        form="add-custom-subscribe"
        className="w-full"
        disabled={!form.formState.isValid || disabled}
      >
        저장하기
      </Button>
    </>
  );
}

export default AddCustomSubscribeForm;
