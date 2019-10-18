import { Form, FormItem, FormItemsData, FormOptions } from '@livelybone/form'

export * from '@livelybone/form'

/**
 * Hook
 * */
declare function useForm<
  Items extends FormItem<any, any, any>[],
  ReturnTypeOfSubmit extends any
>(
  formItems: Items,
  options?: FormOptions<
    FormItemsData<Items>,
    ReturnTypeOfSubmit | FormItemsData<Items>
  >,
): Form<Items, ReturnTypeOfSubmit>

export { useForm }
