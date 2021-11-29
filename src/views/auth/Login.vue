<template>
  <section>
    <div class="login has-background-dark">
      <LocaleSwitcher dropitemPosition="is-bottom-left" isAbsolute />
      <div class="colunms">
        <div class="colunm">
          <div class="logo">
            <ErcoleLogo />
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
import LoginForm from '@/components/login/FormLogin.vue'
import ErcoleLogo from '@/components/common/ErcoleLogo.vue'
import LocaleSwitcher from '@/components/LocaleSwitcher.vue'

export default {
  components: {
    LoginForm,
    ErcoleLogo,
    LocaleSwitcher
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
