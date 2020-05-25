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

declare function isAllItemFilled<Items extends any[]>(
  form: Form<Items, any>,
): boolean

declare function inputItemChange<
  Items extends any[],
  Evt extends ChangeEvent<any> = ChangeEvent<any>
>(form: Form<Items, any>, name: FormName<Items>, ev: Evt): void

export { inputItemChange, isAllItemFilled, useForm }
