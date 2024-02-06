const trelloDataCarder = require("../services/cardService.js");

class trelloDataCardCon {
    createCard = async (req, res, next) => {
        try {
            let fileob;
            if (req.files && req.files.length > 0) {
                fileob = req.files[0];
            } else {
                // Xử lý trường hợp khi không có file được tải lên
                return res.status(400).json({ message: 'Không tìm thấy file.' });
            }
            let body = req.body;
            let listId = req.body.listId;

            let result = await trelloDataCarder.create(listId, fileob, body);
            console.log(listId);
            if (result) {
                res.status(200).json({
                    message: `tao Card trong listId: ${req.body.listId} thanh cong`,
                    card: result
                })
            }
            else {
                res.status(404).json({
                    message: "tao card that bai"
                })
            }
        }
        catch (err) {
            console.log("err control")
            next(err)
        }
    }
    readCard = async (req, res, next) => {
        let cards = await trelloDataCarder.read(req.body.listId);
        if (cards) {
            res.status(200).json({
                message: "danh sach : ",
                cards: cards
            })
        }
        else {
            res.status(404).json({
                message: "list chua tao card nao"
            })
        }
    }
    updateCard = async (req,res,next)=>{
        try{
            let newdata = {
                cardDueDate: new Date()
            }
            if(req.body.title){
                newdata.cardTitle = req.body.title;
            }
            if(req.body.describe){
                newdata.cardDes = req.body.describe;
            }
            
            if((Object.keys(req.files).length > 0)){
                newdata.cardAttachment = {
                    originalname : req.files["file"][0].originalname,
                    buffer:req.files["file"][0].buffer
                }
            }
            if(req.body.member){
                newdata.cardMember = req.body.member;
            }
                
            let result = await trelloDataCarder.update(req.body.cardId,newdata);
            if(result){
                res.status(200).json({
                    message : "update card thanh cong", 
                })
            }
            else{
                res.status(404).json({
                    message : "update card that bai"
                })
            }
        }
    
        catch(err){
            next(err);
        }
    }
    deleteCard = async (req, res, next) => {
        let result = await trelloDataCarder.delete(req.body.listId, req.body.cardId);
        if (result) {
            res.status(200).json({
                message: `xoa card co ID: ${req.body.cardId} thanh cong`,
            })
        }
        else {
            res.status(404).json({
                message: "khong tim thay card de xoa"
            })
        }
    }
    findCard = async (req, res, next) => {
        try {
            let cardId = req.body.cardId; // Giả sử bạn truyền cardId thông qua URL, ví dụ: /findCard/:cardId

            let card = await trelloDataCarder.find(cardId);
            if (card) {
                res.status(200).json({
                    message: `Tìm thấy card có ID: ${cardId}`,
                    card: card
                });
            } else {
                res.status(404).json({
                    message: `Không tìm thấy card có ID: ${cardId}`
                });
            }
        } catch (err) {
            next(err);
        }
    }


    async findCardsByDueDate(req, res, next) {
        try {
            const listId = req.body.listId; // Giả sử bạn truyền listId qua URL
            const duedate = req.body.duedate; // Giả sử bạn truyền duedate qua URL

            // Gọi service để tìm các card (thẻ) theo duedate
            const cards = await trelloDataCarder.findCardsByDueDate(listId, duedate);

            if (cards.length > 0) {
                res.status(200).json({
                    message: `Tìm thấy các card có duedate: ${duedate}`,
                    cards: cards
                });
            } else {
                res.status(404).json({
                    message: `Không tìm thấy card nào có duedate: ${duedate}`
                });
            }
        } catch (err) {
            console.error(err);

            // Xử lý lỗi, ví dụ trả về một thông báo lỗi chung
            res.status(500).json({
                message: 'Có lỗi xảy ra khi tìm kiếm card theo duedate.'
            });
        }
    }
}

module.exports = new trelloDataCardCon;