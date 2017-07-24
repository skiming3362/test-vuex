<template>
  <div>
      <el-button type="primary" @click="increment">+</el-button>
      <span>{{ count }}</span>
      <span>{{ countPlusLocalState }}</span>
      <span>{{ localCount2 }}</span>
  </div>
</template>
<script>
    import { mapState } from 'vuex'

    export default {
        data () {
            return {
                localCount: 233
            }
        },
        computed: {
            localCount2 () {
                return 123
            },
            ...mapState({
                count: 'count',
                countPlusLocalState (state) {
                    return state.count + this.localCount
                }
            })
        },
        methods: {
            increment () {
                this.$store.commit('increment')
            }
        }

    }
</script>