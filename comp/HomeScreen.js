
import React, { Component } from 'react';
import { Container, Content, Form, Item, Picker } from 'native-base';
import { View, StyleSheet, Text, Button, ActivityIndicator, Image, ImageBackground, Alert, Modal, Pressable } from 'react-native';
import { YellowBox } from 'react-native';

import firebase from '../database/firebaseDb';
import { useState } from 'react';



class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.dbRef = firebase.firestore().collection('user');
        this.state = {
            temp: "",
            point: 0,
            date: "",
            showdate: "",
            isLoading: false,
            hide: false,
            modalVisible: false


        };


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


    storeUser() {
        if (this.state.temp === '') {
            alert('Fill at least your name!')
        } else {

            this.setState({

                point: this.state.point += 5,
                // isLoading: true,
                modalVisible: true,


            });
            const updateDBRef = firebase.firestore().collection('user').doc("point");
            updateDBRef.set({
                point: this.state.point,
            })




            this.dbRef.add({


                temp: this.state.temp,
                showdate: this.state.showdate,
                date: this.state.date,

            })



        }
    }



    componentDidMount() {
        const dbRef = firebase.firestore().collection('user').doc("point");
        dbRef.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    point: user.point,
                    temp: user.temp,
                    isLoading: false
                });
            } else {
                console.log("Document does not exist!");
            }
        });
    }




    render() {
        const { modalVisible } = this.state;
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
                                justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                            <Image style={{
                                width: 25,
                                height: 25,
                                marginRight: 15
                            }} source={require('../assets/heart.png')} /><Text>{this.state.point}</Text>

                        </View>




                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: 80, padding: 30 }}>
                            <Image
                                style={{
                                    width: 150,
                                    height: 370,
                                }}
                                source={require('../assets/sun.png')}

                            />
                        </View>





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
                                        placeholderStyle={{ fontWeight: "bold", fontSize: 20 }}
                                        // placeholderStyle={{ color: "#bfc6ea" }}
                                        // placeholderIconColor="#007aff"
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
                                        <Picker.Item label="36" value="36.0" />
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
                                        <Picker.Item label="36" value="36.0" />
                                    </Picker>



                                    <View style={styles.button}>
                                        <Button

                                            title='CHECK'
                                            onPress={() => this.storeUser()}
                                            color="#19AC52"
                                        />
                                    </View>
                                </Item>

                            </Form>
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