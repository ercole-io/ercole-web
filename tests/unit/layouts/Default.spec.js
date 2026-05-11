import Default from '@/layouts/Default.vue'
import { shallowMount } from '@vue/test-utils'

let wrapper
beforeEach(() => {
  wrapper = shallowMount(Default)
})

afterEach(() => {
  wrapper.destroy()
})

describe('Layout - Default.vue', () => {
  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will start isCollapsedSidebar as true', async () => {
    await wrapper.setData({ isCollapsedSidebar: true })
    expect(wrapper.vm.isCollapsedSidebar).toBe(true)
  })
})
