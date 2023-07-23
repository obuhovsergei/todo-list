export const resolveAction = (namespace, action) => {
	const separator = "/";
	return [namespace, action].join(separator);
};

export const resolveNestedNamespace = (...segments) => {
	const separator = "/";
	return segments.join(separator);
};

export const resolveNestedState = (state, namespaceSegments) => {
	let current = state;
	
	for (const namespaceSegment of namespaceSegments) {
		current = current[namespaceSegment];
	}
	
	return current;
};

export const resolveCustomNestedNamespace = (param, ...segments) => {
	const separator = "/";
	return resolveCustomNamespaceSegment(segments.join(separator), param);
};

export const resolveCustomNamespaceSegment = (namespace, param) => {
	return `${namespace}-${param}`;
};

export const resolveMutation = (namespace, mutation) => {
	const separator = "/";
	return [namespace, mutation].join(separator);
};

export const resolveGetter = (namespace, getter) => {
	const separator = "/";
	return [namespace, getter].join(separator);
};

export const resolveComponentNamespace = ctx => ctx.namespace;
