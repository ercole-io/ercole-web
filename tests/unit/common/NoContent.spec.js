import { mount } from '@vue/test-utils'
import NoContent from '@/components/common/NoContent.vue'

describe('NoContent.vue', () => {
  let wrapper

  // it('is a Vue instance', () => {
  //   wrapper = mount(NoContent)
  //   expect(wrapper.isVueInstance()).toBe(true)
  // })

  it('verify if component exists', () => {
    wrapper = mount(NoContent)
    expect(wrapper.exists()).toBe(true)
  })

  it('will show no content text when passed', () => {
    wrapper = mount(NoContent, {
      propsData: {
        noContentText: 'Test no content text',
      },
    })

    expect(wrapper.find('.no-content').text()).toBe('Test no content text')
  })

  it('will render the default no content text when prop is not passed', () => {
    wrapper = mount(NoContent)

    expect(wrapper.find('.no-content').text()).toBe(
      'There are no content to show'
    )
  })
})
