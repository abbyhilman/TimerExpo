import React, { useState, useEffect } from "react";
import { StyleSheet, Platform, SafeAreaView } from "react-native";
import { Focus } from "./src/features/focus/Focus";
import { FocusHistory } from "./src/features/focus/FocusHistory";
import { Timer } from "./src/features/timer/Timer";
import { colors } from "./src/utils/colors";
import { spacing } from "./src/utils/sizes";

console.disableYellowBox = true;

const STATUSES = {
  COMPLETE: 1,
  CANCELLED: 2,
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistoryWithState = (subject, status) => {
    setFocusHistory([...focusHistory, {subject, status}])
  }

  const onClear = () => {
      setFocusHistory([]);
  }

  return (
    <SafeAreaView style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistoryWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}
          clearSubject={() => {
            addFocusHistoryWithState(focusSubject, STATUSES.CANCELLED);
            setFocusSubject(null)
          }}
        />
      ) : (
        <>
        <Focus addSubject={setFocusSubject} />
        <FocusHistory focusHistory={focusHistory} onClear={onClear}/>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS == "ios" ? spacing.md : spacing.lg,
    backgroundColor: colors.darkBlue,
  },
});
