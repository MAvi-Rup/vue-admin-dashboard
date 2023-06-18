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
            <button @click="printQrCode(farmer._id,farmer.farmersName)" class="view-button">Print QrCode</button>
            
          </td>
          <td>
            <button @click="() => printTransportPermit(farmer._id)" class="view-button">Print TP</button>
            <iframe ref="printFrame" style="display: none;"></iframe>

          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCode from 'qrcode';
import loadTransportPermit from '../function/loadTransportPermit';
import printTransportPermitData from '../function/printTransportPermit';
import printQrCodeValue from '../function/printQrCodeValue';


const transportPermit = ref([]);
const employeeData = ref(null);

onMounted(async () => {
  await loadTransportPermit(transportPermit);
});

const printQrCode = async (id, name) => {
  // Generate the QR code value by combining the id and name
  const qrCodeValue = `${id} - ${name}`;

  try {
    // Generate the QR code image data URL
    const qrCodeDataURL = await QRCode.toDataURL(qrCodeValue);
    printQrCodeValue(qrCodeDataURL)
    
  } catch (error) {
    console.error('Error generating QR code:', error);
  }
};

const printTransportPermit= async (id) => {
  try {
    const response = await fetch(`http://localhost:5001/transport-permit/${id}`) // Replace with your actual API endpoint
    employeeData.value = await response.json();
    console.log(employeeData)
    printTransportPermitData(employeeData);
  } catch (error) {
    console.error('Error fetching employee data:', error);
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