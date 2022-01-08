if (!genderSelect || !activitySelect) return (result = 1);
else if (parseInt(genderSelect) === 1 && parseInt(activitySelect) === 1)
  return <Text style={styles.text}>{parseInt(1.2 * menCalc)}</Text>;
else if (genderSelect == 1 && activitySelect == 2)
  return <Text style={styles.text}>{parseInt(1.375 * menCalc)}</Text>;
else if (genderSelect === 1 && activitySelect === 3)
  return <Text style={styles.text}>{parseInt(1.55 * menCalc)}</Text>;
else if (genderSelect === 1 && activitySelect === 4)
  return <Text style={styles.text}>{parseInt(1.725 * menCalc)}</Text>;
else if (parseInt(genderSelect) === 1 && parseInt(activitySelect) === 5)
  return <Text style={styles.text}>{parseInt(1.9 * menCalc)}</Text>;

if (genderSelect == 1) {
  if (activitySelect == 1) {
    parseInt(1.2 * menCalc);
  }
}
