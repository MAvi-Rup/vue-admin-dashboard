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
          <th>Print QrCode</th>
          <th>Print TP</th>
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
            <button @click="() => getPrintObj(farmer._id)" class="view-button">Print TP</button>

          </td>
        </tr>
      </tbody>
    </table>

    <!-- Hidden div for printable content -->
    <div ref="printableContent" style="display: none;">
      <h2 style="text-align: center;">Virgo Tobaco Limited</h2>
      <h3 style="text-align: center;">Transport Permit (TP)</h3>
      <div style="display: flex;">
        <div style="width: 33.33%;">
          <p>Farmers Name: {{ transportPermitData ? transportPermitData.farmersName : 'Loading...' }}</p>
          <p>Fathers Name: {{ transportPermitData ? transportPermitData.fathersName : '' }}</p>
          <p>Village: {{ transportPermitData ? transportPermitData.village : '' }}</p>
          <p>Thana: {{ transportPermitData ? transportPermitData.thana : '' }}</p>
          <p>Zilla: {{ transportPermitData ? transportPermitData.zilla : '' }}</p>
        </div>
        <div style="width: 33.33%;">
          <img src="https://i.ibb.co/yq7hVy8/maskable-icon.png" style="display: block; margin: 0 auto;" width="100">
        </div>
        <div style="width: 33.33%;">
          <p>Buying Date: {{ transportPermitData ? transportPermitData.buyingDate : '' }}</p>
          <p>Expiry Date: {{ transportPermitData ? transportPermitData.expiryDate : '' }}</p>
          <p>Buying Center: {{ transportPermitData ? transportPermitData.buyingCenter : '' }}</p>
          <p>Tobaco Type: {{ transportPermitData ? transportPermitData.type : '' }}</p>
          <p>Bale Quantity: {{ transportPermitData ? transportPermitData.baleQuantity : '' }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import printJS from 'print-js';
import router from '../router';
import loadTransportPermit from '../function/loadTransportPermit';
import loadTransportPermitDetail from '../function/loadTransportPermitDetail';

const transportPermit = ref([]);
const transportPermitData = ref({});
const printableContent = ref(null);

onMounted(async () => {
  await loadTransportPermit(transportPermit);
});

const printQrCode = (id) => {
  // Implement your QR code printing logic here
  console.log(id)
};

const getPrintObj = (id) => {
  return {
    id: `printableContent_${id}`,
    popTitle: 'Transport Permit',
    extraHead: '<meta http-equiv="Content-Language" content="en" />',
    beforeOpenCallback(vue) {
      transportPermitData.value = loadTransportPermitDetail(id);
      vue.$nextTick(() => {
        printTp(`printableContent_${id}`);
      });
    },
    openCallback(vue) {
      console.log('Executing print');
    },
    closeCallback() {
      console.log('Print tool closed');
    }
  };
};

const printTp = (elementId) => {
  const element = document.getElementById(elementId);
  if (element) {
    printJS({
      printable: element.innerHTML,
      type: 'html',
      documentTitle: 'Transport Permit',
      targetStyles: ['*']
    });
  }
};
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