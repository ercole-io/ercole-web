<template>
  <BoxContent title="Current Releases" border>
    <b-button
      type="is-white"
      size="is-small"
      icon-pack="fas"
      :icon-right="reverse ? 'sort-amount-up' : 'sort-amount-down-alt'"
      class="bt-reverse"
      @click="getRepositoryAsList((reverse = !reverse))"
      slot="customTitle"
    />
    <template v-if="Object.keys(getRepositoryAsList(reverse)).length > 0">
      <div
        v-for="(values, index) in getRepositoryAsList(reverse)"
        :key="index"
        class="mb-2"
      >
        <span class="is-size-5 has-text-weight-bold mb-2">{{ index }}</span>
        <ul v-for="(val, i) in values" :key="i" class="pl-6">
          <li class="is-size-6" style="list-style: disc">
            <span class="is-size-6 has-text-weight-bold mr-2">
              {{ val.OperatingSystem }}
            </span>
            <b-taglist class="mb-0">
              <b-tag type="is-dark" class="mb-0" attached>{{ val.Name }}</b-tag>
              <b-tag type="is-info" class="mb-0" attached>
                {{ val.ReleaseDate }}
              </b-tag>
              <b-tag type="is-light" class="mb-0" attached>
                {{ val.Arch }}
              </b-tag>
            </b-taglist>
            <span class="is-size-7">
              Installed:
              <SimpleBooleanIcon :value="val.Installed" />
            </span>
            <br />
            <span class="is-size-7">Download:</span>
            <a @click="downloadRepo(val.Download, val.Filename)">
              {{ val.Filename }}
            </a>
          </li>
        </ul>
        <!-- <hr class="my-3" /> -->
      </div>
    </template>
    <NoContent noContentText="No Data Results" style="height: 500px" v-else />
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import downloadMixin from '@/mixins/repository/download.js'
import BoxContent from '@/components/common/BoxContent.vue'
import NoContent from '@/components/common/NoContent.vue'
import SimpleBooleanIcon from '@/components/common/SimpleBooleanIcon.vue'

export default {
  mixins: [downloadMixin],
  components: { BoxContent, NoContent, SimpleBooleanIcon },
  data() {
    return {
      isMounted: false,
      reverse: true,
    }
  },
  mounted() {
    this.isMounted = true
  },
  computed: {
    ...mapGetters(['getRepositoryAsList', 'loadingTableStatus']),
  },
}
</script>

<style lang="scss" scoped>
.bt-reverse {
  height: 16px;
  width: 16px;
  background: none;

  &:hover {
    background: none;
  }
}
</style>
