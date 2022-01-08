import React from "react";
function Calculators({
  genderSelect,
  activitySelect,
  ageSelect,
  weightSelect,
  heightSelect,
}) {
  if (!genderSelect || !activitySelect)
    return <Text style={styles.text}>Fill </Text>;
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

export default Calculators;
