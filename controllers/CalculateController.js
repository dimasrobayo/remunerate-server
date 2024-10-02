const PayrollTemplate = require('../models/PayrollTemplate');

/**
 * Controller function to handle calculate liquidation.
 * 
 * @param {Object} request The request object from Express.
 * @param {Object} response The response object from Express.
 * @returns {Promise<void>} Promise indicating the completion of the function.
 */
const liquidation = async (request, response) => {
    try {
        const { userId } = request.body;

        const payrollTemplate = await PayrollTemplate.query()
        .where('user_personal_info_id', userId)
        .withGraphFetched('[sysConcept.remunerationBook.typeLRE, payrollTemplateType]');

        if (!payrollTemplate) {
            return response.status(404).json({
            success: false,
            message: 'Calculate Liquidation not found.'
            });
        }

        console.log('conceptsEmployeer' + JSON.stringify(payrollTemplate, null, 2));

        return response.status(200).json({
            success: true,
            message: 'Calculate Liquidation retrieved successfully.',
            data: payrollTemplate
        });
    } catch (error) {
        return response.status(500).json({
            success: false,
            message: 'Error retrieving Calculate Liquidation.',
            error: error.message
        });
    }
};
module.exports = {
    liquidation
};
