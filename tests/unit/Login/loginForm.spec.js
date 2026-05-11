import Form from '@/components/login/FormLogin.vue'
import { shallowMount } from '@vue/test-utils'
import Vue from 'vue'
import Vuelidate from 'vuelidate'

Vue.config.ignoredElements = ['b-field', 'b-input', 'b-button']
Vue.use(Vuelidate)

let wrapper
const $t = () => {}
beforeEach(() => {
  wrapper = shallowMount(Form, { mocks: { $t } })
})

afterEach(() => {
  wrapper.destroy()
})

describe('LoginForm.vue', () => {
  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will verify button is disabled if fields are empty', async () => {
    expect(wrapper.vm.$v.$invalid).toBe(true)
    expect(wrapper.find('[data-submit][disabled]').exists()).toBe(true)
  })
})
