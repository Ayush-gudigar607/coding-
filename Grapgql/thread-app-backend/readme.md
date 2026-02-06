npm init
npm i typescript -D
npm i express
npx tsc --init


for prisma 

npm install prisma @types/node @types/pg --save-dev 
npm install @prisma/client @prisma/adapter-pg pg dotenv

npx prisma init


to connect with prisma with our database we are using migrate 

in terminal to check database is connected or not use 

docker exec -it ee77d849ce2c32ac74wbe75464ae0e68149703f3ec178c5efae9d4711ac7716d bash

su postgress 

psql -U user -d postgres

\l    (list od database )

postgres-# \c postgres
You are now connected to database "postgres" as user "user".
