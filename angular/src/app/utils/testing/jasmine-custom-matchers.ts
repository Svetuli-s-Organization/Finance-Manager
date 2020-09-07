export const customMatchers = {
	toShareReferenceWith: () => {
		return {
			compare: (actual: any, expected: any) => {
				const result = {
					pass: actual === expected,
					message: '',
				};

				result.message = result.pass ? `Expected properties to not share a reference` : `Expected properties to share a reference`;

				return result;
			},
		};
	},
};
