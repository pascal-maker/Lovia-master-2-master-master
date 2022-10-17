"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _IMLocalization = require("./Core/localization/IMLocalization");

(0, _IMLocalization.setI18nConfig)();
var regexForNames = /^[a-zA-Z]{2,25}$/;
var regexForPhoneNumber = /\d{9}$/;
var regexForAge = /[0-9]/g;
var DatingConfig = {
  isSMSAuthEnabled: true,
  appIdentifier: "rn-dating-android",
  onboardingConfig: {
    welcomeTitle: (0, _IMLocalization.IMLocalized)("Find like-minded people"),
    welcomeCaption: (0, _IMLocalization.IMLocalized)(
      "Match and chat with people you like from your area."
    ),
    walkthroughScreens: [
      {
        icon: require("../assets/images/Logo.png"),
        title: " Make a friend",
        description: (0, _IMLocalization.IMLocalized)(
          "Swipe right to become friends with students you like from your area."
        ),
      },
      {
        icon: require("../assets/images/chat.png"),
        title: "Private Messages",
        description: (0, _IMLocalization.IMLocalized)(
          "Chat privately with people you match."
        ),
      },
      {
        icon: require("../assets/images/instagram.png"),
        title: "Send Photos & Videos",
        description: (0, _IMLocalization.IMLocalized)(
          "Have fun with your new friends by sending photos and videos to each other."
        ),
      },
      {
        icon: require("../assets/images/notification.png"),
        title: "Get Notified",
        description: (0, _IMLocalization.IMLocalized)(
          "Receive notifications when you get new messages and friends."
        ),
      },
    ],
  },
  tosLink:
    "https://lovia.love/terms.php",
  isUsernameFieldEnabled: false,
  smsSignupFields: [
    {
      displayName: (0, _IMLocalization.IMLocalized)("First Name"),
      type: "text",
      editable: true,
      regex: regexForNames,
      key: "firstName",
      placeholder: "First Name",
    },
    {
      displayName: (0, _IMLocalization.IMLocalized)("Last Name"),
      type: "text",
      editable: true,
      regex: regexForNames,
      key: "lastName",
      placeholder: "Last Name",
    },
    {
      displayName: (0, _IMLocalization.IMLocalized)("Username"),
      type: "text",
      editable: true,
      regex: regexForNames,
      key: "username",
      placeholder: "Username",
    },
  ],
  signupFields: [
    {
      displayName: (0, _IMLocalization.IMLocalized)("First Name"),
      type: "text",
      editable: true,
      regex: regexForNames,
      key: "firstName",
      placeholder: "First Name",
    },
    {
      displayName: (0, _IMLocalization.IMLocalized)("Last Name"),
      type: "text",
      editable: true,
      regex: regexForNames,
      key: "lastName",
      placeholder: "Last Name",
    },
    {
      displayName: (0, _IMLocalization.IMLocalized)("Username"),
      type: "text",
      editable: true,
      regex: regexForNames,
      key: "username",
      placeholder: "Username",
    },
    {
      displayName: (0, _IMLocalization.IMLocalized)("E-mail Address"),
      type: "text",
      editable: true,
      regex: regexForNames,
      key: "email",
      placeholder: "E-mail Address",
      autoCapitalize: "none",
    },
    {
      displayName: (0, _IMLocalization.IMLocalized)("Password"),
      type: "default",
      secureTextEntry: true,
      editable: true,
      regex: regexForNames,
      key: "password",
      placeholder: "Password",
      autoCapitalize: "none",
    },
  ],
  privacyPolicyLink: "https://lovia.love/privacy.php",
  editProfileFields: {
    sections: [
      {
        title: (0, _IMLocalization.IMLocalized)("PUBLIC PROFILE"),
        fields: [
          {
            displayName: (0, _IMLocalization.IMLocalized)("First Name"),
            type: "text",
            editable: true,
            regex: regexForNames,
            key: "firstName",
            placeholder: "Your first name",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Last Name"),
            type: "text",
            editable: true,
            regex: regexForNames,
            key: "lastName",
            placeholder: "Your last name",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Age"),
            type: "text",
            editable: true,
            regex: regexForAge,
            key: "age",
            placeholder: "Your age",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Gender"),
            type: "select",
            options: ["female", "male", "other"],
            displayOptions: ["Female", "Male", "Other"],
            editable: true,
            key: "gender",
            value: "Other",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Bio"),
            type: "text",
            editable: true,
            key: "bio",
            placeholder: "Your bio",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("School"),
            type: "select",
            options: [
              "Universiteit Gent",
              "ArteveldeHogeschool",
              "LUCA School of Arts/ Campus Sint lucas Gent",
              "KU Leuven",
              "Hogeschool Gent",
              "Odisee Technologiecampus Gent",
              "De Hogeschool West-Vlaanderen",
              "KASK & Conservatorium",
            ],

            displayOptions: [
              "Universiteit Gent",
              "ArteveldeHogeschool",
              "LUCA School of Arts/ Campus Sint lucas Gent",
              "KU Leuven",
              "Hogeschool Gent",
              "Odisee Technologiecampus Gent",
              "De Hogeschool West-Vlaanderen",
              "KASK & Conservatorium",
            ],
            editable: true,
            key: "school",
            value: "Universiteit Gent",

          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Study"),
            type: "text",
            editable: true,
            // regex: regexForNames,
            key: "study",
            placeholder: "Your study",
          },
        ],
      },
      {
        title: (0, _IMLocalization.IMLocalized)("PRIVATE DETAILS"),
        fields: [
          {
            displayName: (0, _IMLocalization.IMLocalized)("E-mail Address"),
            type: "text",
            editable: false,
            key: "email",
            placeholder: "Your email address",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Phone Number"),
            type: "text",
            editable: true,
            regex: regexForPhoneNumber,
            key: "phone",
            placeholder: "Your phone number",
          },
        ],
      },
    ],
  },
  userSettingsFields: {
    sections: [
      {
        title: (0, _IMLocalization.IMLocalized)("DISCOVERY"),
        fields: [
          {
            displayName: (0, _IMLocalization.IMLocalized)("Show Me on Lovia"),
            type: "switch",
            editable: true,
            key: "show_me",
            value: true,
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Distance Radius"),
            type: "select",
            options: ["5", "10", "15", "25", "50", "100", "unlimited"],
            displayOptions: [
              "5 Km",
              "10 Km",
              "15 Km",
              "25 Km",
              "50 Km",
              "100 Km",
              "Unlimited",
            ],
            editable: true,
            key: "distance_radius",
            value: "Unlimited",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Gender Preference"),
            type: "select",
            options: ["female", "male", "other", "all"],
            displayOptions: ["Female", "Male", "Other", "All"],
            editable: true,
            key: "gender_preference",
            value: "All",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("School Preference"),
            type: "select",
            options: [
              "Universiteit Gent",
              "ArteveldeHogeschool",
              "LUCA School of Arts/ Campus Sint lucas Gent",
              "KU Leuven",
              "Hogeschool Gent",
              "Odisee Technologiecampus Gent",
              "De Hogeschool West-Vlaanderen",
              "KASK & Conservatorium",
              "all",
            ],
            displayOptions: [
              "Universiteit Gent",
              "ArteveldeHogeschool",
              "LUCA School of Arts/ Campus Sint lucas Gent",
              "KU Leuven",
              "Hogeschool Gent",
              "Odisee Technologiecampus Gent",
              "De Hogeschool West-Vlaanderen",
              "KASK & Conservatorium",
              "All",
            ],
            editable: true,
            key: "school_preference",
            value: "All",
            
            
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Privacy"),
            type: "select",
            options: [
              "Universiteit Gent",
              "ArteveldeHogeschool",
              "LUCA School of Arts/ Campus Sint lucas Gent",
              "KU Leuven",
              "Hogeschool Gent",
              "Odisee Technologiecampus Gent",
              "De Hogeschool West-Vlaanderen",
              "KASK & Conservatorium",
              "My Matches",
              "all",
            ],
            displayOptions: [
              "Universiteit Gent",
              "ArteveldeHogeschool",
              "LUCA School of Arts/ Campus Sint lucas Gent",
              "KU Leuven",
              "Hogeschool Gent",
              "Odisee Technologiecampus Gent",
              "De Hogeschool West-Vlaanderen",
              "KASK & Conservatorium",
              "All",
            ],
            editable: true,
            key: "privacy",
            value: "All",
            
            
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Preferences"),
            type: "select",
            options: [
              "My Matches",
              "Universiteit Gent",
              "ArteveldeHogeschool",
              "LUCA School of Arts/ Campus Sint lucas Gent",
              "KU Leuven",
              "Hogeschool Gent",
              "Odisee Technologiecampus Gent",
              "De Hogeschool West-Vlaanderen",
              "KASK & Conservatorium",
             
              "all",
            ],
            displayOptions: [
              "My Matches",
              "Universiteit Gent",
              "ArteveldeHogeschool",
              "LUCA School of Arts/ Campus Sint lucas Gent",
              "KU Leuven",
              "Hogeschool Gent",
              "Odisee Technologiecampus Gent",
              "De Hogeschool West-Vlaanderen",
              "KASK & Conservatorium",
              "All",
            ],
            editable: true,
            key: "preferences",
            value: "All",
            
            
          },
          
          
          
          
          
          
          
          // {
          //   displayName: IMLocalized("Study Preference"),
          //   type: "text",
          //   editable: true,
          //   regex: regexForNames,
          //   key: "study_preference",
          //   placeholder: "Your first name",
          // },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Change Language"),
            type: "select",
            options: ["English", "Dutch"],
            //["English", "France", "German", "Nederlands"],
            displayOptions: ["English", "Dutch"],
            //["English", "France", "German", "Nederlands"],
            editable: true,
            key: "change_language",
            value: "English",
          },
        ],
      },
      {
        title: (0, _IMLocalization.IMLocalized)("PUSH NOTIFICATIONS"),
        fields: [
          {
            displayName: (0, _IMLocalization.IMLocalized)("New friends"),
            type: "switch",
            editable: true,
            key: "push_new_friends_enabled",
            value: true,
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Messages"),
            type: "switch",
            editable: true,
            key: "push_new_messages_enabled",
            value: true,
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Super Likes"),
            type: "switch",
            editable: true,
            key: "push_super_likes_enabled",
            value: true,
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("Top Picks"),
            type: "switch",
            editable: true,
            key: "push_top_picks_enabled",
            value: true,
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            displayName: (0, _IMLocalization.IMLocalized)("Save"),
            type: "button",
            key: "savebutton",
          },
        ],
      },
    ],
  },
  contactUsFields: {
    sections: [
      {
        title: (0, _IMLocalization.IMLocalized)("CONTACT"),
        fields: [
          {
            displayName: (0, _IMLocalization.IMLocalized)("Address"),
            type: "text",
            editable: false,
            key: "push_notifications_enabled",
            value: "Gérard Willemotlaan 30, 9030 Mariakerke, Gent",
          },
          {
            displayName: (0, _IMLocalization.IMLocalized)("E-mail us"),
            value: "loviastudents@gmail.com",
            type: "text",
            editable: false,
            key: "email",
            placeholder: "Your email address",
          },
        ],
      },
      {
        title: "",
        fields: [
          {
            displayName: (0, _IMLocalization.IMLocalized)("Call Us"),
            type: "button",
            key: "savebutton",
          },
        ],
      },
    ],
  },
  dailySwipeLimit: 1000000000000000000000000000000000000000000000000000000000000000000,
  subscriptionSlideContents: [
    // {
    //   title: (0, _IMLocalization.IMLocalized)("Go VIP"),
    //   description: (0, _IMLocalization.IMLocalized)(
    //     "When you subscribe, you get unlimited daily swipes, undo actions, VIP badge and more."
    //   ),
    //   src: require("../assets/images/fencing.png"),
    // },
    // {
    //   title: (0, _IMLocalization.IMLocalized)("Undo Actions"),
    //   description: (0, _IMLocalization.IMLocalized)(
    //     "Get undo swipe actions when you subscribe."
    //   ),
    //   src: require("../assets/images/vip_1.png"),
    // },
    // {
    //   title: (0, _IMLocalization.IMLocalized)("Vip Badge"),
    //   description: (0, _IMLocalization.IMLocalized)(
    //     "Stand out with vip badge amongst other swipes when you subscribe"
    //   ),
    //   src: require("../assets/images/vip_2.png"),
    // },
    // {
    //   title: (0, _IMLocalization.IMLocalized)("Enjoy Unlimited Access"),
    //   description: (0, _IMLocalization.IMLocalized)(
    //     "Get unlimited app access and more features to come."
    //   ),
    //   src: require("../assets/images/vip-pass.png"),
    // },
  ],
  contactUsPhoneNumber: "+16504859694",
  // IAP_SHARED_SECRET: "699db7fcf10c4922bf148caf334c89c6",
  // IAP_SKUS: _reactNative.Platform.select({
  //   ios: [
  //     "com.instaswipey.FreeTrial.InstaswipeyAutoRenewableSubscriptionByMonth",
  //     "com.instaswipey.FreeTrial.InstaswipeyAutoRenewableSubscriptionByYear",
  //   ],
  //   android: ["annual_vip_subscription", "monthly_vip_subscription"],
  // }),
  // facebookIdentifier: "285315185217069",
};
var _default = DatingConfig;
exports["default"] = _default;
