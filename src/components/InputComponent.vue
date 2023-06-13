<template>
  <form class="input-wrap">
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </form>
</template>

<script setup>
defineProps({
  label: {
    type: [String, Boolean],
    default: false,
  },
  modelValue: {
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

  

  input {
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

  .label {
    width: 40px;
    font-weight: bold;
    margin-right: 10px;
  }

  input[type="submit"] {
    padding: 10px 20px;
    width: 25%;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: dodgerblue;
    color: white;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  input[type="submit"]:hover {
    background-color: deepskyblue;
  }
}
</style>
