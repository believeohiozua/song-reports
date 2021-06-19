# song-reports

- ### Introduction
```
This is a Dockerized MERN stack (Mongodb, Expressjs, Rectjs and Nodejs) web application that allows the creation, read, update and delete (CRUD) of songs and the reporting of usage of a song by a particular user.

NOTE
 - Each user is represented by UDID
 _ Usage is defined as the duration with which a long was learnt per time
```

- ### How to run the application
```
1. unzip the file song-report.zip file
2. open the song-report folder with the terminal 
3. For Docker run: 
        - docker-compose build
        - docker-compose up
        NOTE: After running the above commands the web page will open in your browser, this becase docker will start 
        mongodb image
        Node js image
        React js image 
        all at the same time 

4. For None-Docker run: 
   - Open the song-report/backend directory and run npm start  : This will start the backend server
   - Then in another terminal open the song-report/frontend directory and run npm start :  This will start the react-app
```

- ### Running Test
 To test this server and schema functionalities and implimentations
 - Open the song-report/backend directory and run `npm test`

- ### Endpoint Documentation
`postman api documentation`
https://documenter.getpostman.com/view/13743580/TzeZDRGr

- ### Github link to project 
https://github.com/believeohiozua/song-reports.git

- git clone `https://github.com/believeohiozua/song-reports.git`
- `cd song-reports`
- `docker-compose build`
- `docker-compose up`


- ### Web Host Link
http://songusage.herokuapp.com/



- ### Screen graps
screengrabs