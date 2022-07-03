const assert = require('assert');
const mock = require('mock-require');

describe(__filename, function() {
  afterEach(() => mock.stopAll());

  describe('Negative cases', function() {
    it('should throw error for wrong input data', async function() {
      mock('fs-extra', {
        readFile: () => Promise.resolve(new Buffer(''))
      });

      const index = mock.reRequire('./index');

      try {
        await index();

        assert.fail('Expected Error');
      } catch (error) {
        assert.strictEqual(error.message, 'input must be buffer or string');
      }
    });
  });

  describe.skip('Positive cases', function() {
    it('should return valid data', async function() {
      const index = mock.reRequire('./index');

      const result = await index();

      assert.strictEqual(result.type, 'parser-type');
      assert.strictEqual(result.data.length, 1719);
      assert.deepStrictEqual(result.data.slice(0, 3), [
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
      ]);
    });
  });
});
