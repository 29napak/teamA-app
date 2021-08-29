// screens/UserScreen.js



import React, { Component } from 'react';
import { StyleSheet, ActivityIndicator, View, Text, ScrollView } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements'
import firebase from '../database/firebaseDb';
import ChartView from './chart';


class TempScreen extends Component {

    constructor() {
        super();
        this.firestoreRef = firebase.firestore().collection("user").orderBy('date', 'desc').limit(10);
        this.state = {
            isLoading: true,
            userArr: [],
            date: [],
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
            const { temp, showdate } = res.data();

            userArr.push({
                key: res.id,
                res,
                showdate,
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
                <View style={StyleSheet.preloader}>
                    <ActivityIndicator size="large" color="red" ></ActivityIndicator>
                </View>

            )
        }


        return (


            <View style={{ backgroundColor: "#d8f2ff", height: "100%" }}>
                <View style={{
                    marginLeft: 20, marginRight: 20, marginTop: 40,

                }}>
                    <View >
                        <ChartView></ChartView>
                    </View>

                    <View style={{ margin: 20, paddingTop: 15 }}><Text style={styles.listTopText}>検温履歴</Text></View>
                    <View >
                        <ScrollView style={{ height: 350 }}>
                            {
                                this.state.userArr.map((item) => {
                                    return (

                                        <ListItem style={{ marginBottom: 5 }}

                                            containerStyle={{ backgroundColor: "#fff", borderRadius: 5, }}

                                        >

                                            <Avatar source={require('../assets/favicon.png')} />
                                            <ListItem.Content>

                                                <ListItem.Title
                                                    style={styles.titleText}
                                                >{item.temp}</ListItem.Title>
                                                <ListItem.Subtitle
                                                    style={styles.subText}
                                                >{item.showdate}</ListItem.Subtitle>
                                            </ListItem.Content>
                                        </ListItem>
                                    )
                                })
                            }
                        </ScrollView>
                    </View>
                </View >
            </View>


        )
    }
}
const styles = StyleSheet.create({
    preloader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    },
    listTopText: {
        fontSize: 20,
        fontWeight: '900'
    },
    titleText: {
        color: "#2b5329",
        fontWeight: "600"

    },
    subText: {
        color: "#2b5329",
    }



})
export default TempScreen;