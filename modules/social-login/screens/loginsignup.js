import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  Platform,
  Pressable
} from "react-native"

import { useSelector, useDispatch } from "react-redux"
import { HOME_SCREEN_NAME, validateEmail } from "./constants"
import { buttonStyles, textInputStyles, Color } from "./styles"
import {
  GoogleSignin,
  statusCodes
} from "@react-native-google-signin/google-signin"
import { LoginManager, AccessToken } from "react-native-fbsdk"
import { GOOGLE_WEB_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "../auth/utils"
import { appleForAndroid, appleForiOS } from "../auth/apple"
import {
  loginRequest,
  signupRequest,
  facebookLogin,
  googleLogin,
  appleLogin
} from "../auth"
import { unwrapResult } from "@reduxjs/toolkit"
// import { setItem } from "../../../utils"

// Custom Text Input
export const TextInputField = props => (
  <View>
    <Text style={[textInputStyles.label, props.labelStyle]}>{props.label}</Text>
    <TextInput
      autoCapitalize="none"
      style={[textInputStyles.textInput, props.textInputStyle]}
      placeholderTextColor={Color.steel}
      underlineColorAndroid={"transparent"}
      {...props}
    />
    {!!props.error && <Text style={textInputStyles.error}>{props.error}</Text>}
  </View>
);

// Custom Button
export const Button = props => (
  <TouchableOpacity onPress={props.onPress} disabled={props.loading}>
    <View style={[buttonStyles.viewStyle, props.viewStyle]}>
      {props.loading ? (
        <ActivityIndicator
          color={props.loadingColor ? props.loadingColor : Color.white}
          style={props.loadingStyle}
        />
      ) : (
        <Text style={[buttonStyles.textStyle, props.textStyle]}>
          {props.title}
        </Text>
      )}
    </View>
  </TouchableOpacity>
);



const onFacebookConnect = async (dispatch, navigation) => {
  try {
    const fbResult = await LoginManager.logInWithPermissions([
      "public_profile",
      "email"
    ]);
    if (!fbResult.isCancelled) {
      const data = await AccessToken.getCurrentAccessToken();
      // @ts-ignore
      dispatch(facebookLogin({ access_token: data.accessToken }))
        .then(unwrapResult)
        .then(res => {
          if (res.key) {
            // setItem('token', res.key)
            navigation.navigate(HOME_SCREEN_NAME);
          }
        });
    }
  } catch (err) {
    console.log("Facebook Login Failed: ", JSON.stringify(err));
  }
};

const onGoogleConnect = async (dispatch, navigation) => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID, // client ID of type WEB for your server
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: false,
    iosClientId: GOOGLE_IOS_CLIENT_ID
  });
  try {
    await GoogleSignin.hasPlayServices();
    await GoogleSignin.signIn();
    const tokens = await GoogleSignin.getTokens();
    // @ts-ignore
    dispatch(googleLogin({ access_token: tokens.accessToken }))
      .then(unwrapResult)
      .then(async res => {
        if (res.key) {
          await setItem('token', res.key)
          navigation.navigate(HOME_SCREEN_NAME);
        }
      });
  } catch (err) {
    if (err.code === statusCodes.SIGN_IN_CANCELLED) {
      Alert.alert("Error", "The user canceled the signin request.");
    }
  }
};

const onAppleConnect = async (dispatch, navigation) => {
  try {
    const signinFunction = Platform.select({
      ios: appleForiOS,
      // @ts-ignore
      android: appleForAndroid
    });
    const result = await signinFunction();
    dispatch(
      // @ts-ignore
      appleLogin({ id_token: result.id_token, access_token: result.code })
    )
      .then(unwrapResult)
      .then(res => {
        if (res.key) {
          // setItem('token', res.key)
          navigation.navigate(HOME_SCREEN_NAME);
        }
      });
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};



import { Image, StyleSheet, ScrollView } from "react-native";
import { setItem } from "../../../store"

export const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiError, setApiError] = useState([])
  const [isCheck, setIsCheck] = useState(false);
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);

  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // @ts-ignore
  const { api } = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const onSigninPress = async () => {
    setApiError([])
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }

    // @ts-ignore
    setIsLoading(true)
    dispatch(loginRequest({ username: email, password }))
      .then(unwrapResult)
      .then(async res => {
        if (res.token) {
          await setItem('token', res.token)
          await setItem('user', JSON.stringify(res?.user))
          if (res.user.user_type == 'client') {
            navigation.navigate("categoryScreen");
          } else {
            navigation.navigate("profileScreen");
          }
          setEmail("");
          setPassword("")
          setIsLoading(false)
        }
      })
      .catch(err => {
        setIsLoading(false);
        setApiError(apiError => [...apiError, err]);
      });
  };


  const resetValidations = () => {
    return setValidationError({
      email: "",
      password: ""
    });
  }

  const handleInputEmail = (value) => {
    setEmail(value)
    resetValidations()
  }

  const handleInputPassword = (value) => {
    setPassword(value)
    resetValidations()
  }

  useEffect(() => {
    setEmail('')
    setPassword(''),
    setApiError([]);
  }, [])
  
  return (
    <View style={styles.container}>
      {isLoading && <Loader></Loader>}
      {/* <Text style={styles.heading}>Signup-2</Text> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subHeading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
        </Text>
        <Input
          text="Email address"
          placeholder="Enter your email address"
          value={email}
          onChange={handleInputEmail}
          containerStyle={styles.inputContainer}
          errorText={validationError.email}
        />
        <Input
          text="Password"
          placeholder="Enter your password"
          value={password}
          onChange={handleInputPassword}
          containerStyle={styles.inputContainer}
          secureTextEntry={secureTextEntryPassword}
          icon={require("../assets/eyeIcon.png")}
          iconOnPress={() =>
            setSecureTextEntryPassword(!secureTextEntryPassword)
          }
          errorText={validationError.password}
        />
        {
          apiError.map((value, index) =>
            <View key={index}>
              <Text style={styles.error1}>{value[Object.keys(value)[index]].toString()}</Text>
            </View>
          )
        }
        <View style={styles.flexRow}>
          <Checkbox
            value={isCheck}
            setValue={setIsCheck}
            style={styles.checkbox}
          />
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Button1 buttonText="Login" style={styles.button} onPress={onSigninPress} />
          <Pressable style={styles.fingerprintButton}>
            <Image
              source={require("../assets/fingerprintIcon.png")}
              style={styles.fingerprintIcon}
            />
          </Pressable>
        </View>
        <Text style={styles.separatorText}>Or Sign In with</Text>
        <SocialButton text="Apple" icon={require("../assets/appleIcon.png")} onPress={() => onAppleConnect(dispatch, navigation)} />
        <SocialButton text="Google" icon={require("../assets/googleIcon.png")} onPress={() => onGoogleConnect(dispatch, navigation)} />
        <SocialButton
          text="Facebook"
          icon={require("../assets/facebookIcon.png")}
          onPress={() => onFacebookConnect(dispatch, navigation)}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={[styles.footerText, styles.bold]}>Sign Up.</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

import { RadioButton } from 'react-native-paper';
export const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiError, setApiError] = useState([])
  const [isCheck, setIsCheck] = useState(false);
  const [secureTextEntryPassword, setSecureTextEntryPassword] = useState(true);
  const [secureTextEntryConfirmPassword, setSecureTextEntryConfirmPassword] =
    useState(true);
  const [userType, setUserType] = useState('client');

  const [validationError, setValidationError] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);


  // @ts-ignore
  const { api } = useSelector(state => state.Login);
  const dispatch = useDispatch();

  const onSignupPress = async () => {
    setApiError([])
    if (!validateEmail.test(email)) {
      return setValidationError({
        email: "Please enter a valid email address.",
        password: ""
      });
    } else {
      setValidationError({
        ...validationError,
        email: "",
      });
    }

    if (!password) {
      return setValidationError({
        email: "",
        password: "Please enter a valid password"
      });
    }

    if (password !== confirmPassword) {
      return setValidationError({
        email: "",
        password: "Confirm password and password do not match."
      });
    }
    setIsLoading(true)
    // @ts-ignore
    dispatch(signupRequest({ email, password, user_type: userType }))
      .then(unwrapResult)
      .then(async (res) => {
        // await setItem('token', res.token)
        // await setItem('userID', res?.user?.id.toString())
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setIsLoading(false)
        navigation.navigate("LoginScreen")
      })
      .catch(err => { setApiError(apiError => [...apiError, err]);; setIsLoading(false) });
  };

  const resetValidations = () => {
    return setValidationError({
      email: "",
      password: ""
    });
  }

  const handleInputEmail = (value) => {
    setEmail(value)
    resetValidations()
  }

  const handleInputPassword = (value) => {
    setPassword(value)
    resetValidations()
  }

  const handleInputConfirmPassword = (value) => {
    setConfirmPassword(value)
    resetValidations()
  }


  return (
    <View style={styles.container}>
      {isLoading && <Loader></Loader>}
      {/* <Text style={styles.heading}>Signup-2</Text> */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.heading}>Welcome</Text>
        <Text style={styles.subHeading}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
        </Text>
        <Input
          text="Email address"
          placeholder="Enter your email address"
          value={email}
          onChange={(value) => handleInputEmail(value)}
          containerStyle={styles.inputContainer}
          errorText={validationError.email}
        />
        <Input
          text="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(value) => handleInputPassword(value)}
          containerStyle={styles.inputContainer}
          secureTextEntry={secureTextEntryPassword}
          icon={require("../assets/eyeIcon.png")}
          iconOnPress={() =>
            setSecureTextEntryPassword(!secureTextEntryPassword)
          }
          errorText={validationError.password}
        />
        <Input
          text="Confirm password"
          placeholder="Enter your password again"
          value={confirmPassword}
          onChange={(value) => handleInputConfirmPassword(value)}
          containerStyle={styles.inputContainer}
          secureTextEntry={secureTextEntryConfirmPassword}
          icon={require("../assets/eyeIcon.png")}
          iconOnPress={() =>
            setSecureTextEntryConfirmPassword(!secureTextEntryConfirmPassword)
          }

        />
        {
          apiError.map((value, index) =>
            <View key={index}>
              <Text style={styles.error1}>{value[Object.keys(value)[index]].toString()}</Text>
            </View>
          )
        }
        <RadioButton.Group onValueChange={newValue => setUserType(newValue)} value={userType}>
          <View style={styles.radioContainer}>
          <View style={styles.radioSection}>
            <RadioButton value="professional" color="#000"/>
            <Text>Service Provider</Text>
          </View>
          <View style={[styles.radioSection, {marginLeft: 20}]}>
            <RadioButton value="client" color="#000"/>
            <Text>Client</Text>
          </View>
          </View>
        </RadioButton.Group>

        <View style={styles.flexRow}>
          <Checkbox
            value={isCheck}
            setValue={setIsCheck}
            style={styles.checkbox}
          />
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non at sed.
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Button1 buttonText="Sign Up" style={styles.button} onPress={onSignupPress} />
          <Pressable style={styles.fingerprintButton}>
            <Image
              source={require("../assets/fingerprintIcon.png")}
              style={styles.fingerprintIcon}
            />
          </Pressable>
        </View>
        <Text style={styles.separatorText}>Or Sign Up with</Text>
        <SocialButton text="Apple" icon={require("../assets/appleIcon.png")} onPress={() => onAppleConnect(dispatch, navigation)} />
        <SocialButton text="Google" icon={require("../assets/googleIcon.png")} onPress={() => onGoogleConnect(dispatch, navigation)} />
        <SocialButton
          text="Facebook"
          icon={require("../assets/facebookIcon.png")}
          onPress={() => onFacebookConnect(dispatch, navigation)}
        />
        <View style={styles.footer}>
          <Text style={styles.footerText}>I have an account. </Text>
          <Pressable onPress={() => navigation.navigate("LoginScreen")}>
            <Text style={[styles.footerText, styles.bold]}>Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20
  },
  heading: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "#222222",
    marginVertical: 10
  },
  subHeading: {
    fontSize: 14,
    color: "#888888",
    textAlign: "center",
    alignSelf: "center",
    width: "80%",
    lineHeight: 20,
    marginBottom: 20
  },
  flexRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10
  },
  checkbox: {
    marginLeft: 10
  },
  description: {
    fontSize: 14,
    color: "#888888",
    lineHeight: 20,
    marginLeft: 10,
    flex: 1,
    flexWrap: "wrap"
  },
  button: {
    flex: 1,
    marginRight: 10
  },
  fingerprintButton: {
    width: 50,
    height: 50,
    padding: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    borderRadius: 10
  },
  fingerprintIcon: {
    width: 20,
    height: 20,
    resizeMode: "contain"
  },
  separatorText: {
    fontSize: 12,
    color: "#888888",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 20
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20
  },
  footerText: {
    fontSize: 16,
    color: "#888888"
  },
  bold: {
    fontWeight: "bold",
    color: "#000"
  },
  error1: {
    color: '#f77474',
    fontStyle: 'italic',
    fontSize: 14,
    paddingHorizontal: 10,
  },
  radioSection:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",    
  },
  radioContainer:{
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center", 
  }
});


const Input = props => {
  return (
    <View style={[inputStyles.inputContainer, props.containerStyle]}>
      {props.text
        ? (
          <Text style={inputStyles.inputText}>{props.text}</Text>
        )
        : null}

      <TextInput
        style={[
          inputStyles.input,
          props.style,
          props.textArea ? inputStyles.textArea : null
        ]}
        placeholder={props.placeholder ? props.placeholder : "Enter"}
        value={props.value}
        onChangeText={(value) => props.onChange(value)}
        placeholderTextColor={
          props.placeholderTextColor ? props.placeholderTextColor : "#9B9B9B"
        }
        editable={props.editable !== false}
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!!props.textArea}
        backgroundColor={props.backgroundColor}
        secureTextEntry={props.secureTextEntry}
      />
      {props.errorText
        ? (
          <Text style={inputStyles.error}>{props.errorText}</Text>
        )
        : null}
      {props.icon
        ? (
          <Pressable
            onPress={() => props.iconOnPress()}
            style={inputStyles.iconWithText}>
            <Image source={props.icon} style={inputStyles.icon} />
          </Pressable>
        )
        : null}
      <View style={inputStyles.children}>{props.children}</View>
    </View>
  );
};

const inputStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center"
  },
  inputText: {
    fontSize: 14,
    marginLeft: 20,
    color: "#111112"
  },
  input: {
    borderWidth: 1,
    borderColor: "#e6e6e6",
    borderRadius: 10,
    padding: 10,
    paddingLeft: 20,
    marginVertical: 10,
    width: "100%",
    height: 50,
    color: "#000"
  },
  iconWithText: {
    position: "absolute",
    right: 30,
    bottom: 25,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1
  },
  icon: {
    width: "100%",
    height: "100%",
    resizeMode: "contain"
  },
  textArea: {
    height: 150
  },
  children: {},
  error: { color: "#f77474" }
});

const Checkbox = props => {
  return (
    <Pressable
      onPress={() => {
        props.setValue(!props.value);
      }}
      style={[checkboxStyles.container, props.style]}>
      <Image
        source={
          props.value
            ? require("../assets/checkboxIconActive.png")
            : require("../assets/checkboxIcon.png")
        }
        style={[
          checkboxStyles.checkbox,
          props.color && { tintColor: props.color },
          props.activeColor && props.value && { tintColor: props.activeColor }
        ]}
      />
    </Pressable>
  );
};

const checkboxStyles = StyleSheet.create({
  container: {
    height: 20,
    width: 20
  },
  checkbox: {
    height: "100%",
    width: "100%",
    tintColor: "#000"
  }
});

const Button1 = params => {
  const backgroundColor = params.backgroundColor || "#000";
  const textColor = params.textColor || "#fff";
  const btnStyle = {
    backgroundColor: backgroundColor,
    borderColor: params.borderColor || backgroundColor,
    borderWidth: 1
  };
  const btnText = {
    color: textColor
  };
  return (
    <View style={[buttonStyles1.btnContainer, params.style]}>
      <View style={!params.hideShadow ? buttonStyles1.shadowContainer : null}>
        <Pressable
          style={[buttonStyles1.btn, btnStyle]}
          onPress={params.onPress}>
          <Text style={[buttonStyles1.btnText, btnText]}>
            {params.buttonText}
          </Text>
          <View style={buttonStyles1.childrenContainer}>{params.children}</View>
        </Pressable>
      </View>
    </View>
  );
};

const buttonStyles1 = StyleSheet.create({
  btnContainer: {
    justifyContent: "center"
  },
  shadowContainer: {
    shadowColor: "rgba(0, 0, 0, 0.5)",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#fff",
    borderRadius: 10
  },
  btn: {
    height: 50,
    padding: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",

    flexDirection: "row"
  },
  btnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  childrenContainer: {
    justifyContent: "center",
    alignItems: "center"
  }
});

const SocialButton = props => {
  return (
    <Pressable
      style={[socialButtonStyles.container, props.style]}
      onPress={props.onPress}>
      <Image source={props.icon} style={socialButtonStyles.icon} />
      <Text style={socialButtonStyles.text}>Sign up via {props.text}</Text>
    </Pressable>
  );
};

const socialButtonStyles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 50,
    width: "100%",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#C4C4C4",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    marginVertical: 5
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    marginRight: 10
  },
  text: {
    fontSize: 16,
    color: "#888888",
    flex: 1,
    textAlign: "center"
  }
});







const Loader = () => {
  return (
    <View style={loaderStyles.container}>
      <View style={loaderStyles.loaderContainer}>
        <ActivityIndicator color="#000" />
      </View>
    </View>
  );
};
const loaderStyles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  loaderContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    elevation: 3
  }
});
