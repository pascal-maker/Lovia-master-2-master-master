import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, Text } from 'react-native';
import FastImage from 'react-native-fast-image';
import { size } from '../../helpers/devices';
import { IMLocalized } from '../../Core/localization/IMLocalization';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';

const NoPost = (props) => {
  return (
    <View style={styles.container}>
      {props.profilePictureURL && (
        <FastImage
          source={{ uri: props.profilePictureURL }}
          style={styles.user_pic_style}
        />
      )}
      {props.profilePictureURL && (
        <Text style={styles.empty_state_text_style}>
          {IMLocalized("There's no post available")}
        </Text>
      )}

    </View>
  );
};

NoPost.propTypes = {
  isProfileComplete: PropTypes.bool,
  profilePictureURL: PropTypes.string,
  url: PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom:100,
  },
  user_pic_style: {
    width: size(90),
    height: size(90),
    borderRadius: size(45),
    marginBottom: size(15),

  },
  empty_state_text_style: {
    fontSize: size(14),
    color: '#777777',
    // textAlign: 'center',
    marginBottom: size(30),

  },
  post:{
    justifyContent:'center',
    alignContent:'center',
    alignItems:'center',
    height:50,
    width:250,
    backgroundColor:'#4CD4CB'

    
  }
});

export default NoPost;
