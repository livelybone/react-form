# @livelybone/react-form
[![NPM Version](http://img.shields.io/npm/v/@livelybone/react-form.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-form)
[![Download Month](http://img.shields.io/npm/dm/@livelybone/react-form.svg?style=flat-square)](https://www.npmjs.com/package/@livelybone/react-form)
![gzip with dependencies: kb](https://img.shields.io/badge/gzip--with--dependencies-kb-brightgreen.svg "gzip with dependencies: kb")
![typescript](https://img.shields.io/badge/typescript-supported-blue.svg "typescript")
![pkg.module](https://img.shields.io/badge/pkg.module-supported-blue.svg "pkg.module")

> `pkg.module supported`, which means that you can apply tree-shaking in you project

[中文文档](./README-CN.md)

A react from controller

## repository
https://github.com/livelybone/react-form.git

## Demo
https://github.com/livelybone/react-form#readme

## Run Example
Your can see the usage by run the example of the module, here is the step:

1. Clone the library `git clone https://github.com/livelybone/react-form.git`
2. Go to the directory `cd your-module-directory`
3. Install npm dependencies `npm i`(use taobao registry: `npm i --registry=http://registry.npm.taobao.org`)
4. Open service `npm run dev`
5. See the example(usually is `http://127.0.0.1/examples/test.html`) in your browser

## Installation
```bash
npm i -S @livelybone/react-form
```

## Global name - The variable the module exported in `umd` bundle
`ReactForm`

## Interface
See what method or params you can use in [index.d.ts](./index.d.ts)

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

Use in html, see what your can use in [CDN: unpkg](https://unpkg.com/@livelybone/react-form/lib/umd/)
```html
<-- use what you want -->
<script src="https://unpkg.com/@livelybone/react-form/lib/umd/<--module-->.js"></script>
```
