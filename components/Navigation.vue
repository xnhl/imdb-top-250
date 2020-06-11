<template>
	<div id="navigation-wrapper">
		<nuxt-link id="home" to="/">
			<img id="home-icon" src="/icon/home.svg" alt="home">
		</nuxt-link>
		<!-- <nuxt-link class="nav-list-item" to="/">Home</nuxt-link> -->
		<!-- <nuxt-link class="nav-list-item" to="/charts">Charts</nuxt-link> -->
		<img id="theme" src="/icon/sun.svg" alt="theme" @click="toggleTheme">
		<div id="sorter-toggler" @click="toggleSorter">
			<img id="sort" src="/icon/sort.svg" alt="sort">
		</div>
		<div id="sorter" class="hiding">
			<div class="sorter-method">
				<div class="sorter-title">Sort By:</div>
				<div class="sorter-option" @click="sortShows" data-sortoption="name">Name</div>
				<div class="sorter-option" @click="sortShows" data-sortoption="date">Date</div>
				<div class="sorter-option" @click="sortShows" data-sortoption="rating">Rating</div>
			</div>
			<div class="sorter-method">
				<div class="sorter-title">Search:</div>
				<input id="search" type="text" @input="search" @change="search">
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
			sortRating: 1
		}
	},
	methods: {
		toggleTheme: function() {
			this.$emit("toggle-theme")
		},
		handleScroll: function() {
			let y = window.scrollY;
			this.scroll_new = y;
			let nav_wrapper = document.getElementById("navigation-wrapper");
			let sorter = document.getElementById("sorter");
			if (this.scroll_new > this.scroll_old) {
				if (sorter && sorter !== null) {
					sorter.classList.add("nav-hiding");
				}
				nav_wrapper.classList.add("nav-hidden");
				this.scroll_old = y;
			} else if (this.scroll_new < this.scroll_old) {
				if (sorter && sorter !== null) {
					sorter.classList.remove("nav-hiding");
				}
				nav_wrapper.classList.remove("nav-hidden");
				this.scroll_old = y;
			}
		},
		sortShows: function(e) {
			let shows = [...document.getElementsByClassName("show")];
			let wrapper = document.getElementById("shows-wrapper");
			let len = shows.length;
			let sortprop = e.target.dataset.sortoption;
			let aa, bb, sorted;
			if (sortprop == "name") {
				sorted = shows.sort((a, b) => {
					let aa = a.dataset[sortprop];
					let bb = b.dataset[sortprop];
					if (this.sortName % 2 == 0) {
						return aa < bb ? -1 : aa > bb ? 1 : 0
					} else {return aa > bb ? -1 : aa < bb ? 1 : 0}
				});
				this.sortName++
			} else if (sortprop == "date") {
				sorted = shows.sort((a, b) => {
					let aa = parseInt(a.dataset[sortprop]);
					let bb = parseInt(b.dataset[sortprop]);
					if (this.sortDate % 2 == 0) {
						return aa < bb ? -1 : aa > bb ? 1 : 0
					} else {return aa > bb ? -1 : aa < bb ? 1 : 0}
				});
				this.sortDate++
			} else if (sortprop == "rating") {
				sorted = shows.sort((a, b) => {
					let aa = parseFloat(a.dataset[sortprop]);
					let bb = parseFloat(b.dataset[sortprop]);
					if (this.sortRating % 2 == 0) {
						return aa < bb ? -1 : aa > bb ? 1 : 0
					} else {return aa > bb ? -1 : aa < bb ? 1 : 0}
				});
				this.sortRating++
			}
			for (let each of sorted) {
				wrapper.appendChild(each)
			}
		},
		search: function() {
			setTimeout(() => {
				let searchText = document.getElementById("search").value.toLowerCase();
				// console.log(searchText)
				let shows = [...document.getElementsByClassName("show")];
				// let not = shows.filter(show => show.dataset.name.indexOf(searchText) == -1);
				for (let each of shows) {
					if (each.dataset.name.toLowerCase().indexOf(searchText) == -1) {
						each.classList.add("hide")
					} else if (each.dataset.name.toLowerCase().indexOf(searchText) > -1) {
						each.classList.remove("hide")
					}
					// each.dataset.name.indexOf(searchText) <= 0 ? each.classList.add("hide") : each.classList.remove("hide")
				}
			}, 500);
		},
		toggleSorter: function() {
			let sorter = document.getElementById("sorter");
			sorter.classList.toggle("hiding")
		}
	},
	mounted() {
		window.addEventListener('scroll', this.handleScroll);
	}
}
</script>

<style lang="sass">
#navigation-wrapper
	@include flexCenter
	// justify-content: space-between
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
		top: -3rem
	.nav-list-item
		text-decoration: none
	#home
		margin: 0 0.5rem 0 0.5rem
		#home-icon
			height: 1.25rem
			width: 1.25rem
			padding: 0.5rem
			filter: var(--theme-icon)
			box-sizing: content-box
			transition: filter 0.25s ease-in-out
	#theme
		height: 1.25rem
		width: 1.25rem
		cursor: pointer
		padding: 0.5rem
		margin: 0 0.5rem 0 0.5rem
		filter: var(--theme-icon)
		box-sizing: content-box
		transition: filter 0.25s ease-in-out
	#sorter
		@include flexCenter
		position: absolute
		top: 2.75rem
		margin: 0 auto
		height: 100%
		width: 100%
		// border: 0.1rem solid rgba(white, 0.25)
		// background: #222
		background: var(--theme-whiteBG)
		padding: 0.25rem
		transition: $transition
		border-radius: 0.25rem
		&.nav-hiding
			top: -1px
		&.hiding
			top: -5rem
		.sorter-method
			@include flexCenter
			margin: 0.25rem
			// border: 0.1rem solid rgba(white, 0.25)
			.sorter-title
				margin: 0.25rem
				// border: 0.1rem solid rgba(white, 0.25)
			.sorter-option
				margin: 0.25rem
				// background: #333
				background: var(--theme-itemWhite)
				padding: 0.25rem
				border-radius: 0.25rem
				cursor: pointer
				transition: background 0.25s ease-in-out
				&:hover
					// background: #444
				// border: 0.1rem solid rgba(white, 0.25)
	#sorter-toggler
		#sort
			height: 1.25rem
			width: 1.25rem
			cursor: pointer
			padding: 0.5rem
			// margin: 0 0.5rem 0 0.5rem
			filter: var(--theme-icon)
			box-sizing: content-box
		// transition: filter 0.25s ease-in-out
		// position: fixed
		// top: 0
		// right: 0
		// z-index: 3
		// margin: 0.5rem
		// padding: 0
		// background: var(--theme-whiteBG)
		// opacity: 0.66
		// border-radius: 0.5rem
		// &:hover
			// opacity: 1
</style>
