export const initializeChart = () => {
  try {
    let ctx = document.getElementById('chart-canvas');
    let newChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
        datasets: [{ data: [] }]
      },
      options: {
        title: {
          display: true,
          text: 'Title',
          fontSize: 25
        }
      }
    });
    return newChart;
  } catch (error) {}
};

export const drawChart = (chart, myDates, myData, chartTitle) => {
  chart.data = {
    labels: myDates,
    datasets: [
      {
        label: 'result1',
        data: myData,
        fill: false,
        backgroundColor: '#5580A0',
        borderColor: '#5580A0',
        pointHoverBorderWidth: 10
      }
    ]
  };

  chart.options.title.text = chartTitle;
  chart.update();
};
