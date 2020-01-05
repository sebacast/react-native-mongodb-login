/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { Header } from 'react-native-elements';
import { connect } from 'react-redux';
import Menu from './Menu';
import Salir from './Salir';
import { recetAcc } from '../actions/accesoActions';
class Inicio extends Component {

    salir = () => {
        this.props.dispatch(recetAcc())
        this.props.navigation.navigate('Auth')
    }
    render() {
        return (
            <View style={estilos.contenedor}>

                <Header
                    leftComponent={<Menu />}
                    rightComponent={<Salir salir={this.salir} />}
                    centerComponent={{ text: 'Login App', style: { color: '#fff', fontSize: 20, textAlign: "center", marginBottom: 20, } }}
                    containerStyle={{
                        backgroundColor: '#00f',
                        height: "15%",

                    }}
                />
                <View style={estilos.inout}>
                    <Text style={estilos.texto}> ¡Bienvenid@!  </Text>


                </View>


                <View style={estilos.inout}>

                </View>

            </View>
        );
    }
};
const estilos = StyleSheet.create({
    contenedor: {
        backgroundColor: "#e1e7ea",
        alignSelf: 'center',
        width: "100%",
        height: "100%"
    },
    texto: {
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
    },
    textoBienvenida: {
        padding: 10,
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        backgroundColor: "#000",
        color: '#fff'
    },
    textoError: {
        padding: 10,
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        backgroundColor: "#ff0000",
        color: '#fff'
    },
    boton: {
        margin: 10,
        marginTop: 20,
        width: "80%",
        alignSelf: 'center',
        backgroundColor: "#00f",
    },
    inout: {
        margin: 10,
        paddingTop: "5%",
        width: "90%",
        alignSelf: 'center'
    }
});
const mapStateToProps = (state) => {
    const { acceso } = state
    return {
        email: acceso.email,
        codigo: acceso.codigo,
        macadr: acceso.macadr,
        mensaje: acceso.mensaje,
        autorizado: acceso.autorizado,
    };
};
export default connect(mapStateToProps)(Inicio);


