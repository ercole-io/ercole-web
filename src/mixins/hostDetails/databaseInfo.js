import _ from 'lodash'
import { mapGetters } from 'vuex'
import { mapBooleanIcon } from '@/helpers/helpers.js'
import TooltipMixin from '@/mixins/tooltipMixin.js'
import HighlightSearchMixin from '@/mixins/highlightSearch.js'
import databaseTypesMixin from '@/mixins/hostDetails/databaseTypes.js'
import SimpleBooleanIcon from '@/components/common/SimpleBooleanIcon.vue'

import { filterOptionsPostgreSql } from '@/helpers/hostDetails/filterOptions/postgresql.js'
import { filterOptionsOracle } from '@/helpers/hostDetails/filterOptions/oracle.js'
import { filterOptionsMicrosft } from '@/helpers/hostDetails/filterOptions/microsoft.js'
import { filterOptionsMysql } from '@/helpers/hostDetails/filterOptions/mysql.js'
import { filterOptionsMongoDb } from '@/helpers/hostDetails/filterOptions/mongodb.js'

export default {
  mixins: [TooltipMixin, HighlightSearchMixin, databaseTypesMixin],
  props: {
    dbInfo: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    SimpleBooleanIcon,
  },
  data() {
    return {
      dataOptions: [],
    }
  },
  beforeMount() {
    if (this.isOracle) {
      this.dataOptions = filterOptionsOracle
    } else if (this.isMysql) {
      this.dataOptions = filterOptionsMysql
    } else if (this.isMicrosoft) {
      this.dataOptions = filterOptionsMicrosft
    } else if (this.isPostgresql) {
      this.dataOptions = filterOptionsPostgreSql
    } else if (this.isMongodb) {
      this.dataOptions = filterOptionsMongoDb
    }
  },
  methods: {
    bindIcon(value) {
      return mapBooleanIcon(value)
    },
    toString(val) {
      return _.toString(val)
    },
    setPrettyBytes(val) {
      return this.$options.filters.prettyBytes(val, 1, true)
    },
  },
  computed: {
    ...mapGetters(['returnSelectedKeys']),
    hasInfo() {
      return (
        (this.returnSelectedKeys.length === 1 &&
          this.returnSelectedKeys.includes('name')) ||
        this.dataOptions.filter(
          (opt) =>
            this.returnSelectedKeys.includes(opt.value) && opt.group === 'info'
        ).length > 0
      )
    },
  },
}
