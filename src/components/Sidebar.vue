<template>
  <sidebar-menu
    :menu="menu"
    :collapsed="true"
    width="250px"
    :hiddenOnCollapse="true"
    :showOneChild="true"
    @toggle-collapse="onToggleCollapse"
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
          href: { path: '/' },
          title: 'Dashboard',
          icon: 'fas fa-home'
        },
        {
          href: { path: '/hosts' },
          title: 'Hosts',
          icon: 'fas fa-server'
        },
        {
          href: { path: '/databases' },
          title: 'Databases',
          icon: 'fas fa-database',
          child: [
            {
              title: 'Oracle',
              icon: 'fas fa-cog',
              child: [
                {
                  title: 'Proactive',
                  icon: 'fas fa-microscope',
                  child: [
                    {
                      href: { path: '/proactive/addm' },
                      title: 'ADDM',
                      icon: 'fas fa-heartbeat'
                    },
                    {
                      href: { path: '/proactive/segment-advisor' },
                      title: 'Segment Advisor',
                      icon: 'fas fa-columns'
                    },
                    {
                      href: { path: '/proactive/patch-advisor' },
                      title: 'Patch Advisor',
                      icon: 'fas fa-band-aid'
                    }
                  ]
                }
              ]
            },
            {
              title: 'SQL Server',
              icon: 'fas fa-cog',
              child: [
                {
                  title: 'Proactive',
                  icon: 'fas fa-microscope'
                }
              ]
            },
            {
              title: 'MySQL',
              icon: 'fas fa-cog',
              child: [
                {
                  title: 'Proactive',
                  icon: 'fas fa-microscope'
                }
              ]
            },
            {
              title: 'MDB',
              icon: 'fas fa-cog',
              child: [
                {
                  title: 'Proactive',
                  icon: 'fas fa-microscope'
                }
              ]
            },
            {
              title: 'PSQL',
              icon: 'fas fa-cog',
              child: [
                {
                  title: 'Proactive',
                  icon: 'fas fa-microscope'
                }
              ]
            },
            {
              title: 'WEDL',
              icon: 'fas fa-cog',
              child: [
                {
                  title: 'Proactive',
                  icon: 'fas fa-microscope'
                }
              ]
            }
          ]
        },
        {
          href: { path: '/hypervisors' },
          title: 'Hypervisors',
          icon: 'fas fa-object-group'
        },
        {
          href: { path: '/middleware' },
          title: 'Middlewares',
          icon: 'fas fa-globe'
        },
        {
          href: { path: '/engineered-systems' },
          title: 'Engineered Systems',
          icon: 'fas fa-times'
        },
        {
          href: { path: '/alerts' },
          title: 'Alerts',
          icon: 'fas fa-bell'
        },
        {
          title: 'Licenses',
          icon: 'fas fa-dollar-sign',
          child: [
            {
              href: { path: '/licenses/compliance' },
              title: 'Licenses Compliance',
              icon: 'fas fa-cog'
            },
            {
              href: { path: '/licenses/used' },
              title: 'Licenses Used',
              icon: 'fas fa-cog'
            }
          ]
        },
        {
          href: { path: '/settings' },
          title: 'Settings',
          icon: 'fas fa-cogs',
          child: [
            {
              title: 'Agents',
              icon: 'fas fa-cog'
            }
          ]
        }
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
