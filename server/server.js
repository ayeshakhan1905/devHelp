const app = require("./src/app");
const connectToDb = require("./src/config/db");

connectToDb()




app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
});