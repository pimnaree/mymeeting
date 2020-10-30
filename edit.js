import React, { useEffect, useState } from "react";
import { FlatList, Alert, View, Text, TouchableOpacity, Image } from "react-native";
import { Appbar, TextInput, Button } from "react-native-paper";
import Firestore from "@react-native-firebase/firestore";
import { Actions } from "react-native-router-flux"
import IconAwesome from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-picker'

function Add() {
  const ref = Firestore().collection("todos");
  const [todo, setTodo] = useState("");
  const [photo, setPhoto] = useState();

  useEffect(() => {
  });

  async function addTodo() {
    if (todo == "") {
      await Alert.alert(
        "Warning?",
        "You must input title?",
        [{ text: "OK" }]
      )
    } else {
      await ref.add({
        title: todo,
        complete: false,
      }).then(() => {
        Actions.home()
      })
    }
  }

  function handleChoosePhoto() {
    const options = {
      title: 'เลือกรูป',
    }
    ImagePicker.showImagePicker(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else if (response.customButton) {
      } else {
        const photoDisplay = { uri: response.uri }
        setPhoto(photoDisplay)
      }
    })
  }

  var photoView = <View style={{ 
    backgroundColor: "#F7F7F7", justifyContent: "center", alignItems: "center", 
    borderRadius: 10, width: 120, height: 120, marginHorizontal: 5, marginVertical: 5,
    borderWidth: 1, borderColor: "#E0E0E0" }}>
    {(photo) ?
      <Image style={{ 
        backgroundColor: "#F7F7F7", justifyContent: "center", alignItems: "center", 
        borderRadius: 10, width: 120, height: 120, marginHorizontal: 5, marginVertical: 5,
        borderWidth: 1, borderColor: "#E0E0E0" }} source={photo} /> :
      <IconAwesome name="plus-circle" size={40} backgroundColor="#FFFFFF" color="#FF0000" />
    }
  </View>

  return (
    <>
      <Appbar>
        <Appbar.Content title={"เพิ่มงานที่ต้องทำ"} />
      </Appbar>
      <View>
        <TouchableOpacity onPress={handleChoosePhoto}>
          {photoView}
        </TouchableOpacity>
      </View>
      <TextInput label={"สร้างงานใหม่"} value={todo} onChangeText={setTodo} />
      <Button onPress={() => addTodo()}>Add TODO</Button>
    </>
  )
};


export default Add;
