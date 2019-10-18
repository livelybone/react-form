const { expect } = require('chai')
const { JSDOM } = require('jsdom')
const React = require('react')
const ReactDOM = require('react-dom')
const { act } = require('react-dom/test-utils')
const { Form, FormItemsManager, useForm } = require('../test-lib/index')

const dom = new JSDOM('')

global.window = dom.window
global.document = dom.window.document

function getEl(container, selector) {
  return container.querySelector(selector)
}

function inputChange(form, name, value) {
  form.itemChange(name, value)
}

describe('index', () => {
  let container

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    document.body.removeChild(container)
    container = null
  })

  const formItems = new FormItemsManager({
    name: { name: 'name', value: '' },
    phone: { name: 'phone', value: '', formatter: val => val.replace(/[^\d]+/g, '') },
    amount: {
      name: 'amount',
      value: '',
      validator: val => /^((0|[1-9]\d*)(\.\d+)?)?$/.test(val) ? '' : 'Amount is invalid',
    },
  })

  it('Form', () => {
    let form
    act(() => {
      class Comp extends React.Component {
        constructor(props) {
          super(props)
          this.form = new Form(formItems.getItems(['name', 'phone', 'amount']), {
            validateOnChange: true,
            componentUpdateFn: this.forceUpdate.bind(this),
          })
        }


        render() {
          return React.createElement('div', null, this.form.items.map(item => React.createElement('input', {
            key: item.id,
            id: item.id,
            value: item.value,
            onChange: ev => this.form.itemChange(item.name, ev.target.value),
          })))
        }
      }

      ReactDOM.render(React.createElement(Comp, { ref: ref => form = ref }), container)
    })
    inputChange(form.form, 'name', '123123')
    expect(getEl(container, '#name').value).to.equal('123123')
    inputChange(form.form, 'phone', '123a123')
    expect(getEl(container, '#phone').value).to.equal('123123')
    inputChange(form.form, 'amount', '123qwe123')
    expect(getEl(container, '#amount').value).to.equal('123qwe123')
    expect(form.form.errorText).to.equal('Amount is invalid')
    expect(form.form.getItemByName('amount').errorText).to.equal('Amount is invalid')
    form.form.itemChange('amount', '123.123')
    form.form.submit()
      .then(data => expect(data.name).to.equal('123123'))
  })

  it('useForm', () => {
    let form
    act(() => {
      const Comp = React.forwardRef((props, ref) => {
        const form = useForm(formItems.getItems(['name', 'phone', 'amount']), { validateOnChange: true })

        React.useImperativeHandle(ref, () => ({ form }))

        return React.createElement('div', null, form.items.map(item => React.createElement('input', {
          key: item.id,
          id: item.id,
          value: item.value,
          onChange: ev => form.itemChange(item.name, ev.target.value),
        })))
      })

      ReactDOM.render(React.createElement(Comp, { ref: ref => form = ref }), container)
    })
    inputChange(form.form, 'name', '123123')
    expect(getEl(container, '#name').value).to.equal('123123')
    inputChange(form.form, 'phone', '123a123')
    expect(getEl(container, '#phone').value).to.equal('123123')
    inputChange(form.form, 'amount', '123qwe123')
    expect(getEl(container, '#amount').value).to.equal('123qwe123')
    expect(form.form.errorText).to.equal('Amount is invalid')
    expect(form.form.getItemByName('amount').errorText).to.equal('Amount is invalid')
    form.form.itemChange('amount', '123.123')
    form.form.submit()
      .then(data => expect(data.name).to.equal('123123'))
  })
})
