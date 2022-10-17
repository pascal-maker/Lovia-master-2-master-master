import {
  StyleSheet,
  Platform,
  Dimensions
} from 'react-native';
import {
  withTheme
} from 'react-native-elements';
import DynamicAppStyles from '../../DynamicAppStyles';

const width = Dimensions.get('window').width;

const dynamicStyles = (colorScheme) => {
  return StyleSheet.create({
    MainContainer: {
      flex: 1,
      // backgroundColor:'aqua'
      backgroundColor: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      // backgroundColor: '#FAFAFA',

      // marginTop:5
    },
    MainContainerPost: {
      flex: 1,
      backgroundColor: '#FAFAFA',
      // backgroundColor:
      //   DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,

    },
    MaincontainerHeader: {
      height: 60,
      flexDirection: 'row',
      marginHorizontal: 15,
      backgroundColor: '#FAFAFA'


    },
    containerHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FAFAFA',


    },
    containerHeader2: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerTextPost: {
      fontSize: 18,
      color: '#4bd3cb',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    backArrowPost: {
      height: 20,
      width: 15,
      borderRadius: 30
    },
    // ContainerPost: {
    //   // flex: 1,
    //   backgroundColor:'red',
    //   // backgroundColor:'#FAFAFA',
    // //  backgroundColor:'red',
    //   flexDirection:'row',
    //   height:'50%',
    //   marginVertical:10,
    //   justifyContent:'flex-start'

    // },
    safeAreaContainer: {
      flex: 1,
      backgroundColor: DynamicAppStyles.colorSet[colorScheme].mainThemeBackgroundColor,
      // backgroundColor: '#FAFAFA',
      // 
    },
    body: {
      width: '100%',
      //marginTop:50
    },
    photoView: {
      top: Platform.OS === 'ios' ? '4%' : '1%',
      width: 146,
      height: 146,
      borderRadius: 73,
      backgroundColor: 'grey',
      overflow: 'hidden',
      alignSelf: 'center',
    },
    photoViewPost: {
      top: Platform.OS === 'ios' ? '4%' : '1%',
      width: 126,
      height: 126,
      borderRadius: 73,
      backgroundColor: 'grey',
      overflow: 'hidden',
      marginRight: 190,
      marginTop: 30,
      alignSelf: 'center',
    },
    profilePictureContainer: {
      marginTop: 30,
    },
    profilePictureContainerPost: {
      flexDirection: 'row',
      marginTop: 20,
      marginVertical: 10,
      height: 100,
    },
    profilePictureView: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    profilePictureContainer: {
      marginTop: 30,
    },
    nameView: {
      width: '100%',
      marginTop: -10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {
      alignSelf: 'flex-end',
      height: 24,
      width: 24,
      borderRadius: 12,
      backgroundColor: 'rgba(0,0,0,0.2)',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 40,
      marginRight: 15,
    },
    closeButton__text: {
      backgroundColor: 'transparent',
      fontSize: 35,
      lineHeight: 35,
      color: '#FFF',
      textAlign: 'center',
    },
    ProfilePicture: {
      height: 100,
      width: 100,
      borderRadius: 60,
      borderWidth: 2.5,
      borderColor: 'white',
      marginLeft: 30,

    },
    Firstname: {
      fontSize: 21,
      // fontWeight: 'bold',
      // marginRight: 10,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      // padding: 20,
      marginHorizontal: 10
    },
    Lastname: {
      fontSize: 21,
      // marginRight: 10,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
      right: 5
    },
    schoolName: {
      fontSize: 16,
      // fontWeight: 'bold',
      marginHorizontal: 10,
      bottom: 5,
      color: 'grey',
      flexWrap: 'wrap'

    },
    distance: {
      fontSize: 16,
      marginHorizontal: 10,
      bottom: 5,
      color: 'grey',

    },
    schoolView: {
      justifyContent: 'center',
      width: 230
    },
    dataView: {
      flexDirection: 'column',
      // backgroundColor:'yellow',
      height: 120,
    },
    nameViewPost: {
      flexDirection: 'row',
      marginTop: 15
    },
    descView: {
      height: 80,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      borderColor: '#AFAFAF',
      marginVertical: 20,

    },
    descText: {
      fontSize: 17,
      marginHorizontal: 25,
      alignItems: 'flex-start'
    },

    postCounter: {
      backgroundColor: 'white',
      height: 70,
      width: 290,
      justifyContent: 'center',
      alignItems: 'baseline',
      // marginVertical:35,
      marginHorizontal: 30,
      borderRadius: 15,
      flexDirection: 'row',
      marginTop: 20

    },
    containerRecentPhotos: {
      height: 350,
      backgroundColor: 'white'
    },
    containerPostdata: {
      height: 75,

    },

    ContainerDesc: {
      top: 15
    },
    postCount: {
      height: 65,
      width: 80,
      // backgroundColor:'aqua',
      alignItems: 'center',
      justifyContent: 'center',
      marginHorizontal: 10,
      flexDirection: 'column',
      // backgroundColor:'red'
    },
    matchesCount: {
      height: 65,
      width: 90,
      // backgroundColor:'aqua',
      alignItems: 'center',
      flexDirection: 'column',
    },
    swipesCount: {
      height: 65,
      width: 95,
      // backgroundColor:'aqua',
      alignItems: 'center',
      flexDirection: 'column',
    },
    myphotosView: {
      width: '100%',
      paddingHorizontal: 12,
      // marginTop: 20,
      bottom: 10,
    },
    count: {
      fontSize: 25,
      textAlign: 'center',
      alignItems: 'center',
      top: 15,
      color: 'black',
    },
    matches: {
      fontSize: 25,
      textAlign: 'center',
      alignItems: 'center',
      // marginHorizontal:32,
      top: 15,
      color: 'black',

    },
    swipes: {
      fontSize: 25,
      textAlign: 'center',
      alignItems: 'center',
      marginHorizontal: 30,
      top: 15,
      color: 'black',

    },
    postText: {
      fontSize: 18,
      alignItems: 'center',
      textAlign: 'center',
      top: 10,
      // marginHorizontal:11,
      color: '#C0C0C0',


    },
    matchesText: {
      fontSize: 18,
      alignItems: 'center',
      textAlign: 'center',
      top: 10,
      // marginHorizontal:11,
      color: '#C0C0C0',


    },
    swipesText: {
      fontSize: 18,
      alignItems: 'center',
      textAlign: 'center',
      top: 10,
      marginHorizontal: 11,
      color: '#C0C0C0',


    },
    instagramView: {
      height: '100%',
    },
    itemView: {
      width: '100%',
      paddingVertical: 2,


    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoViewRecentPhoto: {
      flex: 1,
      justifyContent: 'center',
      marginVertical: 3,
      marginHorizontal: 15,

    },
    MaincontainerText: {
      flexWrap: 'wrap'
    },
    slideActivity: {
      height: '100%',
      width: '90%',
    },
    myphotosItemView: {
      width: Math.floor(width * 0.24),
      height: Math.floor(width * 0.24),
      marginHorizontal: 5,
      marginVertical: 8,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'grey',
      overflow: 'hidden',
    },
    myphotosItemViewPost: {
      width: Math.floor(width * 0.29),
      height: Math.floor(width * 0.29),
      // marginVertical: 5,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
      right: 5,
      // backgroundColor: 'grey',
      overflow: 'hidden',
    },
    optionView: {
      width: '100%',
      marginVertical: 7,
      paddingHorizontal: 12,
      flexDirection: 'row',
    },
    iconView: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      justifyContent: 'center',
      alignItems: 'center',

    },
    textView: {
      flex: 0.8,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    textLabel: {
      fontSize: 16,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    },
    photoTitleLabel: {
      fontWeight: '500',
      fontSize: 20,
      paddingLeft: 25,
      marginVertical: 10,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    },
    photoTitleLabelPost: {
      fontWeight: '500',
      fontSize: 20,
      paddingLeft: 15,
      marginTop: 15,
      bottom: 5,
      color: DynamicAppStyles.colorSet[colorScheme].mainTextColor,
    },
    logoutView: {
      width: '92%',
      marginTop: 20,
      marginBottom: 50,
      marginHorizontal: 12,
      padding: 10,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: DynamicAppStyles.colorSet[colorScheme].inputBgColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inactiveDot: {
      backgroundColor: DynamicAppStyles.colorSet[colorScheme].grey6,
      width: 8,
      height: 8,
      borderRadius: 4,
      marginLeft: 3,
      marginRight: 3,
      marginTop: 3,
      marginBottom: 3,
    },
  });
};

export default dynamicStyles;