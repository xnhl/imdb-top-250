import imdb from './assets/data/allIMDBMin.json'
export default {
  mode: 'universal',
  loading: { color: '#fff' },
  css: [
	],
	generate: {
		routes: function() {
			let titles = imdb.map(each => `/${each.title_short}`);
			return titles
		}
	},
  modules: [
    '@nuxtjs/style-resources',
  ],

  styleResources: {
    sass: [
      './assets/*.sass'
    ],
  },
  build: {
    extend (config, ctx) {
    },
    build: {
      postcss: {
        plugins: {
          'postcss-url': false,
          'postcss-nested': {},
          'postcss-responsive-type': {},
          'postcss-hexrgba': {}
        },
        preset: {
          autoprefixer: {
            grid: true
          }
        }
      }
    }
  }
}
