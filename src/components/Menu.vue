<template>
  <sidebar-menu
    :menu="menu"
    :collapsed="true"
    width="250px"
    :hiddenOnCollapse="true"
    :showOneChild="true"
    @toggle-collapse="onToggleCollapse"
    data-sidebar
  >
    <span slot="toggle-icon">
      <b-icon pack="fas" icon="bars" size="is-small" />
    </span>
  </sidebar-menu>
</template>

<script>
import _ from 'lodash'
import { SidebarMenu } from 'vue-sidebar-menu'
import { mapGetters } from 'vuex'

export default {
  name: 'menu-component',
  components: {
    SidebarMenu,
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.$emit('collapsedSidebar', collapsed)
    },
    checkMenu(name, parent) {
      if (
        _.filter(this.getDynamicMenu, _.matches({ name: name, parent: parent }))
          .length > 0
      ) {
        return false
      }
      return true
    },
  },
  computed: {
    ...mapGetters(['getCloudActiveProfiles', 'getDynamicMenu']),
    menu() {
      return [
        {
          href: { name: 'dashboard' },
          title: this.$i18n.t('menu.dashboard'),
          icon: 'fas fa-home',
          attributes: { 'data-cy': 'mn-dashboard' },
          hidden: this.checkMenu('Dashboard', ''),
        },
        {
          href: { name: 'hosts' },
          title: this.$i18n.t('menu.hosts'),
          icon: 'fas fa-server',
          attributes: { 'data-cy': 'mn-hosts' },
          hidden: this.checkMenu('Hosts', ''),
        },
        {
          title: this.$i18n.t('menu.databases'),
          icon: 'fas fa-database',
          attributes: { 'data-cy': 'mn-databases' },
          hidden: this.checkMenu('Databases', ''),
          child: [
            {
              title: this.$i18n.t('menu.allTechs'),
              href: { path: '/databases' },
              icon: 'fas fa-server',
              attributes: { 'data-cy': 'mn-all-technologies' },
              hidden: this.checkMenu('All Technologies', 'Databases'),
            },
            {
              title: this.$i18n.t('menu.oracle'),
              icon: 'logos oracle',
              attributes: { 'data-cy': 'mn-oracle' },
              hidden: this.checkMenu('Oracle', 'Databases'),
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'oracle' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-list' },
                  hidden: this.checkMenu('DB List', 'Oracle'),
                },
                {
                  href: { name: 'addm' },
                  title: this.$i18n.t('menu.addm'),
                  icon: 'fas fa-heartbeat',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-addm' },
                  hidden: this.checkMenu('ADDM', 'Oracle'),
                },
                {
                  href: { name: 'segment-advisor' },
                  title: this.$i18n.t('menu.segAdvisor'),
                  icon: 'fas fa-columns',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-segment-advisor' },
                  hidden: this.checkMenu('Segment Advisor', 'Oracle'),
                },
                {
                  href: { name: 'patch-advisor' },
                  title: this.$i18n.t('menu.patAdvisor'),
                  icon: 'fas fa-band-aid',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-patch-advisor' },
                  hidden: this.checkMenu('Patch Advisor', 'Oracle'),
                },
                {
                  href: { name: 'dba-role' },
                  title: this.$i18n.t('menu.dbGrants'),
                  icon: 'fas fa-server',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-dba-role' },
                  hidden: this.checkMenu('DBA Role', 'Oracle'),
                },
                {
                  href: { name: 'patch' },
                  title: this.$i18n.t('menu.patch'),
                  icon: 'fas fa-adjust',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-patch' },
                  hidden: this.checkMenu('Patch', 'Oracle'),
                },
                {
                  href: { name: 'options' },
                  title: this.$i18n.t('menu.options'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-options' },
                  hidden: this.checkMenu('Options', 'Oracle'),
                },
                {
                  href: { name: 'tablespaces' },
                  title: this.$i18n.t('menu.tablespaces'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-tablespaces' },
                  hidden: this.checkMenu('Tablespaces', 'Oracle'),
                },
                {
                  href: { name: 'backups' },
                  title: this.$i18n.t('menu.backups'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-backups' },
                  hidden: this.checkMenu('Backups', 'Oracle'),
                },
                {
                  href: { name: 'services' },
                  title: this.$i18n.t('menu.services'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-services' },
                  hidden: this.checkMenu('Services', 'Oracle'),
                },
                {
                  href: { name: 'dbgrowth' },
                  title: this.$i18n.t('menu.dbgrowth'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-dbgrowth' },
                  hidden: this.checkMenu('DB Growth', 'Oracle'),
                },
                {
                  href: { name: 'schemas' },
                  title: this.$i18n.t('menu.schemas'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-schemas' },
                  hidden: this.checkMenu('Schemas', 'Oracle'),
                },
                {
                  href: { name: 'pdbs' },
                  title: this.$i18n.t('menu.pdbs'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-pdbs' },
                  hidden: this.checkMenu('Pluggable DBs', 'Oracle'),
                },
                {
                  href: { name: 'cpu-time' },
                  title: this.$i18n.t('menu.cpu-time'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-cpu-time' },
                  hidden: this.checkMenu('CPU Time', 'Oracle'),
                },
                {
                  href: { name: 'partitioning' },
                  title: this.$i18n.t('menu.partitionings'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-partitionings' },
                  hidden: this.checkMenu('Partitionings', 'Oracle'),
                },
                {
                  href: { name: 'capacity' },
                  title: this.$i18n.t('menu.capacity'),
                  icon: 'fas fa-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-capacity' },
                  hidden: this.checkMenu('Capacity', 'Oracle'),
                  child: [
                    {
                      title: this.$i18n.t('menu.capacityos'),
                      href: { name: 'capacityos' },
                      icon: 'fas fa-database',
                      class: 'menu-fourth-level',
                      attributes: { 'data-cy': 'mn-capacity-os' },
                      hidden: !this.checkMenu('Capacity-OS', 'Oracle'),
                    },
                  ],
                },
              ],
            },
            {
              title: this.$i18n.t('menu.mysql'),
              icon: 'logos mysql',
              attributes: { 'data-cy': 'mn-mysql' },
              hidden: this.checkMenu('MySQL', 'Databases'),
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'mysql' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-mysql-list' },
                  hidden: this.checkMenu('DB List', 'MySQL'),
                },
              ],
            },
            {
              title: this.$i18n.t('menu.microsoft'),
              icon: 'logos microsoft',
              attributes: { 'data-cy': 'mn-microsoft' },
              hidden: this.checkMenu('Microsoft', 'Databases'),
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'microsoft' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-microsoft-list' },
                  hidden: this.checkMenu('DB List', 'Microsoft'),
                },
              ],
            },
            {
              title: this.$i18n.t('menu.postgresql'),
              icon: 'logos postgresql',
              attributes: { 'data-cy': 'mn-postgresql' },
              hidden: this.checkMenu('PostgreSQL', 'Databases'),
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'postgresql' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-postgresql-list' },
                  hidden: this.checkMenu('DB List', 'PostgreSQL'),
                },
              ],
            },
            {
              title: this.$i18n.t('menu.mongodb'),
              icon: 'logos mongodb',
              attributes: { 'data-cy': 'mn-mongodb' },
              hidden: this.checkMenu('MongoDB', 'Databases'),
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'mongodb' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-mongodb-list' },
                  hidden: this.checkMenu('DB List', 'MongoDB'),
                },
              ],
            },
          ],
        },
        {
          href: { name: 'hypervisors' },
          title: this.$i18n.t('menu.hypervisors'),
          icon: 'fas fa-object-group',
          attributes: { 'data-cy': 'mn-hypervisors' },
          hidden: this.checkMenu('Hypervisors', ''),
        },
        {
          href: { name: 'exadata' },
          title: this.$i18n.t('menu.exadata'),
          icon: 'far fa-calendar-times',
          attributes: { 'data-cy': 'mn-exadata' },
          hidden: this.checkMenu('Engineered Systems', ''),
        },
        {
          href: { name: 'alerts' },
          title: this.$i18n.t('menu.alerts'),
          icon: 'fas fa-bell',
          attributes: { 'data-cy': 'mn-alerts' },
          hidden: this.checkMenu('Alerts', ''),
        },
        {
          title: this.$i18n.t('menu.licenses'),
          icon: 'fas fa-dollar-sign',
          attributes: { 'data-cy': 'mn-licenses' },
          hidden: this.checkMenu('Licenses', ''),
          child: [
            {
              href: { name: 'licenses-contract' },
              title: this.$i18n.t('menu.licContracts'),
              icon: 'fas fa-cog',
              attributes: { 'data-cy': 'mn-licenses-contract' },
              hidden: this.checkMenu('Licenses Contract', 'Licenses'),
            },
            {
              href: { name: 'licenses-compliance' },
              title: this.$i18n.t('menu.licCompliance'),
              icon: 'fas fa-cog',
              attributes: { 'data-cy': 'mn-licenses-compliance' },
              hidden: this.checkMenu('Licenses Compliance', 'Licenses'),
            },
            {
              href: { name: 'licenses-used' },
              title: this.$i18n.t('menu.licUsed'),
              icon: 'fas fa-cog',
              attributes: { 'data-cy': 'mn-licenses-used' },
              hidden: this.checkMenu('Licenses Used', 'Licenses'),
            },
          ],
        },
        {
          title: this.$i18n.t('menu.cloudAdvisor'),
          icon: 'fas fa-cloud',
          attributes: { 'data-cy': 'mn-cloud' },
          hidden: this.checkMenu('Cloud Advisors', ''),
          child: [
            {
              title: this.$i18n.t('menu.oracle'),
              icon: 'fas fa-cloud',
              attributes: { 'data-cy': 'mn-cloud-oracle' },
              hidden: this.checkMenu('Oracle', 'Cloud Advisors'),
              child: [
                {
                  href: { name: 'oracle-profile-configurations' },
                  title: this.$i18n.t('menu.profileConfig'),
                  icon: 'fas fa-user-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-cloud-oracle-profile' },
                  hidden: this.checkMenu('Profile Configuration', 'Oracle'),
                },
                {
                  href: { name: 'oracle-recommendations' },
                  title: this.$i18n.t('menu.recommendations'),
                  icon: 'fas fa-user-shield',
                  class: 'menu-third-level',
                  disabled: !this.getCloudActiveProfiles('oci'),
                  attributes: { 'data-cy': 'mn-cloud-oracle-recommendations' },
                  hidden: this.checkMenu('Recommendations', 'Oracle'),
                },
              ],
            },
            {
              title: this.$i18n.t('menu.aws'),
              icon: 'fas fa-cloud',
              attributes: { 'data-cy': 'mn-cloud-aws' },
              hidden: this.checkMenu('AWS', 'Cloud Advisors'),
              child: [
                {
                  href: { name: 'aws-profile-configurations' },
                  title: this.$i18n.t('menu.profileConfig'),
                  icon: 'fas fa-user-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-cloud-aws-profile' },
                  hidden: this.checkMenu('Profile Configuration', 'AWS'),
                },
                {
                  href: { name: 'aws-recommendations' },
                  title: this.$i18n.t('menu.recommendations'),
                  icon: 'fas fa-user-shield',
                  class: 'menu-third-level',
                  disabled: !this.getCloudActiveProfiles('aws'),
                  attributes: { 'data-cy': 'mn-cloud-aws-recommendations' },
                  hidden: this.checkMenu('Recommendations', 'AWS'),
                },
              ],
            },
            {
              title: this.$i18n.t('menu.azure'),
              icon: 'fas fa-cloud',
              attributes: { 'data-cy': 'mn-cloud-azure' },
              hidden: this.checkMenu('Azure', 'Cloud Advisors'),
              child: [
                {
                  href: { name: 'azure-profile-configurations' },
                  title: this.$i18n.t('menu.profileConfig'),
                  icon: 'fas fa-user-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-cloud-azure-profile' },
                  hidden: this.checkMenu('Profile Configuration', 'Azure'),
                },
                // {
                //   href: { name: 'azure-recommendations' },
                //   title: this.$i18n.t('menu.recommendations'),
                //   icon: 'fas fa-user-shield',
                //   class: 'menu-third-level',
                //   disabled: !this.getCloudActiveProfiles('azure'),
                //   attributes: { 'data-cy': 'mn-cloud-azure-recommendations' },
                //   hidden: this.checkMenu('Recommendations', 'Azure'),
                // },
              ],
            },
          ],
        },
        {
          href: { name: 'repository' },
          title: this.$i18n.t('menu.repository'),
          icon: 'fas fa-download',
          attributes: { 'data-cy': 'mn-repository' },
          hidden: this.checkMenu('Repository', ''),
        },
        {
          href: { name: 'settings' },
          title: this.$i18n.t('menu.settings'),
          icon: 'fas fa-cog',
          attributes: { 'data-cy': 'mn-settings' },
          hidden: this.checkMenu('Settings', ''),
        },
      ]
    },
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/_variables';

$primary-color: $custom-primary !default;
$base-bg: $ercole-blue !default;
$icon-bg: $ercole-blue !default;
$item-font-size: 14px !default;
$item-line-height: 20px !default;
$item-padding: 15px !default;
$icon-height: 20px !default;
$icon-width: 20px !default;
@import 'vue-sidebar-menu/src/scss/vue-sidebar-menu.scss';

.v-sidebar-menu {
  z-index: 53;

  // .vsm--link_mobile-item.vsm--link,
  // .vsm--link_mobile-item {
  //   color: $ercole-blue;
  // }

  .vsm--scroll-wrapper {
    margin-right: 0 !important;

    > .vsm--list {
      margin-top: 4rem;
    }
  }

  .vsm--toggle-btn {
    position: absolute;
    top: 0;
    left: 0;
    height: 4rem;
    width: 50px;

    > span {
      > span {
        margin: 8px 10px;
        float: left;
      }
    }
  }
}

.menu-third-level {
  background-color: #232963;
}
.menu-fourth-level {
  background-color: #2a3063;
}
</style>
