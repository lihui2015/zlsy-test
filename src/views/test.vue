<template>
  <div class="wrapper">
    <image :src="logo" class="logo" />
    <text class="greeting">The environment is ready!testteteee</text>
    
  </div>
</template>

<script>
var navigator = weex.requireModule('navigator')
export default {
  name: 'App',
  data () {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
    }
  },
  mounted(){
    // navigator.push({
    //   url: 'http://dotwe.org/raw/dist/519962541fcf6acd911986357ad9c2ed.js',
    //   animated: "true"
    // }, event => {
    //   modal.toast({ message: 'callback: ' + event })
    // })
  }
}
</script>

<style scoped>
  .wrapper {
    justify-content: center;
    align-items: center;
  }
  .logo {
    width: 424px;
    height: 200px;
  }
  .greeting {
    text-align: center;
    margin-top: 70px;
    font-size: 50px;
    color: #41B883;
  }
  .message {
    margin: 30px;
    font-size: 32px;
    color: #727272;
  }
</style>
