export default function MakeOptionCodeList(optionCodes: Map<string, boolean>) {
	let result = '';
	optionCodes.forEach((value, key) => {
		if (value === true) {
			result += key + ',';
		}
	})
	return result;
}