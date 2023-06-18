<template>
    <div>
        <div class="input-wrap">
            <label for="id">F'ID:</label>
            <select v-model="selectedId" @change="loadSelectedFarmerData">
                <option value="">Select ID</option>
                <option v-for="farmer in farmerData" :key="farmer.id" :value="farmer.id">{{ farmer.id }}</option>
            </select>
        </div>
        <InputComponent v-model="farmersName" type="text" :label="'Name'" class="base-input" />
        <InputComponent v-model="mobileNo" type="text" :label="'Mobile No'" class="base-input" />
        <InputComponent v-model="tobacoType" type="text" :label="'Tobacco Type'" class="base-input" />
        <InputComponent v-model="baleQuantity" type="text" :label="'Bale Quantity'" class="base-input" />
        <InputComponent type="submit" @submit="submitForm">Submit</InputComponent>
    </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';
import InputComponent from './InputComponent.vue';
import { calculateExpiryDate } from '../function/calculateExpiryDate';
import loadFarmerData from '../function/loadFarmerData';
import loadTransportPermit from '../function/loadTransportPermit';

const farmersName = ref('');
const mobileNo = ref('');
const baleQuantity = ref('');
const selectedId = ref('');
const farmerData = ref([]);
const farmerJilla = ref('')
const farmerUpjilla = ref('')
const tobacoType = ref('')
const buyingCenter = ref('')

const currentDate = new Date();
const buyingDate = ref(currentDate.toISOString().slice(0, 10))
const expiryDate = ref(calculateExpiryDate(currentDate))

const loadSelectedFarmerData = () => {
  loadFarmerData(farmerData.value, selectedId.value, farmersName, mobileNo,farmerJilla,farmerUpjilla);
};
const submitForm = (event) => {
  event.preventDefault();

  const data = {
    id: selectedId.value,
    farmersName: farmersName.value,
    mobileNo: mobileNo.value,
    baleQuantity: baleQuantity.value,
    buyingDate: buyingDate.value,
    expiryDate: expiryDate.value,
    farmerJilla: farmerJilla.value,
    farmerUpjilla: farmerUpjilla.value,
    buyingCenter: buyingCenter.value,
    type: tobacoType.value
  };

  fetch('http://localhost:5001/transport-permit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => {
      console.log('Data successfully pushed to the database:', result);
      // Handle the response from the server if needed
    })
    .catch(error => {
      console.error('Error pushing data to the database:', error);
      // Handle any errors that occurred during the request
    });

  // Reset the form fields after submission
  selectedId.value = '';
  farmersName.value = '';
  mobileNo.value = '';
  baleQuantity.value = '';
  buyingCenter.value='',
  tobacoType.value='';
  event.target.reset();
};

onMounted(loadTransportPermit(farmerData));
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
  