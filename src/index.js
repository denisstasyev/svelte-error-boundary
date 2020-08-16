import ErrorBoundary from './ErrorBoundary.svelte'

export default class errorBoundary extends ErrorBoundary {
	constructor(config) {
		config.props.$$slots.default = config.props.$$slots.default.map(x => (...args) => {
			try {
				return x(...args)
			} catch (error) {
				if (config.props.handleError) {
					config.props.handleError(error, config.props.name)
				}
				console.log(`ERROR${config.props.name ? ` (${config.props.name})` : ''}: `, error)
				return null
			}
		})

		super(config)
	}
}
