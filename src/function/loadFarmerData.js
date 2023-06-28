export default function loadFarmerData(farmerData, selectedId, farmersName, mobileNo,jilla,upjilla) {
    const selectedFarmer = farmerData.find(farmer => farmer.id === selectedId);
    if (selectedFarmer) {
      farmersName.value = selectedFarmer.farmersName;
      mobileNo.value = selectedFarmer.mobileNo;
      jilla.value = selectedFarmer?.selectedGilla;
      upjilla.value = selectedFarmer?.selectedUpjilla;
     
    }
}
  