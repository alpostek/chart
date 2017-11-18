import "../sass/style.scss"
import Chart from 'chart.js';
import {weeks, company1, company2, company3} from "./data/install.js";
import plugin from '../js/plugin_filler.js';

document.addEventListener('DOMContentLoaded', function(){

let names = [company1.name, company2.name, company3.name]

function drawRevenueChart(){

let lineCtx = document.getElementById("revenueChart");

let datarev1 = company1.results.map(results => results.revenueWeek)
let datarev2 = company2.results.map(results => results.revenueWeek)
let datarev3 = company3.results.map(results => results.revenueWeek)

let dataset1 = {label: names[0],
  borderColor:"#ed6e37",
  data: datarev1,
  fill: 1,
  borderWidth: 6,
  pointRadius: 7,
  pointBorderColor: "white",
  pointBorderWidth: 4,
  pointBackgroundColor: "#ed6e37",
  lineTension: 0
}

let dataset2 = {label: names[1],
  borderColor: "#259e01",
  data: datarev2,
  fill: 2,
  borderWidth: 6,
  pointBorderColor: "white",
  pointRadius: 7,
  pointBorderWidth: 4,
  pointBackgroundColor: "#259e01",
  lineTension: 0
}

let dataset3 = {label: names[2],
  borderColor: "#15a0c8",
  data: datarev3,
  fill: false,
  borderWidth: 6,
  pointBorderColor: "white",
  pointRadius: 7,
  pointBorderWidth: 4,
  pointBackgroundColor: "#15a0c8",
  lineTension: 0

}

let sumRevens = datarev1.map((val, idx) => val + datarev2[idx] + datarev3[idx]);

function sum(prev, curr, idx, arr) {
  return prev + curr;
}

let revenStream = sumRevens.reduce(sum)

let lineChartData = {
  type: "line",
  data: {
    labels: weeks,
    backgroundColor: "white",
    datasets:
     [
       dataset1,
       dataset2,
       dataset3
    ]
  },
  options: {
    plugins: {
      filler: {
        propagate: true
      }
    },
  title: {
    display: true,
    text: "Revenue per week",
    padding: 30,
  },
  legend: false,
  legendCallback: function(chart) {
      var text = [];
      var datasets = [chart.data.datasets]
      text.push('<ul class="lineLegend">');
      text.push('<li><span style="background-color:' + chart.data.datasets[0].borderColor + '"></span>' + chart.data.datasets[0].label + '</li>');
      text.push('<li><span style="background-color:' + chart.data.datasets[1].borderColor + '"></span>' + chart.data.datasets[1].label + '</li>');
      text.push('<li><span style="background-color:' + chart.data.datasets[2].borderColor + '"></span>' + chart.data.datasets[2].label + '</li>');
      text.push('</ul>');
      return text.join("");
    },
  scales: {
          yAxes: [{
              ticks: {
                  max: 1000,
                  stepSize: 500
              }
          }],
          xAxes: [{
            ticks: {
              fontColor: "#245970",
              fontStyle: "bold"
            }
          }]
      }
    }
  }


let revenueChart = new Chart (lineCtx, lineChartData, {plugins: [plugin]})

document.getElementById("sumreven").innerText = revenStream;
document.getElementById("lineLegend").innerHTML = revenueChart.generateLegend()

}

drawRevenueChart();



function drawInstallationsChart(){

let instCtx = document.getElementById("installationsChart");

let data1 = company1.results.map(results => results.installsDay)
let data2 = company2.results.map(results => results.installsDay)
let data3 = company3.results.map(results => results.installsDay)

let newDataset1 = {label: names[0], backgroundColor:"#ed6e37", data: data1}
let newDataset2 = {label: names[1], backgroundColor: "#259e01", data: data2}
let newDataset3 = {label: names[2], backgroundColor: "#15a0c8", data: data3}

let sumInstalls = data1.map((val, idx) => val + data2[idx] + data3[idx]);

function sum(prev, curr, idx, arr) {
  return prev + curr;
}

let numberOfInstalls = sumInstalls.reduce(sum)

let instChartData = {
  type: "bar",
  data: {
    labels: weeks,
    datasets: [
      newDataset1,
      newDataset2,
      newDataset3
    ]
  },
  options: {
    title: {
      display: true,
      text: "Installations per day",
      padding: 30
    },
    legend: false,
    legendCallback: function(chart) {
        var text = [];
        text.push('<ul class="lineLegend">');
        text.push('<li><span style="background-color:' + chart.data.datasets[0].backgroundColor + '"></span>' + chart.data.datasets[0].label + '</li>');
        text.push('<li><span style="background-color:' + chart.data.datasets[1].backgroundColor + '"></span>' + chart.data.datasets[1].label + '</li>');
        text.push('<li><span style="background-color:' + chart.data.datasets[2].backgroundColor + '"></span>' + chart.data.datasets[2].label + '</li>');
        text.push('</ul>');
        return text.join("");
      },
    scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                    stepSize: 5
                }
            }],
            xAxes: [{
              barThickness: 12,
              barPercentage: 0.3,
              categoryPercentage: 0.5,
                ticks:{
                  fontColor: "#245970",
                  fontStyle: "bold"
                }
            }]
        }
  }
}

let installChart = new Chart (instCtx, instChartData)
document.getElementById("suminst").innerText = numberOfInstalls;
document.getElementById("barLegend").innerHTML = installChart.generateLegend()

}


drawInstallationsChart();


});
