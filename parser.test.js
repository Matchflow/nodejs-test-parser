const assert = require('assert');
const parser = require('./parser');

describe.skip(__filename, function() {
  it('should throw error for empty or invalid csv array', function() {
    assert.throws(() => {
      parser(undefined);
    }, Error, 'Data must be an array of file values');

    assert.throws(() => {
      parser([]);
    }, Error, 'Data must be an array of file values');

    assert.throws(() => {
      parser(123);
    }, Error, 'Data must be an array of file values');

    assert.throws(() => {
      parser([[
        ['some',
          'bullshit',
          'data'],
        ['2022-01-01T00:00:00',
          'Коломенская-1',
          'Голдлайн Плюс капс. 0,01+0,1585 №30'],
      ]]);
    }, Error, 'Data must be an array of file values');
  });

  it('should return valid data', function() {
    const csvData = [[
      // eslint-disable-next-line max-len
      ['Отбор:', 'Дата Больше или равно "01.04.2022 0:00:00" И\r\nДата Меньше или равно "30.04.2022 23:59:59" И\r\nДоговор маркетинга Равно "000002887" И\r\nРозница Равно "Нет"'],
      ['Организация, ИНН', '', '', '', '', '', '', '', '', 'Количество'],
      ['Аптека'],
      [
        'Дата',
        '',
        '',
        'Номер',
        'СНП',
        '',
        'Поставщик',
        'Номер СФ',
        'Розница',
        '',
      ],
      ['АО "Фармленд", 0273028277', '', '', '', '', '', '', '', '', '267'],
      [
        'Апт. пункт № 10 Уфа Вологодская, 34',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '6',
      ],
      [
        '11.04.2022 12:09:31',
        '',
        '',
        '758909',
        'ЛИСТАТА 120МГ ТАБ.П/ОБ.ПЛ. №40 <ИЗВАРИНО ФАРМА ООО>',
        '',
        'Изварино Фарма ООО',
        '',
        'Нет',
        '2',
      ],
      [
        '18.04.2022 13:24:14',
        '',
        '',
        '815426',
        'ЖЕНАЛЕ 10МГ ТАБ. №1 <ИЗВАРИНО ФАРМА ООО>',
        '',
        'Изварино Фарма ООО',
        '',
        'Нет',
        '4',
      ],
      [
        'Апт. пункт № 123 Булгаково, Цюрупы, 3',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '4',
      ],
      [
        '05.04.2022 12:48:50',
        '',
        '',
        '716928',
        'ЖЕНАЛЕ 10МГ ТАБ. №1 <ИЗВАРИНО ФАРМА ООО>',
        '',
        'Изварино Фарма ООО',
        '',
        'Нет',
        '4',
      ],
      [
        'Апт. пункт № 137 Старосубхангулово',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '6',
      ],
      [
        '21.04.2022 14:06:51',
        '',
        '',
        '860335',
        'ЖЕНАЛЕ 10МГ ТАБ. №1 <ИЗВАРИНО ФАРМА ООО>',
        '',
        'Изварино Фарма ООО',
        '',
        'Нет',
        '6',
      ],
      ['Итого', '', '', '', '', '', '', '', '', '5585'],
    ]];

    const result = parser(csvData);

    assert.strictEqual(result.type, 'parser-type');
    assert.strictEqual(result.data.length, 4);

    assert.deepStrictEqual(
      result.data,
      [
        {
          client: 'АО "Фармленд"',
          inn: '0273028277',
          code: 'Уфа Вологодская, 34',
          date: '2022-04-11T12:09:31.000Z',
          title: 'ЛИСТАТА 120МГ ТАБ.П/ОБ.ПЛ. №40 <ИЗВАРИНО ФАРМА ООО>',
          quantity: 2,
          tranType: 'purchase',
          reseller: 'АО "ФАРМЛЕНД"',
          clientType: 'reseller',
        },
        {
          client: 'АО "Фармленд"',
          inn: '0273028277',
          code: 'Уфа Вологодская, 34',
          date: '2022-04-18T13:24:14.000Z',
          title: 'ЖЕНАЛЕ 10МГ ТАБ. №1 <ИЗВАРИНО ФАРМА ООО>',
          quantity: 4,
          tranType: 'purchase',
          reseller: 'АО "ФАРМЛЕНД"',
          clientType: 'reseller',
        },
        {
          client: 'АО "Фармленд"',
          inn: '0273028277',
          code: 'Булгаково, Цюрупы, 3',
          date: '2022-04-05T12:48:50.000Z',
          title: 'ЖЕНАЛЕ 10МГ ТАБ. №1 <ИЗВАРИНО ФАРМА ООО>',
          quantity: 4,
          tranType: 'purchase',
          reseller: 'АО "ФАРМЛЕНД"',
          clientType: 'reseller',
        },
        {
          client: 'АО "Фармленд"',
          inn: '0273028277',
          code: 'Старосубхангулово',
          date: '2022-04-21T14:06:51.000Z',
          title: 'ЖЕНАЛЕ 10МГ ТАБ. №1 <ИЗВАРИНО ФАРМА ООО>',
          quantity: 6,
          tranType: 'purchase',
          reseller: 'АО "ФАРМЛЕНД"',
          clientType: 'reseller',
        }
      ]
    );
  });
});
