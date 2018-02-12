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

**Make sure you create an .env file with MYSQL credentials**

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

Before building change backend API URL from the component:
``resources/angular/src/app/app.component.ts``
variable name **baseURL** (default: 'http://localhost:8080')

To build for production to the public folder of lumen use
```
ng build --prod
```
This command will build the application for production and also copy the files to the `public` folder of Lumen where you can open the application with the API backend functionality.


> After everything is installed, open the url to the application

### FAQ

* Application does not open even though I set up my Virual Host
    - Set your Virtual Host to point to /path/to/backend/**public** folder
* I get ng: not found error
    - Please install angular-cli manually with
    ````npm
       sudo npm install -g angular-cli
    ````
* I get
    ``
     npm update check failed Try running with sudo or get access 
    ``
    - Run `sudo npm i install -g npm`