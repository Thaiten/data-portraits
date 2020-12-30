<template>
  <div>
    <h1>Nachrichten Analyse</h1>
    <random-word-selection :list="list" />
  </div>
</template>

<script>
import filteredList from '@/assets/filteredList.json'
import randomWordSelection from "@/components/randomWordSelection"

export default {
  name: 'App',
  components: {
    "random-word-selection": randomWordSelection
  },
  data(){
    return({
      list: filteredList,
    })
  },
  mounted () {
    document.body.classList.add('quiz')
  },
  unmounted () {
    document.body.classList.remove('quiz')
  },
}
</script>

<style>

</style>
