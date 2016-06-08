# React Football

Reads from a football scores API and displays it in an app using React Native.
For now this only works on Android. Since I don't have a Mac nearby to test anything.

## Setup

Please follow the instructions in the [React Native Getting Started page](https://facebook.github.io/react-native/docs/getting-started.html)
to setup the basic development environment.

After installing the development environment you will need to add a valid API key. This needs to be
done in `config.js`. Replace the value `YOUR_API_KEY` with an actual API key.

To run the application, run `react-native run-android` in the folder in which you have downloaded
this repository. This will run the application in the emulator or on a real device if that has been
connected.

## Work done so far

The application currently consists of 2 pages with minimum styling. On the main page a list of
matches played on May 8th 2016 will be displayed. Clicking on any of these matches will open a
page containing more details of which actions happened during the match.

## Next steps

* Add some way to change the day for which to display matches. This can initially be a plain date
picker, but it would be great if the API can return a list of match dates, to only allow selection
of days on which there were matches.
* Split the matches on the main page by competition with section headers.
* Have a good ordering in the detail page, with more important stats at the top.
* Do not assume all matches are finished. Some refresh behavior should be implemented. Starting
with a 'pull to refresh', developing into something using push notifications, or something with
events like Firebase.
* Add an actual design to the application.
* Add support for translations.
