import React, { Component, useState } from 'react';
import { View, Text, Image, StyleSheet, Button, Modal, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { Container, Content } from 'native-base';
import firebase from '../database/firebaseDb';
import { NavigationContainer, StackActions, NavigationActions } from '@react-navigation/native';



class ShopScreen extends Component {
    constructor(props) {
        super(props);
        this.firestoreRef = firebase.firestore().collection("user")
        this.dbRef = firebase.firestore().collection('user');
        this.state = {
            hide: false,
            modalVisible: false,
            hide2: false,
            modalVisible2: false,
            hana1img: [require('../assets/blackflower.png'), require('../assets/flower_1.png')],
            hana2img: [require('../assets/blackflower.png'), require('../assets/flower_2.png')],
        };

    }

    componentDidMount() {
        this.unsubscribe = this.firestoreRef.onSnapshot(this.getcollection);

    }
    componentWillUnmount() {
        this.unsubscribe();

    }
    getcollection = () => {
        const fow = firebase.firestore().collection('user').doc("level");
        const dbRef2 = firebase.firestore().collection('user').doc("point");
        const pod = firebase.firestore().collection('user').doc("pod");
        pod.get().then((res) => {
            if (res.exists) {
                const user = res.data();
                this.setState({
                    key: res.id,
                    pod: user.pod,
                    isLoading: false,
                    //isPod
                    isPod1: user.isPod1,
                    isPod2: user.isPod2,
                    isPod3: user.isPod3,
                    isPod4: user.isPod4,
                    isPod5: user.isPod5,
                    isPod6: user.isPod6,
                    isPod7: user.isPod7,
                    isPod8: user.isPod8,
                    isPod9: user.isPod9,
                    //bye
                    buy1: user.buy1,
                    buy2: user.buy2,
                    buy3: user.buy3,
                    buy4: user.buy4,
                    buy5: user.buy5,
                    buy6: user.buy6,
                    buy7: user.buy7,
                    buy8: user.buy8,
                    buy9: user.buy9,
                    //wear
                    wear1: user.wear1,
                    wear2: user.wear2,
                    wear3: user.wear3,
                    wear4: user.wear4,
                    wear5: user.wear5,
                    wear6: user.wear6,
                    wear7: user.wear7,
                    wear8: user.wear8,
                    wear9: user.wear9,


                });
            }
        });
        dbRef2.get().then((res) => {
            if (res.exists) {
                const user2 = res.data();
                this.setState({
                    key: res.id,
                    point: user2.point,
                    isLoading: false
                });
            } else {
                console.log("Document does not exist!");
            }
        });
        fow.get().then((res) => {
            if (res.exists) {
                const fow = res.data();
                this.setState({
                    hana1: fow.hana1,
                    hana2: fow.hana2,
                    isLoading: false
                });
            } else {
                console.log("Document does not exist!");
            }
        });

    }

    //modal1=ポイントが足りなかったら表示する
    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
    hideModal = () => {
        this.setState({
            hide: true,
            isLoading: false,
        });
    }
    //modal2=ポイントが足りなかったら表示する
    setModalVisible2 = (visible) => {
        this.setState({ modalVisible2: visible });
    }
    ///okを押したらtitleが変わる
    hideModal2 = () => {
        this.setState({ hide2: true, })
    }


    //funtion start hear=======================================================================


    //funntion1-----------------------------------------------------------
    setIsPod1 = () => {
        if (this.state.point <= 19) {
            if (this.state.buy1 != true) {
                this.setState({
                    modalVisible: true,
                })
            }
            else {
                this.setState({
                    pod: this.state.pod = 1,
                    wear1: this.state.wear1 = '使用中',
                    wear2: this.state.wear2 = "購入済",
                    wear3: this.state.wear3 = "購入済"
                })
                this.props.navigation.navigate('HomeScreen');
            }

        } else if (this.state.isPod1 = true) {
            if (this.state.buy1 != true) {
                this.setState({
                    point: this.state.point -= 20,
                    modalVisible2: true,
                    buy1: this.state.buy1 = true,
                    wear1: this.state.wear1 = "購入済"
                })
            } else if (this.state.pod != 1) {
                this.setState({
                    pod: this.state.pod = 1,
                    wear1: this.state.wear1 = '使用中',
                    wear2: this.state.wear2 = "購入済",
                    wear3: this.state.wear3 = "購入済"
                })
                this.props.navigation.navigate('HomeScreen');



            }


        }
        const updateDBRef = firebase.firestore().collection('user').doc("point");
        updateDBRef.update({
            point: this.state.point,
        })
        const updatepod = firebase.firestore().collection('user').doc("pod");
        updatepod.update({
            pod: this.state.pod,
            isPod1: this.state.isPod1,
            buy1: this.state.buy1,
            wear1: this.state.wear1,
            wear2: this.state.wear2,
            wear3: this.state.wear3,
        })
    }

    //funntion2-----------------------------------------------------------
    setIsPod2 = () => {
        if (this.state.point <= 39) {
            if (this.state.buy2 != true) {
                this.setState({
                    modalVisible: true,
                })
            } else {
                this.setState({
                    pod: this.state.pod = 2,
                    wear2: this.state.wear2 = '使用中',
                    wear1: this.state.wear1 = "購入済",
                    wear3: this.state.wear3 = "購入済"
                })
                this.props.navigation.navigate('HomeScreen');
            }

        } else if (this.state.isPod2 = true) {
            if (this.state.buy2 != true) {
                this.setState({
                    point: this.state.point -= 40,
                    modalVisible2: true,
                    buy1: this.state.buy2 = true,
                    wear1: this.state.wear2 = "購入済"
                })
            }
            else if (this.state.pod != 2) {
                this.setState({
                    pod: this.state.pod = 2,
                    wear2: this.state.wear2 = '使用中',
                    wear1: this.state.wear1 = "購入済",
                    wear3: this.state.wear3 = "購入済"
                });
                this.props.navigation.navigate('HomeScreen');

            }
        }
        const updateDBRef = firebase.firestore().collection('user').doc("point");
        updateDBRef.update({ point: this.state.point })
        const updatepod = firebase.firestore().collection('user').doc("pod");
        updatepod.update({
            pod: this.state.pod,
            isPod2: this.state.isPod2,
            buy2: this.state.buy2,
            wear1: this.state.wear1,
            wear2: this.state.wear2,
            wear3: this.state.wear3,
        })
    }


    //funntion 3 ----------------------------------------------------------
    setIsPod3 = () => {
        if (this.state.point <= 59) {
            if (this.state.buy3 != true) {
                this.setState({
                    modalVisible: true,
                })
            }
            else {
                this.setState({
                    pod: this.state.pod = 3,
                    wear3: this.state.wear3 = '使用中',
                    wear1: this.state.wear1 = "購入済",
                    wear2: this.state.wear2 = "購入済"
                })
                this.props.navigation.navigate('HomeScreen');
            }
        } else if (this.state.isPod3 = true) {
            if (this.state.buy3 != true) {
                this.setState({
                    point: this.state.point -= 60,
                    modalVisible2: true,
                    buy3: this.state.buy3 = true,
                    wear3: this.state.wear3 = "購入済"
                })
            } else if (this.state.pod != 3) {
                this.setState({
                    pod: this.state.pod = 3,
                    wear3: this.state.wear3 = '使用中',
                    wear1: this.state.wear1 = "購入済",
                    wear2: this.state.wear2 = "購入済"
                })
                this.props.navigation.navigate('HomeScreen');
            }
        }
        const updateDBRef = firebase.firestore().collection('user').doc("point");
        updateDBRef.update({
            point: this.state.point,
        })
        const updatepod = firebase.firestore().collection('user').doc("pod");
        updatepod.update({
            pod: this.state.pod,
            isPod3: this.state.isPod3,
            buy3: this.state.buy3,
            wear1: this.state.wear1,
            wear2: this.state.wear2,
            wear3: this.state.wear3,
        })
    }







    render() {
        const { modalVisible, modalVisible2, hide2 } = this.state;

        const { isPod1, isPod2, isPod3, isPod4, isPod5, isPod6, isfow1, isfow2, isfow3 } = this.state;





        return (

            <ScrollView >
                <Container style={{ flex: 3, flexDirection: 'colum', justifyContent: 'space-between', alignItems: 'stretch', }}>

                    {/***********************  modal1  ***************************/}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => { this.setModalVisible(!modalVisible); }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>ポイントが足りないです。</Text>
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



                    {/***********************  modal2  ***************************/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible2}
                        onRequestClose={() => {

                            this.setModalVisible2(!modalVisible2);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>購入しました。</Text>
                                <Pressable
                                    style={[styles.modalButton, styles.buttonClose]}
                                    onPress={() => {
                                        this.setModalVisible2(!modalVisible2);
                                        this.hideModal2();
                                    }}
                                >
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>


                    {/***********************  show point   ***************************/}






                    {/***********************  pod container start hear!! ***************************/}

                    <View style={styles.container}>

                        <View style={{ marginLeft: 10, backgroundColor: '#fff', borderRadius: 50, height: 35, width: 90, flex: 1, flexDirection: "row", marginTop: 35, position: "absolute", left: 10, }} >
                            <Image style={{ width: 25, height: 25, marginRight: 15, marginTop: 5, marginLeft: 5 }}
                                source={require('../assets/heart.png')} />

                            <Text style={{ marginTop: 9 }}>{this.state.point}</Text>

                        </View>


                        {/***********************  一段目 ***************************/}

                        <Image style={styles.title} source={require('../assets/title_pod.png')} />
                        <Image style={styles.img} source={require('../assets/yellow.png')} />
                        <Image style={styles.img} source={require('../assets/pink.png')} />
                        <Image style={styles.img} source={require('../assets/blue.png')} />
                        <Image source={require('../assets/table.png')} />
                        <View style={styles.box}>
                            <Text style={styles.text_box}>黄色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => this.setIsPod1()}
                                    color={this.state.isPod1 ? "red" : "blue"}
                                    title={this.state.isPod1 ? this.state.wear1 : "20"}
                                />
                            </View>
                        </View>

                        <View style={styles.box}>
                            <Text style={styles.text_box}>赤色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button onPress={() => this.setIsPod2()}
                                    color={this.state.isPod2 ? "red" : "blue"}
                                    title={this.state.isPod2 ? this.state.wear2 : "40"}
                                />
                            </View>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text_box}>青色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => this.setIsPod3()}
                                    color={this.state.isPod3 ? "red" : "blue"}
                                    title={this.state.isPod3 ? this.state.wear3 : "60"}
                                />
                            </View>
                        </View>

                        {/***********************二段目 ***************************/}

                        <Image style={styles.img} source={require('../assets/yellow.png')} />
                        <Image style={styles.img} source={require('../assets/pink.png')} />
                        <Image style={styles.img} source={require('../assets/blue.png')} />
                        <Image source={require('../assets/table.png')} />
                        <View style={styles.box}>
                            <Text style={styles.text_box}>黄色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => this.setIsPod4()}
                                    color={isPod4 ? "red" : "blue"}
                                    title={isPod4 ? "購入済" : "200"}
                                />
                            </View>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text_box}>赤色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => this.setIsPod5()}
                                    color={isPod5 ? "red" : "blue"}
                                    title={isPod5 ? "購入済" : "250"}
                                />
                            </View>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text_box}>青色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => this.setIsPod6()}
                                    color={isPod6 ? "red" : "blue"}
                                    title={isPod6 ? "購入済" : "300"}
                                />
                            </View>
                        </View>

                        {/*********************** 三段目 ***************************/}

                        <Image style={styles.img} source={require('../assets/yellow.png')} />
                        <Image style={styles.img} source={require('../assets/pink.png')} />
                        <Image style={styles.img} source={require('../assets/blue.png')} />
                        <Image source={require('../assets/table.png')} />
                        <View style={styles.box}>
                            <Text style={styles.text_box}>黄色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => this.setIsfow1()}
                                    color={isfow1 ? "red" : "blue"}
                                    title={isfow1 ? "購入済" : "50"}
                                />
                            </View>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text_box}>赤色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => this.setIsfow2()}
                                    color={isfow2 ? "red" : "blue"}
                                    title={isfow2 ? "購入済" : "100"}
                                />
                            </View>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text_box}>青色植木鉢</Text>
                            <View style={styles.buttonContainer}>
                                <Button
                                    onPress={() => this.setIsfow3()}
                                    color={isfow3 ? "red" : "blue"}
                                    title={isfow3 ? "購入済" : "150"}
                                />
                            </View>
                        </View>



                        <View style={{ flex: 1, marginLeft: "30%", marginRight: "30%" }}>
                            <Image style={styles.title2} source={require('../assets/title_fow.png')} />
                        </View>
                        <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignContent: "center", marginRight: "17%", marginTop: "15%" }}>
                            <Image style={styles.fow_img} source={this.state.hana1img[this.state.hana1]} />
                            <Image style={styles.fow_img} source={this.state.hana2img[this.state.hana2]} />
                            <Image style={styles.fow_img} source={require('../assets/blackflower.png')} />
                        </View>
                        <Image style={{ marginTop: -15 }} source={require('../assets/table.png')} />
                        <View style={styles.box}>
                            <Text style={styles.text_box}>コスモス種</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text_box}>コスモス種</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.text_box}>コスモス種</Text>
                        </View>
                    </View>



                </Container>
            </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    taitl_text: {
        width: 300,
        alignSelf: 'flex-end'
    },
    img: {
        width: 80,
        height: 50,
        resizeMode: 'contain',
        paddingRight: 120,
    },
    buttonContainer: {
        width: 70,
        height: 35,
        margin: 5,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowOpacity: 0.22,
        shadowRadius: 10.22,

    },
    container: {
        height: "100%",
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: "#f3f3f3",
        paddingTop: "10%"



    },
    box: {

        alignItems: 'center',
        justifyContent: 'center',
        margin: 1,

    },
    text_box: {
        fontSize: 16,
        paddingRight: 20,
        paddingLeft: 10,
    },
    flower_box: {
        margin: 1,
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
    },

    title: {
        width: 120,
        height: 60,
        marginLeft: 100,
        marginRight: 100,

        marginBottom: 15,
        resizeMode: 'contain',
    },
    title2: {
        width: 120,
        height: 60,
        resizeMode: 'contain',
    },
    fow_img: {
        marginLeft: 30,
        width: 70,
        height: 110,
        resizeMode: 'contain',
    },
});
export default ShopScreen;

