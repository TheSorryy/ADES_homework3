if (process.env.NODE_ENV === "development") {
    require('dotenv').config({ path: ".env.development" });
}

const app = require("./controller");

const PORT = process.env.PORT;
app.listen(3000, () => {
    console.log(`Server started on port 3000`);
});