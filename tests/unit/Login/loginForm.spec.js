import Vue from 'vue'
import Vuelidate from 'vuelidate'
import { shallowMount } from '@vue/test-utils'
import Form from '@/components/login/form.vue'

Vue.config.ignoredElements = ['b-field', 'b-input', 'b-button']
Vue.use(Vuelidate)

let wrapper
beforeEach(() => {
  wrapper = shallowMount(Form)
})

afterEach(() => {
  wrapper.destroy()
})

describe('LoginForm.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will dispatch login action when login button is triggered', async () => {
    const mockStore = { dispatch: jest.fn() }
    const data = {
      username: 'test',
      password: 'test'
    }
    wrapper = shallowMount(Form, {
      mocks: {
        $store: mockStore
      }
    })

    wrapper.setData(data)
    wrapper.find('form').trigger('submit')

    await wrapper.vm.$nextTick()

    expect(mockStore.dispatch).toHaveBeenCalledWith('login', data)
  })

  it('will verify button is disabled if fields are empty', async () => {
    const data = {
      username: '',
      password: ''
    }

    wrapper.setData(data)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.username).toBe(data.username)
    expect(wrapper.vm.password).toBe(data.password)

    await wrapper.vm.$nextTick()

    expect(wrapper.vm.$v.$invalid).toBe(true)
    expect(wrapper.contains('[disabled]')).toBe(true)
  })
})
