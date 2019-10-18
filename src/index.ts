import { Form, FormItem, FormItemsData, FormOptions } from '@livelybone/form'
import useForceUpdate from '@livelybone/use-force-update'
import { useRef } from 'react'

export * from '@livelybone/form'

/**
 * Hook
 * */
export function useForm<
  Items extends FormItem<any, any, any>[],
  ReturnTypeOfSubmit extends any
>(
  formItems: Items,
  options?: FormOptions<
    FormItemsData<Items>,
    ReturnTypeOfSubmit | FormItemsData<Items>
  >,
) {
  const [, forceUpdate] = useForceUpdate()
  const form = useRef(
    new Form(formItems, {
      ...options,
      componentUpdateFn: forceUpdate,
    }),
  )

  return form.current
}
