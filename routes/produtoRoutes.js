const express = require("express");
const router = express.Router();
const produtoController = require("../controllers/produtoController");
const autenticarToken = require("../middleware/authToken");

router.use(autenticarToken);

router.get("/", produtoController.getTodos);
router.post("/", produtoController.criar);
router.put("/:id", produtoController.atualizar);
router.delete("/:id", produtoController.deletar);

module.exports = router;
