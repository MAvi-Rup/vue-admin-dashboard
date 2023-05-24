<template>
  <main id="Home-page">
    <h1>Farmer's Registration Page</h1>
    <InputComponent v-model="farmersName" type="text" :label="'Name'" class="base-input" />
    <InputComponent v-model="fatherName" type="text" :label="'Father Name'" class="base-input" />
   <div class="input-wrap">
      <label for="gilla">Gilla:</label>
      <select v-model="selectedGilla" class="base-input" @change="updateUpjillaOptions" id="gilla">
        <option v-for="gilla in gillaOptions" :key="gilla.value" :value="gilla.value">{{ gilla.label }}</option>
      </select>
    </div>
    <div class="input-wrap">
      <label for="upjilla">Upjilla:</label>
      <select v-model="selectedUpjilla" class="base-input" id="upjilla">
        <option v-for="upjilla in upjillaOptions" :key="upjilla.value" :value="upjilla.value">{{ upjilla.label }}</option>
      </select>
    </div>
    <InputComponent v-model="village" type="text" :label="'Village'" class="base-input" />
    <InputComponent v-model="nid" type="number" :label="'NID'" class="base-input" />
    <InputComponent v-model="mobileNo" type="number" :label="'Mobile Number'" class="base-input" />
    <InputComponent v-model="location" type="number" :label="'Location'" class="base-input" />
    <InputComponent v-model="plantation" type="text" :label="'Plantation'" class="base-input" />
    <InputComponent v-model="target" type="text" :label="'Target'" class="base-input" />
    <InputComponent v-model="accountNo" type="number" :label="'Account Number'" class="base-input" />
    <InputComponent v-model="bankName" type="text" :label="'Bank Name'" class="base-input" />
    <InputComponent v-model="branch" type="text" :label="'Branch'" class="base-input" />
    <InputComponent v-model="routingNo" type="number" :label="'Routing Number'" class="base-input" />
    <InputComponent v-model="farmerPic" type="file" :label="'Farmer Picture'" class="base-input" />
    <InputComponent type="submit" @submit="submitForm">Submit</InputComponent>
  </main>
</template>

<script setup>
import SelectComponent from '../components/SelectComponent.vue';
import InputComponent from '../components/InputComponent.vue';
import { ref, watch } from 'vue';




const farmersName = ref('');
const fatherName = ref('');
const village = ref('');
const nid = ref('');
const mobileNo = ref('');
const location = ref('');
const plantation = ref('');
const target = ref('');
const accountNo = ref('');
const bankName = ref('');
const branch = ref('');
const routingNo = ref('');
const farmerPic = ref('');
const selectedGilla = ref('');
const selectedUpjilla = ref('');

const jillaUpjilaMap = {
  Chittagong: ["CTGUpjila1", "CTGUpjila2", "CTGUpjila3"],
  Rajshahi: ["RAJUpjila4", "RAJUpjila5"],
  Kustia: ["KUUpjila6", "KUUpjila7"],
  Manikgonj: ["MKUpjila8", "MKUpjila9", "MkUpjila10"]
};

const upjillaOptions = ref([]);
const gillaOptions = ref(Object.keys(jillaUpjilaMap).map(jilla => ({ label: jilla, value: jilla })));

const updateUpjillaOptions = () => {
  const selectedJillaValue = selectedGilla.value;
  if (selectedJillaValue && jillaUpjilaMap.hasOwnProperty(selectedJillaValue)) {
    upjillaOptions.value = jillaUpjilaMap[selectedJillaValue].map(upjilla => ({ label: upjilla, value: upjilla }));
  } else {
    upjillaOptions.value = [];
  }
};

watch(selectedGilla, updateUpjillaOptions);
// Form Submit Function
const submitForm = (event) => {
    event.preventDefault();
    
  console.log({
    farmersName: farmersName.value,
    fatherName: fatherName.value,
    village: village.value,
    nid: nid.value,
    mobileNo: mobileNo.value,
    location: location.value,
    plantation: plantation.value,
    target: target.value,
    accountNo: accountNo.value,
    bankName: bankName.value,
    branch: branch.value,
    routingNo: routingNo.value,
    farmerPic: farmerPic.value,
    selectedGilla: selectedGilla.value,
    selectedUpjilla: selectedUpjilla.value,
  });

  // Clear the form data after submission
  clearFormData();
};

const clearFormData = () => {
  farmersName.value = '';
  fatherName.value = '';
  village.value = '';
  nid.value = '';
  mobileNo.value = '';
  location.value = '';
  plantation.value = '';
  target.value = '';
  accountNo.value = '';
  bankName.value = '';
  branch.value = '';
  routingNo.value = '';
  farmerPic.value = '';
  selectedGilla.value = '';
  selectedUpjilla.value = '';
};
</script>



<style lang="scss" scoped>
h1{
    text-align: center;
}
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
   
    margin-right: 10px;
  }
}

</style>