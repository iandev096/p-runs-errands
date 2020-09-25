import React, { ReactElement } from 'react'
import { ControlledTextInput } from '../../UIComponents/ControlledTextInput'
import { Control, FieldError } from 'react-hook-form'
import { DeepMap } from 'react-hook-form/dist/types/utils'
import { Theme } from 'react-native-elements'
import { ControlledTextPicker } from '../../UIComponents/ControlledTextPicker'
import { ControlledCheckGroup } from '../../UIComponents/ControlledCheckGroup'
import { formControl, pickerItem, checkItem } from '../../constants/form/types'
import { ControlledImagePickerInput } from '../../UIComponents/ControlledImagePickerInput'
import { ControlledLocationInput } from '../../UIComponents/ControlledLocationInput'


export function RenderFormControls<T>(
  { controls, control, errors, theme, setValue, clearErrors }: {
    controls: formControl<keyof T>[],
    control: Control<T>,
    errors: DeepMap<T, FieldError>,
    setValue: (name: string, value?: {} | undefined, options?: Partial<{
      shouldValidate: boolean;
      shouldDirty: boolean;
    }> | undefined) => void,
    clearErrors: (name?: keyof T) => void,
    theme: Theme
  })
  : ReactElement {
  return (
    <>
      {controls.map((ctrl) => {
        switch (ctrl.controlType) {
          case 'TextInput':
            return <ControlledTextInput
              key={ctrl.name as string}
              name={ctrl.name as string}
              control={control}
              error={errors[ctrl.name]}
              inputProps={{
                placeholder: ctrl.input!.placeholder,
                label: ctrl.input!.label,
                keyboardType: ctrl.keyboardType
              }}
              iconProps={{
                type: ctrl.icon!.type,
                name: ctrl.icon!.name,
              }}
              multiline={ctrl.input?.multiline}
              theme={theme}
            />

          case 'PickerInput':
            return <ControlledTextPicker
              key={ctrl.name as string}
              name={ctrl.name as string}
              label={ctrl!.label!.toString()}
              control={control}
              items={ctrl.items as pickerItem[]}
              error={errors[ctrl.name]}
              theme={theme}
            />

          case 'CheckInput':
            return <ControlledCheckGroup
              key={ctrl.name as string}
              name={ctrl.name as string}
              label={ctrl!.label!.toString()}
              control={control}
              items={ctrl.items as checkItem[]}
              error={errors[ctrl.name]}
              theme={theme}
              setValue={setValue}
              clearErrors={clearErrors}
            />

          case 'ImageInput':
            return <ControlledImagePickerInput
              key={ctrl.name as string}
              name={ctrl.name as string}
              label={ctrl!.label!.toString()}
              control={control}
              error={errors[ctrl.name]}
              theme={theme}
              setValue={setValue}
              clearErrors={clearErrors}
              imageUrl={ctrl.image?.uri}
            />

          case 'LocationInput':
            return <ControlledLocationInput
              key={ctrl.name as string}
              name={ctrl.name as string}
              label={ctrl!.label!.toString()}
              control={control}
              error={errors[ctrl.name]}
              theme={theme}
              setValue={setValue}
              clearErrors={clearErrors}
              location={ctrl.location}
            />

          // default:
          //   break;
        }
      })}
    </>
  )
}
