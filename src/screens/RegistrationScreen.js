import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedRole, setSelectedRole] = useState('client');
  const [skills, setSkills] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [yearsOfExperience, setYearsOfExperience] = useState('');

  const navigation = useNavigation();
  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth;
    setShowDatePicker(false);
    setDateOfBirth(currentDate);
  };

  const handleSubmit = async () => {
    try {
      const userData = {
        name,
        email,
        password,
        phoneNumber,
        dateOfBirth: dateOfBirth.toISOString(),
        role: selectedRole,
      };
      if (selectedRole === 'astrologer') {
        userData.skills = skills;
        userData.languages = languages;
        userData.yearsOfExperience = yearsOfExperience;
      }

      console.log(userData);
      const response = await axios.post(
        'http://10.0.2.2:2020/register',
        userData,
      );
      if (response.status === 201) {
        Alert.alert(
          'Registration Successfully',
          'You have registered successfully',
        );
      }

      // Clear the form fields
      setName('');
      setEmail('');
      setPassword('');
      setDateOfBirth(new Date());
      setPhoneNumber('');
      setSelectedRole('client');
      setSkills([]);
      setLanguages([]);
      setYearsOfExperience('');
    } catch (error) {
      Alert.alert('Registration Error', 'An error occurred while registering.');
      console.log('Error:', error);
    }
  };

  return (
    <KeyboardAvoidingView style={{marginLeft: 70}}>
      <ScrollView>
        <View>
          <Text
            style={{
              marginTop: 30,
              marginLeft: 70,
              marginBottom: 10,
              fontSize: 30,
              fontWeight: 700,
            }}>
            Sign Up
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Name"
            onChangeText={setName}
            value={name}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            style={styles.input}
          />
          <TextInput
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={styles.dateInput}>{dateOfBirth.toDateString()}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={dateOfBirth}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <TextInput
            placeholder="Phone Number"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            style={styles.input}
          />
          <View style={styles.roleContainer}>
            <Text>Select Role:</Text>
            <Picker
              selectedValue={selectedRole}
              onValueChange={itemValue => setSelectedRole(itemValue)}
              style={styles.picker}>
              <Picker.Item label="Client" value="client" />
              <Picker.Item label="Astrologer" value="astrologer" />
            </Picker>
          </View>
          {selectedRole === 'astrologer' && (
            <>
              <TextInput
                placeholder="Skills (comma-separated)"
                onChangeText={text =>
                  setSkills(text.split(',').map(skill => skill.trim()))
                }
                value={skills.join(', ')} // Display skills with spaces
                style={styles.input}
              />
              <TextInput
                placeholder="Languages (comma-separated)"
                onChangeText={text =>
                  setLanguages(text.split(',').map(language => language.trim()))
                }
                value={languages.join(', ')} // Display languages with spaces
                style={styles.input}
              />
              <TextInput
                placeholder="Years of Experience"
                onChangeText={setYearsOfExperience}
                value={yearsOfExperience}
                style={styles.input}
              />
            </>
          )}
        </View>

        <TouchableOpacity
          style={[styles.button, {marginLeft: 40}]}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>SignUp</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('LogIn')}
          style={{marginTop: 15, marginLeft: 54, color: '#000'}}>
          <Text>Already have an account? Sign In</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
  },
  roleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
  },
  dateInput: {
    borderColor: '#ffffff',
    backgroundColor: '#ffffff',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
  },
});

export default RegistrationScreen;
