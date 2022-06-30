const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const mongoose = require("mongoose");
const paginatedResults = require("../utils/pagination")

//change data of user
const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
}; //this function change id string into a ObjectId



//show all users
/* router.get("/admin/showUsers", (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      res.json({ error: "Error" });
    } else {
      res.json({ data: result });
    }
  });
}); */

router.get("/admin/showUsers", paginatedResults(User,3), (req, res) => {
  User.find({}, (err) => {
    if (err) {
      res.json({ error: "Error" });
    } else {
      res.json(res.paginatedResults);
    }
  });
});

//delete users - original
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
 User.deleteOne({ _id: id })
  res.sendStatus(204)
});

//show profile
router.get("/me/:id", (req, res) => {
  const { id } = req.params;
  User.findById(id, (err, result) => {
    if (err) {
      res.json({ error: "Error" })
    } else {
      res.json({ data: result })
    }
  })
})


// show profile --> agregar mas info de usuario
router.put("/me/edit/:id", (req, res) => {
  const { id } = req.params;
  const { address, phone, birthdate } = req.body;
  User.updateOne(
    { _id: parseId(id) },
    { address, phone, birthdate },
    (err, docs) => {
      res.send({
        items: docs,
      });
    });
});


// ruta para el admin donde pueda agregar sucursales
router.post("/admin/:adminId/branchoffice", async (req, res) => {
  //Si el admin es true: aperturar la collection de branchoffice
  //si no hay nada, no hay branchoffice
  //si hay mostrar, todas las sucursales que haya

  User.aggregate([
    {
      $lookup: {
        from: "BranchOffice",
        localField: "sucu", 
        foreignField: "location", 
        as: "sucursales"
      }
    }])

})

module.exports = router;