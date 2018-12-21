<template>
  <div id="app">
    <TodoHeader />
    <TodoInput @addTodo="addTodo" />
    <TodoList
      :propsdata="sortedArray"
      @removeTodo="removeTodo"
      @changeStatus="changeStatus"
    />
    <TodoFooter @removeAll="clearAll" />
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';
import Vue from 'vue';

export default{
  components: {
    'TodoHeader': TodoHeader,
    'TodoInput': TodoInput,
    'TodoList': TodoList,
    'TodoFooter': TodoFooter
  },
  data () {
    return {
      todoItems: [{
        status: null,
        name: '',
        Created_date: '',
        _id: ''
      }]
    };
  },
  computed: {
    sortedArray: function () {
      return this.todoItems.slice().sort((a, b) => b.status - a.status);
    }
  },
  created () {
    console.log('created()');
    this.getTodo();
  },
  methods: {
    addTodo (todoItem) {
      var vm = this;
      this.$http.defaults.headers.post['Content-Type'] = 'application/json';
      this.$http.post('http://localhost:3000/tasks', {
        name: todoItem
      }).then((result) => {
        vm.todoItems.push(result.data);
      });
    },
    removeTodo (todoItem, index) {
      var vm = this;
      this.todoItems.forEach(function (_todoItem, i, obj) {
        if (_todoItem._id === todoItem._id) {
          vm.$http.delete('http://localhost:3000/tasks/' + todoItem._id).then((result) => {
            obj.splice(i, 1);
          });
        }
      });
    },
    getTodo () {
      var vm = this;
      this.$http.get('http://localhost:3000/tasks').then((result) => {
        vm.todoItems = result.data;
        console.log(result);
        console.log('getTodos()');
      });
    },
    changeStatus (todoItem, index) {
      var vm = this;
      this.$http.defaults.headers.put['Content-Type'] = 'application/json';
      this.$http.put('http://localhost:3000/tasks/' + todoItem._id, {
        status: !todoItem.status
      }).then((result) => {
        Vue.set(vm.todoItems[index], 'status', result.data.status);
        console.log(result);
      });
    },
    clearAll () {
      console.log('clearAll');
      var vm = this;
      this.$http.delete('http://localhost:3000/tasks').then((result) => {
        vm.todoItems.splice(0, vm.todoItems.length);
      });
    }
  }
};
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
