import { mount } from '@vue/test-utils'
import BoxContent from '@/components/common/BoxContent.vue'

describe('BoxContent.vue', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(BoxContent, {
      propsData: {
        title: 'Test Title',
      },
      slots: {
        default: '<div>Test Default Content</div>',
        customTitle: '<div>Custom Information</div>',
      },
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  // it('is a Vue instance', () => {
  //   expect(wrapper.isVueInstance()).toBe(true)
  // })

  it('verify if component exists', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('will render the title when passed', () => {
    expect(wrapper.find('h2').text()).toContain('Test Title')
  })

  it('will display default content when passed', () => {
    expect(wrapper.find('.box-content').text()).toContain(
      'Test Default Content'
    )
  })

  it('will display custom title when passed', () => {
    expect(wrapper.find('div').text()).toContain('Custom Information')
  })
})
