# @livelybone/react-form
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-form.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-form)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-form.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-form)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, 天然支持 tree-shaking, 使用 es module 引用即可

[English Document](./README.md)

A react from controller

## repository
https://github.com/livelybone/react-form.git

## Demo
https://github.com/livelybone/react-form#readme

## Run Example
你可以通过运行项目的 example 来了解这个组件的使用，以下是启动步骤：

1. 克隆项目到本地 `git clone https://github.com/livelybone/form.git`
2. 进入本地克隆目录 `cd your-module-directory`
3. 安装项目依赖 `npm i`(使用 taobao 源: `npm i --registry=http://registry.npm.taobao.org`)
4. 启动服务 `npm run dev`
5. 在你的浏览器看 example (地址通常是 `http://127.0.0.1:3000/examples/test.html`)

## Installation
```bash
npm i -S @livelybone/react-form
```

## Global name - The variable the module exported in `umd` bundle
`ReactForm`

## Interface
去 [index.d.ts](./index.d.ts) 查看可用方法和参数

## Usage
```typescript jsx
import { Form, FormItemsManager, useForm } from '@livelybone/react-form'

const formItems = new FormItemsManager({
  name: { name: 'name', value: '' },
  phone: { name: 'phone', value: '', formatter: val => val.replace(/[^\d]+/g, '') },
  amount: {
    name: 'amount',
    value: '',
    validator: val => /^((0|[1-9]\d*)(\.\d+)?)?$/.test(val) ? '' : 'Amount is invalid',
  },
})

// In class component
class Comp extends React.Component {
  form!: any
  
  constructor(props) {
    super(props)
    this.form = new Form(formItems.getItems(['name', 'phone', 'amount']), {
      validateOnChange: true,
      componentUpdateFn: this.forceUpdate.bind(this),
    })
  }


  render() {
    return (
      <div>
        {this.form.items.map(item => (
          <input
            id={item.id}
            value={item.value}
            key={item.id}
            onChange={ev => this.form.itemChange(item.name, ev.target.value)}
          />
        ))}
      </div>
    )
  }
}

// In functional component
const FnComp = () => {
  const form = useForm(formItems.getItems(['name', 'phone', 'amount']), { validateOnChange: true })

  return (
    <div>
      {this.form.items.map(item => (
        <input
          id={item.id}
          value={item.value}
          key={item.id}
          onChange={ev => form.itemChange(item.name, ev.target.value)}
        />
      ))}
    </div>
  )
}
```

在 HTML 文件中直接引用，你可以在 [CDN: unpkg](https://unpkg.com/@livelybone/form/lib/umd/) 看到你能用到的所有 js 脚本
```html
<-- 然后使用你需要的 -->
<script src="https://unpkg.com/@livelybone/form/lib/umd/<--module-->.js"></script>
```
