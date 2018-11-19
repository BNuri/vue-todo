<template>
  <section>
    <transition-group name="list" tag="ul">
      <li v-for="(todoItem, index) in propsdata" :key="todoItem._id" class="shadow">
        <i class="checkBtn fa fa-square" aria-hidden="true"></i>
        {{todoItem.name}}
        <span class="removeBtn" type="button" @click="removeTodo(todoItem)">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </span>
      </li>
    </transition-group>
  </section>
</template>

<script>
import Modal from './common/Modal.vue'

export default{
  props: ['propsdata'],
  methods: {
    removeTodo(todoItem) {
      this.$emit('removeTodo', todoItem);
    },
    updateTodo(todoItem) {

      this.$emit('updateTodo', todoItem);
    }
  },
}
</script>

<style>
ul {
  list-style-type: none;
  padding-left: 0px;
  margin-top: 0;
  text-align: left;
}
li {
  display: flex;
  min-height: 50px;
  height: 50px;
  line-height: 50px;
  margin: 0.5rem 0;
  padding: 0 0.9rem;
  background: white;
  border-radius: 5px;
}
.checkBtn {
  line-height: 45px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn{
  position: absolute;
  right: 15px;
  color: #de4343;
}
.updateBtn {
  position: absolute;
  right: 35px;
  color: #ABB2B9;
}
.list-item {
  display: inline-block;
  margin-right: 10px;
}
.list-move {
  transition: transform 1s;
}
.list-enter-active, .list-leave-active {
  transition: all 1s;
}
.list-enter, .list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
