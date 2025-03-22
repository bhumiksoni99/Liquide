The App is compatible with Expo GO. 

Follow the above steps to start the app. Please not that node version should be > 18.
  -npm install
  - npm start

Features Implemented
 - Added All Animations as shown in demo video
 - Picture Perfect UI
 - Added Like Functionality  - allows to like/unlike a location (Note: not added persistance for likes)
 - Added Share Functionality  - allows to share city and details to different apps
 - Added Functionality to Top Arrow button - scrolls to previous index

Skipped implementing Volume functionality because i used photos as carousel background instead of videos (as was mentioned in the doc that we can do )

Tradeoffs

 - Used HTML unicode icons instead of svgs to avoid using 3rd party libraries
 - Analysis of Image Background brightness level to check which text color to use on carousel (black or white) was affecting the performance of the app. IMO this is best done on server side and FE would expect to
receive a flag like isDark from the backend, so i have added this flag in the data object and i am using this to determine text colors.
