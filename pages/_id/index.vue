<template>
	<div id="page-wrapper">
		<div id="show">
			<div class="show-image-wrapper">
				<img class="show-image" :src="`/img/${show.title_short}.jpg`">
			</div>
			<div class="show-info-wrapper">
				<p class="show-title show-info-item" v-text="`${show.name} (${show.years})`"></p>
				<div class="show-categories show-info-item">
					<p class="show-category" v-for="(category, index) in show.categories" :key="index" v-text="category"></p>
				</div>
				<div class="show-details show-info-item">
					<div class="show-details-item" v-text="numSeasons"></div>
					<div class="show-details-item" v-text="numEps"></div>
					<div class="show-details-item" v-text="duration"></div>
				</div>
				<div class="show-description" v-text="show.description"></div>
				<a class="show-link-wrapper" :href="show.url" target="_blank">
					<img class="show-link" src="/icon/imdb.svg" alt="imdb" target="_blank">
				</a>
				<div class="show-rating show-info-item">
					<div class="show-rating-actual" v-text="`${show.series_rating} / 10`"></div>
					<div class="show-rating-fill">
						<div class="show-rating-filler" :style="`width: ${show.series_rating * 10}%;`"></div>
					</div>
				</div>
			</div>
		</div>
		<div id="show-extended-info">
			<div id="charts-wrapper">
				<div class="chart" v-for="(season, index) in chartInfo" :key="index">
					<p class="chart-title" v-text="`Season ${index+1}`"></p>
					<SeasonChart class="chart-actual" :info="season" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import imdb from '@/assets/data/allIMDBMin'
import SeasonChart from '@/components/SeasonChart'
export default {
	components: {SeasonChart},
	data() {
		return {
			imdb,
			show: {}
		}
	},
	computed: {
		chartInfo: function() {
			let info = this.show.seasons.map(season => {
				let s = season.season;
				let labels = season.episodes.map(ep => ep.episode);
				let ratings = season.episodes.map(ep => ep.rating);
				return {
					season: s,
					labels,
					datasets: [{
						data: ratings,
						borderColor: "green",
						fill: false
					}]
				}
			});
			return info
		},
		numRatings: function() {
			let num = parseInt(this.show.series_rating_num).toLocaleString();
			return num
		},
		numSeasons: function() {
			let num = this.show.seasons.length;
			return `${num} seasons`
		},
		numEps: function() {
			let count = 0;
			let num = this.show.seasons.length;
			for (let i = 0; i < num; i++) {
				let numEps = this.show.seasons[i].episodes.length;
				count += numEps
			}
			return `${count} episodes`
		},
		duration: function() {
			return `Length: ~${this.show.duration}`
		}
	},
	created() {
		this.show = this.imdb.filter(show => show.title_short === this.$route.params.id)[0]
	}
}
</script>

<style lang="sass">
#page-wrapper
	@include pageWrapper
	background: var(--theme-itemWhite)
	#show
		flex: 1
		margin: 0.25rem auto
		@include flexCenter
		align-items: stretch
		.show-image-wrapper
			@include flexCenter
			min-width: 100%
			min-height: 250px
			box-sizing: content-box
			border-radius: 0.25rem
			@media (min-width: 38em)
				min-width: auto
				margin: 0 1rem
			.show-image
				margin: 1rem 0.5rem 0.5rem 0.5rem
				border-radius: 0.25rem
				width: auto
				max-width: 100%
				height: auto
		.show-info-wrapper
			@include flexCenter
			height: auto
			margin: 0 1rem 0 0
			border-radius: 0.25rem
			@media (min-width: 38em)
				flex: 1
				min-width: 40%
			.show-info-item
				min-width: 100%
				flex: 1
				margin: 0.25rem
			.show-title
				padding: 0.25rem
				font-size: 1.1rem
				text-align: center
				@include flexCenter
			.show-rating
				@include flexCenter
				.show-rating-number
					margin: 0 0.25rem
				.show-rating-actual
					margin: 0 0.25rem
				.show-rating-star
					margin-right: 0.5rem
					height: 1rem
					width: 1rem
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
					margin-right: 1rem
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
				min-width: 100%
				@include flexCenter
			.show-link-wrapper
				@include flexCenter
				align-self: flex-end
				justify-content: flex-end
				width: 100%
				.show-link
					box-sizing: content-box
					cursor: pointer
					height: 1.5rem
					width: 1.5rem
					padding: 0.25rem
	#show-extended-info
		width: 100%
		#charts-wrapper
			@include flexCenter
			width: 100%
			padding: 0.5rem
			margin-top: 1rem
			.chart
				position: relative
				padding: 0.5rem
				margin: 0.25rem
				width: 100%
				background: var(--theme-itemWhite)
				box-shadow: $boxShadow
				border-radius: 0.25rem
				@media (min-width: 38em)
					width: auto
					min-width: 40%
					max-width: 50%
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
