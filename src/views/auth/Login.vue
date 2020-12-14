<template>
  <section>
    <div class="login has-background-dark">
      <div class="colunms">
        <div class="colunm">
          <div class="logo">
            <img src="@/assets/images/ercole-logo.png" alt="Ercole" />
          </div>
        </div>
        <div class="colunm">
          <LoginForm />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LoginForm from '@/components/login/form.vue'

export default {
  components: {
    LoginForm
  }
}
</script>

<style lang="scss" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;

  .logo {
    text-align: center;
    margin-bottom: 1.5rem;

    img {
      width: 20rem;
    }
  }
}
</style>
