import login from '@/views/auth/Login.vue'
import { shallowMount } from '@vue/test-utils'

describe('Login.vue', () => {
  it.skip('renders', () => {
    const wrapper = shallowMount(login)

    expect(wrapper.exists()).toBe(true)
  })
})
