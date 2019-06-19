import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeActive } from '../../../../actions/actions';
import { fetchDashboardData } from '../../../../actions/actions';
import { Line, Bubble, Bar } from 'react-chartjs-2';
import * as ChartAnnotation from 'chartjs-plugin-annotation';
import ChartLoading from '../../../common/ChartLoading';

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
                },
                ticks: { min: 0, max: 200 }
              }
            ]
          }
        }}
      />
    );
  };

  lineChartMinMax = () => {
    const { active, communities } = this.props.dashboardManager;

    switch (active.indicator) {
      case 'real_rank':
        return {
          min: 1,
          max: Object.keys(communities).length
        };
      case 'anti_ratio':
        return {
          min: 0,
          max: 100
        };
      case 'popularity':
        return {
          min: 0,
          max: 1.2
        };

      default:
        return;
    }
  };
  lineChart = () => {
    const { active, dashboardIndicatorsName } = this.props.dashboardManager;
    return (
      <Line
        data={{
          labels: this.props.lineChartData.labels,
          datasets: [
            {
              data: this.props.lineChartData.dataArray,
              label: dashboardIndicatorsName[active.indicator]['korean'],
              fill: false,
              backgroundColor: '#4D6E9B',
              borderColor: '#4D6E9B',
              pointHoverBorderWidth: 10,
              lineTension: 0.1
            }
          ]
        }}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  reverse: active.indicator === 'real_rank' ? true : false,
                  min: this.lineChartMinMax().min,
                  max: this.lineChartMinMax().max
                },
                scaleLabel: {
                  display: true,
                  labelString:
                    dashboardIndicatorsName[active.indicator]['korean']
                }
              }
            ]
          },

          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return `${
                  dashboardIndicatorsName[active.indicator]['koreanShort']
                }: ${tooltipItem.yLabel}${
                  active.indicator === 'real_rank' ? '위' : '%'
                }`;
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
          labels: '커뮤니티 지형도',
          datasets: this.props.bubbleChartData
        }}
        plugins={[ChartAnnotation]}
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
                  labelString: dashboardIndicatorsName.popularity['korean']
                },
                ticks: {
                  min: 0,
                  max: 1
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  min: 0,
                  max: 100
                },
                scaleLabel: {
                  display: true,
                  labelString: dashboardIndicatorsName.anti_ratio['korean']
                }
              }
            ]
          },
          annotation: {
            annotations: [
              {
                drawTime: 'afterDraw',
                type: 'line',
                mode: 'horizontal',
                scaleID: 'y-axis-0',
                value: '0.5',
                borderColor: 'rgb(0,0,0,0.5)',
                borderWidth: 1
              },
              {
                drawTime: 'afterDraw',
                type: 'line',
                mode: 'vertical',
                scaleID: 'x-axis-0',
                value: '50',
                borderColor: 'rgb(0,0,0,0.5)',
                borderWidth: 1
              }
            ]
          },
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                return `${data.datasets[tooltipItem.datasetIndex].label} (${
                  dashboardIndicatorsName.anti_ratio['koreanShort']
                }: ${tooltipItem.xLabel}% ${
                  dashboardIndicatorsName.popularity['koreanShort']
                }: ${tooltipItem.yLabel}% 게시판 규모 : ${
                  data.datasets[tooltipItem.datasetIndex].data[
                    tooltipItem.index
                  ].r
                })`;
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
    return this.props.chartIsLoading ? <ChartLoading /> : null;
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

export default connect(
  mapStateToProps,
  { changeActive, fetchDashboardData }
)(MainBoardContent);
