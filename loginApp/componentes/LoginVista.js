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
import { Input, Button, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class LoginVista extends Component {
    renderMensaje=()=>{
        let mensaje = this.props.mensaje;
        if(typeof mensaje.error !== "undefined" && mensaje.error === true){
          return <Text style={estilos.textoError}> {mensaje.mensaje} </Text>
        }
        else if(typeof mensaje.error !== "undefined" && mensaje.error === false){
          return <Text style={estilos.textoBienvenida}> {mensaje.mensaje} </Text>
        }
      }
  
    render() {
        return (
            <View style={estilos.contenedor}>

                <Header
                    centerComponent={{ text: 'Login App', style: { color: '#fff', fontSize: 20, textAlign: "center", marginBottom: 20, } }}
                    containerStyle={{
                        backgroundColor: '#00f',
                        height: "15%"
                    }}
                />
                <View style={estilos.inout}>
                    <Text style={estilos.texto}> Ingresa tu email, recibirás un código de verificación  </Text>
                    <Input
                        placeholder={"Email"}
                        //onBlur={this.props.updateEmail}
                        onChangeText={this.props.updateEmail}
                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Button
                        title="Enviar email"
                        buttonStyle={estilos.boton}
                        onPress={this.props.enviarEmail}
                    />
                </View>
                <View>{this.renderMensaje()}</View>
                
                <View style={estilos.inout}>
                    <Input
                        placeholder="Código"
                        onChangeText={this.props.updateCodigo}
                        leftIcon={
                            <Icon
                                name='key'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Button
                        title="Ingresar código"
                        buttonStyle={estilos.boton}
                        onPress={this.props.enviarCodigo}
                    />
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
        padding:10,
        fontSize: 20,
        textAlign: "center",
        marginBottom: 20,
        backgroundColor: "#000",
        color: '#fff'
    },
    textoError: {
        padding:10,
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
        backgroundColor:"#00f",
    },
    inout: {
        margin: 10,
        paddingTop: "5%",
        width: "90%",
        alignSelf: 'center'
    }
});



