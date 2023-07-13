<script>
export default {
  data() {
    return {
      options: {
        animationEnabled: true,
        exportEnabled: true,
        theme: "light2",
        title: {
          text: "Quarterly Sales by Area"
        },
        axisY: {
          prefix: "Tk",
          tickLength: 0,
          suffix: "K",
          title: "Sales in Taka",
          includeZero: true
        },
        legend: {
          cursor: "pointer",
          itemclick: this.toggleDataSeries
        },
        toolTip: {
          shared: true
        },
        data: [
          {
            type: "column",
            name: "Kustia",
            showInLegend: true,
            color: "#4caf50", // Green color
            yValueFormatString: "$##,###K",
            dataPoints: [
              { label: "Q1", y: 50 },
              { label: "Q2", y: 100 },
              { label: "Q3", y: 120 },
              { label: "Q4", y: 140 }
            ]
          },
          {
            type: "column",
            name: "Chittagong",
            showInLegend: true,
            color: "#81c784", // Light green color
            yValueFormatString: "$##,###K",
            dataPoints: [
              { label: "Q1", y: 75 },
              { label: "Q2", y: 115 },
              { label: "Q3", y: 150 },
              { label: "Q4", y: 160 }
            ]
          },
          {
            type: "column",
            name: "Rajshahi",
            showInLegend: true,
            color: "#aed581", // Pale green color
            yValueFormatString: "$##,###K",
            dataPoints: [
              { label: "Q1", y: 110 },
              { label: "Q2", y: 120 },
              { label: "Q3", y: 160 },
              { label: "Q4", y: 170 }
            ]
          },
          {
            type: "column",
            name: "Natore",
            showInLegend: true,
            color: "#dcedc8", // Lightest green color
            yValueFormatString: "$##,###K",
            dataPoints: [
              { label: "Q1", y: 140 },
              { label: "Q2", y: 150 },
              { label: "Q3", y: 170 },
              { label: "Q4", y: 180 }
            ]
          }
        ]
      },
      styleOptions: {
        width: "100%",
        height: "360px",
        margin: "20px 0"
      }
    };
  },
  methods: {
    toggleDataSeries(e) {
      if (
        typeof e.dataSeries.visible === "undefined" ||
        e.dataSeries.visible
      ) {
        e.dataSeries.visible = false;
      } else {
        e.dataSeries.visible = true;
      }
      e.chart.render();
    }
  }
};
</script>
<template>
  <CanvasJSChart :options="options" :styles="styleOptions" />
</template>
