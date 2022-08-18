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
    ...mapGetters(['getCloudActiveProfiles']),
    menu() {
      return [
        {
          href: { name: 'dashboard' },
          title: this.$i18n.t('menu.dashboard'),
          icon: 'fas fa-home',
          attributes: { 'data-cy': 'mn-dashboard' },
        },
        {
          href: { name: 'hosts' },
          title: this.$i18n.t('menu.hosts'),
          icon: 'fas fa-server',
          attributes: { 'data-cy': 'mn-hosts' },
        },
        {
          title: this.$i18n.t('menu.databases'),
          icon: 'fas fa-database',
          attributes: { 'data-cy': 'mn-databases' },
          child: [
            {
              title: this.$i18n.t('menu.allTechs'),
              href: { path: '/databases' },
              icon: 'fas fa-server',
              attributes: { 'data-cy': 'mn-all-technologies' },
            },
            {
              title: this.$i18n.t('menu.oracle'),
              icon: 'oracle-logo',
              attributes: { 'data-cy': 'mn-oracle' },
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'oracle' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-list' },
                },
                {
                  href: { name: 'addm' },
                  title: this.$i18n.t('menu.addm'),
                  icon: 'fas fa-heartbeat',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-addm' },
                },
                {
                  href: { name: 'segment-advisor' },
                  title: this.$i18n.t('menu.segAdvisor'),
                  icon: 'fas fa-columns',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-segment-advisor' },
                },
                {
                  href: { name: 'patch-advisor' },
                  title: this.$i18n.t('menu.patAdvisor'),
                  icon: 'fas fa-band-aid',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-patch-advisor' },
                },
                {
                  href: { name: 'dba-role' },
                  title: this.$i18n.t('menu.dbGrants'),
                  icon: 'fas fa-server',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-dba-role' },
                },
                {
                  href: { name: 'patch' },
                  title: this.$i18n.t('menu.patch'),
                  icon: 'fas fa-adjust',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-patch' },
                },
                {
                  href: { name: 'options' },
                  title: this.$i18n.t('menu.options'),
                  icon: 'fas fa-adjust',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-options' },
                },
                {
                  href: { name: 'tablespaces' },
                  title: this.$i18n.t('menu.tablespaces'),
                  icon: 'fas fa-adjust',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-oracle-tablespaces' },
                },
                // {
                //   href: { name: 'dbgrowth' },
                //   title: this.$i18n.t('menu.dbgrowth'),
                //   icon: 'fas fa-adjust',
                //   class: 'menu-third-level',
                //   attributes: { 'data-cy': 'mn-oracle-dbgrowth' },
                // },
              ],
            },
            {
              title: this.$i18n.t('menu.mysql'),
              icon: 'mysql-logo',
              attributes: { 'data-cy': 'mn-mysql' },
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'mysql' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-mysql-list' },
                },
              ],
            },
            {
              title: this.$i18n.t('menu.microsoft'),
              icon: 'microsoft-logo',
              attributes: { 'data-cy': 'mn-microsoft' },
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'microsoft' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-microsoft-list' },
                },
              ],
            },
            {
              title: this.$i18n.t('menu.postgresql'),
              icon: 'postgresql-logo',
              attributes: { 'data-cy': 'mn-postgresql' },
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'postgresql' },
                  icon: 'fas fa-database',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-postgresql-list' },
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
        },
        {
          href: { name: 'engineered-systems' },
          title: this.$i18n.t('menu.engSystems'),
          icon: 'far fa-calendar-times',
          attributes: { 'data-cy': 'mn-engineered-systems' },
        },
        {
          href: { name: 'alerts' },
          title: this.$i18n.t('menu.alerts'),
          icon: 'fas fa-bell',
          attributes: { 'data-cy': 'mn-alerts' },
        },
        {
          title: this.$i18n.t('menu.licenses'),
          icon: 'fas fa-dollar-sign',
          attributes: { 'data-cy': 'mn-licenses' },
          child: [
            {
              href: { name: 'licenses-contract' },
              title: this.$i18n.t('menu.licContracts'),
              icon: 'fas fa-cog',
              attributes: { 'data-cy': 'mn-licenses-contract' },
            },
            {
              href: { name: 'licenses-compliance' },
              title: this.$i18n.t('menu.licCompliance'),
              icon: 'fas fa-cog',
              attributes: { 'data-cy': 'mn-licenses-compliance' },
            },
            {
              href: { name: 'licenses-used' },
              title: this.$i18n.t('menu.licUsed'),
              icon: 'fas fa-cog',
              attributes: { 'data-cy': 'mn-licenses-used' },
            },
          ],
        },
        {
          title: this.$i18n.t('menu.cloudAdvisor'),
          icon: 'fas fa-cloud',
          attributes: { 'data-cy': 'mn-cloud' },
          child: [
            {
              title: this.$i18n.t('menu.oracle'),
              icon: 'fas fa-cloud',
              attributes: { 'data-cy': 'mn-cloud-oracle' },
              child: [
                {
                  href: { name: 'oracle-profile-configurations' },
                  title: this.$i18n.t('menu.profileConfig'),
                  icon: 'fas fa-user-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-cloud-oracle-profile' },
                },
                {
                  href: { name: 'oracle-recommendations' },
                  title: this.$i18n.t('menu.recommendations'),
                  icon: 'fas fa-user-shield',
                  class: 'menu-third-level',
                  disabled: !this.getCloudActiveProfiles('oci'),
                  attributes: { 'data-cy': 'mn-cloud-oracle-recommendations' },
                },
              ],
            },
            {
              title: this.$i18n.t('menu.aws'),
              icon: 'fas fa-cloud',
              attributes: { 'data-cy': 'mn-cloud-aws' },
              child: [
                {
                  href: { name: 'aws-profile-configurations' },
                  title: this.$i18n.t('menu.profileConfig'),
                  icon: 'fas fa-user-cog',
                  class: 'menu-third-level',
                  attributes: { 'data-cy': 'mn-cloud-aws-profile' },
                },
                {
                  href: { name: 'aws-recommendations' },
                  title: this.$i18n.t('menu.recommendations'),
                  icon: 'fas fa-user-shield',
                  class: 'menu-third-level',
                  disabled: !this.getCloudActiveProfiles('aws'),
                  attributes: { 'data-cy': 'mn-cloud-aws-recommendations' },
                },
              ],
            },
          ],
        },
        {
          href: { name: 'repository' },
          title: this.$i18n.t('menu.repository'),
          icon: 'fas fa-download',
          attributes: { 'data-cy': 'mn-repository' },
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
