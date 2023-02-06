<template>
  <div class="error-page">
    <p class="error-code">{{ code }}</p>
    <p class="error-code-text">{{ codeText }}</p>
    <p class="error-code-desc">
      {{ codeDesc }}
    </p>
    <slot name="actions" />
  </div>
</template>

<script>
export default {
  name: 'commom-errorcode-component',
  props: {
    code: {
      type: String,
      required: true,
    },
    codeText: {
      type: String,
      required: true,
    },
    codeDesc: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: calc(100vh - 200px);
  padding: 30px;
  text-align: center;

  .error-code {
    color: #4a4a4a;
    font-size: 170px;
  }

  .error-code-text {
    color: #3b3c40;
    font-size: 20px;
    font-weight: bold;
  }

  .error-code-desc {
    color: #525254;
    font-size: 17px;
    text-transform: uppercase;
    margin-bottom: 40px;
  }
}
</style>
