import Error from '@/layouts/Error.vue'
import { mount } from '@vue/test-utils'

let wrapper
beforeEach(() => {
  wrapper = mount(Error)
})

afterEach(() => {
  wrapper.destroy()
})

describe('Layout - Error.vue', () => {
  // it('is a Vue instance', () => {
  //   expect(wrapper.isVueInstance()).toBe(true)
  // })

  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
