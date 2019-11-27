# Advanced-Computer-Science
Advanced Software Engineering Project

This project is developed for Advanced software engineering course which encourage students to agile development and simulate real industry problems.

## Getting Started

You can clone the repo and see one by one our milestones of our project.
```
git clone https://github.com/Hsgngr/Advanced-Computer-Science
cd Project-v3  //Example
npm start
```

### Prerequisites

If you want to use android emulator, You should install Android Studio and set up a virtual device.
If you are going to use it with your device, you need to install expo app to your physical devices.

```
npm install expo-cli
```

### Installing
The folders that you can run "npm start" in:
  1)minimumDelivarable
  2)Project-v3
  3)task4

```
cd minimumDelivrable
npm start
```
To run the task4 there are more things you should do, since it needs a local server and ngrok also. You need 3 different cmd prompt

```
cd track-server
npm run dev
```
```
ngrok http 3000
```
```
npm start
```

## Running the tests

 Postman for testing post requests of custom api
 Nodemon: for Automation Restarts of server




## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Ege Hoşgüngör** - *Initial work* - [Hsgngr](https://github.com/Hsgngr)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


## Acknowledgments

* Mostly inspired from Udemy courses and stackoverflow


Our Trello Account:
https://trello.com/b/OcuCUrDH/software-project

Our Google Docs:
https://docs.google.com/document/d/1Frkdjs8Y-WWoasVZkAv5nXN7yNbtiETGtaL7AlvJCm8/edit

Our Project Plan:
https://docs.google.com/document/d/15UwbPw09sZm3PpbBOhXMPql8ygIRWEpavoZHbAj75j8/edit?usp=sharing


To download this project try to use git Lfs. 
Download from here: https://git-lfs.github.com/
After installing the lfs you need to pull the project with : git lfs pull

Current Used Technologies:

  Cross-Platform framework for mobile application: React Native
    Expo: for debugging and running while developing
    axios: Package for better fetch
    react-native-elements: for having more customized components
    react-native-gesture-handler: for user gesture interaction
    react-native-animated : for animations of screen handling
    react-navigation-stack, react-navigation-tab : The navigation types that we used
    
  Cloud Database: MongoDB Atlas with Google Cloud Platform


  Server Based:
    Building a REST API: Express, Node.js web application framework
    Nodemon: for Automation Restarts of server
    Postman for testing post requests of custom api
    JSONWEBTOKEN for privacy of authentication (To protect user data from malacious reasons)


