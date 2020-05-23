import {
  Form,
  FormItem,
  FormItemsData,
  FormOptions,
  TupleToUnion,
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
  FormItems extends FormItem<any, any, any>[],
  Options extends FormOptions<any, any>
>(form: Form<FormItems, Options>): boolean

declare function inputItemChange<
  FormItems extends FormItem<any, any, any>[],
  Options extends FormOptions<any, any>,
  Evt extends ChangeEvent<any>
>(
  form: Form<FormItems, Options>,
  name: TupleToUnion<FormItems, 'name'>,
  ev: Evt,
): void

export { inputItemChange, isAllItemFilled, useForm }
