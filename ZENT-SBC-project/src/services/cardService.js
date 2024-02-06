const listModel = require("../models/listModel.js");
const cardModel = require("../models/cardModel.js");
const boardModel = require("../models/boardModel.js");
const accountModel = require("../models/accountModel.js");
const moment = require('moment');

var uniqid = require('uniqid'); 

class trelloDataCard{
    // create = async (listId,fileob,dataCard)=>{
    //     try{
    //         const fileBuffer = fileob.buffer;
    //         const base64String = fileBuffer.toString('base64');
    //         let fileobject = {
    //             originalname:fileob.originalname,
    //             base64String
    //         }

    //         let CREATER = new cardModel();
    //         let id = uniqid();
    //         CREATER.cardId = id;
    //         CREATER.cardTitle = dataCard.title;
    //         CREATER.cardDes = dataCard.describe;
    //         CREATER.cardDueDate = dataCard.duedate;
    //         CREATER.cardDate = new Date();
    //         CREATER.cardAttachment = fileobject;
    //         CREATER.cardMember = dataCard.member;
    //         await CREATER.save();

    //         //console.log("listId ",listId);
    //       let checkList = await listModel.updateOne({ listId: listId }, { $push: { cards: id } });
    //       if(checkList.modifiedCount == 0) return false;
    //       return {
    //             cardId : id,
    //             cardTitle : dataCard.title,
    //             cardDes : dataCard.describe,
    //             cardDueDate : dataCard.duedate,
    //             cardDate : new Date(),
    //             cardMember : dataCard.member,
    //             cardAttachment : fileobject
    //        };
    //     }
    //     catch(err){
    //         console.log(err)
    //         return false
    //     }
    // }

    create = async (listId, fileob, dataCard) => {
        try {
            const fileBuffer = fileob.buffer;
            const base64String = fileBuffer.toString('base64');
            let fileobject = {
                originalname: fileob.originalname,
                base64String
            }
    
            let CREATER = new cardModel();
            let id = uniqid();
            CREATER.cardId = id;
            CREATER.cardTitle = dataCard.title;
            CREATER.cardDes = dataCard.describe;
            CREATER.cardDueDate = moment(dataCard.duedate, 'D/M/YYYY').format('YYYY-MM-DD');
            CREATER.cardDate = new Date();
            CREATER.cardAttachment = fileobject;
            CREATER.cardMember = dataCard.member;
            await CREATER.save();
    
            let checkList = await listModel.updateOne({ listId: listId }, { $push: { cards: id } });
          if(checkList.modifiedCount == 0) return false;
          return {
                cardId : id,
                cardTitle : dataCard.title,
                cardDes : dataCard.describe,
                cardDueDate : dataCard.duedate,
                cardDate : new Date(),
                cardMember : dataCard.member,
                cardAttachment : fileobject
           };
        } catch (err) {
            console.log(err)
            return false
        }
    }
    read = async (listId)=>{
        try {
            let cards = [];
            let info = await listModel.findOne( {listId : listId} );
            if(info.cards.length == 0){
                return false
            }
            await Promise.all(info.cards.map(async (cardId, index) => {
                cards.push(await cardModel.findOne({ cardId: cardId }));
            }))
            return cards;
        }
        catch(err){
            return false
        }
    }
    update = async (cardId,newdata)=>{
        try{
            await cardModel.updateOne( {cardId:cardId} ,newdata);
            return true
        }
        catch(err){
            return false;
        }
    }
    delete = async (listId, cardId) => {
        try {
            const accountUpdateResult = await listModel.updateOne(
                { listId: listId },
                { $pull: { cards: cardId } }
            );
            const cardDeleteResult = await cardModel.deleteOne({ cardId: cardId });
            if (accountUpdateResult.modifiedCount > 0 && cardDeleteResult.deletedCount > 0) {
                return true;
            } else {
                console.log("loi else")
                return false;

            }

        } catch (err) {
            console.log("loi catch ")
            return false;
            
        }
    };


    const 
    readOnly =  async(username,nameCard) =>{
        try {
        }
        catch(err){
            console.log(err);
        }
    }

    async find(cardId) {
        try {
            const card = await cardModel.findOne({ cardId: cardId });
            return card;
        } catch (err) {
            console.error(err);
            throw err; // Hoặc xử lý lỗi theo cách bạn muốn
        }
    }

    async findCardsByDueDate(listId, duedate) {
        try {
            // Chuyển định dạng duedate sang dạng YYYY-MM-DD
            console.log(listId, duedate);
            const formattedDueDate = moment(duedate, 'D/M/YYYY').format('YYYY-MM-DD');
    
            const cards = await cardModel.find({ 'listId': listId, 'cardDueDate': formattedDueDate }).populate('listId');
            return cards;
        } catch (err) {
            console.error(err);
            throw err;
        }
    }
    
}

module.exports = new trelloDataCard;