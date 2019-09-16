/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Text>Hello World</Text>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default App;
