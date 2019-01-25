<template>
  <div>
      user
       <ProductList/>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { mapState, mapActions } from 'vuex'

import ProductList from './ProductList.vue'

@Component
export default class User extends Vue {

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
