import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { ifIphoneX } from "react-native-iphone-x-helper";
import PropTypes from "prop-types";
import { size } from "../../helpers/devices";
import * as Statics from "../../helpers/statics";
import AppStyles from "../../AppStyles";
import FastImage from "react-native-fast-image";
import Icon from "react-native-vector-icons/FontAwesome";

const TinderCard = (props) => {
  const { url, name, age, school, distance, openStar } = props;
  const defaultProfile =
    "https://www.iosapptemplates.com/wp-content/uploads/2019/06/empty-avatar.jpg";

  return (
    <View style={[styles.container, styles.cardStyle]}>
      <FastImage source={{ uri: url }} style={styles.news_image_style}>
        <ImageBackground
          style={styles.name_info_container}
          source={AppStyles.iconSet.BackgroundLayer}
        >
          <View style={styles.userDetailContainer}>
            <View style={styles.blueTick}>
              {url != defaultProfile && (
                <Icon
                  name="check-circle"
                  size={25}
                  color="yellow"
                  style={{ marginHorizontal: 5 }}
                />
              )}

              {age == null ? (
                <Text style={styles.name_style}>{name ? name : " "}</Text>
              ) : (
                <Text style={styles.name_style}>
                  {name ? name : " "}, {age ? age : " "}
                </Text>
              )}
            </View>
            {distance == null ? (
              <Text style={styles.label}>{school ? school : " "}</Text>
            ) : (
              <Text style={styles.name_style}>
                {distance ? distance : " "}, {school ? school : " "}
              </Text>
            )}
          </View>
          {/* <View style={styles.undoIconContainer}>
            <TouchableOpacity
              onPress={props.undoSwipe}
              style={styles.roundUndoIconContainer}
            >
              <Image style={styles.icon} source={AppStyles.iconSet.undo} />
            </TouchableOpacity>
          </View> */}
        </ImageBackground>
      </FastImage>
    </View>
  );
};

const undoIconSize = size(20);
const undoIconContainerSize = undoIconSize + 8;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: -80,
  },
  cardStyle: {
    position: "relative",
    top: 0,
    ...ifIphoneX(
      {
        bottom: 0,
      },
      {
        bottom: 65,
      }
    ),
    left: 0,
    right: 0,
    width: Statics.DEVICE_WIDTH,
  },
  news_image_style: {
    width: Statics.DEVICE_WIDTH - size(50),
    height: Statics.DEVICE_HEIGHT * 0.75, // FIX ME ITS BAD
    flexDirection: "column",
    justifyContent: "flex-end",
    // marginHorizontal: size(20),
    ...ifIphoneX(
      {
        marginTop: size(28),
      },
      {
        marginTop: 0,
      }
    ),
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    overflow: "hidden",
    backgroundColor: "grey",
  },
  name_info_container: {
    padding: size(20),
    flexDirection: "row",
  },
  userDetailContainer: {
    flex: 4,
    // backgroundColor: "pink",
  },
  blueTick: {
    // backgroundColor: "blue",
    flexDirection: "row",
    justifyContent: "center",
  },

  undoIconContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingBottom: 7,
  },
  roundUndoIconContainer2: {
    justifyContent: "center",
    alignItems: "center",
    height: 30,
    width: 30,
    // borderRadius: Math.floor(undoIconContainerSize + 7 / 2),
    // backgroundColor: '#e95c6f',
    zIndex: 2,
  },
  roundUndoIconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: undoIconContainerSize + 7,
    width: undoIconContainerSize + 7,
    borderRadius: Math.floor(undoIconContainerSize + 7 / 2),
    backgroundColor: "#3c9c94",
    zIndex: 2,
  },
  name_style: {
    // fontSize: size(24),
    fontSize: size(20),
    fontWeight: "700",
    color: "white",
    marginBottom: size(5),
    backgroundColor: "transparent",
    textAlign: "center",
  },
  txtBox: {
    marginTop: size(3),
    flexDirection: "row",
  },
  icon2: {
    width: size(150),
    height: size(150),
    tintColor: "white",
    tintColor: "white",
  },
  icon: {
    width: size(20),
    height: size(20),
    tintColor: "white",
  },
  label: {
    paddingLeft: size(10),
    fontSize: size(16),
    fontWeight: "400",
    color: "white",
    backgroundColor: "transparent",
    textAlign: "center",
  },
  detailBtn: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // zIndex: 3000
  },
});

export default TinderCard;
