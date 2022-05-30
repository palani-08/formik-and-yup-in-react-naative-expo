import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Dimensions,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import CustomButton from "./CustomButton";
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height;

const reviewSchema = yup.object({
  email: yup
    .string()
    .email(" *Field should contain a valid e-mail")
    .max(255)
    .required(" *E-mail is required"),
  password: yup.string()
  .required("*Password is required")
  .min(6),
});

export default function App() {
  const initialData = {
    email: "",
    password: "",
  };
  const [user, setuser] = useState(initialData);
  const checkValues = () => {
    console.log(user, "userrrrrrr");
  };
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={reviewSchema}
        onSubmit={(values, actions) => {
          setuser({ ...values });
          actions.resetForm();
        }}
      >
        {({
          handleChange,
          values,
          handleSubmit,
          handleBlur,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              onChangeText={handleChange("email")}
              placeholder="Email"
              onBlur={handleBlur("email")}
              style={styles.input}
              value={values.email}
            ></TextInput>
            <Text style={styles.errorMessage}>
              {touched.email && errors.email}
            </Text>
            <TextInput
              secureTextEntry={true}
              style={styles.input}
              onChangeText={handleChange("password")}
              placeholder="Password"
              onBlur={handleBlur("password")}
              value={values.password}
            ></TextInput>
            <Text style={styles.errorMessage}>
              {touched.password && errors.password}
            </Text>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <CustomButton text="submit" onPress={handleSubmit} />
              <CustomButton text="onclick" onPress={checkValues} />
            </View>
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: width - 100,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    padding: 4,
    marginVertical: "2%",
  },
  errorMessage: {
    color: "red",
    fontSize: 12,
  },
});
