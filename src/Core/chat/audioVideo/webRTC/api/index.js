// Uncomment these if you want to remove firebase and add your own custom backend:
// import * as apiManager from './local/audioVideo';
// import MediaChatTracker from './local/tracker';
// export { MediaChatTracker };
// export default apiManager;

// Uncomment these if you want to remove firebase and add your own custom backend:
// import * as apiManager from './backend/audioVideo';
// import MediaChatTracker from './backend/tracker';
// export { MediaChatTracker };
// export default apiManager;

// Remove these lines if you want to remove firebase and add your own custom backend:
import * as apiManager from './firebase/audioVideo';
import MediaChatTracker from './firebase/tracker';
export { MediaChatTracker };
export default apiManager;
