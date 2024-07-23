import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Switch,Image,SafeAreaView, ScrollView, TextInput,TouchableOpacity } from 'react-native';
import React, {useState} from 'react';



export default function App() {

  const [InputValueGasPrice,SetInputValueGasPrice]= useState('');
  const [InputValueGasMileage, SetInputValueGasMileage]= useState('');
  const [InputValueElectircityPrice,SetInputValueElectircityPrice] = useState('');
  const [InputValueElectricMileage,SetInputValueElectricMileage] = useState('');
  const [KMPerYear,setKMPerYear] = useState('15000');
  const [finalResult, SetFinalResult] = useState({
    GascostPerYear: '0.00',
    ElectriCostPerYear: '0.00',
    Savings: '0.00',
  });

{/*calculation fromula performed here */}

const CalcaulateSaving = ()=>{
  const GascostPerYear= (KMPerYear/parseFloat(InputValueGasMileage)) *parseFloat(InputValueGasPrice);
  const ElectriCostPerYear = (KMPerYear/parseFloat(InputValueElectricMileage)) * parseFloat(InputValueElectircityPrice);
  const Savings= GascostPerYear- ElectriCostPerYear;



  SetFinalResult({
    GascostPerYear: GascostPerYear.toFixed(2),
    ElectriCostPerYear: ElectriCostPerYear.toFixed(2),
    Savings:  Savings.toFixed(2),
  });
}

  return (
    <SafeAreaView style={styles.safeArea}> 
    <ScrollView contentContainerStyle={styles.scrollContainer}>

    <View style={styles.container}>

      <Text style={styles.title}> EV Savings Calculator </Text>
      <Text style={styles.label}> Gas Vehicle Information </Text>
      {/*text input to get the user value for gas value information */}

      <View style={styles.row}>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        placeholder='Price per Liter ($/L)'
        value={InputValueGasPrice}
        onChangeText={SetInputValueGasPrice}
      />
      <TextInput 
       style={styles.input}
        keyboardType='numeric'
        placeholder='Gas Mileage (km/L)'
        value={InputValueGasMileage}
        onChangeText={SetInputValueGasMileage}
      />
      </View>
      <Text style={styles.label}> Electric Vehicle Information </Text>

      {/*text input to get the user value for Electric value information */}
      <View style={styles.row}>
      <TextInput
      style={styles.input}
      keyboardType='numeric'
      placeholder='Utilities cost ($/KWH)'
      value={InputValueElectircityPrice}
      onChangeText={SetInputValueElectircityPrice}
      />
      <TextInput 
       style={styles.input}
        keyboardType='numeric'
        placeholder='EV Mileage (km/KWH)'
        value={InputValueElectricMileage}
        onChangeText={SetInputValueElectricMileage}
      />
      </View>

      <Text style={styles.label}>How many km do you drive each year?</Text>
      <View style={styles.kmButtonsContainer}>

      <TouchableOpacity
       style={ KMPerYear === '15000' ? styles.kmButtonSelected :styles.kmButton}
        onPress={()=> setKMPerYear('15000')}>
      <Text Style = {styles.kmButtonText}>15000</Text> 
      </TouchableOpacity>

      <TouchableOpacity
       style={ KMPerYear === '25000' ? styles.kmButtonSelected :styles.kmButton}
        onPress={()=> setKMPerYear('25000')}>
      <Text Style = {styles.kmButtonText}>25000</Text> 
      </TouchableOpacity>

      <TouchableOpacity
       style ={ KMPerYear === '40000' ? styles.kmButtonSelected :styles.kmButton}
        onPress={()=> setKMPerYear('40000')}>
      <Text Style = {styles.kmButtonText}>40000</Text> 
      </TouchableOpacity>
      

      </View>

      <TouchableOpacity style={styles.CalculateButton} onPress={CalcaulateSaving}>
        <Text style={styles.CalculateButtonText}>Total Estimate Savings</Text>

      </TouchableOpacity>


      {finalResult &&(
        <View style={styles.finalResult}>
           <Text style={styles.resultLabel}> For the Price of 1 Liter of Gas, You can travel: </Text>
          <View style= {styles.finalResultRow}>
            <View style={[styles.finalresultBox, { backgroundColor: '#FFCDD2' }]}>
            <Image style={[styles.Image, { width: 60, height: 60 }]} source={require("./assets/gas.png")} />
            <Text style={styles.finalresultText}>{( parseFloat(InputValueGasMileage)).toFixed(2)}</Text>
            <Text style={styles.finalresultText}> km</Text>
            </View>
            <View style={[styles.finalresultBox, { backgroundColor: '#B2EBF2' }]}>
            <Image style={[styles.Image, { width: 60, height: 60 }]} source={require("./assets/petrol.png")} />
                  <Text style={styles.finalresultText}>{( parseFloat(InputValueElectricMileage *(InputValueGasPrice/InputValueElectircityPrice))).toFixed(2)}</Text>
                  <Text style={styles.finalresultText}> km</Text>
            </View>
            <View style={[styles.finalresultBox, { backgroundColor: '#FFF9C4' }]}>
            <Image style={[styles.Image, { width: 60, height: 60 }]} source={require("./assets/go.png")} />
            <Text style={styles.finalresultText}>{(( parseFloat(InputValueElectricMileage *(InputValueGasPrice/InputValueElectircityPrice)))-( parseFloat(InputValueGasMileage))).toFixed(2)} </Text>
            <Text style={styles.finalresultText}> km more</Text>
            </View>
          </View>
          <Text style={styles.savingsLabel}>By switching to electric, you obtain:</Text>
           <Text style={styles.savingsValue}>${finalResult.Savings} in savings per year</Text>
        </View>
       
      )}
    
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding:20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color:"#0000FF",
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 80,
    width:170,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: "row",
    justifyContent: 'space-between',
    justifyContent : 'space-evenly',
  },
  kmButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    justifyContent : 'space-evenly',
    marginVertical: 10,
  },
  kmButton: {
    flex: 1,
    height: 40,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  kmButtonSelected: {
    flex: 1,
    height: 40,
    backgroundColor: '#e8b923',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    borderRadius: 5,
  },
  kmButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  CalculateButton: {
    height: 50,
    backgroundColor: '#0000FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  CalculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finalResult: {
    marginTop: 20,
  },
  resultLabel: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 10,
  },
  finalResultRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  finalresultBox: {
    flexDirection: 'column',
    justifyContent : 'space-evenly',
    width: '30%',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  finalresultText: {
    flexDirection: 'column',
    justifyContent : 'space-evenly',
    fontSize: 16,
    fontWeight: 'bold',
  },
  savingsLabel: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  savingsValue: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
});
