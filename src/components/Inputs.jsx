import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Input } from 'react-native-elements';

const Inputs = (props) => {

    const [isFocused, setFocus] = useState(false);

    const onFocusChange = () => {
        setFocus(true)
    }
    return (
        <View style={[styles.container, { borderColor: isFocused ? '#0779ef' : '#eee' }]}>
            <Input
                placeholder={props.placeholder}
                onFocus={onFocusChange}
                inputContainerStyle={styles.inputContainer}
                inputStyle={styles.inputText}
                secureTextEntry={props.pass}
                placeholder={props.placeholder}
                onChangeText={props.onChangeText}
                value={props.value}
                leftIcon={
                    <AntDesign
                        name={props.icon}
                        size={22}
                        color={isFocused ? '#0779e4' : 'grey'}
                    />
                }
            />
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: 50,
        borderRadius: 100,
        marginVertical: 5,
        borderWidth: 1.5
    },
    inputContainer: {
        borderBottomWidth: 0
    },
    inputText: {
        marginLeft: 5,
        fontSize: 14
    }
});

export default Inputs;