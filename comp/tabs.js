import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from './HomeScreen';
import ShopScreen from './ShopScreen';
import TempScreen from './TempScreen';





const Tab = createBottomTabNavigator();

const Tab = () => {
    return (
        <Tab.Navigator
            tabBarOption={{
                showLaber: true,
                style: {
                    position: 'absolute',
                    backgrounColor: "#0000"
                }
            }}>
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            <Tab.Screen name="ShopScreen" component={ShopScreen} />
            <Tab.Screen name="TempScreen" component={TempScreen} />
        </Tab.Navigator>
    )
}

export default Tab;