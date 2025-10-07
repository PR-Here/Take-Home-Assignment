import { SCREEN_NAMES } from './constants';

export type RootStackParamList = {
  [SCREEN_NAMES.COW_LIST]: undefined;
  [SCREEN_NAMES.ADD_COW]: undefined;
  [SCREEN_NAMES.COW_DETAIL]: { cowId: string };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

