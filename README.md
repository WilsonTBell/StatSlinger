# StatSlinger

## Application Overview
StatSlinger is a front end development capstone project which is intended for Cowboy Action Shooting clubs and particpiants. It provides them with a resource for displaying upcoming matches as well as allowing individuals to log and view their own stats from previous matches

## Features
- Ability of Admins to create new matches and associated stages
- Ability of Admins to grant admin status to other users
- Ability of all users to view upcoming matches and log their shooting stats for each stage in that match
- Ability of all users to create and edit a collection of guns accesible only by them

##  Technologies Used
![image](https://user-images.githubusercontent.com/105528673/183157779-a08151c2-07d4-469a-b1bf-fa409416d6ea.png)
![image](https://user-images.githubusercontent.com/105528673/183157835-99e6ec8c-701a-445b-ac72-0e9127112edd.png)
![image](https://user-images.githubusercontent.com/105528673/183157888-59cfa84d-da1f-4adb-acf7-858c87b63a87.png)
![image](https://user-images.githubusercontent.com/105528673/183157933-3a0c3484-a02a-4734-b7a3-d6b1c2904b83.png)
![image](https://user-images.githubusercontent.com/105528673/183157976-5543fa85-504e-41ad-9e00-016e5ca1b7e5.png)
![image](https://user-images.githubusercontent.com/105528673/183158015-89d806bd-2894-46f5-a5cf-e9642f48a8f3.png)
![image](https://user-images.githubusercontent.com/105528673/183158127-8d8c783d-19ad-4213-af19-1f54d91be8cb.png)
![image](https://user-images.githubusercontent.com/105528673/183158164-e94a87d3-6bd8-497e-9770-4074141ee75a.png)



## Running This Application

First, a note about authentication...
This application uses mock authentication which is purely for demonstration purposes. Therefore the login and registration code written here is completely insecure and would never be implemented in a professional application.

1. Clone This Repository And Change To The Directory In The Terminal.
```
git clone git@github.com:WilsonTBell/StatSlinger.git
cd StatSlinger
```

2.Access And Run The Database
```
git clone git@github.com:WilsonTBell/statslinger-API.git
json-server -p 8088 database.json -w
```

3.Launch the client.
```
npm install
npm start
```
Admin Login
```
wilson@wilson.com
```
Regular User Login
```
t@t.com
```


## ERD
[DB Diagram ERD](https://dbdiagram.io/d/62d17804cc1bc14cc5c7e8f6)


