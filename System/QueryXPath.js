/**
 * Поиск элементов по XPath выражению
 * @param {String} text
 * @returns {Node[]}
 */
HTMLElement.prototype.queryXPath = function (text) {
    const expr = `.//${text}`;
    const nodeSet = document.evaluate(expr, this, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
    return Array.from({ length: nodeSet.snapshotLength },
        (v, i) => nodeSet.snapshotItem(i)
    );
    /*const expr = `.//*[text()[contains(
    translate(.,
      'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
      'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя'
    ),
    '${text.toLowerCase()}'
  )]]`;    -- коммент-костыль
    const nodeSet = document.evaluate(expr, this, null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null);
    return Array.from({ length: nodeSet.snapshotLength },
        (v, i) => nodeSet.snapshotItem(i)
    );*/

    /*
    const result = document.evaluate("//*[starts-with(name(.//@*), 'on')]", document.querySelector('[test]'), null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null)

console.log(result.snapshotLength);
console.log(result.snapshotItem(0));
    * */
};