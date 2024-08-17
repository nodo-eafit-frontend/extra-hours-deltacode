require("dotenv").config();
const express = require("express");
const fs = require("fs");
const router = require("./routes");
const cors = require("cors");
const port = process.env.PORT;
const app = express();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cors({ origin: "http://localhost:5173" })); // Permite que el servidor reciba peticiones de cualquier origen Nota: por seguridad es preferible usar el origen específico
app.use(express.static("public"));
app.use(router);

app.post("/extra-hour", (request, response) => {
  const newExtraHour = request.body;

  fs.readFile("extraHours.json", "utf8", (err, data) => {
    if (err) {
      console.error("Error leyendo el archivo:", err);
      return response.status(500).send("Error leyendo el archivo");
    }

    const extraHours = JSON.parse(data);

    extraHours.push(newExtraHour);

    fs.writeFile(
      "extraHours.json",
      JSON.stringify(extraHours, null, 2),
      (err) => {
        if (err) {
          console.error("Error escribiendo el archivo:", err);
          return response.status(500).send("Error escribiendo el archivo");
        }

        response
          .status(200)
          .json({ message: "Registro agregado correctamente" });
      }
    );
  });
});

app.listen(port, () => {
  console.log(`... ⚙️  Server Side listening on port ${port}`);
});
