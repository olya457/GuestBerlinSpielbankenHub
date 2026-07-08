import React from 'react';
import {StatusBar} from 'react-native';
import {AppProvider} from './src/app/providers/AppContext';
import {RootNavigator} from './src/app/navigation/RootNavigator';
import {colors} from './src/shared/theme';

function App(): React.JSX.Element {
  return (
    <AppProvider>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <RootNavigator />
    </AppProvider>
  );
}

export default App;
