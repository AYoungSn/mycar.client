export function optionUpdate(key:string, value: boolean, setOptions:any) {
	function btnUpdate() {
		setOptions((prev: Map<string, boolean>) => new Map([...prev, [key, !value]]));
	}
	btnUpdate();
}