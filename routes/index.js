var express = require('express');
var router = express.Router();
const authenticateToken = require('../middleware/jwt');
const {executeQuery} = require("../database/db");
const useQuerys = require("../database/querys")

const {TSDTCATECO} = useQuerys();

/* GET home page. */
router.get('/',authenticateToken, async function(req, res, next) {  
  const rows = await executeQuery(TSDTCATECO);
  let resultQuery = [] ;

  rows.forEach(element => {
    resultQuery.push({
      id     : element[0],
      nombre : element[1]
    });
  });

  res.json({
    success : true,
    response: "¡ Exito en la Peticion !",
    data    : resultQuery
  });
  //res.render('index', { title: 'kfmdskfmdskmfksmfkm' });
});

module.exports = router;
