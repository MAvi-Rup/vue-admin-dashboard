<template>
  <div class="scanner-container">
    <div id="qr-code-scanner" v-if="showScanner">
      <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" />
    </div>
    <div
      class="scanner-button"
      v-if="!showScanner"
      @click="toggleScanner"
    >
      <span class="material-icons">qr_code_scanner</span>
    </div>
    <div
      class="close-button"
      v-else
      @click="toggleScanner"
    >
      <span class="material-icons">close</span>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { StreamBarcodeReader } from "vue-barcode-reader";
import { useRouter } from "vue-router";

const showScanner = ref(false);
let qrCodeScanner = null;

const router = useRouter();

const toggleScanner = () => {
  if (showScanner.value) {
    closeScanner();
  } else {
    openScanner();
  }
};

const openScanner = () => {
  showScanner.value = true;
};

const closeScanner = () => {
  if (qrCodeScanner) {
    qrCodeScanner.stop();
    qrCodeScanner = null;
  }
  showScanner.value = false;
};

const onDecode = (text) => {
  console.log(`Decoded text: ${text}`);
  const id = extractIdFromText(text);
  navigateToQRCode(id);
  closeScanner();
};

const onLoaded = () => {
  console.log("Scanner loaded and ready to scan.");
};

const extractIdFromText = (text) => {
  const id = text.split(" - ")[0];
  return id;
};

const navigateToQRCode = (id) => {
  router.push(`/transport-permit/${id}`);
};
</script>

<style scoped>
.scanner-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  z-index: 999;
}

.scanner-button {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s; /* Add transition for hover effect */
}

.scanner-button:hover {
  background-color: #0056b3; /* Change background color on hover */
}

.material-icons {
  font-size: 28px;
  color: #fff;
}

.close-button {
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #8ceded;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.close-button .material-icons {
  font-size: 18px;
  color: #007bff;
}

@media (max-width: 768px) {
  .scanner-container {
    bottom: 20px;
    right: 20px;
    justify-content: center;
  }
}
</style>