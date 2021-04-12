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

  data() {
    return {
      menu: [
        {
          href: { name: 'dashboard' },
          title: 'Dashboard',
          icon: 'fas fa-home'
        },
        {
          href: { name: 'hosts' },
          title: 'Hosts',
          icon: 'fas fa-server'
        },
        {
          title: 'Databases',
          icon: 'fas fa-database',
          child: [
            {
              title: 'All technologies',
              href: { path: '/databases' },
              icon: 'fas fa-cog'
            },
            {
              title: 'Oracle',
              icon: 'fas fa-cog',
              child: [
                {
                  title: 'DB List',
                  href: { name: 'oracle' },
                  icon: 'fas fa-database'
                },
                {
                  href: { name: 'addm' },
                  title: 'ADDM',
                  icon: 'fas fa-heartbeat'
                },
                {
                  href: { name: 'segment-advisor' },
                  title: 'Segment Advisor',
                  icon: 'fas fa-columns'
                },
                {
                  href: { name: 'patch-advisor' },
                  title: 'Patch Advisor',
                  icon: 'fas fa-band-aid'
                }
              ]
            }
            // {
            //   title: 'MySQL',
            //   icon: 'fas fa-cog',
            //   child: [
            //     {
            //       title: 'DB List',
            //       href: { name: 'mysql' },
            //       icon: 'fas fa-database'
            //     }
            //   ]
            // }
          ]
        },
        {
          href: { name: 'hypervisors' },
          title: 'Hypervisors',
          icon: 'fas fa-object-group'
        },
        // {
        //   href: { name: 'middleware' },
        //   title: 'Middlewares',
        //   icon: 'fas fa-globe'
        // },
        {
          href: { name: 'engineered-systems' },
          title: 'Engineered Systems',
          icon: 'far fa-calendar-times'
        },
        {
          href: { name: 'alerts' },
          title: 'Alerts',
          icon: 'fas fa-bell'
        },
        {
          title: 'Licenses',
          icon: 'fas fa-dollar-sign',
          child: [
            {
              href: { name: 'licenses-agreement' },
              title: 'Licenses Agreement',
              icon: 'fas fa-cog'
            },
            {
              href: { name: 'licenses-compliance' },
              title: 'Licenses Compliance',
              icon: 'fas fa-cog'
            },
            {
              href: { name: 'licenses-used' },
              title: 'Licenses Used',
              icon: 'fas fa-cog'
            }
          ]
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
  },
  methods: {
    onToggleCollapse(collapsed) {
      this.$emit('collapsedSidebar', collapsed)
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
