const loadData =async (farmerData) => {
    try {
      const response = await fetch('https://ttjodjte92.execute-api.us-west-2.amazonaws.com/prod/producers');
      const jsonData = await response.json();
      return farmerData.value = jsonData;
    } catch (error) {
      console.error('Error loading farmer data:', error);
    }
}

export default loadData;