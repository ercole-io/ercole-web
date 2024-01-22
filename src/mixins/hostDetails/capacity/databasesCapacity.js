import ChartBuilder from '@/components/common/charts/apex/ChartBuilder.vue'

export default {
  components: {
    ChartBuilder,
  },
  data() {
    return {
      monthColor: 'rgb(148, 179, 206)',
      weekColor: 'rgb(121, 206, 179)',
      dayColor: 'rgb(186, 161, 237)',
      maxColor: 'rgb(247, 106, 106)',
      capacityTabs: [
        {
          label: 'Database',
          id: 'cpuDb',
        },
        {
          label: 'Database',
          id: 'cpuDb-daily',
        },
        {
          label: 'Host',
          id: 'cpuHost',
        },
        {
          label: 'Host',
          id: 'cpuHost-daily',
        },
        {
          label: 'IOPS',
          id: 'iops',
        },
        {
          label: 'IOPS',
          id: 'iops-daily',
        },
        {
          label: 'IOMB',
          id: 'iomb',
        },
        {
          label: 'IOMB',
          id: 'iomb-daily',
        },
      ],
      capacityTabsOS: [
        {
          label: 'CPU',
          id: 'cpu',
        },
        {
          label: 'CPU',
          id: 'cpu-daily',
        },
        {
          label: 'IOPS',
          id: 'iopsHostDay',
        },
        {
          label: 'IOPS',
          id: 'iopsHostDay-daily',
        },
        {
          label: 'IOMB',
          id: 'iombHostDay',
        },
        {
          label: 'IOMB',
          id: 'iombHostDay-daily',
        },
      ],
    }
  },
  methods: {
    getChartTitle(type, mode, dateRange) {
      if (mode === 'daily') {
        let fromToMsg = ''
        if (dateRange[0] !== '' && dateRange[1] !== '') {
          fromToMsg = `: From ${dateRange[0]} to ${dateRange[1]}`
        }

        if (type === 'iops-daily') {
          return `IOPS - Daily${fromToMsg}`
        } else if (type === 'iomb-daily') {
          return `IOMB - Daily${fromToMsg}`
        } else {
          return `Threads - Daily${fromToMsg}`
        }
      } else {
        if (type === 'IOPS') {
          return 'IOPS'
        } else if (type === 'IOMB') {
          return 'IOMB'
        } else {
          return 'Threads'
        }
      }
    },
  },
}
