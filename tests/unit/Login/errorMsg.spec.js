import { mount } from '@vue/test-utils'
import errorMsg from '@/components/login/errorMsg.vue'

describe('errorMsg.vue', () => {
  it('will display an error message when passed', () => {
    const wrapper = mount(errorMsg, {
      computed: {
        getErrMsg: () => 'Error Message'
      }
    })

    expect(wrapper.find('[data-errormsg]').text()).toBe('Error Message')
  })
})
