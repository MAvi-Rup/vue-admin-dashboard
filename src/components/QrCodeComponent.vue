<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>Farmer Name</th>
          <th>Phone No</th>
          <th>Bale Quantity</th>
          <th>Jilla</th>
          <th>Upajilla</th>
          <th>Buying Center</th>
          <th>Tobacco Type</th>
          <th>Action</th>
          <th>Print</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="farmer in transportPermit" :key="farmer._id">
          <td>{{ farmer.farmersName }}</td>
          <td>{{ farmer.mobileNo }}</td>
          <td>{{ farmer.baleQuantity }}</td>
          <td>{{ farmer.farmerJilla }}</td>
          <td>{{ farmer.farmerUpjilla }}</td>
          <td>{{ farmer.buyingCenter }}</td>
          <td style="color: brown;">{{ farmer.type }}</td>
          <td>
            <button @click="printQrCode(farmer._id)" class="view-button">Print QrCode</button>
          </td>
          <td>
            <button @click="printTransportPermit(farmer._id)" class="view-button">Print TP</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import { ref, onMounted } from 'vue';

import router from '../router';
import loadTransportPermit from '../function/loadTransportPermit';

const transportPermit = ref([]);

onMounted(loadTransportPermit(transportPermit));

const printQrCode = (id) => {
  // Navigate to the dynamic ID-based route
  console.log(`/all-farmers/${id}`);
}
const printTransportPermit = (id) => {
  // Navigate to the dynamic ID-based route
  console.log(`/all-farmers/${id}`);
}
</script>
  
<style scoped lang="scss">
.table-container {
  overflow-x: auto;
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead th {
  background-color: #a7e6b5;
  font-weight: bold;
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tbody td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

tbody tr:hover td {
  background-color: #d9f5db;
  color: black;
}

.view-button {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .table-container {
    overflow-y: auto;
  }
}
</style>