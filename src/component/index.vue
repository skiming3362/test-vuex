<template>
  <div>
      <el-button type="primary" @click="add({ amount: 10 })">+</el-button>
      <div>{{ 'count ' + count }}</div>
      <div>{{ 'localCount ' + localCount }}</div>
      <div>{{ 'countPlusLocalState ' + countPlusLocalState }}</div>
      <div>{{ 'localCount2 ' + localCount2 }}</div>
      <div>{{ 'doneCount ' + doneCount }}</div>
      <div>{{ 'doneTodos ' + JSON.stringify(doneTodos) }}</div>
      <div>{{ 'getTodoById(2) ' + JSON.stringify(getTodoById(2)) }}</div>
  </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { mapGetters } from 'vuex'
    import { mapMutations } from 'vuex'

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
            }),
            ...mapGetters({
                doneCount: 'doneTodosCount',
                doneTodos: 'doneTodos',
                getTodoById: 'getTodoById'
            })
        },
        methods: {
            ...mapMutations({
                add: 'INCREMENT'
            })
        }

    }
</script>