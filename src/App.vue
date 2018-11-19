<template>
  <div id="app">
    <TodoHeader></TodoHeader>
    <TodoInput v-on:addTodo="addTodo"></TodoInput>
    <TodoList v-bind:propsdata="todoItems" v-on:removeTodo="removeTodo" v-on:updateTodo="updateTodo"></TodoList>
    <TodoFooter v-on:removeAll="clearAll"></TodoFooter>
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue'
import TodoInput from './components/TodoInput.vue'
import TodoList from './components/TodoList.vue'
import TodoFooter from './components/TodoFooter.vue'
export default{
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  },
  data() {
    return {
      todoItems: [{
        status: [{
          0:''
        }],
        name: '',
        Created_date: '',
        _id: ''
      }]
    }
  },
  methods: {
    addTodo(todoItem) {
      var vm = this;
      this.$http.defaults.headers.post['Content-Type']='application/json';
      this.$http.post('http://localhost:3000/tasks',{
        name:todoItem
      }).then((result) => {
        vm.todoItems.push(result.data);
      })
    },
    removeTodo(todoItem, index) {
      var vm = this;
      this.todoItems.forEach(function(_todoItem, i, obj){
        if(_todoItem._id === todoItem._id){
          vm.$http.delete('http://localhost:3000/tasks/' + todoItem._id).then((result) => {
            obj.splice(i, 1);
          })
        }
      })
    },
    getTodos(){
      var vm = this;
      this.$http.get('http://localhost:3000/tasks').then((result) => {
        vm.todoItems = result.data;
        console.log(result);
        console.log('getTodos()');
      })
    }
  },
  created(){
    console.log('created()');
    this.getTodos();
  }
}
</script>

<style>
body{
  text-align: center;
  background-color: #F6F6F8;
}
input{
  border-style: groove;
  width: 200px;
}
button{
  border-style: groove;
}
.shadow{
  box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.03)
}
</style>
