const assert = require('assert');
const fs = require('fs-extra');
const reader = require('./reader');

describe(__filename, function() {
  describe('Negative cases', function() {
    it('should throw error for wrong input data', async function() {
      try {
        await reader('');

        assert.fail('Expected Error');
      } catch (error) {
        assert.strictEqual(error.message, 'input must be buffer or string');
      }

      try {
        await reader();

        assert.fail('Expected Error');
      } catch (error) {
        assert.strictEqual(error.message, 'input must be buffer or string');
      }

      try {
        await reader(null);

        assert.fail('Expected Error');
      } catch (error) {
        assert.strictEqual(error.message, 'input must be buffer or string');
      }
    });
  });

  describe('Positive cases', function() {
    it('should return proper data', async function() {
      const buffer = await fs.readFile('./file-to-parse.xlsx');
      const data = (await reader(buffer)).data;

      assert.strictEqual(data.length, 1);
      assert.strictEqual(data[0].length, 2790);
      assert.strictEqual(data[0][0][0], 'Отбор:');
      assert.deepStrictEqual(data[0][3].slice(0, 10), [
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
      ]);
    });
  });
});
