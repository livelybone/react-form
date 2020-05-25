import {
  Form,
  FormItem,
  FormItemsData,
  FormName,
  FormOptions,
} from '@livelybone/form'
import { ChangeEvent } from 'react'

export * from '@livelybone/form'

/**
 * Hook
 * */
declare function useForm<
  Items extends FormItem<any, any, any>[],
  ReturnTypeOfSubmit extends any = FormItemsData<Items>
>(
  formItems: Items,
  options?: FormOptions<FormItemsData<Items>, ReturnTypeOfSubmit>,
): Form<Items, ReturnTypeOfSubmit>

declare function isAllItemFilled<
  Items extends FormItem<any, any, any>[],
  ReturnTypeOfSubmit extends any = FormItemsData<Items>
>(form: Form<Items, ReturnTypeOfSubmit>): boolean

declare function inputItemChange<
  Items extends FormItem<any, any, any>[],
  ReturnTypeOfSubmit extends any = FormItemsData<Items>,
  Evt extends ChangeEvent<any> = ChangeEvent<any>
>(form: Form<Items, ReturnTypeOfSubmit>, name: FormName<Items>, ev: Evt): void

export { inputItemChange, isAllItemFilled, useForm }
