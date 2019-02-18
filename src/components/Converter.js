import React, {Component} from 'react';
import {
    View, 
    Text, 
    StyleSheet, 
    TextInput, 
    TouchableOpacity,
    Alert, 
    Image,
    TouchableHighlight
} from 'react-native';
import axios from 'axios';

export default class Converter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usd: '',
            tl: '',
            cad: '',
            jpy: '',
            cup: '',
            input: '',
            rates: null
        };
        this.calculateCurrency = this.calculateCurrency.bind(this);
        this.stateClear = this.stateClear.bind(this);
    }

    componentWillMount = () => {
      axios.get('http://data.fixer.io/api/latest?access_key=2aaaf5a3cd4143bc54def47f80c91d08&symbols=USD,EUR,TRY,CAD,JPY,CUP')
        .then(response => response.data)
        .then(data => {
            console.log(data.rates);
            const rates = data.rates;
            this.setState({
                rates
            })
        })
    };

    stateClear() {
        this.setState({
            usd: '',
            tl: '',
            cad: '',
            jpy: '',
            cup: '',
            input: '',
        })
    }

    calculateCurrency() {
        const inpData = parseFloat(this.state.input);
        const rates = this.state.rates;
        if (inpData !== NaN && inpData >= 0) {
            this.setState({
                usd: (inpData * rates['USD']),
                tl: (inpData * rates['TRY']),
                cad: (inpData * rates['CAD']),
                jpy: (inpData * rates['JPY']),
                cup: (inpData * rates['CUP']),
            })
        } else {
            Alert.alert(
                'Message',
                'Invalid Operation',
                [
                    { text: 'OK', onPress: (this.stateClear) }
                ]
            )
        }
    }
    

    render () {
        console.log(this.state)
        const {wrapper, inputStyle, textStyle, submitButton, submitButtonText, clearButton} = styles;
        const {usd, tl, cad, jpy, cup, input} = this.state;
        return (
            <View style={wrapper}>
                <View style={{flexDirection: 'row'}}>
                    {/* INPUT */}
                    <TextInput
                        placeholder={'Enter EUR Value'}
                        style={inputStyle}
                        onChangeText={(text) => this.setState({ input: text })}
                        value={input}
                        keyboardType={'numeric'}
                        autoFocus
                    />

                    {/* SUBMIT BUTTON */}
                    <TouchableOpacity 
                        style={submitButton} 
                        activeOpacity={0.7}
                        onPress={this.calculateCurrency}
                    >
                        <Text style={submitButtonText}>calculate</Text>
                    </TouchableOpacity> 

                    {/* REFRESH */}
                    <TouchableHighlight
                        onPress={this.stateClear} 
                        style={clearButton}
                    >
                        <Image 
                            source={require('../images/refresh.png')}
                            style={{ width: 30, height: 30, marginTop: 5, marginLeft: 8 }}
                        />
                    </TouchableHighlight>

                </View> 

            <Text style={textStyle}>USD : { usd }</Text>    
            <Text style={textStyle}>TRY : { tl }</Text>
            <Text style={textStyle}>CAD : { cad }</Text>
            <Text style={textStyle}>JPY : { jpy }</Text>
            <Text style={textStyle}>CUP : { cup }</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputStyle: {
        width: 200,
        height: 40,
        marginBottom: 30,
        paddingLeft: 5,
        borderColor: '#788B91',
        borderWidth: 1,
        borderRadius: 2,
    },
    textStyle: {
        width: 250,
        height: 50,
        fontWeight: 'bold',
    },
    submitButton: {
        backgroundColor: '#000',
        height: 40,
        justifyContent: 'center',
        marginLeft: 5,
    },
    submitButtonText: {
        padding: 10,
        color: '#fff',
        fontSize: 16,
    },
    clearButton: {
        backgroundColor: 'transparent',
        height: 40,
        width: 40,
        marginLeft: 5,
    }
})