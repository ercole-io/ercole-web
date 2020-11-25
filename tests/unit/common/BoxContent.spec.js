import { mount } from '@vue/test-utils'
import BoxContent from '@/components/common/BoxContent.vue'

describe('BoxContent.vue', () => {
  it('is a Vue instance', () => {
    const wrapper = mount(BoxContent)
    expect(wrapper.isVueInstance()).toBe(true)
  })

  it('verify if component exists', () => {
    const wrapper = mount(BoxContent)
    expect(wrapper.exists()).toBe(true)
  })

  it('will render the title when passed', () => {
    const wrapper = mount(BoxContent, {
      propsData: {
        title: 'Test Title'
      }
    })

    expect(wrapper.find('h2').text()).toBe('Test Title')
  })

  it('will display default content when passed', () => {
    const wrapper = mount(BoxContent, {
      slots: {
        default: '<div>Test Default Content</div>'
      }
    })

    expect(wrapper.find('.box-content').text()).toContain(
      'Test Default Content'
    )
  })

  it('will display custom title when passed', () => {
    const wrapper = mount(BoxContent, {
      propsData: {
        title: 'Test Title'
      },
      slots: {
        customTitle: '<div>Test custom title</div>'
      }
    })

    expect(wrapper.find('h2').text()).toContain('Test custom title')
  })
})
