import { ComponentType } from 'react';
import { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { SCREEN_NAMES } from './constants';
import {
  CowListScreen,
  AddCowScreen,
  CowDetailScreen,
} from '../screens';

export interface ScreenConfig {
  name: string;
  component: ComponentType<any>;
  options?: NativeStackNavigationOptions;
}

export const APP_SCREENS: ScreenConfig[] = [
  {
    name: SCREEN_NAMES.COW_LIST,
    component: CowListScreen,
    options: {
      title: 'Cow Management',
    },
  },
  {
    name: SCREEN_NAMES.ADD_COW,
    component: AddCowScreen,
    options: {
      title: 'Add New Cow',
    },
  },
  {
    name: SCREEN_NAMES.COW_DETAIL,
    component: CowDetailScreen,
    options: {
      title: 'Cow Details',
    },
  },
];

