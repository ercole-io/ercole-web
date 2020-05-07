<template>
  <section>
    <PageTitle :pageTitle="$t('dashboard.pageTitle.notificatons')" />

    <div class="notifications">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Agents</p>
        </header>
        <div class="card-content is-size-7">
          <div class="is-flex">
            <span>Total hosts:</span>
            <span class="has-text-weight-bold">15.846</span>
          </div>
          <div class="is-flex">
            <span>Agents that are stopped:</span>
            <span class="has-text-weight-bold">22 (from 540,in.)</span>
          </div>
        </div>
        <footer class="card-footer">
          <b-button href="#" class="is-small is-primary is-radiusless" expanded>
            Inspect
          </b-button>
        </footer>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Licenses</p>
        </header>
        <div class="card-content is-size-7">
          <div>
            <span class="is-size-5 is-pulled-left">
              <b-icon type="is-info" pack="fas" icon="exclamation"></b-icon>
            </span>
            <p style="margin-left: 20px">
              Enterprise Data Quality Real-Time Processing for Data Integration
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <b-button href="#" class="is-small is-primary is-radiusless" expanded>
            View
          </b-button>
          <b-button href="#" class="is-small is-primary is-radiusless" expanded>
            Close
          </b-button>
        </footer>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">System</p>
        </header>
        <div class="card-content is-size-7">
          <div>
            <span class="is-size-5 is-pulled-left">
              <b-icon
                type="is-warning"
                pack="fas"
                icon="exclamation-triangle"
              ></b-icon>
            </span>
            <p style="margin-left: 35px">
              Management Pack for Oracle Data Integrator
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <b-button href="#" class="is-small is-primary is-radiusless" expanded>
            View
          </b-button>
          <b-button href="#" class="is-small is-primary is-radiusless" expanded>
            Close
          </b-button>
        </footer>
      </div>
    </div>
  </section>
</template>

<script>
import PageTitle from '../Common/PageTitle'

export default {
  components: {
    PageTitle
  }
}
</script>

<style lang="scss" scoped>
.notifications {
  padding: 1rem;

  .card-content {
    padding-top: 0;

    div {
      justify-content: space-between;
    }
  }
}

.card {
  margin-bottom: 20px;
}
</style>
