<template>
	<div id="main-wrapper">
		<div id="shows-wrapper">
			<Show v-for="(show, index) in imdb" :info="show" :key="index" :data-name="show.name" :data-date="show.years" :data-rating="show.series_rating" />
		</div>
		<div id="chart-modal">
			
		</div>
	</div>
</template>

<script>
import Show from '@/components/Show'
import imdb from '@/assets/data/allIMDBMin'
export default {
	components: {Show},
	data() {
		return {
			imdb,
			sortName: 0,
			sortDate: 1,
			sortRating: 1
		}
	},
	computed: {
		imdbSmall: function() {
			return imdb.slice(0, 10)
		}
	},
	mounted() {
		var lazyloadImages = document.querySelectorAll('.lazy')
		var imageObserver = new IntersectionObserver((entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					var image = entry.target
					image.src = image.dataset.lazysrc
					image.classList.remove('lazy')
					imageObserver.unobserve(image)
				}
			})
		})

		lazyloadImages.forEach((image) => {
			imageObserver.observe(image)
		})
	}
}
</script>

<style lang="sass">
#main-wrapper
	@include pageWrapper
	padding: 0.5rem
	background: var(--theme-whiteBG)
	#shows-wrapper
		@include flexCenter
		align-items: stretch
</style>
