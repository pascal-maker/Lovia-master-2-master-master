import PropTypes from "prop-types";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Switch } from "react-native";
import ActionSheet from "react-native-actionsheet";
import AsyncStorage from '@react-native-community/async-storage';

import dynamicStyles from "./styles";
import { useColorScheme } from "react-native-appearance";
import { IMLocalized } from "../../../localization/IMLocalization";
import { ScrollView } from "react-native-gesture-handler";

function IMFormComponent(props) {
  const {
    form,
    initialValuesDict,
    onFormChange,
    onFormButtonPress,
    appStyles,
    deleteUser,
  } = props;
  const colorScheme = useColorScheme();
  const styles = dynamicStyles(appStyles, colorScheme);

  const [alteredFormDict, setAlteredFormDict] = useState({});

  const onFormFieldValueChange = (formField, value) => {
    var newFieldsDict = alteredFormDict;
    newFieldsDict[formField.key] = value;
    setAlteredFormDict(newFieldsDict);
    onFormChange(newFieldsDict);
  };

  const renderSwitchField = (switchField, index) => {
    return (
      <View
        key={index}
        style={[styles.settingsTypeContainer, styles.appSettingsTypeContainer]}
      >
        <Text style={styles.text}>{switchField.displayName}</Text>
        <Switch
          value={computeValue(switchField)}
          onValueChange={(value) => onFormFieldValueChange(switchField, value)}
          style={{ transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }] }}
        />
      </View>
    );
  };

  const renderTextField = (formTextField, index, totalLen) => {
    return (
      <View key={index}>
        <View
          style={[
            styles.settingsTypeContainer,
            styles.appSettingsTypeContainer,
          ]}
        >
          <Text style={styles.text}>{formTextField.displayName}</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[styles.text, { textAlign: "right" }]}
            editable={formTextField.editable}
            onChangeText={(text) => {
              onFormFieldValueChange(formTextField, text);
            }}
            placeholderTextColor={styles.placeholderTextColor}
            placeholder={formTextField.placeholder}
            value={computeValue(formTextField)}
          />
        </View>
        {index < totalLen - 1 && <View style={styles.divider} />}
      </View>
    );
  };

  const renderButtonField = (buttonField, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onFormButtonPress(buttonField)}
        style={[styles.settingsTypeContainer, styles.appSettingsSaveContainer]}
      >
        <Text style={styles.settingsType}>{buttonField.displayName}</Text>
      </TouchableOpacity>
    );
  };

  const onSelectFieldPress = (selectField, ref) => {
    ref.current.show();
  };

  const onActionSheetValueSelected = (selectField, selectedIndex) => {
    if (selectedIndex < selectField.options.length) {
      const newValue = selectField.options[selectedIndex];
      onFormFieldValueChange(selectField, newValue);
    }


    console.log(
      "selectField, selectedIndex : ",
      selectField.displayName,
      selectedIndex
    );

    if (selectField.displayName == "School Preference") {
      AsyncStorage.setItem(
        "schoolname",
        selectField.displayOptions[selectedIndex]
      );
    }
  };

  const renderSelectField = (selectField, index) => {
    const actionSheetRef = React.createRef();
    return (
      <View>
        <TouchableOpacity
          key={index}
          onPress={() => onSelectFieldPress(selectField, actionSheetRef)}
          style={[
            styles.settingsTypeContainer,
            styles.appSettingsTypeContainer,
          ]}
        >
          <Text style={styles.text}>{selectField.displayName}</Text>
          <Text style={styles.text}>{computeValue(selectField) === 'My Matches' ? 'all' : computeValue(selectField)}</Text>
          <ActionSheet
            ref={actionSheetRef}
            title={selectField.displayName}
            options={[...selectField.displayOptions, IMLocalized("Cancel")]}
            cancelButtonIndex={selectField.displayOptions.length}
            onPress={(selectedIndex) => {
              

              onActionSheetValueSelected(selectField, selectedIndex);
            }}
          />
        </TouchableOpacity>
        <View style={styles.divider} />
      </View>
    );
  };

  const renderField = (formField, index, totalLen) => {
    const type = formField.type;
    if (type == "text") {
      return renderTextField(formField, index, totalLen);
    }
    if (type == "switch") {
      return renderSwitchField(formField, index);
    }
    if (type == "button") {
      return renderButtonField(formField, index);
    }
    if (type == "select") {
      return renderSelectField(formField, index);
    }
    return null;
  };

  const renderSection = (section) => {
    return (
      <View key={section.title}>
        <View style={styles.settingsTitleContainer}>
          <Text style={styles.settingsTitle}>{section.title}</Text>
        </View>
        <View style={styles.contentContainer}>
          {section.fields.map((field, index) =>
            renderField(field, index, section.fields.length)
          )}
        </View>
      </View>
    );
  };

  const displayValue = (field, value) => {
    if (!field.displayOptions || !field.options) {
      return value;
    }
    for (var i = 0; i < field.options.length; ++i) {
      if (i < field.displayOptions.length && field.options[i] == value) {
        return field.displayOptions[i];
      }
    }
    return value;
  };

  const computeValue = (field) => {
    if (alteredFormDict[field.key] != null) {
      return displayValue(field, alteredFormDict[field.key]);
    }
    if (initialValuesDict[field.key] != null) {
      return displayValue(field, initialValuesDict[field.key]);
    }
    return displayValue(field, field.value);
  };

  console.log("form.sections : ", form.sections[0].title);

  return (
    <ScrollView style={styles.container}>
      {form.sections.map((section) => renderSection(section))}
      {form.sections[0].title == "PUBLIC PROFILE" ? (
        <>
        <View style={styles.settingsTitleContainer}>
        <Text style={styles.settingsTitle}>Delete Profile</Text>
      </View>
        <TouchableOpacity
          onPress={deleteUser}
          style={{
            height: 45,
            backgroundColor: "white",
            marginTop: 10,
            // marginHorizontal: 70,
            justifyContent: "center",
            marginBottom: 70,
            borderTopWidth:1,
            borderTopColor: appStyles.colorSet[colorScheme].hairlineColor,
            borderBottomWidth:1,
            borderBottomColor: appStyles.colorSet[colorScheme].hairlineColor,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              // fontWeight: "bold",
              color: appStyles.colorSet[colorScheme].mainTextColor,
              textAlign: "center",
            }}
          >
            Delete My Profile
          </Text>
        </TouchableOpacity>
        </>
      ) : null}
    </ScrollView>
  );
}

IMFormComponent.propTypes = {
  onFormChange: PropTypes.func,
};

export default IMFormComponent;
