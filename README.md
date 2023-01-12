# RoomexHomeAssignment

# Cloning and launching of the project

1. Clone this project by HTTP link on GitHub. 
2. Install [NodeJS](https://nodejs.org/en/).
3. Also you'll need to install Angular CLI to be able to run the project. Open command line and enter `npm install -g @angular/cli`.
4. After you've installed everything, open the project folder in your editor, and install the packages by `npm install` command in the command line.
5. Now you're able to run the project. Run `npm run start`.

# Working with the form

As far as you've launched the project, you're redirected to `/enter` route with the form. Enter all the fields with your data, and if something is wrong with the validation, you'll see the error under the field. Not all fields are required.
On submit click you'll either see any validation errors to fix your input, or will be redirected to `/thankyou` route, and will be able to see all the data you've entered before.
By Repeat button click you'll return to the previous route and will be able to enter the form once again.

# Testing

Jasmine and Karma are used for unit tests in Angular. To run the tests, enter the command `npm run test`.
The new browser window will be opened, you'll see the tests running, and also in the command line you'll see the coverage of the tested code.
