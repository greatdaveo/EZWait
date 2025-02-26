import { useState } from 'react'
import { Text, View } from 'react-native'
import { RadioButton } from 'react-native-paper'

export function RadioGroupExample() {
  const [selectedValue, setSelectedValue] = useState('option1')

  const handleRadioButtonPress = (value: any) => {
    setSelectedValue(value)

    // Add custom logic based on the selected value
    switch (value) {
      case 'option1':
        console.log('Option 1 selected')
        // Execute actions for Option 1
        break
      case 'option2':
        console.log('Option 2 selected')
        // Execute actions for Option 2
        break
      case 'option3':
        console.log('Option 3 selected')
        // Execute actions for Option 3
        break
      default:
        break
    }
  }
  return (
    <View>
      {/* Add a label */}
      <Text>Choose an option:</Text>

      {/* Create a RadioButton.Group */}
      <RadioButton.Group onValueChange={(value) => setSelectedValue(value)} value={selectedValue}>
        {/* Create individual radio buttons with labels */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="option1" color="blue" onPress={() => handleRadioButtonPress('option1')} />
          <Text>Option 1</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="option2" color="red" onPress={() => handleRadioButtonPress('option1')} />
          <Text>Option 2</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <RadioButton value="option3" color="green" onPress={() => handleRadioButtonPress('option1')} />
          <Text>Option 3</Text>
        </View>
      </RadioButton.Group>

      {/* Display the selected value */}
      <Text>Selected Value: {selectedValue}</Text>
    </View>
  )
}
