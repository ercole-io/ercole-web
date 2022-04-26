import { mount } from '@vue/test-utils'
import ErrorMsg from '@/components/login/ErrorMsg.vue'

describe('errorMsg.vue', () => {
  it('will display an error message when passed', () => {
    const wrapper = mount(ErrorMsg, {
      computed: {
        getErrMsg: () => 'Error Message',
      },
    })

    expect(wrapper.find('[data-errormsg]').text()).toBe('Error Message')
  })
})
