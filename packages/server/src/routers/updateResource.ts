// intentos 0
// fecha de vencimiento

/*
      intentos y fecha de vencimiento
      
      Si se pasan ambos parametro se actualizan los dos
        - los intenstos tiene que ser MAX 25
        - la nueva fecha e vencimiento no puede ser menor a la fecha actual
      
      Si solo se pasa los intentos solo se debe actualizar este dejando intacto
      el otro campo

      si solo se pasa la fecha de vencimiento solo se debe actualizar este dejando intacto
      el otro campo
      
      tambien sera posible actualizar la URL
  */
// url_id, user_id, url, try, valid_to
import express from "express";

export const router = express.Router();

// TODO: Proteger esta ruta
router.patch("/api/user/update/:url_id", async (req, res) => {
	const urlId = req.params.url_id;
	const userId = req.body.user_id;
	const url = req.body.url;
	const tries = req.body.tries;
	const validTo = req.body.valid_to;
});
