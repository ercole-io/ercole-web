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
import { SidebarMenu } from 'vue-sidebar-menu'
import { mapGetters } from 'vuex'

export default {
  components: {
    SidebarMenu,
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.$emit('collapsedSidebar', collapsed)
    },
  },
  computed: {
    ...mapGetters(['getOciActiveProfiles']),
    menu() {
      return [
        {
          href: { name: 'dashboard' },
          title: this.$i18n.t('menu.dashboard'),
          icon: 'fas fa-home',
        },
        {
          href: { name: 'hosts' },
          title: this.$i18n.t('menu.hosts'),
          icon: 'fas fa-server',
        },
        {
          title: this.$i18n.t('menu.databases'),
          icon: 'fas fa-database',
          child: [
            {
              title: this.$i18n.t('menu.allTechs'),
              href: { path: '/databases' },
              icon: 'fas fa-server',
            },
            {
              title: this.$i18n.t('menu.oracle'),
              icon: 'oracle-logo',
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'oracle' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                },
                {
                  href: { name: 'addm' },
                  title: this.$i18n.t('menu.addm'),
                  icon: 'fas fa-heartbeat',
                  class: 'menu-third-level',
                },
                {
                  href: { name: 'segment-advisor' },
                  title: this.$i18n.t('menu.segAdvisor'),
                  icon: 'fas fa-columns',
                  class: 'menu-third-level',
                },
                {
                  href: { name: 'patch-advisor' },
                  title: this.$i18n.t('menu.patAdvisor'),
                  icon: 'fas fa-band-aid',
                  class: 'menu-third-level',
                },
                {
                  href: { name: 'dba-role' },
                  title: this.$i18n.t('menu.dbGrants'),
                  icon: 'fas fa-asterisk',
                  class: 'menu-third-level',
                },
              ],
            },
            {
              title: this.$i18n.t('menu.mysql'),
              icon: 'mysql-logo',
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'mysql' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                },
              ],
            },
            {
              title: this.$i18n.t('menu.microsoft'),
              icon: 'microsoft-logo',
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'microsoft' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                },
              ],
            },
            {
              title: this.$i18n.t('menu.postgresql'),
              icon: 'postgresql-logo',
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'postgresql' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                },
              ],
            },
          ],
        },
        {
          href: { name: 'hypervisors' },
          title: this.$i18n.t('menu.hypervisors'),
          icon: 'fas fa-object-group',
        },
        {
          href: { name: 'engineered-systems' },
          title: this.$i18n.t('menu.engSystems'),
          icon: 'far fa-calendar-times',
        },
        {
          href: { name: 'alerts' },
          title: this.$i18n.t('menu.alerts'),
          icon: 'fas fa-bell',
        },
        {
          title: this.$i18n.t('menu.licenses'),
          icon: 'fas fa-dollar-sign',
          child: [
            {
              href: { name: 'licenses-contract' },
              title: this.$i18n.t('menu.licContracts'),
              icon: 'fas fa-cog',
            },
            {
              href: { name: 'licenses-compliance' },
              title: this.$i18n.t('menu.licCompliance'),
              icon: 'fas fa-cog',
            },
            {
              href: { name: 'licenses-used' },
              title: this.$i18n.t('menu.licUsed'),
              icon: 'fas fa-cog',
            },
          ],
        },
        {
          title: this.$i18n.t('menu.cloudAdvisor'),
          icon: 'fas fa-cloud',
          child: [
            {
              href: { name: 'profile-configurations' },
              title: this.$i18n.t('menu.profileConfig'),
              icon: 'fas fa-cog',
            },
            {
              href: { name: 'recommendations' },
              title: this.$i18n.t('menu.recommendations'),
              icon: 'fas fa-cog',
              disabled: !this.getOciActiveProfiles,
            },
          ],
        },
        {
          href: { name: 'repository' },
          title: this.$i18n.t('menu.repository'),
          icon: 'fas fa-download',
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
</style>
