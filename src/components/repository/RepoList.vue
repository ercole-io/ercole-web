<template>
  <BoxContent title="Current Releases" border>
    <template v-if="Object.keys(getRepositoryAsList).length > 0">
      <div
        v-for="(values, index) in getRepositoryAsList"
        :key="index"
        class="mb-2"
      >
        <p class="is-size-5 has-text-weight-bold mb-2">{{ index }}</p>
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
            <span class="is-size-7">Download:</span>
            <a :href="`https://repository.ercole.io/all/${val.Filename}`">
              {{ val.Filename }}
            </a>
          </li>
        </ul>
        <hr class="my-3" />
      </div>
    </template>
    <NoContent noContentText="No Data Results" style="height: 500px" v-else />
  </BoxContent>
</template>

<script>
import { mapGetters } from 'vuex'
import BoxContent from '@/components/common/BoxContent.vue'
import NoContent from '@/components/common/NoContent.vue'

export default {
  components: { BoxContent, NoContent },
  data() {
    return {
      isMounted: false,
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

<style lang="scss" scoped></style>
