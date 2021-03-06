
const init = connection => {
    const create = async data => {
        try {
            const sql =
                "INSERT INTO order_services (created_at, client_id, description, contributor_id, location) VALUES (?, ?, ?, ?, ?)";
            const [rows] = await connection.execute(sql, [data.createdAt, data.clientId, data.description, data.contributorId, data.location]);
            return rows.insertId;
        } catch (error) {
            throw error;
        }
    };

    const findAll = async params => {
        try {
            const offset = params.currentPage * params.pageSize;
            const pageSize = parseInt(params.pageSize);
            let sqlFilter = '';
            const filterParams = [];
            const filters = [];
            if (params.clientId) {
                filters.push('os.client_id = ?');
                filterParams.push(params.clientId)
            }
            if (params.contributorId) {
                filters.push('os.contributor_id = ?');
                filterParams.push(params.contributorId)
            }
            if (params.startDate) {
                filters.push('os.created_at >= ?');
                filterParams.push(params.startDate)
            }
            if (params.endDate) {
                filters.push('os.created_at <= ?');
                filterParams.push(params.endDate);
            }


            if (filters.length > 0) {
                sqlFilter += `WHERE ${filters.join(' AND ')}`;
            }



            sql1 = `SELECT COUNT(*) AS total FROM order_services os ${sqlFilter}`;


            let sql2 = `SELECT os.*, c.name AS client_name, co.name AS contributor_name FROM order_services os INNER JOIN clients c ON c.id = os.client_id INNER JOIN contributors co ON co.id = os.contributor_id ${sqlFilter} ORDER BY os.created_at ${params.orderByDate.toString()}, os.client_id ${params.orderByClientId.toString()}, os.contributor_id ${params.orderByContributorId.toString()} LIMIT ?, ?`;

            const [result] = await connection.execute(sql1, [...filterParams]);
            const total = result[0].total;
            const totalPages = parseInt(total / pageSize);

            const [oss, fields] = await connection.execute(sql2, [...filterParams, offset.toString(), pageSize.toString()]);
            return {
                data: oss,
                pagination: {
                    pages: totalPages,
                    pageSize,
                    currentPage: parseInt(params.currentPage),
                },
                total: result ? result.length : 0
            };

        } catch (e) {
            console.log(e)
        }
    };

    const findInCurrentMonth = async () => {
        try {
            const sql = 'SELECT count(os.id) AS total, DAY(os.created_at) AS day FROM order_services os INNER JOIN clients c ON c.id = os.client_id INNER JOIN contributors co ON co.id = os.contributor_id WHERE MONTH(os.created_at) = MONTH(CURRENT_DATE()) AND YEAR(created_at) = YEAR(CURRENT_DATE()) GROUP BY day';
            const [rows] = await connection.execute(sql, []);
            return rows;
        } catch (error) {
            throw error;
        }
    }




    return {
        create,
        findAll,
        findInCurrentMonth
    }

}

module.exports = init