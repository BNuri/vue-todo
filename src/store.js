import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import 'es6-promise/auto';

Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todoItems: [{
      status: null,
      name: '',
      Created_date: '',
      _id: ''
    }]
  },
  getters: {
    sortedArray: state => {
      return state.todoItems.slice().sort((a, b) => b.status - a.status);
    }
  },
  mutations: {
    addTodo: function (state, payload) {
      state.todoItems.push(payload);
    },
    removeTodo: function (state, id) {
      state.todoItems.splice((state.todoItems.findIndex(i => i._id === id)), 1);
    },
    getTodo: function (state, payload) {
      state.todoItems = payload;
    },
    changeStatus: function (state, payload) {
      Vue.set(store.state.todoItems.find(function (n) { return n._id === payload.id; }), 'status', payload.status);
    },
    clearAll: function (state) {
      state.todoItems.splice(0, store.state.todoItems.length);
    }
  },
  actions: {
    addTodo: function (context, todoItem) {
      axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.post('http://localhost:3000/tasks', {
        name: todoItem
      }).then((result) => {
        context.commit('addTodo', result.data);
      });
    },
    removeTodo: function (context, todoItem) {
      store.state.todoItems.forEach(function (_todoItem, i, obj) {
        if (_todoItem._id === todoItem._id) {
          axios.delete('http://localhost:3000/tasks/' + todoItem._id).then((result) => {
            console.log(todoItem._id);
            context.commit('removeTodo', todoItem._id);
          });
        }
      });
    },
    getTodo: function (context) {
      axios.get('http://localhost:3000/tasks').then((result) => {
        context.commit('getTodo', result.data);
      });
    },
    changeStatus: function (context, payload) {
      axios.defaults.headers.put['Content-Type'] = 'application/json';
      axios.put('http://localhost:3000/tasks/' + payload.todoItem._id, {
        status: !payload.todoItem.status
      }).then((result) => {
        context.commit('changeStatus', { id: result.data._id, status: result.data.status });
      });
    },
    clearAll: function (context) {
      axios.delete('http://localhost:3000/tasks').then((result) => {
        context.commit('clearAll');
      });
    }
  }
});
