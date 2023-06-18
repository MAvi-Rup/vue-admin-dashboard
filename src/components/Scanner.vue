<template>
  <div class="scanner-container">
    <div class="scanner-button" @click="openScanner">
      <span class="material-icons">qr_code_scanner</span>
    </div>
    <div id="qr-code-scanner" v-if="showScanner">
      <StreamBarcodeReader @decode="onDecode" @loaded="onLoaded" />
    </div>
    <div class="close-button" v-if="showScanner" @click="closeScanner">
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
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.scanner-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #007bff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.material-icons {
  font-size: 28px;
  color: #fff;
}

.close-button {
  position: absolute;
  top: 8px;
  right: 750px;
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
</style>
