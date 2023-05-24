<template>
  <div class="input-wrap">
    <label v-if="label">{{ label }}</label>
    <select v-model="selectedValue" @input="$emit('update:selectedValue', $event.target.value)" v-bind="$attrs">
      <option v-for="(upjilas, jilla) in jillaUpjilaMap" :key="jilla" :value="jilla">{{ jilla }}</option>
    </select>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  jillaUpjilaMap: {
    type: Object,
    required: true,
  },
  selectedValue: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped>
.input-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.2s;
  margin-top: 20px;

  &:hover {
    transform: scale(1.05);
  }

  select {
    padding: 8px 12px;
    font-size: 16px;
    width: 50%;
    border: 2px solid #ccc;
    border-radius: 4px;
    transition: 0.2s;
    margin-left: 15px;

    &:focus {
      outline: none;
      border-color: dodgerblue;
      box-shadow: 0 0 5px dodgerblue;
    }
  }

  label {
    width: 40px;
    font-weight: bold;
    margin-right: 10px;
  }
}
</style>
