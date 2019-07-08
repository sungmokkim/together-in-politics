import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Line, Bubble, Bar } from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import ContentLoading from '../../../common/ContentLoading';

class MainBoardContent extends Component {
  barChart = () => {
    const { active, communities } = this.props.dashboardManager;

    return (
      <Bar
        data={{
          labels: this.props.barChartData.labels,
          datasets: [
            {
              data: this.props.barChartData.dataArray,
              label: '대통령 혐오 발언',
              fill: false,
              backgroundColor: '#4D6E9B',
              borderColor: '#4D6E9B'
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: '대통령 혐오 발언'
                }
              }
            ]
          }
        }}
      />
    );
  };

  lineChartMinMax = () => {
    // this function is to get min and max value for y axis of the line graph
    // y axis varies based on a given indicator
    const { active, communities } = this.props.dashboardManager;
    switch (active.indicator) {
      case 'real_rank':
        return {
          min: 1,
          max: Object.keys(communities).length
        };

      default:
        return {
          min: 0
        };
    }
  };

  mapLineChartDataset = () => {
    const { active, lineChartIndicatorOptions } = this.props.dashboardManager;
    return Object.keys(this.props.lineChartData.dataObj)
      .filter(key => {
        return lineChartIndicatorOptions[key].checked;
      })
      .map(filteredKey => {
        return this.props.lineChartData.dataObj[filteredKey];
      });
  };
  lineChart = () => {
    const { active, lineChartIndicatorOptions } = this.props.dashboardManager;
    const lineDataSet = this.mapLineChartDataset();
    return (
      <Line
        data={{
          labels: this.props.lineChartData.labels,

          datasets: lineDataSet
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            labels: {
              boxWidth: 1
            }
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                distribution: 'linear',
                time: {
                  parser: 'YYYY-MM',
                  displayFormats: {
                    month: 'YYYY-MM',
                    day: 'MM'
                  }
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  reverse: active.indicator === 'real_rank' ? true : false,
                  min: this.lineChartMinMax().min,
                  max: this.lineChartMinMax().max
                },
                scaleLabel: {
                  display: true,
                  labelString: '수치(%)'
                }
              }
            ]
          },

          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return `${data.datasets[tooltipItem.datasetIndex].label}: ${
                  tooltipItem.yLabel
                }${active.indicator === 'femi_count' ? '' : '%'}`;
              }
            }
          }
        }}
      />
    );
  };

  bubbleChart = () => {
    const { dashboardIndicatorsName } = this.props.dashboardManager;
    return (
      <Bubble
        data={{
          labels: '페미 지형도',
          datasets: this.props.bubbleChartData
        }}
        options={{
          maintainAspectRatio: false,
          legend: {
            labels: {
              boxWidth: 1
            }
          },
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: dashboardIndicatorsName.femi_ratio['korean']
                },
                ticks: {
                  min: 0
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  min: 0
                },
                scaleLabel: {
                  display: true,
                  labelString: dashboardIndicatorsName.anti_ratio['korean']
                }
              }
            ]
          },

          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return `${data.datasets[tooltipItem.datasetIndex].label} (${
                  dashboardIndicatorsName.anti_ratio['koreanShort']
                }: ${tooltipItem.xLabel}% ${
                  dashboardIndicatorsName.femi_ratio['koreanShort']
                }: ${tooltipItem.yLabel}% 대통령 지분율 : ${data.datasets[
                  tooltipItem.datasetIndex
                ].data[tooltipItem.index].r * 2})`;
              }
            }
          }
        }}
      />
    );
  };

  getChart = () => {
    const { active } = this.props.dashboardManager;

    switch (active.chart.index) {
      case 'bar':
        return this.barChart();
      case 'line':
        return this.lineChart();

      case 'bubble':
        return this.bubbleChart();
      default:
        return;
    }
  };

  renderLoading = () => {
    return this.props.chartIsLoading ? <ContentLoading /> : null;
  };

  render() {
    return (
      <div style={{ position: 'relative' }}>
        {this.renderLoading()}

        <div className='chart-container'>{this.getChart()}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    dashboardManager: state.dashboardManager,
    data: state.dashboardData
  };
}

export default connect(mapStateToProps)(MainBoardContent);
