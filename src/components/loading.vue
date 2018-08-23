<style scoped lang="scss">
  .spinner {
    margin: 100px auto 0;
    width: 250px;
    height: 50px;
    text-align: center;
  }

  .spinner > div {
    width: 30px;
    height: 30px;
    background-color: #317ef3;
    border-radius: 100%;
    display: inline-block;
    animation: bouncedelay 1.4s infinite ease-in-out;
    animation-fill-mode: both;
    margin:0 10px;
  }

  .spinner .bounce1 {
    animation-delay: -0.32s;
  }

  .spinner .bounce2 {
    animation-delay: -0.16s;
  }

  @-webkit-keyframes bouncedelay {
    0%, 80%, 100% {transform: scale(0.0) }
    40% { transform: scale(1.0) }
  }

  @keyframes bouncedelay {
    0%, 80%, 100% {
      transform: scale(0.0);
    } 40% {
        transform: scale(1.0);
      }
  }
</style>
<template>
<div class="loading">
  <div class="spinner">
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
  </div>
</div>
</template>
<script>
  export default {
    props:['showloading'],
  }
</script>
