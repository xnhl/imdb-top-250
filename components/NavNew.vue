<template>
	<div id="navigation-wrapper">
		<nuxt-link id="nav-home" to="/">
			<img src="/icon/home.svg" alt="home" class="nav-icon">
		</nuxt-link>
		<div id="nav-theme" @click="toggleTheme">
			<img src="/icon/sun.svg" alt="theme" class="nav-icon">
		</div>
		<div id="nav-sort">
			<div id="nav-sort-icon-wrapper">
				<img src="/icon/sort.svg" alt="theme" id="nav-sort-icon">
			</div>
			<div class="sorter-method">
				<div class="sorter-option" @click="sortShows" data-sortoption="name">Name</div>
				<div class="sorter-option" @click="sortShows" data-sortoption="date">Date</div>
				<div class="sorter-option" @click="sortShows" data-sortoption="rating">Rating</div>
			</div>
			<div class="sorter-method">
				<input id="search" type="text" placeholder="Search..." @input="search" @change="search">
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "Navigation",
	data() {
		return {
			scroll_old: 0,
			scroll_new: 0,
			sortName: 0,
			sortDate: 1,
			sortRating: 1,
			isMainPage: true
		}
	},
	methods: {
		toggleTheme: function() {
			this.$emit("toggle-theme")
		},
		handleScroll: function() {
			let y = window.scrollY
			this.scroll_new = y
			let nav_wrapper = document.getElementById("navigation-wrapper")
			if (this.scroll_new > this.scroll_old) {
				nav_wrapper.classList.add("nav-hidden")
				this.scroll_old = y
			} else if (this.scroll_new < this.scroll_old) {
				nav_wrapper.classList.remove("nav-hidden")
				this.scroll_old = y
			}
		},
		sortShows: function(e) {
			let shows = [...document.getElementsByClassName("show")]
			let wrapper = document.getElementById("shows-wrapper")
			let len = shows.length
			let sortprop = e.target.dataset.sortoption
			let aa, bb, sorted
			if (sortprop == "name") {
				sorted = shows.sort((a, b) => {
					let aa = a.dataset[sortprop]
					let bb = b.dataset[sortprop]
					if (this.sortName % 2 == 0) {
						return aa < bb ? -1 : aa > bb ? 1 : 0
					} else {return aa > bb ? -1 : aa < bb ? 1 : 0}
				})
				this.sortName++
			} else if (sortprop == "date") {
				sorted = shows.sort((a, b) => {
					let aa = parseInt(a.dataset[sortprop])
					let bb = parseInt(b.dataset[sortprop])
					if (this.sortDate % 2 == 0) {
						return aa < bb ? -1 : aa > bb ? 1 : 0
					} else {return aa > bb ? -1 : aa < bb ? 1 : 0}
				})
				this.sortDate++
			} else if (sortprop == "rating") {
				sorted = shows.sort((a, b) => {
					let aa = parseFloat(a.dataset[sortprop])
					let bb = parseFloat(b.dataset[sortprop])
					if (this.sortRating % 2 == 0) {
						return aa < bb ? -1 : aa > bb ? 1 : 0
					} else {return aa > bb ? -1 : aa < bb ? 1 : 0}
				})
				this.sortRating++
			}
			for (let each of sorted) {
				wrapper.appendChild(each)
			}
			window.scrollTo(0, 0)
		},
		search: function() {
			setTimeout(() => {
				let searchText = document.getElementById("search").value.toLowerCase()
				let shows = [...document.getElementsByClassName("show")]
				for (let each of shows) {
					if (each.dataset.name.toLowerCase().indexOf(searchText) == -1) {
						each.classList.add("hide")
					} else if (each.dataset.name.toLowerCase().indexOf(searchText) > -1) {
						each.classList.remove("hide")
					}
				}
				window.scrollTo(0, 0)
			}, 500)
		},
		toggleSorter: function() {
			let sorter = document.getElementById("nav-sort")
			sorter.classList.toggle("hiding")
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll)
	}
}
</script>

<style lang="sass">
#navigation-wrapper
	@include flexCenter
	justify-content: flex-start
	background: var(--gray-two)
	transition: background 0.25s ease-in-out
	border-radius: 0 0 0.25rem 0.25rem
	position: fixed
	top: 0
	width: 100%
	z-index: 5
	margin: 0 auto
	transition: $transition
	&.nav-hidden
		top: -10rem
	#nav-theme, #nav-home
		width: auto
		@include flexCenter
		.nav-icon
			height: 1.25rem
			width: 1.25rem
			cursor: pointer
			padding: 0.5rem
			filter: var(--theme-icon)
			box-sizing: content-box
	#nav-sort
		@include flexCenter
		align-items: stretch
		justify-content: center
		flex: 1
		backdrop-filter: blur(0.25rem)
		transition: $transition
		border-radius: 0.25rem
		#nav-sort-icon-wrapper
			@include flexCenter
			width: auto
			#nav-sort-icon
				height: 1.25rem
				width: 1.25rem
				cursor: pointer
				padding: 0.5rem
				filter: var(--theme-icon)
				box-sizing: content-box
		.sorter-method
			@include flexCenter
			padding: 0.25rem
			width: auto
			.sorter-option
				margin: 0.1rem
				background: var(--theme-whiteBG)
				padding: 0.25rem
				border-radius: 0.25rem
				cursor: pointer
				@media (max-width: 30rem)
					font-size: 0.75rem
			#search
				flex: 1
				border: none
				padding: 0.33rem
				border-radius: 0.25rem
				color: var(--theme-black)
				background: var(--gray-three)
				@media (max-width: 30rem)
					width: 8rem
</style>
