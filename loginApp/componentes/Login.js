/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { connect } from 'react-redux';
import LoginVista from './LoginVista';
import { updateEmailAcc, updateCodigoAcc, updateMensajeAcc, updateAutorizadoAcc } from '../actions/accesoActions';
import jwt from "react-native-pure-jwt";
class Login extends Component {
  constructor(props) {
    super(props)
    this.updateEmail = this.updateEmail.bind(this);
    this.updateCodigo = this.updateCodigo.bind(this);
  }
  updateEmail = email => {
    this.props.dispatch(updateEmailAcc(email))
  }
  updateCodigo = codigo => {
    this.props.dispatch(updateCodigoAcc(codigo))
  }
  validarEmail = email => {
    // eslint-disable-next-line no-useless-escape
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());

  }
  enviarEmail = () => {
    let email = this.props.email
    let valido = this.validarEmail(email);
    if (valido && valido === true) {
      let mensaje = { mensaje: 'Se envió el código de verificación al email ingresado', error: false }
      this.props.dispatch(updateMensajeAcc(mensaje))
      let url = 'URL API AUT';
      let login = { email: email.toLowerCase() };
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'appication/json'
        },
        body: JSON.stringify(login),
      })
    }
    else {
      let mensaje = { mensaje: 'El email no es válido', error: true }
      this.props.dispatch(updateMensajeAcc(mensaje))
    }
  }
  enviarCodigo = () => {
    let url = 'URL API AUT';
    let email = this.props.email;
    let codigo = this.props.codigo;
    let login = { email: email.toLowerCase(), codigo: codigo };
    if (this.validarEmail(email) === true && codigo !== '') {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'appication/json'
        },
        body: JSON.stringify(login),
      })
        .then(res => res.json())
        .then(data => this.comprobarCodigo(data))
        .catch(()=>this.negar());
    }
    else {
      this.negar()
    }
  }
  comprobarCodigo = (data) => {
    if (data && data.error === false && typeof data.aut !== "undefined") {
      let cod = this.props.codigo;
      let token = data.aut;
      jwt
        .decode(
          token, // the token
          cod, // the secret
          {
            skipValidation: true // to skip signature and exp verification
          }
        )
        .then(dj => this.autenticar(dj.payload))
        .catch(()=>this.negar());
    }
    else {
      this.negar();
    }
  }
  autenticar = (payload) => {
    let cod = this.props.codigo;
    let email = this.props.email;
    if (payload && payload.codigo === cod && payload.email === email) {//autorizar
      let mensaje = { mensaje: 'El código es correcto. ¡Bienvenid@!', error: false }
      this.props.dispatch(updateMensajeAcc(mensaje))
      this.props.dispatch(updateAutorizadoAcc(true))
      this.props.navigation.navigate('App')
    }
    else{
      this.negar();
    }
  }
  negar = ()=>{
    let mensaje = { mensaje: 'Email o código incorrecto', error: true }
    this.props.dispatch(updateMensajeAcc(mensaje))
  }


  render() {
    return (
      <LoginVista
        mensaje={this.props.mensaje}
        updateEmail={this.updateEmail}
        updateCodigo={this.updateCodigo}
        enviarEmail={this.enviarEmail}
        enviarCodigo={this.enviarCodigo}
      />
    );
  }
};
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
export default connect(mapStateToProps)(Login);