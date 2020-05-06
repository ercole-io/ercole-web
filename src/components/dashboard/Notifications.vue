<template>
  <section>
    <PageTitle :pageTitle="$t('dashboard.pageTitle.notificatons')" />

    <div style="padding: 1rem">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Agents</p>
        </header>
        <div class="card-content is-size-7" style="padding-top: 0;">
          <div class="is-flex" style="justify-content: space-between;">
            <span>Total hosts:</span>
            <span class="has-text-weight-bold">15.846</span>
          </div>
          <div class="is-flex" style="justify-content: space-between;">
            <span>Agents that are stopped:</span>
            <span class="has-text-weight-bold">22 (from 540,in.)</span>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">Inspect</a>
        </footer>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Licenses</p>
        </header>
        <div class="card-content is-size-7" style="padding-top: 0;">
          <div>
            <span class="is-size-5 has-text-info is-pulled-left">
              <i class="fas fa-exclamation"></i>
            </span>
            <p style="margin-left: 20px">
              Enterprise Data Quality Real-Time Processing for Data Integration
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">View</a>
          <a href="#" class="card-footer-item">Close</a>
        </footer>
      </div>

      <div class="card">
        <header class="card-header">
          <p class="card-header-title">System</p>
        </header>
        <div class="card-content is-size-7" style="padding-top: 0;">
          <div>
            <span class="is-size-5 has-text-warning is-pulled-left">
              <i class="fas fa-exclamation-triangle"></i>
            </span>
            <p style="margin-left: 35px">
              Management Pack for Oracle Data Integrator
            </p>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">View</a>
          <a href="#" class="card-footer-item">Close</a>
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
.card {
  margin-bottom: 20px;
}
</style>
