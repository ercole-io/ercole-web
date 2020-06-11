<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <b-sidebar
        mobile="reduce"
        :expand-on-hover="true"
        :reduce="true"
        :fullheight="true"
        type="is-white"
        open
      >
        <div class="p-1">
          <b-menu class="is-custom-mobile">
            <b-menu-list>
              <b-menu-item
                icon-pack="fas"
                icon="home"
                label="Dasboard"
                tag="router-link"
                to="/dashboard"
              ></b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="h-square"
                label="Hosts"
                tag="router-link"
                to="/hosts"
              ></b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="database"
                label="Database"
                tag="router-link"
                to="/databases"
              >
              </b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="cog"
                label="Middleware"
                tag="router-link"
                to="/middleware"
              ></b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="cog"
                label="Licenses"
                tag="router-link"
                to="/licenses"
              ></b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="cog"
                label="Hypervisors"
                tag="router-link"
                to="/hypervisors"
              ></b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="cog"
                label="Engineered"
                tag="router-link"
                to="/engineered"
              ></b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="cog"
                label="Systems"
                tag="router-link"
                to="/systems"
              ></b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="envelope"
                label="Notifications"
                tag="router-link"
                to="/notifications"
              ></b-menu-item>
              <b-menu-item
                icon-pack="fas"
                icon="cog"
                label="Settings"
                tag="router-link"
                to="/settings"
              ></b-menu-item>
            </b-menu-list>
          </b-menu>
        </div>
      </b-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mobile: 'reduce'
    }
  }
}
</script>

<style lang="scss">
.sidebar-page {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
  // min-height: 100vh;
  .sidebar-layout {
    display: flex;
    flex-direction: row;
    min-height: 100%;
    // min-height: 100vh;
  }
}
@media screen and (max-width: 1023px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini-mobile {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                text-align: center;
                border-radius: 0;

                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (min-width: 1024px) {
  .b-sidebar {
    .sidebar-content {
      &.is-mini {
        &:not(.is-mini-expand),
        &.is-mini-expand:not(:hover) {
          .menu-list {
            li {
              a {
                text-align: center;
                border-radius: 0;

                span:nth-child(2) {
                  display: none;
                }
              }
              ul {
                padding-left: 0;
                li {
                  a {
                    display: inline-block;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

.b-sidebar {
  .sidebar-content {
    &.is-fullheight {
      margin-top: 52px;
      max-height: calc(100vh - 132px);
      width: 60px;
      box-shadow: 1px 0px 10px 0px rgba(0, 0, 0, 0.2);
      background-color: #eee;
    }

    .menu-list {
      line-height: 1.5;

      li {
        a {
          margin: 5px;
        }
      }

      a:hover {
        background-color: lightgray;
        color: #444444;
      }
    }

    span {
      font-size: 0.9em;
      padding-left: 3px;

      &.icon.is-small {
        vertical-align: middle;
        padding-bottom: 2px;
        font-size: 1em;
        padding-left: 0;
      }
    }
  }
}
</style>
