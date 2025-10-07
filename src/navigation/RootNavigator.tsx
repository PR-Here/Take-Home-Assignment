import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';
import { SCREEN_NAMES } from './constants';
import { APP_SCREENS } from './screens';
import colors from '../constant/colors';
import { FontName } from '../constant/FontName';
import { getFonts } from '../utils/scaling';

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName={SCREEN_NAMES.COW_LIST}
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.primary,
                },
                headerTintColor: colors.white,
                headerTitleStyle: {
                   fontFamily: FontName.PoppinsBold,
                   fontSize: getFonts(16),
                },
            }}>
            {APP_SCREENS.map((screen) => (
                <Stack.Screen
                    key={screen.name}
                    name={screen.name as any}
                    component={screen.component}
                    options={screen.options}
                />
            ))}
        </Stack.Navigator>
    );
};

export default RootNavigator;

