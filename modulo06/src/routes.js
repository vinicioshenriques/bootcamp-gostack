// no react native adicionar as linhas extras do gesture handler no mainActivity.java

// import com.facebook.react.ReactActivityDelegate;
// import com.facebook.react.ReactRootView;
// import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

// @Override
//     protected ReactActivityDelegate createReactActivityDelegate() {
//     return new ReactActivityDelegate(this, getMainComponentName()) {
//     @Override
//     protected ReactRootView createRootView() {
//         return new RNGestureHandlerEnabledRootView(MainActivity.this);
//     }
//     };
// }

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Main from './pages/Main';
import User from './pages/User';

const Routes = createAppContainer(
    createStackNavigator(
        {
            Main,
            User,
        },
        {
            headerLayoutPreset: 'center',
            headerBackTitleVisible: false,
            defaultNavigationOptions: {
                headerStyle: {
                    backgroundColor: '#7159c1',
                },
                headerTintColor: '#Fff',
            },
        }
    )
);

export default Routes;
