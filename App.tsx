import { WorkoutProvider } from "./src/context/WorkoutContext";

import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./src/navigation/TabNavigator";

export default function App() {
  return (
    <WorkoutProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </WorkoutProvider>
  );
}
