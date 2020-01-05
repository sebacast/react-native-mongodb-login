
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from './Login';
import Inicio from './Inicio';


const AppStack = createStackNavigator({ Home: Inicio },{headerMode: null});
const AuthStack = createStackNavigator({ Login: Login },{headerMode: null});

  const SwitchNavigator = createSwitchNavigator(
    {
      Auth: AuthStack,
      App: AppStack
    },
    {
      initialRouteName: 'Auth'
    }
  )
  
  const AppContainer = createAppContainer(SwitchNavigator)
  
  export default AppContainer