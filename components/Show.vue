<template>
	<nuxt-link class="show" :to="`/${this.info.title_short}`" :data-name="this.info.name" :data-date="this.info.years" :data-rating="this.info.series_rating">
		<div class="show-arrow-wrapper">
			<img class="show-arrow" src="/icon/arrow.svg" alt="go">
		</div>
		<div class="show-image-wrapper">
			<img class="show-image lazy" src="" :data-lazysrc="`/img/${this.info.title_short}.jpg`">
		</div>
		<div class="show-info-wrapper">
			<p class="show-title show-info-item" v-text="`${this.info.name} (${this.info.years})`"></p>
			<div class="show-categories show-info-item">
				<p class="show-category" v-for="(category, index) in this.info.categories" :key="index" v-text="category"></p>
			</div>
			<div class="show-details show-info-item">
				<div class="show-details-item" v-text="numSeasons"></div>
			</div>
			<div class="show-description" v-text="this.info.description"></div>
			<div class="show-rating show-info-item">
				<div class="show-rating-actual" v-text="`${this.info.series_rating} / 10`"></div>
				<div class="show-rating-fill">
					<div class="show-rating-filler" :style="`width: ${this.info.series_rating * 10}%`"></div>
				</div>
			</div>
		</div>
	</nuxt-link>
</template>

<script>
import SeasonChart from '@/components/SeasonChart'
export default {
	name: 'Show',
	components: {SeasonChart},
	props: {
		info: Object
	},
	computed: {
		chartInfo: function() {
			let showInfo = this.info.seasons.filter(each => each !== null).map(each => {
				let s = each.season ? each.season : null
				let labels = each.episodes.map(ep => ep.episode)
				let ratings = each.episodes.map(ep => ep.rating)
				return {
					season: s,
					labels,
					datasets: [{
						data: ratings,
						borderColor: "green",
						fill: false
					}]
				}
			})
			return showInfo
		},
		numRatings: function() {
			let num = parseInt(this.info.series_rating_num).toLocaleString()
			return num
		},
		numSeasons: function() {
			let num = this.info.seasons.length
			if (parseInt(num) == 1) {
				return `${num} season`
			} else {
				return `${num} seasons`
			}
		},
		duration: function() {
			return `Length: ~${this.info.duration}`
		}
	},
	methods: {
		changeChart: function(e) {
			let charts = [...e.target.closest(".charts-wrapper").getElementsByClassName("chart")]
			console.log(charts)
			let chartsLen = charts.length
			console.log(chartsLen)
			if (e.target.classList.contains("next")) {
				for (let i = 0; i < chartsLen; i++) {
					if (!charts[i].classList.contains("hide")) {
						charts[i].classList.add("hide")
					}
				}
			} else if (e.target.classList.contains("prev")) {
				for (let i = 0; i < chartsLen; i++) {
					if (!charts[i].classList.contains("hide")) {
						charts[i].classList.add("hide")
					}
				}
			}
		}
	}
}
</script>

<style lang="sass">
.show
	flex: 1
	margin: 0.25rem
	padding: 0.5rem
	min-width: 100%
	position: relative
	text-decoration: none
	animation: $pageFade
	@include flexCenter
	align-items: stretch
	background: var(--theme-itemWhite)
	border-radius: 0.25rem
	box-shadow: $boxShadowLight
	&:hover
		box-shadow: $boxShadowHover
	@media (min-width: 60rem)
		min-width: 40%
		max-width: 50%
	.show-arrow-wrapper
		position: absolute
		top: 0
		right: 0
		.show-arrow
			height: 1rem
			width: 1rem
			cursor: pointer
			padding: 0.5rem
			opacity: 0.25
			transform: rotate(180deg)
			filter: var(--theme-icon)
			box-sizing: content-box
	.show-info-wrapper
		@include flexCenter
		flex-direction: column
		justify-content: space-between
		flex: 1
		padding: 0.25rem
		background: var(--theme-itemWhite)
		border-radius: 0.25rem
		@media (min-width: 30em)
			flex: 1
			min-width: 40%
		.show-info-item
			padding: 0.25rem
		.show-title
			padding: 0.25rem
			font-size: 1.1rem
			text-align: center
			@include flexCenter
		.show-rating
			width: 100%
			@include flexCenter
			.show-rating-number
				margin: 0 0.25rem
			.show-rating-actual
				padding: 0.5rem
			.show-rating-star
				margin-right: 0.5rem
				height: 1rem
				width: 1rem
			.show-rating-fill
				flex: 1
				height: 1.5rem
				border-radius: 0.25rem
				overflow: hidden
				background: desaturate(red, 66)
				.show-rating-filler
					height: 100%
					background: desaturate(green, 66)
		.show-details
			@include flexCenter
			.show-details-item
				padding: 0.25rem
		.show-categories
			@include flexCenter
			.show-category
				&:after
					content: ', '
					margin-right: 0.25rem
				&:last-child
					&:after
						content: ''
		.show-description
			text-indent: 0.5rem
			padding: 1rem
			flex: 1
			width: 100%
			@include flexCenter
		.show-link-wrapper
			@include flexCenter
			justify-content: flex-end
			width: 100%
			.show-link
				box-sizing: content-box
				cursor: pointer
				height: 1.5rem
				width: 1.5rem
				padding: 0.5rem
	.show-image-wrapper
		@include flexCenter
		width: 100%
		min-height: 250px
		margin: 0.5rem
		border-radius: 0.25rem
		@media (min-width: 30em)
			width: auto
			margin: 1rem
		.show-image
			padding: 0.5rem
			background: var(--theme-whiteBG)
			border-radius: 0.25rem
			box-sizing: content-box
	.charts-wrapper
		@include flexCenter
		width: 100%
		.chart-nav-wrapper
			@include flexCenter
			width: 100%
			.chart-nav
				@include flexCenter
				flex: 1
		.chart
			position: relative
			padding: 0.5rem
			margin: 0.25rem
			width: 99vw
			background: var(--theme-itemWhite)
			box-shadow: $boxShadowLight
			border-radius: 0.25rem
			@media (min-width: 41em)
				width: auto
				min-width: 40%
				max-width: 50%
				flex: 1
			@media (min-width: 62em)
				min-width: 30%
			&:hover
				box-shadow: $boxShadowHover
			&:nth-child(1)
				display: block
			.chart-title
				@include flexCenter
				text-align: center
				padding: 1rem
				min-width: 100%
				font-size: 1.05rem
			.chart-actual
				filter: var(--theme-icon)
</style>
