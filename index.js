import { registerRootComponent } from 'expo';
import { AppRegistry, YellowBox } from 'react-native';
import { name as appName } from './app.json';

import App from './App';

YellowBox.ignoreWarnings(['Remote debugger']);



// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
