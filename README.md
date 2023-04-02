run this app
1. npm install
2. create file .env (can copy from .env.example) and set database configuration and port
3. set .env DB_MIGRATE to true for run migration
4. run on terminal 'npx sequelize-cli db:seed:all' for run sedder data
5. run development mode on terminal 'npm run dev'
6. you can import postman collection for check API