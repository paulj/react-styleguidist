import _ from 'lodash';

export function setComponentsNames(components) {
	components.map((component) => {
        // Try to detect component name or fallback to file name or directory name.
		let { module } = component;
		component.name = (component.props && component.props.displayName) || (
            module.default
                ? (module.default.displayName || module.default.name)
                : (module.displayName || module.name)
        ) || component.nameFallbak;
	});
	return components;
}

export function globalizeComponents(components) {
	components.map((component) => {
		global[component.name] = (!component.props || !component.props.path || component.props.path === 'default')
            ? (component.module.default || component.module)
            : component.module[component.props.path];
	});
}

export function promoteInlineExamples(components) {
	components.map(c => {
		if (c.props.example) {
			c.examples = (c.examples || []).concat(c.props.example);
		}
	});
	return components;
}

export function flattenComponents(components) {
	return _.flatMap(components, c => {
		if (_.isArray(c.props)) {
			return c.props.map(props => _.extend({}, c, {props: props}));
		}
		else {
			return c;
		}
	});
}