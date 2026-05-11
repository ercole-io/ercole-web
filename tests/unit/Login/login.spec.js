import login from '@/views/auth/Login.vue'
import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Login.vue', () => {
  let wrapper
  let store
  let loginSSOMock

  beforeEach(() => {
    loginSSOMock = jest.fn()

    store = new Vuex.Store({
      state: {
        auth: {
          sso_visible: false,
        },
      },
      actions: {
        loginSSO: loginSSOMock,
      },
    })

    wrapper = shallowMount(login, {
      store,
      localVue,
      mocks: {
        $route: {
          query: {},
        },
      },
      stubs: {
        'login-form': { template: '<div></div>' },
        'ercole-logo': { template: '<div></div>' },
      },
    })
  })

  afterEach(() => {
    wrapper = null
  })

  it('renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('sets isRedirecting to false by default', () => {
    expect(wrapper.vm.isRedirecting).toBe(false)
  })

  it('sets isRedirecting to true when code is in route query', async () => {
    wrapper = shallowMount(login, {
      store,
      localVue,
      mocks: {
        $route: {
          query: { code: 'test-code-123' },
        },
      },
      stubs: {
        'login-form': { template: '<div></div>' },
        'ercole-logo': { template: '<div></div>' },
      },
    })
    expect(wrapper.vm.isRedirecting).toBe(true)
  })
})
