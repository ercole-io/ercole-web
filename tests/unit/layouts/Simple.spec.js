import Simple from '@/layouts/Simple.vue'
import { mount } from '@vue/test-utils'

let wrapper
beforeEach(() => {
  wrapper = mount(Simple)
})

afterEach(() => {
  wrapper.destroy()
})

describe('Layout - Simple.vue', () => {
  it('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
