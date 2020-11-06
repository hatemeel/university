(() => {
  loadXml();
})();

function loadXml() {
  http('./data/data.xml').then((xmlData) => {
    const parsed = [
      ...$(xmlData)
        .find('food')
        .map((_, food) => {
          food = $(food);

          return {
            name: food.find('name').text(),
            price: food.find('price').text(),
            description: food.find('description').text(),
            calories: food.find('calories').text(),
          };
        }),
    ];

    $('[data]').html(genList(parsed, 'xml data'));
  });
}

function loadJson(id = 1) {
  http(`https://jsonplaceholder.typicode.com/todos/${id}`).then((jsonData) => {
    $('[data]').html(genList([jsonData], 'json data'));
  });
}

function loadLnuText() {
  http('./data/lnu.txt').then((textData) => {
    $('[data]').html(`
			<div class="card card-body">
				<h3>LNU</h3>
				<p>${textData}</p>
			</div>
		`);
  });
}

function loadLvivText() {
  http('./data/lviv.txt').then((textData) => {
    $('[data]').html(`
			<div class="card card-body">
				<h3>LNU</h3>
				<p>${textData}</p>
			</div>
		`);
  });
}

function genList(array, title = '') {
  let html = `
		<div>
			${title ? `<h3>${title}</h3>` : ''}
			<ul class="list-group">
	`;

  array.map(
    (el) =>
      (html += `
				<li class="list-group-item list-group-item-action">
					${JSON.stringify(el)}
				</li>
			`)
  );

  html += '</ul></div>';

  return html;
}

function http(url) {
  return new Promise((resolve, reject) => {
    const xml = createXMLHTTPObject();
    console.log(xml);
    xml.open('get', url);

    xml.onload = ({ target: { response } }) => {
      try {
        resolve(JSON.parse(response));
      } catch {}
      resolve(response);
    };
    xml.onerror = reject;

    xml.send();
  });
}

function createXMLHTTPObject() {
  return (
    [
      () => new XMLHttpRequest(),
      () => new ActiveXObject('Msxml3.XMLHTTP'),
      () => new ActiveXObject('Msxml2.XMLHTTP.6.0'),
      () => new ActiveXObject('Msxml2.XMLHTTP.3.0'),
      () => new ActiveXObject('Msxml2.XMLHTTP'),
      () => new ActiveXObject('Microsoft.XMLHTTP'),
    ].find((xmlhttp) => {
      try {
        return xmlhttp();
      } catch {
        return false;
      }
    })() || false
  );
}
