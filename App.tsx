import React from 'react';
import {StatusBar} from 'react-native';
import {AppProvider} from './src/context/AppContext';
import {RootNavigator} from './src/navigation/RootNavigator';
import {colors} from './src/theme';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <RootNavigator />
    </AppProvider>
  );
}

export default App;
