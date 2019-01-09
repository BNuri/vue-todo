<template>
  <section>
    <TransitionGroup
      name="list"
      tag="ul"
    >
      <li
        v-for="(todoItem) in sortedArray"
        :key="todoItem._id"
        class="shadow"
      >
        <i
          :class="[todoItem.status ? 'checkBtn fa fa-check-square' : 'checkBtn fa fa-square']"
          aria-hidden="true"
          @click="changeStatus({todoItem: todoItem})"
        />
        {{ todoItem.name }}
        <span
          class="removeBtn"
          type="button"
          @click="removeTodo(todoItem)"
        >
          <i
            class="fa fa-trash-o"
            aria-hidden="true"
          />
        </span>
      </li>
    </TransitionGroup>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
  methods: {
    removeTodo (todoItem) {
      this.$store.dispatch('removeTodo', todoItem);
    },
    changeStatus (payload) {
      this.$store.dispatch('changeStatus', payload);
    }
  },
  computed: mapGetters([
    'sortedArray'
  ])
};
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
  line-height: 53px;
  color: #62acde;
  margin-right: 5px;
}
.removeBtn{
  margin-left: auto;
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
