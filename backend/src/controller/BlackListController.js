const cron = require('node-cron');

const BlackList = require('../models/BlackList');
const { Op } = require('sequelize');

async function deleteExpiredTokens(){
    const currentDate = new Date();
    try {
        await BlackList.destroy({ 
            where: {
                expiration_date: {
                    [Op.lt]: currentDate 
                }
            }
        });
    } catch (e) {
        console.log(e);
    }
}

module.exports = cron.schedule('00 03 * * *', deleteExpiredTokens);