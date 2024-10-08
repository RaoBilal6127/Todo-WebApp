const app = require("./app");
const dotenv = require("dotenv");

//environment variable
dotenv.config();
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});