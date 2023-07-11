import { OptionChoiceType, OptionType } from "../type/optionType";

export function optionUpdate(key: string, value: boolean, setOptions: any) {
  function btnUpdate() {
    setOptions(
      (prev: Map<string, boolean>) => new Map([...prev, [key, !value]]),
    );
  }
  btnUpdate();
}

export function optionListUpdate(key: string, value: OptionChoiceType, setOptions: any) {
	setOptions((prev: Map<string, OptionType>) => new Map([...prev, [key, value]]));
}

export function allOptionUpdate(selectedList: string[], setOptions: any) {
  const result = new Map<string, boolean>();
  for (let i = 0; i < selectedList.length; i++) {
    result.set(selectedList[i], true);
  }
  setOptions(result);
}
