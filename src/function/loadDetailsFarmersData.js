const loadDetailsFarmersData = async (farmerData,isLoading,error,id) => {
    try {
      const response = await fetch(`https://ess464k1xk.execute-api.us-west-2.amazonaws.com/prod/producers?id=${id}`);
      const jsonData = await response.json();
      farmerData.value = jsonData;
    } catch (err) {
      error.value = 'Error loading farmer data.';
      console.error(err);
    } finally {
      isLoading.value = false;
    }
};

export default loadDetailsFarmersData;