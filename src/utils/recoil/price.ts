import { atom } from 'recoil';

export const priceState = atom<number>({
  key: 'price',
  default: 0,
});
