const { Router } = require("express");
const router = Router();
const User = require("../models/User");
const paginatedResults = require("../utils/pagination");
const parseId = require("../utils/functions");

router.put("/me/:id", (req, res) => {
  const { id } = req.params;
  const { operator, address, phone, birthdate } = req.body;
  User.updateOne(
    { _id: parseId(id) },
    { operator, address, phone, birthdate },
    (err, docs) => {
      res.send({
        items: docs,
      });
    }
  );
});

//ADMINISTRADOR - PAGINATION
/*router.get("/admin/showUsers", paginatedResults(User,3), (req, res) => {
  User.find({}, (err) => {
    if (err) {
      res.json({ error: "Error" });
    } else {
      res.json(res.paginatedResults);
    }
  });
});*/

//show all users - ADMIN - SIN PAGINACIÓN
router.get("/admin/:adminId/showUsers", async (req, res) => {
  const { adminId } = req.params;
  const userAdmin = await User.findOne({ _id: parseId(adminId) });
  if (userAdmin.admin === true) {
    User.find({}, (err, result) => {
      if (err) {
        res.json({ error: "Error" });
      } else {
        res.json({ data: result });
      }
    });
  } else {
    res.sendStatus(404);
  }
});

//delete users - ADMIN
router.delete("/admin/:adminId/delete/:id", async (req, res) => {
  const { adminId } = req.params;
  const userAdmin = await User.findOne({ _id: parseId(adminId) });
  const { id } = req.params;
  try {
    if (userAdmin.admin === true && adminId !== id) {
      await User.deleteOne({ _id: parseId(id) });
      res.sendStatus(204);
    } else if (adminId === id) {
      res.send("You can't remove the permission yourself").status(404);
    }
  } catch {
    res.sendStatus(500);
  }
});

//change role to operator - ADMIN
router.put("/admin/:adminId/role/:id", async (req, res) => {
  const { adminId } = req.params;
  const userAdmin = await User.findOne({ _id: parseId(adminId) });
  const { id } = req.params;
  try {
    if (userAdmin.admin == true && adminId !== id) {
      await User.findOneAndUpdate({ _id: parseId(id) }, [
        { $set: { operator: { $eq: [false, "$operator"] } } },
      ]);
      res.sendStatus(204);
    } else if (adminId == id) {
      res.send("You can't change your role yourself").status(404);
    }
  } catch (error) {
    res.status(404).json(error);
  }
});

module.exports = router;

