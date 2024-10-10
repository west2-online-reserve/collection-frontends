<!-- Register.vue -->
<template>
  <form @submit.prevent="register">
    <input v-model="username" placeholder="Username" />
    <input v-model="password" type="password" placeholder="Password" />
    <input v-model="email" placeholder="Email" />
    <button type="submit">Register</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      email: ''
    };
  },
  methods: {
    register() {
      
    }
  }
};
</script>
