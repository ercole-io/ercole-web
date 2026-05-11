import NoContent from '@/components/common/NoContent.vue'
import { mount } from '@vue/test-utils'

describe('NoContent.vue', () => {
  let wrapper

  it('should mount the component', () => {
    const wrapper = mount(NoContent)
    expect(wrapper.exists()).toBe(true)
  })

  it('will show no content text when passed', () => {
    const wrapper = mount(NoContent, {
      propsData: {
        noContentText: 'Test no content text',
      },
    })

    expect(wrapper.find('.no-content').text()).toBe('Test no content text')
  })

  it('will render the default no content text when prop is not passed', () => {
    const wrapper = mount(NoContent)

    // Ensure that the default text is rendered when no prop is passed
    expect(wrapper.find('.no-content').text()).toBe(
      'There are no content to show'
    )
  })
})
