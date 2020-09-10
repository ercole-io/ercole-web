<template>
  <div>
    <span class="filesys">
      Host FileSystems:
      <b-button
        @click="isFilesysModalActive = true"
        type="is-primary"
        icon-right="download"
        size="is-small"
        outlined
      />
    </span>

    <b-modal :active.sync="isFilesysModalActive" :width="750" scroll="keep">
      <Card cardTitle="Host FileSystems List">
        <table class="filesys-modal">
          <thead>
            <tr>
              <th>FileSys</th>
              <th>FsType</th>
              <th>MountedOn</th>
              <th>Size</th>
              <th>Available</th>
              <th>Used</th>
              <!-- <th>Used%</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, i) in hostDetails.filesys" :key="i">
              <td>{{ file.filesystem }}</td>
              <td>{{ file.type }}</td>
              <td>{{ file.mountedOn }}</td>
              <td>{{ file.size }}</td>
              <td>{{ file.availableSpace }}</td>
              <td>{{ file.usedSpace }}</td>
              <!-- <td>{{ file.UsedPerc }}</td> -->
            </tr>
          </tbody>
        </table>
      </Card>
    </b-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from '@/components/common/Card.vue'

export default {
  // props: {
  //   filesys: {
  //     type: Array,
  //     default: () => []
  //   }
  // },
  components: {
    Card
  },
  data() {
    return {
      isFilesysModalActive: false
    }
  },
  computed: {
    ...mapState(['hostDetails'])
  }
}
</script>

<style lang="scss" scoped>
.filesys {
  font-size: 0.8em;
  line-height: 27px;
}

.filesys-modal {
  th:not(:first-child),
  td:not(:first-child) {
    text-align: center;
  }

  td:first-child {
    max-width: 300px;
  }
}
</style>
