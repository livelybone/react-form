import {
  Form,
  FormItem,
  FormItemsData,
  FormName,
  FormOptions,
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

export function isAllItemFilled<Items extends any[]>(form: Form<Items, any>) {
  return form.items.every(
    item =>
      !item.required ||
      (typeof item.value === 'string' ? item.value : item.value !== undefined),
  )
}

export function inputItemChange<
  Items extends any[],
  Evt extends ChangeEvent<any> = ChangeEvent<any>
>(form: Form<Items, any>, name: FormName<Items>, ev: Evt) {
  form.itemChange(name, ev.target.value)
  ev.target.value = form.data[name] || ''
}
