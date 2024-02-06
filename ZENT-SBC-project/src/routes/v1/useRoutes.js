const express = require("express");
const router = express.Router();

//middle ware validate 
    const validateUserDataInputC = require("../../middleware/validateData/create/validateDataInputC.js");
    const validateBoardC = require("../../middleware/validateData/create/validateBoardC.js")
    const validateListC = require("../../middleware/validateData/create/validateListC.js")
    const validateCardC = require("../../middleware/validateData/create/validateCardC.js")
     
    const validateBoardU = require("../../middleware/validateData/update/validateBoardU.js");
    const validateListU = require("../../middleware/validateData/update/validateListU.js");
    const validateCardU = require("../../middleware/validateData/update/validateCardU.js");
    const validateUserDataInputU = require("../../middleware/validateData/update/validateDataInputU.js");
    
    const validateListR = require("../../middleware/validateData/read/validateListR.js");
    const validateCardR = require("../../middleware/validateData/read/validateCardR.js");
    
    const validateBoardD = require("../../middleware/validateData/delete/validateBoardD.js");
    const validateListD = require("../../middleware/validateData/delete/validateListD.js");
    const validateCardD = require("../../middleware/validateData/delete/validateCardD.js");
    

const Account = require("../../controllers/index.js");
const dataBoard = require("../../controllers/trelloDataBoardCon.js");
const dataList = require("../../controllers/trelloDataListCon.js");
const dataCard = require("../../controllers/trelloDataCardCon.js");

const verifyToken = require("../../middleware/veryfyToken.js")

//accou
router.post("/login",Account.login);
router.post("/signup",validateUserDataInputC,Account.create);
router.put("/updateAccount",validateUserDataInputU,verifyToken,Account.update);
router.delete("/deleteAccount",verifyToken,Account.delete);

// board
router.get("/boards",verifyToken,dataBoard.readBoard);
router.post("/createBoard",verifyToken,validateBoardC,dataBoard.createBoard);
router.put("/updateBoard",verifyToken,validateBoardU,dataBoard.updateBoard);
router.delete("/deleteBoard",verifyToken,validateBoardD,dataBoard.deleteBoard);

// list
router.get("/Lists",verifyToken,validateListR,dataList.readList);
router.post("/createList",verifyToken,validateListC,dataList.createList);
router.put("/updateList",verifyToken,validateListU,dataList.updateList);
router.delete("/deleteList",verifyToken,validateListD,dataList.deleteList);

// card
router.get("/Cards",verifyToken,validateCardR,dataCard.readCard);
router.post("/createCard",verifyToken,validateCardC,dataCard.createCard);
router.put("/updateCard",verifyToken,validateCardU,dataCard.updateCard);
router.delete("/deleteCard",verifyToken,validateCardD,dataCard.deleteCard);
router.get("/find", verifyToken,dataCard.findCard);
router.get("/finddate", verifyToken, dataCard.findCardsByDueDate)


module.exports = router;