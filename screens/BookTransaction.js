import { StatusBar } from 'expo-status-bar';
import react from 'react';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class BookTransaction extends React.Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal'
        }
    }

    getCameraPermission = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermissions: status == 'granted',
            buttonState: 'clicked',
            scanned: false
        })
    }

    handleBarCodeScanned = async ({ type, data }) => {
        this.setState({
            scanned: true,
            scannedData: data,
            buttonState: 'normal'
        })
    }

    render() {
        const hasCameraPermissions = this.state.hasCameraPermissions
        const scanned = this.state.scanned
        const buttonState = this.state.buttonState
        if (buttonState == 'clicked' && hasCameraPermissions) {
            return (
                <BarCodeScanner
                    style={StyleSheet.absoluteFillObject}
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                />
            )
        }
        else if (buttonState == 'normal') {
            return (
                <View style={styles.container}>
                    <Text style={styles.displayText}> {hasCameraPermissions === true ? this.state.scannedData : 'request camera permissions'} </Text>
                    <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission}>
                        <Text style={styles.buttonText}> Scan QR Code </Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({ 
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, 
    displayText: { fontSize: 15, textDecorationLine: 'underline' }, 
    scanButton: { backgroundColor: '#2196F3', padding: 10, margin: 10 }, 
    buttonText: { fontSize: 20, } });
