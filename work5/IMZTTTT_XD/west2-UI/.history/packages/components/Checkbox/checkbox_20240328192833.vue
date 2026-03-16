<template>
  <label>
    <input type="checkbox" :checked="isChecked" :disabled="isDisabled" @change="handleChange" />
    <slot>{{ label }}</slot>
  </label>
</template>

<script setup lang="ts"></script>
