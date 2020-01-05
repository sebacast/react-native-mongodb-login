import React, { Component } from "react";
import {
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default class Menu extends Component {
    render(){
        return(<View ><Icon
            name='bars'
            size={45}
            color='black'
            
        /></View>)
    }
}