export class SnapshotStateBuilder {
	constructor({ options }) {
		this.options = options;
	}
	
	build() {
		return {
			snapshot: {
				...this.options
			}
		};
	}
}
