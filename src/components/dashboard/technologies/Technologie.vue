<template>
  <HbuttonScroll scrollID="technologies" style="width: 90%; margin: 0 auto">
    <div class="technologies" id="technologies">
      <div class="technologies-list" id="ercole">
        <div class="image">
          <GhostLoading :isLoading="loading" setHeight="60">
            <img
              src="@/assets/images/Cerchio-blu-cane-blu.png"
              v-if="!loading"
              :data-cy="`${getTechnology(getTotalTarget.extra.name)}-logo`"
              :title="`${getTotalTarget.extra.name}`"
              @click="
                $router.push({
                  name: 'hosts',
                })
              "
            />
          </GhostLoading>
        </div>

        <div class="agents">
          <GhostLoading :isLoading="loading" setHeight="15" setWidth="15">
            <span
              v-if="!loading"
              :data-cy="`${getTechnology(getTotalTarget.extra.name)}-value`"
            >
              {{ getTotalTarget.agents }}
            </span>
          </GhostLoading>
        </div>

        <div class="progress">
          <GhostLoading
            :isLoading="loading"
            setHeight="70"
            setWidth="70"
            isCircle
          >
            <Progress
              :radius="25"
              :value="getTotalTarget.perc"
              :strokeColor="getTotalTarget.extra.color"
              :strokeWidth="7"
              :transitionDuration="2000"
              v-if="!loading"
              :data-cy="`${getTechnology(getTotalTarget.extra.name)}-perc`"
            />
          </GhostLoading>
        </div>
      </div>

      <div
        class="technologies-list"
        v-for="(tech, i) in getTech"
        :key="tech.id || i"
      >
        <div class="image">
          <GhostLoading :isLoading="loading" setHeight="60">
            <img
              v-bind:src="`data:image/jpeg;base64,${tech.extra.logo}`"
              v-if="!loading"
              :data-cy="`${getTechnology(tech.extra.name)}-logo`"
              :title="`${tech.extra.name}`"
              @click="getUrl(tech.extra.name)"
            />
          </GhostLoading>
        </div>

        <div class="agents">
          <GhostLoading :isLoading="loading" setHeight="15" setWidth="15">
            <span
              v-if="!loading"
              :data-cy="`${getTechnology(tech.extra.name)}-value`"
            >
              {{ tech.agents }}
            </span>
          </GhostLoading>
        </div>

        <div class="progress">
          <GhostLoading
            :isLoading="loading"
            setHeight="70"
            setWidth="70"
            isCircle
          >
            <Progress
              :radius="25"
              :value="tech.perc"
              :strokeColor="tech.extra.color"
              :strokeWidth="7"
              :transitionDuration="2000"
              v-if="!loading"
              :data-cy="`${getTechnology(tech.extra.name)}-perc`"
            />
          </GhostLoading>
        </div>
      </div>
    </div>
  </HbuttonScroll>
</template>

<script>
import { bus } from '@/helpers/eventBus.js'
import { mapGetters } from 'vuex'
import Progress from 'easy-circular-progress'
import HbuttonScroll from '@/components/HbuttonScroll.vue'
import GhostLoading from '@/components/common/GhostLoading.vue'
import toLower from '@/filters/toLower.js'

export default {
  name: 'daschboard-technologies-technologie-component',
  components: {
    Progress,
    HbuttonScroll,
    GhostLoading,
  },
  data() {
    return {
      loading: true,
    }
  },
  beforeMount() {
    bus.$on('loadTechComplete', () => {
      this.loading = false
    })
  },
  methods: {
    getTechnology(value) {
      if (value === 'Oracle Database') {
        return 'oracle-database'
      } else if (value === 'SQL Server') {
        return 'sql-server'
      } else if (value === 'MySQL') {
        return 'mysql'
      } else if (value === 'PostgreSQL') {
        return 'postgresql'
      } else if (value === 'MariaDB') {
        return 'mariadb'
      } else {
        return toLower(value)
      }
    },
    getUrl(value) {
      if (value === 'Oracle Database') {
        return this.$router.push({
          name: 'oracle',
        })
      } else if (value === 'SQL Server') {
        return this.$router.push({
          name: 'microsoft',
        })
      } else if (value === 'MySQL') {
        return this.$router.push({
          name: 'mysql',
        })
      } else if (value === 'PostgreSQL') {
        return this.$router.push({
          name: 'postgresql',
        })
      } else if (value === 'MongoDB') {
        return this.$router.push({
          name: 'mongodb',
        })
      } else if (value === 'MariaDB') {
        return null
      }
    },
  },
  computed: {
    ...mapGetters(['getTotalTarget', 'getTechnologies']),
    getTech() {
      return this.loading ? 5 : this.getTechnologies
    },
  },
}
</script>

<style lang="scss" scoped>
.technologies {
  display: flex;
  max-width: 100%;
  justify-content: space-between;
}
.technologies-list {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 0 3px;
  min-width: 130px;

  .image {
    width: 60px;
    margin: 0 auto;
    display: block;
    padding: 10px 0;

    img {
      cursor: pointer;
    }
  }

  .tech-name {
    font-size: 0.85em;
    font-weight: 500;
    padding: 10px 0;
  }

  .agents {
    border-width: 0;
    padding-bottom: 4px;
    list-style: none;
    font-size: 1em;
  }

  .progress {
    width: 70px;
    height: 70px;
    text-align: center;
  }
}
</style>
