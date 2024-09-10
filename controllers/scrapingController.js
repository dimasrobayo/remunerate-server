const axios = require('axios');
const cheerio = require('cheerio');
const GeneralValues = require('../models/GeneralValues');

const formatCurrencyToNumber = (currency) => {
  // Eliminar el símbolo de moneda ($) y puntos de miles, luego reemplazar la coma decimal por un punto
  return parseFloat(currency.replace(/[^0-9,]+/g, '').replace('.', '').replace(',', '.'));
};


const getValoresPrevired = async (req, res) => {
  try {
    const { data } = await axios.get('https://www.previred.com/indicadores-previsionales/');
    const $ = cheerio.load(data);

    const indicators = {};

    // Buscar los valores específicos
    $('table tr').each((index, element) => {
      const indicatorName = $(element).find('td:nth-child(1)').text().trim();
      const indicatorValue = $(element).find('td:nth-child(2)').text().trim();

      if (indicatorName.includes('Al 31 de Agosto del 2024')) {
        indicators['value_uf'] = formatCurrencyToNumber(indicatorValue);
      }
      if (indicatorName.includes('Agosto 2024')) {
        indicators['value_utm'] = formatCurrencyToNumber(indicatorValue);
      }
      if (indicatorName.includes('Trab. Dependientes e Independientes')) {
        indicators['renta_minima'] = formatCurrencyToNumber(indicatorValue);
      }
      if (indicatorName.includes('Para afiliados a una AFP (84,3 UF):')) {
        indicators['tope_imponible_afp'] = (parseFloat(formatCurrencyToNumber(indicatorValue)/indicators['value_uf']).toFixed(1));
      }
      if (indicatorName.includes('Para Seguro de Cesantía (126,6 UF):')) {
        indicators['tope_imponible_seguro_cesantia'] = (parseFloat(formatCurrencyToNumber(indicatorValue)/indicators['value_uf']).toFixed(1));
      }
      if (indicatorName.includes('Para afiliados al IPS (ex INP) (60 UF):')) {
        indicators['tope_imponible_sistema_antiguo'] = (parseFloat(formatCurrencyToNumber(indicatorValue)/indicators['value_uf']).toFixed(1));
      }
    });

    // Inserción de los valores en la base de datos
    if (indicators) {
      // Consulta a GeneralValues por si tiene registro
      const valuesData = await GeneralValues.query();

      if(valuesData.length === 0){
        const addValuesRecord = await GeneralValues.query().insert({
          value_uf: indicators['value_uf'],
          value_utm: indicators['value_utm'],
          renta_minima: indicators['renta_minima'],
          tope_imponible_afp: formatCurrencyToNumber(indicators['tope_imponible_afp']),
          tope_imponible_seguro_cesantia: formatCurrencyToNumber(indicators['tope_imponible_seguro_cesantia']),
          seguro_invalidez_sobrevivencia: 0,
          tope_imponible_sistema_antiguo: formatCurrencyToNumber(indicators['tope_imponible_sistema_antiguo']),
          escala_1a: 686767.00
        })

        return res.status(200).json({
          success: true,
          message: 'Valores obtenidos y almacenado exitosamente.',
          data: addValuesRecord
        });
      }else{
        const updateValuesRecord = await GeneralValues.query().patchAndFetchById(valuesData[0].id, {
          id: valuesData[0].id,
          value_uf: indicators['value_uf'],
          value_utm: indicators['value_utm'],
          renta_minima: indicators['renta_minima'],
          tope_imponible_afp: formatCurrencyToNumber(indicators['tope_imponible_afp']),
          tope_imponible_seguro_cesantia: formatCurrencyToNumber(indicators['tope_imponible_seguro_cesantia']),
          seguro_invalidez_sobrevivencia: 0,
          tope_imponible_sistema_antiguo: formatCurrencyToNumber(indicators['tope_imponible_sistema_antiguo']),
          escala_1a: 686767.00
        })

        return res.status(200).json({
          success: true,
          message: 'Valores obtenidos y Actualizado exitosamente.',
          data: updateValuesRecord
        });
      }
    } else {
      return res.status(404).json({ 
        success: false, 
        message: 'No se encontraron indicadores válidos.' 
      });
    }
  } catch (error) {
    console.error('Error al obtener los valores:', error);
    res.status(500).json({ error: 'Error al obtener los valores' });
  }
};

module.exports = {
  getValoresPrevired,
};
