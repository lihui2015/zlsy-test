<template>
  <div class="wrapper">
    <image :src="logo" class="logo" />
    <text class="greeting">The environment is ready!</text>
    <HelloWorld/>
    <text class="test" @click="jumpTo('file://assets/views/test.js')">test</text>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import buiweex from './buiweex'
var navigator = weex.requireModule('navigator')
export default {
  name: 'App',
  components: {
    HelloWorld
  },
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
  },
  methods: {
    jumpTo (file) {
      console.log(buiweex);
      var _url = buiweex.getContextPath() + "/" + file;
      console.log(_url);
      buiweex.push(_url);
      // navigator.push({
      //   url: _url,
      //   animated: "true"
      // })
    }
  }
}
</script>

<style scoped>
  .test{
    width: 200px;
    height: 100px;
    font-size: 34px;
  }
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
