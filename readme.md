# Odds Converter

Convert Odds and save them to database with Lumen PHP Framework

#### Requirements
```
- php >= 7.1
- NodeJS
```

#### Technologies Used:
* Lumen PHP framework
* Angular 4
* Angular Materials (input and selectbox)
* Angular CLI


#### Installing

To install application please run these commands:

##### Backend

For best results please use one of the following WAMP, LAMP, MAMP, Homestead ...
The built in server does not work properly since it has php version 7.0.10

```
composer update
```

Create tables structure
```
php artisan migrate
```

##### FrontEnd

Before installing head to the `resorces/angular` folder

To install  dependencies
```
npm install
```

To run application locally
```
npm start
```

To build for production to the public folder of lumen use
```
ng build --prod
```
This command will build the application for production and also copy the files to the `public` folder of Lumen where you can open the application with the API backend functionality.


> After everything is installed, open the url to the application

### FAQ

* Application does not open even though I set up my Virual Host
    - Set your Virtual Host to point to /path/to/backend/**public** folder