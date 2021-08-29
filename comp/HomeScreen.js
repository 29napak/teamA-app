
import React, { Component, useEffect } from 'react';
import { Container, Content, Form, Item, Picker, } from 'native-base';
import { View, StyleSheet, Text, Button, ActivityIndicator, Image, ImageBackground, Alert, Modal, Pressable } from 'react-native';
import { YellowBox } from 'react-native';
import firebase from '../database/firebaseDb';
import { StackActions, NavigationActions, NavigationEvents } from 'react-navigation';




class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.firestoreRef = firebase.firestore().collection("user")
        this.dbRef = firebase.firestore().collection('user');
        this.state = {
            temp: "",
            point: 0,
            date: "",
            showdate: "",
            isLoading: false,
            hide: false,
            modalVisible: false,
            fowimg: [require('../assets/char.png'), require('../assets/char1.png'), require('../assets/flower_1.png'), require('../assets/flower_2.png')],
            podimg: [require('../assets/flowerpot.png'), require('../assets/yellow.png'), require('../assets/pink.png'), require('../assets/blue.png'), require('../assets/yellow.png')],

        };

    }


    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getcollection);

    }
    componentWillUnmount() {
        this.unsubscribe();

    }
    getcollection = () => {

        const pod = firebase.firestore().collection('user').doc("pod")
        const level = firebase.firestore().collection('user').doc("level")
        const point = firebase.firestore().collection('user').doc("point")
        point.get().then((res) => {
            if (res.exists) {
                const user3 = res.data();
                this.setState({
                    point: user3.point,
                    score: user3.score,
                    isLoading: false,
                });
            } else {
                console.log("Document does not exist!");
            }
        });
        pod.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    pod: user.pod,
                    isLoading: false,
                });
            } else {
                console.log("Document does not exist!");
            }
        });
        level.get().then((res) => {
            if (res.exists) {
                const user2 = res.data();
                this.setState({
                    level: user2.level,
                    hana1: user2.hana1,
                    hana2: user2.hana2,
                    isLoading: false,
                });
            } else {
                console.log("Document does not exist!");
            }
        });

    }








    onValueChange2(value: string) {

        const y = new Date().getFullYear();
        const m = new Date().getMonth() + 1;
        const d = new Date().getDate();
        const h = new Date().getHours();
        const min = new Date().getMinutes();
        const mz = this.state.m += 1;
        const z = y + '年' + m + '月' + d + '日' + h + ':' + min;
        this.setState({
            temp: value,
            date: new Date(),
            showdate: z,




        });

    }
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    hideModal = () => {
        this.setState({
            hide: true,
            temp: '',
            isLoading: false,
        });
        this.props.navigation.navigate('tempScreen')
    }


    inputValueUpdate = (val, prop) => {
        const state = this.state;
        state[prop] = val;
        this.setState(state);
    }

    checkLevel() {
        if (this.state.score <= 0) {
            this.setState({
                level: this.state.level = 0
            })

        }
        else if (this.state.score <= 2) {
            this.setState({
                level: this.state.level = 1
            })
        }
        else if (this.state.score <= 3) {
            this.setState({
                level: this.state.level = 2,
                hana1: this.state.hana1 = 1
            })
        }
        else if (this.state.score <= 4) {
            this.setState({
                level: this.state.level = 3,
                hana2: this.state.hana2 = 1

            })
        }
        else {
            if (this.state.score <= 15) {
                this.setState({
                    level: this.state.level = 0
                })
            }
        }

        const updateDBRef = firebase.firestore().collection('user').doc("level");
        updateDBRef.set({
            level: this.state.level,
            hana1: this.state.hana1,
            hana2: this.state.hana2
        })

    }

    storeUser() {

        if (this.state.temp === '') {
            alert('Fill at least your name!')
        }
        else {

            this.setState({
                point: this.state.point += 5,
                score: this.state.score += 1,
                modalVisible: true,
            });
            const updateDBRef = firebase.firestore().collection('user').doc("point");
            updateDBRef.set({
                point: this.state.point,
                score: this.state.score
            })

            this.dbRef.add({
                temp: this.state.temp,
                showdate: this.state.showdate,
                date: this.state.date,

            })
        }

    }









    render() {
        const getpod = this.props.navigation.getParam('pod')

        const { modalVisible, pod } = this.state;
        console.disableYellowBox = true;
        if (this.state.isLoading) {
            return (
                <View style={styles.preloader}>
                    <ActivityIndicator size="large" color="#9E9E9E" />
                </View>
            )

        }




        return (




            <Container style={{ flex: 3, flexDirection: 'colum', justifyContent: 'space-between', alignItems: 'stretch' }}>

                <ImageBackground source={require('../assets/bg.png')} resizeMode="cover" style={{
                    width: '100%',
                    height: '100%',
                    flex: 1
                }}>
                    <Content >



                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                                Alert.alert("Modal has been closed.");
                                this.setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                                <View style={styles.modalView}>
                                    <Text style={styles.modalText}>今日の体温は　：　{this.state.temp}　です。</Text>
                                    <Text style={{ margin: 10, paddingHorizontal: 40, paddingBottom: 20 }}><Image style={{ width: 25, height: 25, marginTop: -8, paddingHorizontal: 10 }} source={require('../assets/heart.png')} />{this.state.point - 5} + 5</Text>
                                    <Pressable
                                        style={[styles.modalButton, styles.buttonClose]}
                                        onPress={() => {
                                            this.setModalVisible(!modalVisible);
                                            this.hideModal();
                                        }}
                                    >
                                        <Text style={styles.textStyle}>OK</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </Modal>



                        <View
                            style={{
                                marginLeft: 10,
                                backgroundColor: '#fff', borderRadius: 50, height: 35, width: 90, flex: 1, flexDirection: "row",
                                justifyContent: 'center', alignItems: 'center',
                                position: "absolute"
                            }}

                        >
                            <Image style={{
                                width: 25,
                                height: 25,
                                marginRight: 15
                            }} source={require('../assets/heart.png')} /><Text>{this.state.point}</Text>

                        </View>



                        <View style={{ flex: 1, alignItems: 'center', marginTop: "30%" }}>
                            <Image
                                style={{
                                    flex: 1, height: 250, width: 250, resizeMode: "contain"
                                }}
                                source={this.state.fowimg[this.state.level]}

                            />
                            <Image
                                style={{
                                    flex: 1, height: 250, width: 250, resizeMode: "contain",
                                    position: "relative", top: "-11%"
                                }}
                                source={this.state.podimg[this.state.pod]}

                            />
                        </View>










                        <View style={{ position: "relative", top: "-10%" }}>



                            <View style={{

                                backgroundColor: '#19AC52',
                                marginHorizontal: 20,
                                borderRadius: 20
                            }}

                            >
                                <Form style={{
                                    paddingVertical: 10,
                                    marginVertical: 10
                                }}>




                                    <Item picker
                                        style={{ borderColor: "#19AC52" }}>

                                        <Picker

                                            mode="dropdown"
                                            iosIcon={<Image style={{ marginRight: 20, width: 15, height: 25 }} source={require('../assets/arrows.png')} />}
                                            style={{ marginLeft: 20, width: 180, height: 60, backgroundColor: "white" }}
                                            placeholder="体温入力"
                                            iosHeader="体温を選択"
                                            placeholderStyle={{ fontWeight: "bold", fontSize: 20 }}
                                            // placeholderStyle={{ color: "#bfc6ea" }}
                                            // placeholderIconColor="#007aff"
                                            modalStyle={{
                                                backgroundColor: '#a2e4b8',



                                            }}
                                            itemStyle={{
                                                backgroundColor: '#fff',
                                                marginHorizontal: 20,
                                                marginVertical: 5,
                                                borderRadius: 10,
                                                borderColor: 'green',
                                                borderWidth: 1

                                            }}
                                            itemTextStyle={{
                                                fontSize: 20,
                                                marginLeft: '60%',
                                                color: 'green',
                                                fontWeight: 'bold'

                                            }}
                                            headerStyle={{ backgroundColor: "green" }}
                                            headerBackButtonTextStyle={{ color: "#fff" }}
                                            headerTitleStyle={{ color: "#fff" }}

                                            selectedValue={this.state.temp}
                                            onValueChange={this.onValueChange2.bind(this)}
                                        >

                                            <Picker.Item label="34.0" value="34.0" />
                                            <Picker.Item label="34.1" value="34.1" />
                                            <Picker.Item label="34.2" value="34.2" />
                                            <Picker.Item label="34.3" value="34.3" />
                                            <Picker.Item label="34.4" value="34.4" />
                                            <Picker.Item label="34.5" value="34.5" />
                                            <Picker.Item label="34.6" value="34.6" />
                                            <Picker.Item label="34.7" value="34.7" />
                                            <Picker.Item label="34.8" value="34.8" />
                                            <Picker.Item label="34.9" value="34.9" />
                                            <Picker.Item label="35.0" value="35.0" />
                                            <Picker.Item label="35.1" value="35.1" />
                                            <Picker.Item label="35.2" value="35.2" />
                                            <Picker.Item label="35.3" value="35.3" />
                                            <Picker.Item label="35.4" value="35.4" />
                                            <Picker.Item label="35.5" value="35.5" />
                                            <Picker.Item label="35.6" value="35.6" />
                                            <Picker.Item label="35.7" value="35.7" />
                                            <Picker.Item label="35.8" value="35.8" />
                                            <Picker.Item label="35.9" value="35.9" />
                                            <Picker.Item label="36.0" value="36.0" />
                                            <Picker.Item label="36.1" value="36.1" />
                                            <Picker.Item label="36.2" value="36.2" />
                                            <Picker.Item label="36.3" value="36.3" />
                                            <Picker.Item label="36.4" value="36.4" />
                                            <Picker.Item label="36.5" value="36.5" />
                                            <Picker.Item label="36.6" value="36.6" />
                                            <Picker.Item label="36.7" value="36.7" />
                                            <Picker.Item label="36.8" value="36.8" />
                                            <Picker.Item label="36.9" value="36.9" />
                                            <Picker.Item label="37.0" value="37.0" />
                                            <Picker.Item label="37.1" value="37.1" />
                                            <Picker.Item label="37.2" value="37.2" />
                                            <Picker.Item label="37.3" value="37.3" />
                                            <Picker.Item label="37.4" value="37.4" />
                                            <Picker.Item label="37.5" value="37.5" />
                                            <Picker.Item label="37.6" value="37.6" />
                                            <Picker.Item label="37.7" value="37.7" />
                                            <Picker.Item label="37.8" value="37.8" />
                                            <Picker.Item label="37.9" value="37.9" />
                                            <Picker.Item label="38.0" value="38.0" />
                                            <Picker.Item label="38.1" value="38.1" />
                                            <Picker.Item label="38.2" value="38.2" />
                                            <Picker.Item label="38.3" value="38.3" />
                                            <Picker.Item label="38.4" value="38.4" />
                                            <Picker.Item label="38.5" value="38.5" />
                                            <Picker.Item label="38.6" value="38.6" />
                                            <Picker.Item label="38.7" value="38.7" />
                                            <Picker.Item label="38.8" value="38.8" />
                                            <Picker.Item label="38.9" value="38.9" />
                                            <Picker.Item label="39.0" value="39.0" />
                                            <Picker.Item label="39.1" value="39.1" />
                                            <Picker.Item label="39.2" value="39.2" />
                                            <Picker.Item label="39.3" value="39.3" />
                                            <Picker.Item label="39.4" value="39.4" />
                                            <Picker.Item label="39.5" value="39.5" />
                                            <Picker.Item label="39.6" value="39.6" />
                                            <Picker.Item label="39.7" value="39.7" />
                                            <Picker.Item label="39.8" value="39.8" />
                                            <Picker.Item label="39.9" value="39.9" />
                                            <Picker.Item label="40.0" value="40.0" />
                                            <Picker.Item label="40.1" value="40.1" />
                                            <Picker.Item label="40.2" value="40.2" />
                                            <Picker.Item label="40.3" value="40.3" />
                                            <Picker.Item label="40.4" value="40.4" />
                                            <Picker.Item label="40.5" value="40.5" />
                                            <Picker.Item label="40.6" value="40.6" />
                                            <Picker.Item label="40.7" value="40.7" />
                                            <Picker.Item label="40.8" value="40.8" />
                                            <Picker.Item label="40.9" value="40.9" />
                                            <Picker.Item label="41.0" value="41.0" />

                                        </Picker>



                                        <View style={styles.button}>
                                            <Button
                                                title='CHECK'
                                                onPress={() => {
                                                    this.storeUser();
                                                    this.checkLevel();
                                                }}
                                                color="#19AC52"
                                            />
                                        </View>
                                    </Item>

                                </Form>
                            </View>
                        </View>


                    </Content>

                </ImageBackground>

            </Container>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 35
    },
    inputGroup: {
        flex: 1,
        padding: 0,
        marginBottom: 15,
        // borderBottomWidth: 1,
        // borderBottomColor: '#cccccc',
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        backgroundColor: '#ffff',
        padding: 15,
        borderRadius: 25,
        position: 'relative',
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButton: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
        marginHorizontal: 30,
        marginVertical: 5,

    },
    modalText: {
        padding: 20,
        textAlign: "center"
    }
})

export default HomeScreen;