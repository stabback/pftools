<template>
  <div>
    <draggable 
      v-model="myArray" 
      :options="{group:'people'}" 
      @start="drag=true" 
      @end="drag=false">
      <div 
        v-for="element in myArray" 
        :key="element.id">{{ element.name }}</div>
    </draggable>
    {{ JSON.stringify(myArray) }}
  </div>
</template>

<script>
import Draggable from 'vuedraggable'

export default {
  components: {
    Draggable
  },
  data () {
    return {
      myArray: [
        {id: 4, name: 'Four'},
        {id: 3, name: 'Three'},
        {id: 2, name: 'Two'},
        {id: 1, name: 'One'},
      ]
    }
  }
}
</script>

<style>

</style>
