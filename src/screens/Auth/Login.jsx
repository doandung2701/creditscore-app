import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView,ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { validateEmail } from '../../utils/validate';
import { Overlay } from 'react-native-elements';
import Input from '../../components/Inputs';
import Submit from '../../components/Submit';
import { Formik } from 'formik';
import * as Yup from 'yup';
import * as firebase from "firebase";

const InfoSchema = Yup.object().shape({
    email: Yup.string()
        .trim()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Email is empty')
        .test('is-jimmy1', "Email isn't correct!", (value) => {
            return validateEmail(String(value))
        }),


    password: Yup.string()
        .trim()
        .min(8, 'Too Short!')
        .max(11, 'Too Long!')
        .required('Password is empty'),
});


const Login = props => {

    const navigation = useNavigation();
    // const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    const [errorLogin, setErrorLogin] = useState(false);


    const handleLogin = ({ email, password }) => {
        setVisible(true)
        firebase
            .auth()
            .signInWithEmailAndPassword(email, password)
            .then((data) => {
                navigation.navigate("CreditApp");
                setVisible(false)
            })
            .catch(error => {
                setErrorLogin(true)
            });
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
            }}
            validationSchema={InfoSchema}

            onSubmit={(values) => {
                handleLogin(values);
            }}
        >
            {({ errors, handleChange, handleSubmit, values }) => (
                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View style={styles.container}>
                    <Overlay isVisible={visible}>
                        <View>
                            <Text>Loading ...</Text>
                            <ActivityIndicator size="large" color="#0000ff"/>
                        </View>
                        
                    </Overlay>
                        <Image
                            source={require('../../assets/login.png')}
                            resizeMode="center"
                            style={styles.image} />
                        <Text style={styles.textTitle}>Welcome back</Text>
                        <Text style={styles.textBody}>Log in to your existant account</Text>
                        
                        <Text style={styles.textError}>{errorLogin ? 'Login failed' : ''}</Text>

                        
                        
                        <View style={{ marginTop: 20 }} />
                        <Input
                            placeholder="Email"
                            icon="mail"
                            onChangeText={handleChange('email')}
                            value={values.email}
                        />
                        <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'red', marginLeft: 16 }}>{errors.email}</Text>
                        <Input
                            placeholder="Password"
                            icon="lock"
                            pass={true}
                            onChangeText={handleChange('password')}
                            value={values.password}
                        />
                        <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'red', marginLeft: 16 }}>{errors.password}</Text>
                        <View style={{ width: '90%' }}>
                            <Text style={[styles.textBody], { alignSelf: 'flex-end', color: '#0C79D4' }}>Forgot Password?</Text>
                        </View>
                        <Submit
                            title="LOG IN"
                            color="#0C91D4"
                            handleSubmit={handleSubmit}
                        />
                        <View style={{ flexDirection: 'row', marginVertical: 5 }}>
                            <Text style={styles.textBody}>Don't Have an account </Text>
                            <Text style={[styles.textBody, { color: '#0C79D4' }]}
                                onPress={() => navigation.navigate('SignUp')}
                            >
                                Sign Up
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            )}

        </Formik>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10
    },
    image: {
        width: 400,
        height: 200,
        marginVertical: 10
    },
    textTitle: {
        fontSize: 40,
        marginVertical: 10,
    },
    textBody: {
        fontSize: 16,
    },
    textError: {
        fontSize: 16,
        color: 'red',
    }
});

export default Login