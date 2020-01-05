import React, { Component } from "react";
import {
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Salir extends Component {
    
    render(){
        return(<View ><Icon
            name='power-off'
            size={45}
            color='black'
            onPress={()=>this.props.salir()}
            
        /></View>)
    }
}
