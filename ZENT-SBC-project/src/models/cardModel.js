const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema({
    originalname: String,
    base64String: String
});

const dataSchema = new mongoose.Schema({
    cardId: String,
    cardTitle: String,
    cardDes: String,
    cardDate: Date,
    //cardDueDate: String,
    cardDueDate: Date,
    cardAttachment: [attachmentSchema], // Sử dụng mảng để lưu trữ nhiều phiên bản
    cardMember: String
});

const cardModel = mongoose.model("Card", dataSchema);
module.exports = cardModel;

