const  { getDBConnection } = require('./db')
const marklogic = require('marklogic');
const qb = marklogic.queryBuilder;

const searchText = async (searchTerm) => {
    try {
        const { documents } = await getDBConnection();
        return documents.query(
            qb.where(
                qb.term(searchTerm)
            )).result(function (response) {
                // console.log('========Response Here========');
                // console.log(response);
                //JSON.stringify(res, null, 2);
                return response;
            }
        );
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    searchText
};