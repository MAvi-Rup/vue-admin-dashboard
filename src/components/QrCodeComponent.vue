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
            <button @click="printTransportPermit(farmer._id)" class="view-button">Print TP</button>
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
          <p v-if="transportPermitData">Farmers Name: {{ transportPermitData ? transportPermitData.farmersName : 'Loading...' }}</p>
          <p v-if="transportPermitData">Fathers Name: {{ transportPermitData.fathersName }}</p>
          <p v-if="transportPermitData">Village: {{ transportPermitData.village }}</p>
          <p v-if="transportPermitData">Thana: {{ transportPermitData.thana }}</p>
          <p v-if="transportPermitData">Zilla: {{ transportPermitData.zilla }}</p>
        </div>
        <div style="width: 33.33%;">
          <img src="https://i.ibb.co/yq7hVy8/maskable-icon.png" style="display: block; margin: 0 auto;" width="100">
        </div>
        <div style="width: 33.33%;">
          <p v-if="transportPermitData">Buying Date: {{ transportPermitData.buyingDate }}</p>
          <p v-if="transportPermitData">Expiry Date: {{ transportPermitData.expiryDate }}</p>
          <p v-if="transportPermitData">Buying Center: {{ transportPermitData.buyingCenter }}</p>
          <p v-if="transportPermitData">Tobaco Type: {{ transportPermitData.type }}</p>
          <p v-if="transportPermitData">Bale Quantity: {{ transportPermitData.baleQuantity }}</p>
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
const farmerData = ref(null);
const transportPermit = ref([]);
const transportPermitData = ref({});
const printableContent = ref(null);

onMounted(async () => {
  await loadTransportPermit(transportPermit);
});

const printQrCode = (id) => {
  // Implement your QR code printing logic here
};

const printTransportPermit =async (id) => {
  try {
    transportPermitData.value = await loadTransportPermitDetail(id);
    console.log(transportPermitData);

    if (transportPermitData.farmersName!== '' && printableContent.value) {
      printTp();
    }
  } catch (err) {
    console.error(err);
  }
}

  const printTp = () => {
  try {
    if (printableContent.value) {
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);

      const iframeDocument = iframe.contentDocument;
      iframeDocument.open();
      iframeDocument.write(printableContent.value.innerHTML);
      iframeDocument.close();

      iframe.contentWindow.onload = () => {
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
      };
    }
  } catch (error) {
    console.error(error);
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