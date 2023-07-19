<template>
    <div class="chart-container">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { Chart, registerables } from 'chart.js';
import getTotalLoanAmount from "../function/getTotalLoanAmount"
import loadTransportPermit from '../function/loadTransportPermit';
import loadData from '../function/loadData';

const tpTotal = ref([]);
const totalFarmers = ref([]);
const userCount = ref(0);
const totalLoan = ref(0);
const totalTp = ref(0);
Chart.register(...registerables);
const chartCanvas = ref(null);
let chartInstance = null;

onMounted(async () => {
    await getTotalLoanAmount(totalLoan);
    await loadTransportPermit(tpTotal);
    await loadData(totalFarmers)
    
    totalTp.value = tpTotal.value.length;
    userCount.value=totalFarmers.value.length;
    console.log(totalTp.value)
    renderChart();
});

onBeforeUnmount(() => {
    if (chartInstance) {
        chartInstance.destroy();
    }
});

const renderChart = () => {
    const aspectRatio = 1.5; // Adjust the aspect ratio as needed

    const container = chartCanvas.value.parentElement;
    const containerWidth = container.offsetWidth;
    const containerHeight = containerWidth / aspectRatio;

    container.style.height = `${containerHeight}px`;

    const chartOptions = {
        type: 'bar',
        data: {
            labels: ['User', 'TP', 'Loan Amount'],
            datasets: [
                {
                    label: 'General Data',
                    data: [userCount.value, totalTp.value, totalLoan.value], // Use totalLoan.value to access the loan value
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)'
                    ],
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            // Other chart options...
        },
    };

    chartInstance = new Chart(chartCanvas.value, chartOptions);
};

// Update chart dimensions on window resize
window.addEventListener('resize', renderChart);
</script>

<style scoped>
.chart-container {
    position: relative;
    width: 100%;
    max-height: 400px;
}

.chart-container canvas {
    width: 100% !important;
    height: 100% !important;
}
</style>
