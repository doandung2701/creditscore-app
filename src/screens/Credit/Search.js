import { Formik } from 'formik';
import React, {  useState } from 'react';
import { StyleSheet, Text, View, Image, ActivityIndicator, Alert } from 'react-native';
import { validatePhoneNumber } from '../../utils/validate';
import * as Yup from 'yup';
import { ScrollView } from 'react-native-gesture-handler';
import { Overlay } from 'react-native-elements';
import Input from '../../components/Inputs';
import Submit from '../../components/Submit';
import { searchByPhoneNumber } from '../../api/baseApi';
const Search=props=>{
    const searchByPhone= async  (phoneNumber)=>{
            try{
                var creditScore =await searchByPhoneNumber(phoneNumber.phone);
                Alert.alert(
                    "Information",
                    "Your credit score is "+creditScore.value,
                    [
                      {
                        text: "OK",
                        style: "OK"
                      }
                    ],
                    { cancelable: false }
                  );
            }catch(error){
                Alert.alert(
                    "Information",
                    error,
                    [
                      {
                        text: "OK",
                        style: "OK"
                      }
                    ],
                    { cancelable: false }
                  );
            }
    }
    const InfoSchema = Yup.object().shape({
        phoneNumber: Yup.string()
            .trim()
            .required('Phone is empty')
            .test('is-jimmy1', "Phone isn't correct!", (value) => {
                return validatePhoneNumber(String(value))
            }),
    });
    const [visible, setVisible] = useState(false);
    const [result,setResult]=useState(0);
    const [errorSearch, setErrorSearch] = useState(false);

    return (
        <Formik
        initialValues={{
            phone: '',
        }}
        onSubmit={async (values) => {
          await searchByPhone(values);
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
                    <Text style={styles.textTitle}>Credit score</Text>                    
                    <Text style={styles.textError}>{errorSearch ? 'Search failed' : ''}</Text>

                    
                    
                    <View style={{ marginTop: 20 }} />
                    <Input
                        placeholder="Phone number"
                        icon="phone"
                        onChangeText={handleChange('phone')}
                        value={values.phone}
                    />
                    <Text style={{ alignSelf: 'flex-start', fontSize: 12, color: 'red', marginLeft: 16 }}>{errors.phone}</Text>                    
                    <Submit
                        title="Searching"
                        color="#0C91D4"
                        handleSubmit={handleSubmit}
                    />
                </View>
            </ScrollView>
        )}

    </Formik>
      );
}

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
export default Search;