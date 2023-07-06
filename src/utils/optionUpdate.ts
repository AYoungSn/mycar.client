export function optionUpdate(key, value, setOptions) {
	function btnUpdate() {
		setOptions((prev) => new Map([...prev, [key, !value]]));
	}
	btnUpdate();
}