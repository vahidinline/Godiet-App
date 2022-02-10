import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Dimensions } from "react-native";
const { height, width } = Dimensions.get("window");

export default function ProfilePic() {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      MediaLibrary.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "transparent",
            justifyContent: "flex-end",
          }}
        >
          <TouchableOpacity
            style={{ alignSelf: "center", marginBottom: 20 }}
            onPress={async () => {
              if (cameraRef) {
                let photo = await cameraRef.takePictureAsync({
                  skipProcessing: true,
                });
                // New code here
                const manipResult = await ImageManipulator.manipulateAsync(
                  photo.uri,
                  [
                    { rotate: 90 },
                    { flip: ImageManipulator.FlipType.Vertical },
                  ],
                  { compress: 1, format: ImageManipulator.SaveFormat.PNG }
                );
                MediaLibrary.saveToLibraryAsync(manipResult.uri);
              }
            }}
          ></TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}
