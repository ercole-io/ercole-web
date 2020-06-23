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
              <th>Used%</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(file, i) in filesys" :key="i">
              <td>{{ file.Filesystem }}</td>
              <td>{{ file.FsType }}</td>
              <td>{{ file.MountedOn }}</td>
              <td>{{ file.Size }}</td>
              <td>{{ file.Available }}</td>
              <td>{{ file.Used }}</td>
              <td>{{ file.UsedPerc }}</td>
            </tr>
          </tbody>
        </table>
      </Card>
    </b-modal>
  </div>
</template>

<script>
import Card from '@/components/common/Card.vue'

export default {
  props: {
    filesys: {
      type: Array,
      default: () => []
    }
  },
  components: {
    Card
  },
  data() {
    return {
      isFilesysModalActive: false
    }
  }
}
</script>

<style lang="scss" scoped>
.filesys {
  font-size: 0.8em;
  line-height: 27px;
}

.filesys-modal {
  td:not(:first-child) {
    text-align: center;
  }

  td:first-child {
    min-width: 300px;
  }
}
</style>
