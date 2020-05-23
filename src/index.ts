import {
  Form,
  FormItem,
  FormItemsData,
  FormOptions,
  TupleToUnion,
} from '@livelybone/form'
import useForceUpdate from '@livelybone/use-force-update'
import { ChangeEvent, useLayoutEffect, useState } from 'react'

export * from '@livelybone/form'

/**
 * Hook
 * */
export function useForm<
  Items extends FormItem<any, any, any>[],
  ReturnTypeOfSubmit extends any = FormItemsData<Items>
>(
  formItems: Items,
  options?: FormOptions<FormItemsData<Items>, ReturnTypeOfSubmit>,
) {
  const [, componentUpdateFn] = useForceUpdate()

  const [form] = useState(
    () => new Form(formItems, { ...options, componentUpdateFn }),
  )

  useLayoutEffect(() => {
    form.updateOptions({ ...options, componentUpdateFn })
  }, [form, options, componentUpdateFn])

  return form
}

export function isAllItemFilled<
  FormItems extends FormItem<any, any, any>[],
  Options extends FormOptions<any, any>
>(form: Form<FormItems, Options>) {
  return form.items.every(
    item =>
      !item.required ||
      (typeof item.value === 'string' ? item.value : item.value !== undefined),
  )
}

export function inputItemChange<
  FormItems extends FormItem<any, any, any>[],
  Options extends FormOptions<any, any>,
  Evt extends ChangeEvent<any>
>(
  form: Form<FormItems, Options>,
  name: TupleToUnion<FormItems, 'name'>,
  ev: Evt,
) {
  form.itemChange(name, ev.target.value)
  ev.target.value = form.data[name] || ''
}
