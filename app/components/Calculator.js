import React from "react";
import { Text, StyleSheet } from "react-native";
import { Props } from "./Calories";
import colors from "../config/colors";

function HandleCalories(Props) {
  if (!genderSelect || !activitySelect)
    return (
      <Text style={styles.text}>
        برای محاسبه کالری,فیلدهای بالا را پر کنید.
      </Text>
    );
  else if (parseInt(genderSelect) === 1 && parseInt(activitySelect) === 1)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.2 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))
        )}
      </Text>
    );
  else if (genderSelect == 1 && activitySelect == 2)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.375 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))
        )}
      </Text>
    );
  else if (genderSelect === 1 && activitySelect === 3)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.55 *
            (
              66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect)
            ).toFixed(2)
        )}
      </Text>
    );
  else if (genderSelect === 1 && activitySelect === 4)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.725 *
            (
              66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect)
            ).toFixed()
        )}
      </Text>
    );
  else if (parseInt(genderSelect) === 1 && parseInt(activitySelect) === 5)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.9 *
            (66.5 +
              13.75 * parseFloat(weightSelect) +
              5.003 * parseFloat(heightSelect) -
              6.755 * parseFloat(ageSelect))
        )}
      </Text>
    );
  //female condition
  else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 1)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.2 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))
        )}
      </Text>
    );
  else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 2)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.375 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))
        )}
      </Text>
    );
  else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 3)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.55 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))
        )}
      </Text>
    );
  else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 4)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.725 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))
        )}
      </Text>
    );
  else if (parseInt(genderSelect) === 2 && parseInt(activitySelect) === 5)
    return (
      <Text style={styles.text}>
        {parseInt(
          1.9 *
            (655 +
              9.563 * parseFloat(weightSelect) +
              1.85 * parseFloat(heightSelect) -
              4.676 * parseFloat(ageSelect))
        )}
      </Text>
    );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 5,
    flexDirection: "column",
    width: 10,
    padding: 15,
    marginVertical: 5,
    alignItems: "center",
    alignSelf: "center",
  },
  icon: {
    marginRight: 10,
  },
  text: {
    color: colors.dark,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 30,
    flex: 1,
    textAlign: "center",
    fontWeight: "800",
  },
});
export default HandleCalories();
