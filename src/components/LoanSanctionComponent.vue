<template>
  <div>
    <div class="input-wrap">
      <label for="id">F'ID:</label>
      <select v-model="selectedId" @change="loadSelectedFarmerData">
        <option value="">Select ID</option>
        <option v-for="farmer in farmerData" :key="farmer.id" :value="farmer.id">
          {{ farmer.id }}
        </option>
      </select>
    </div>
    <InputComponent
      v-model="farmersName"
      type="text"
      :label="'Name'"
      class="base-input"
    />
    <InputComponent
      v-model="mobileNo"
      type="text"
      :label="'Mobile No'"
      class="base-input"
    />

    <div v-for="(item, index) in items" :key="index">
      <div class="input-wrap">
        <label for="product">Select Product:</label>
        <select
          v-model="item.accessory"
          @change="handleAccessoryChange(index, item.accessory)"
        >
          <option value="">Select Accessory</option>
          <option
            v-for="accessory in accessories"
            :key="accessory.name"
            :value="accessory.name"
          >
            {{ accessory.name }} ({{ accessory.price }} Tk.)
          </option>
        </select>
      </div>
      <div class="input-wrap">
        <label for="price">Quantity:</label>
        <input
          class="input_number"
          type="number"
          min="1"
          step="1"
          v-model.number="item.unit"
          @input="handleUnitChange(index, item.unit)"
        />
      </div>
      <button @click="removeItem(index)">Remove</button>
    </div>

    <button type="button" @click="addItem">
      <span class="material-icons">add</span>
    </button>
    <p>Total: {{ total }} Tk.</p>
    <button type="submit">Submit</button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import InputComponent from "./InputComponent.vue";
import { calculateExpiryDate } from "../function/calculateExpiryDate";
import loadFarmerData from "../function/loadFarmerData";
import loadTransportPermit from "../function/loadTransportPermit";
import axios from "axios";

const farmersName = ref("");
const mobileNo = ref("");
const selectedId = ref("");
const farmerData = ref([]);

const items = ref([{ accessory: "", unit: 1 }]);
const accessories = ref([]);

const addItem = () => {
  items.value.push({ accessory: "", unit: 1 });
};

const removeItem = (index) => {
  items.value.splice(index, 1);
};

const handleAccessoryChange = (index, value) => {
  items.value[index].accessory = value;
};

const handleUnitChange = (index, value) => {
  items.value[index].unit = value;
};

const total = computed(() => {
  return items.value.reduce((acc, item) => {
    const accessory = accessories.value.find((a) => a.name === item.accessory);
    const price = accessory ? accessory.price : 0;
    return acc + price * item.unit;
  }, 0);
});

const formSubmit = (totalLoan) => {
  console.log(totalLoan);
  const data = { items: items.value, total: total.value };
  console.log(data.items);
  items.value = [{ accessory: "", unit: 1 }];
};

const loadSelectedFarmerData = () => {
  loadFarmerData(farmerData.value, selectedId.value, farmersName, mobileNo);
};

const loadAccessories = async () => {
  try {
    const response = await axios.get("http://localhost:5001/products");
    accessories.value = response.data;
  } catch (error) {
    console.error("Error fetching accessories:", error);
  }
};

onMounted(loadTransportPermit(farmerData), loadAccessories());
</script>

<style lang="scss" scoped>
.input-wrap {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-top: 20px;

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

  label {
    width: 40px;

    margin-right: 10px;
  }
}

label {
  width: 40px;

  margin-right: 10px;
}
</style>
