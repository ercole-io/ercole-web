jest.mock('@/services/services.js', () => ({
  axiosRequest: jest.fn(),
}))

jest.mock('@/helpers/hostDetails/hostDetails.js', () => ({
  getHostType: jest.fn(() => 'oracle'),
  mapHostDatabases: jest.fn((data) => data),
  getNotificationsByType: jest.fn(),
  getHostInfo: jest.fn(),
  mountCpuUsageChart: jest.fn(),
}))

jest.mock('@/helpers/hostDetails/capacity/capacityByOs.js', () =>
  jest.fn(() => [])
)

jest.mock('@/helpers/hostDetails/databases/oracle.js', () => ({
  resolveCapacityDaily: jest.fn(() => []),
}))

import { mapHostDatabases } from '@/helpers/hostDetails/hostDetails.js'
import { axiosRequest } from '@/services/services.js'
import { actions } from '@/store/modules/hosts/hostDetails.js'

describe('hostDetails actions', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('getHostByName handles missing oracle.database payload without throwing', async () => {
    axiosRequest
      .mockResolvedValueOnce({
        data: {
          technology: 'Oracle/Database',
          features: {
            oracle: {},
          },
          cpuConsumptions: [],
          diskConsumptions: [],
        },
      })
      .mockResolvedValueOnce({
        data: {
          usedLicenses: [],
        },
      })

    const commit = jest.fn()
    const dispatch = jest.fn(() => Promise.resolve())
    const getters = {
      getActiveFilters: { date: '2026-05-11' },
      currentHostType: 'oracle',
      getCurrentHostDbLicenses: jest.fn(() => []),
    }

    await expect(
      actions.getHostByName(
        {
          commit,
          dispatch,
          getters,
        },
        { hostname: 'host-01', loading: true }
      )
    ).resolves.toBeUndefined()

    expect(mapHostDatabases).not.toHaveBeenCalled()
    expect(commit).toHaveBeenCalledWith('SET_CURRENT_HOST_DATABASES', [])
    expect(dispatch).toHaveBeenCalledWith('onLoadingTable')
    expect(dispatch).toHaveBeenCalledWith('hostMissingDatabases', 'host-01')
    expect(dispatch).toHaveBeenCalledWith('getPdbsByHostDbGrothData', 'host-01')
    expect(dispatch).toHaveBeenCalledWith('offLoadingTable')
  })
})
