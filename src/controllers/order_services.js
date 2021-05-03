const auth = require('../utils/auth')

const create = async ({ OrderServices }, req, res) => {
    try {
        const { description, clientId, location } = req.body;

        const contributorId = req.contributor

        const toInsert = {
            description,
            clientId,
            contributorId,
            location,
            createdAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
        };


        const orderServiceId = await OrderServices.create(toInsert);

        res.send({
            status: 200,
            data: orderServiceId,
            message: 'OS cadastrada com sucesso!'
        });

    } catch (error) {
        res.send({
            status: 400,
            error: error.message,
        });
    }
}

const getAll = async ({ OrderServices }, req, res) => {
    try {
        
        const { currentPage, pageSize } = req.params;
        const { clientId, contributorId, startDate, endDate, orderByDate, orderByClientId, orderByContributorId } = req.query

        const oss = await OrderServices.findAll({
            currentPage,
            pageSize,
            clientId,
            contributorId,
            startDate, endDate, orderByDate, orderByClientId, orderByContributorId
        })

        res.send({
            status: 200,
            data: oss,
            message: ''
        });

    } catch (error) {
        res.send({
            status: 400,
            error: error.message,
        });
    }
}

const getByMonth = async ({ OrderServices }, req, res) => {
    try {
        

        const oss = await OrderServices.findInCurrentMonth();

        res.send({
            status: 200,
            data: oss,
            message: 'Colaborador cadastrado com sucesso!'
        });

    } catch (error) {
        res.send({
            status: 400,
            error: error.message,
        });
    }
}

module.exports = {
    create,
    getAll,
    getByMonth
};
