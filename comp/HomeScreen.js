
import React, { Component } from 'react';
import { Container, Content, Form, Item, Picker, Icon, Input, } from 'native-base';
import { View, StyleSheet, Text, Button, ActivityIndicator, Image } from 'react-native';
import { YellowBox } from 'react-native';

import firebase from '../database/firebaseDb';



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




        };


    }


    onValueChange2(value: string) {

        const y = new Date().getFullYear();
        const m = new Date().getMonth();
        const d = new Date().getDate();
        const h = new Date().getHours();
        const min = new Date().getMinutes();
        const z = y + '年' + m + '月' + d + '日' + h + ':' + min;
        this.setState({
            temp: value,
            date: new Date(),
            showdate: z,




        });

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
                isLoading: true,
            });
            const updateDBRef = firebase.firestore().collection('user').doc("point");
            updateDBRef.set({
                point: this.state.point,
            })



            this.dbRef.add({


                temp: this.state.temp,
                showdate: this.state.showdate,
                date: this.state.date,



            }).then((res) => {
                this.setState({
                    temp: '',
                    isLoading: false,
                });
                this.props.navigation.navigate('tempScreen')

            })
                .catch((err) => {
                    console.error("Error found: ", err);
                    this.setState({
                        isLoading: false,
                    });
                });
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



                <Content >


                    <View
                        style={{
                            marginLeft: 10,
                            backgroundColor: '#fff', borderWidth: 2, borderColor: "green", borderRadius: 50, height: 35, width: 90, flex: 1, flexDirection: "row",
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
                    }}

                    >
                        <Form style={{
                            margin: 20
                        }}>




                            <Item picker
                                style={{ borderColor: "#19AC52" }}>

                                <Picker

                                    mode="dropdown"
                                    iosIcon={<Image style={{ marginRight: 20, width: 15, height: 25 }} source={require('../assets/arrows.png')} />}
                                    style={{ marginLeft: 20, width: 200, height: 60, backgroundColor: "white" }}
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

    }
})

export default HomeScreen;