
import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator

} from 'react-native';
import firebase from '../database/firebaseDb';
import { LineChart } from "react-native-chart-kit";




export default class ChartView extends React.Component {
    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection("user").orderBy('date').limitToLast(5);
        this.state = {
            isLoading: true,
            userArr: [],
            point: '',
            date: '',
            temp: ''
        }
    }


    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getcollection);
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    getcollection = (querySnapshot) => {

        const userArr = [];
        querySnapshot.forEach((res) => {
            const { temp, date } = res.data();
            userArr.push({

                date,
                temp,

            })
        })
        this.setState({
            userArr,
            isLoading: false,



        })

    }



    render() {

        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>

            )
        }

        const tempData = this.state.userArr.map((item, i) => {

            return item.temp;
        })









        const data = {
            labels: tempData,
            datasets: [
                {
                    data: tempData,
                    color: (opacity = 1) => `rgba(43, 83, 156, ${opacity})`, // optional
                    strokeWidth: 2 // optional
                }
            ],

        };
        return (

            <View>




                <LineChart
                    data={data}
                    width={350} // from react-native
                    height={280}
                    // yAxisLabel="$"
                    // yAxisSuffix="k"
                    yAxisInterval={1} // optional, defaults to 1
                    chartConfig={{
                        backgroundColor: "#9ccfcc",
                        backgroundGradientFrom: "#ffff",
                        backgroundGradientTo: "#FFF",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(193, 240, 198, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        propsForDots: {
                            r: "6",
                            strokeWidth: "2",
                            stroke: "#1c4b41"
                        }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />



            </View >

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    text: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },
});