Code Documentation

under root folder: elephant-detection-project

npm init -y
npm i express mongoose dotenv
npm i nodemon

under backend folder

npm i cors jsonwebtoken
npm i bcrypt
npm install bcryptjs
npm install ws
npm install firebase-admin
npm install firebase

in order to use import express from 'express' instead of the require("express"), 
you need to have this "type": "module" under package.json in the root folder

in package.json file:
change 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },

to 

  "scripts": {
    "dev": "nodemon backend/server.js"
  },

under frontend folder:

npm create vite@latest .
npm i 
npm i @chakra-ui/react @emotion/react @emotion/styled framer-motion
npm i react-router-dom
npm i react-icons
npm i jwt-decode
npm install react-leaflet@4 leaflet
npm i react-chartjs-2

can do npm audit fix if asked

react-leaflet@5.0.0 requires React 19.
Your project is using React 18.3.1, so npm is refusing to install it.

alternative: Upgrade to React 19 (If You Want Latest Features)
npm install react@latest react-dom@latest
npm install react-leaflet leaflet

but i don't think tis is good idea, since react 19 is still new


to use ionicons: 
add     
<script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
<script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>

at the index.html file

also, at vite.config.js remember to change to this:
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      "/api":{
        target:"http://localhost:5000"
      }
    }
  }
})

To Run :
cd into backend, do npm run dev
open another terminal
cd into frontend, do npm run dev
click into the local link
