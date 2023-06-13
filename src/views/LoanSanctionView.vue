<template>
  <div>
    <button @click="printEmployeeData">Print Employee Data</button>
  </div>
</template>


<script setup>
import { ref } from 'vue';

const employeeData = ref(null);

const printEmployeeData = async () => {
  try {
    const response = await fetch(`http://localhost:5001/transport-permit/6485acad6f910cdf1034ca68`); // Replace with your actual API endpoint
    employeeData.value = await response.json();
    printData();
  } catch (error) {
    console.error('Error fetching employee data:', error);
  }
};

const printData = () => {
  const printDocument = document.createElement('div');
  printDocument.innerHTML = `
    <html>
      <head>
        <style>
          @media print {
            #print-template {
              display: grid;
              grid-template-columns: 33.33% 33.33% 33.33%;
              justify-content: center;
            }
            .header {
              text-align: center;
            }
            .content {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              gap: 10px;
            }
            .middle-column {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        </style>
      </head>
      <body>
        <div id="print-template">
          <div class="header">
            <h1>Virgo Tobaco Limited</h1>
            <h2>Transport Permit (TP)</h2>
          </div>
          <div class="content">
            <div class="left-column">
              <h3>Farmer's ID: ${employeeData.value.id}</h3>
              <h3>Farmer's Name: ${employeeData.value.farmersName}</h3>
              <h3>Mobile Number: ${employeeData.value.mobileNo}</h3>
              <h3>Zilla: ${employeeData.value.farmerJilla}</h3>
              <h3>UpZilla: ${employeeData.value.farmerUpjilla}</h3>
            </div>
            <div class="middle-column">
              <img src="${employeeData.value.imageURL}" alt="Employee Image">
            </div>
            <div class="right-column">
              <h3>Buying Center: ${employeeData.value.buyingCenter}</h3>
              <h3>Buying Date: ${employeeData.value.buyingDate}</h3>
              <h3>Expiry Date: ${employeeData.value.expiryDate}</h3>
              <h3>Tobacco Type: ${employeeData.value.type}</h3>
              <h3>Bale Quantity: ${employeeData.value.baleQuantity}</h3>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;

  const printWindow = window;
  printWindow.document.write(printDocument.innerHTML);
  printWindow.document.close();
  printWindow.print();
};
</script>





<style lang="scss" scoped>
h1{
    text-align: center;
}

</style>