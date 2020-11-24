import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import Input from '../../components/Inputs';
import Submit from '../../components/Submit';
import { useNavigation } from '@react-navigation/native';
import { phoneRegExp, validateEmail } from '../../utils/validate';
import * as firebase from "firebase";
import { Formik } from 'formik';
import * as Yup from 'yup';

const InfoSchema = Yup.object().shape({
    email: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .trim()
        .required('Email is empty')
        .test('is-jimmy1', "Email isn't correct!", (value) => {
            return validateEmail(String(value))
        }),
    password: Yup.string()
        .min(8, 'Too Short!')
        .trim()
        .max(11, 'Too Long!')
        .required('Password is empty'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .trim()
        .required("Required!")
});

const SignUp = props => {

    const [SignUp, setErrorSignUp] = useState('');
    const navigation = useNavigation();

    const handleSignUp = ({ email, password }) => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => navigation.navigate("CreditApp"))
            .catch(error => setErrorSignUp(error));
    };

    return (
        <Formik
            initialValues={{
                email: '',
                password: '',
                confirm_password: ''
            }}
            validationSchema={InfoSchema}
            onSubmit={(values) => {
                setTimeout(() => {

                    handleSignUp(values);
                }, 1000);

            }}
        >
            {({ errors, handleChange, handleSubmit, values }) => (

                <ScrollView style={{ backgroundColor: 'white' }}>
                    <View style={styles.container}>
                        <Image source={require('../../assets/login.png')} resizeMode="center" style={styles.image} />
                        <Text style={styles.textTitle}>Let's Get Started</Text>
                        <Text style={styles.textBody}>Create an account to get all features</Text>
                        {/* <Input
                            placeholder="Username"
                            icon="user"
                            onChangeText={handleChange('username')}
                            value={values.username}
                        />
                        <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'red', marginLeft: 16 }}>{errors.username}</Text> */}
                        <Input
                            placeholder="Email"
                            icon="mail"
                            onChangeText={handleChange('email')}
                            value={values.email}
                        />
                        <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'red', marginLeft: 16 }}>{errors.email}</Text>
                        {/* <Input
                            placeholder="Phone"
                            icon="phone"
                            onChangeText={handleChange('phone')}
                            value={values.phone}
                        />
                        <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'red', marginLeft: 16 }}>{errors.phone}</Text> */}
                        <Input
                            placeholder="Password"
                            icon="lock"
                            pass={true}
                            onChangeText={handleChange('password')}
                            value={values.password}
                        />
                        <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'red', marginLeft: 16 }}>{errors.password}</Text>
                        <Input
                            placeholder="Confirm Password"
                            icon="lock" pass={true}
                            onChangeText={handleChange('confirm_password')}
                            value={values.confirm_password}
                        />
                        <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'red', marginLeft: 16 }}>{errors.confirm_password}</Text>
                        <Submit
                            color="#0251ce"
                            title="CREATE"
                            handleSubmit={handleSubmit}
                        />
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.textBody}>Aiready have an account</Text>
                            <Text style={[styles.textBody, { color: 'blue' }]} onPress={() => navigation.navigate('Login')}> Login here</Text>

                        </View>
                    </View>

                </ScrollView>
            )}

        </Formik>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10
    },
    image: {
        width: 400,
        height: 200,
        marginVertical: 10,
    },
    textTitle: {
        fontSize: 40,
        marginVertical: 5
    },
    textBody: {
        fontSize: 16,
    }
});

export default SignUp;