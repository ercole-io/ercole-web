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
    }
  },
  methods: {
    getChartTitle(type, mode) {
      if (mode === 'daily') {
        if (type === 'iops-daily') {
          return 'IOPS - Daily'
        } else if (type === 'iomb-daily') {
          return 'IOMB - Daily'
        } else {
          return 'Threads - Daily'
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
