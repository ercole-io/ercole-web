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

export default {
  components: {
    SidebarMenu
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.$emit('collapsedSidebar', collapsed)
    }
  },
  computed: {
    menu() {
      return [
        {
          href: { name: 'dashboard' },
          title: this.$i18n.t('menu.dashboard'),
          icon: 'fas fa-home'
        },
        {
          href: { name: 'hosts' },
          title: this.$i18n.t('menu.hosts'),
          icon: 'fas fa-server'
        },
        {
          title: this.$i18n.t('menu.databases'),
          icon: 'fas fa-database',
          child: [
            {
              title: this.$i18n.t('menu.allTechs'),
              href: { path: '/databases' },
              icon: 'fas fa-cog'
            },
            {
              title: this.$i18n.t('menu.oracle'),
              icon: 'fas fa-cog',
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'oracle' },
                  icon: 'fas fa-database'
                },
                {
                  href: { name: 'addm' },
                  title: this.$i18n.t('menu.addm'),
                  icon: 'fas fa-heartbeat'
                },
                {
                  href: { name: 'segment-advisor' },
                  title: this.$i18n.t('menu.segAdvisor'),
                  icon: 'fas fa-columns'
                },
                {
                  href: { name: 'patch-advisor' },
                  title: this.$i18n.t('menu.patAdvisor'),
                  icon: 'fas fa-band-aid'
                }
              ]
            },
            {
              title: this.$i18n.t('menu.mysql'),
              icon: 'fas fa-cog',
              child: [
                {
                  title: this.$i18n.t('menu.dbList'),
                  href: { name: 'mysql' },
                  icon: 'fas fa-database'
                }
              ]
            }
          ]
        },
        {
          href: { name: 'hypervisors' },
          title: this.$i18n.t('menu.hypervisors'),
          icon: 'fas fa-object-group'
        },
        // {
        //   href: { name: 'middleware' },
        //   title: 'Middlewares',
        //   icon: 'fas fa-globe'
        // },
        {
          href: { name: 'engineered-systems' },
          title: this.$i18n.t('menu.engSystems'),
          icon: 'far fa-calendar-times'
        },
        {
          href: { name: 'alerts' },
          title: this.$i18n.t('menu.alerts'),
          icon: 'fas fa-bell'
        },
        {
          title: this.$i18n.t('menu.licenses'),
          icon: 'fas fa-dollar-sign',
          child: [
            {
              href: { name: 'licenses-agreement' },
              title: this.$i18n.t('menu.licAgreements'),
              icon: 'fas fa-cog'
            },
            {
              href: { name: 'licenses-compliance' },
              title: this.$i18n.t('menu.licCompliance'),
              icon: 'fas fa-cog'
            },
            {
              href: { name: 'licenses-used' },
              title: this.$i18n.t('menu.licUsed'),
              icon: 'fas fa-cog'
            }
          ]
        },
        {
          href: { name: 'cloud-recommendations' },
          title: this.$i18n.t('menu.cloudRec'),
          icon: 'fas fa-cloud'
        }
        // {
        //   href: { name: 'settings' },
        //   title: 'Settings',
        //   icon: 'fas fa-cogs',
        //   child: [
        //     {
        //       title: 'Agents',
        //       icon: 'fas fa-cog'
        //     }
        //   ]
        // }
      ]
    }
  }
}
</script>

<style lang="scss">
$primary-color: #679189 !default;
$base-bg: #363636 !default;
$icon-bg: #363636 !default;
$item-font-size: 14px !default;
$item-line-height: 20px !default;
$item-padding: 15px !default;
$icon-height: 20px !default;
$icon-width: 20px !default;
@import 'vue-sidebar-menu/src/scss/vue-sidebar-menu.scss';

.v-sidebar-menu {
  z-index: 53;

  .vsm--scroll-wrapper {
    margin-right: 0 !important;

    > .vsm--list {
      margin-top: 56px;
    }
  }

  .vsm--toggle-btn {
    position: absolute;
    top: 0;
    left: 0;
    height: 56px;
    width: 50px;

    > span {
      > span {
        margin: 8px 10px;
        float: left;
      }
    }
  }
}
</style>
