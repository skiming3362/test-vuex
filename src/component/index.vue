<template>
  <div>
      <el-button type="primary" @click="increment">+</el-button>
      <span>{{ count }}</span>
  </div>
</template>
<script>
    export default {
        data () {
            return {
                
            }
        },
        computed: {
            count () {
                return this.$store.state.count
            }
        },
        methods: {
            increment () {
                this.$store.commit('increment')
            }
        }

    }
</script>