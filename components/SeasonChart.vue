<script>
import { Line } from 'vue-chartjs'
export default {
	name: 'SeasonChart',
	extends: Line,
	props: {
		info: {}
	},
	data() {
		return {
			options: {
				responsive: true,
				maintainAspectRatio: true,
				legend: {
					display: false,
				},
				scales: {
					xAxes: [{
						display: true,
						gridLines: {
							color: "rgba(0, 0, 0, 0.25)"
						},
						ticks: {
							fontColor: 'black',
							padding: 3
						}
					}],
					yAxes: [{
						display: true,
						stacked: true,
						gridLines: {
							color: "rgba(0, 0, 0, 0.25)"
						},
						ticks: {
							fontColor: 'black',
							padding: 3
						}
					}]
				}
			}
		}
	},
	mounted () {
		this.renderChart(this.info, this.options)
	}
}
</script>
