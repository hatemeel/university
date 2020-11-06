(() => loadXml())();

function loadXml() {
  $.ajax({
    url: './data/data.xml',
    success: (xmlData) => {
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
    },
  });
}

function loadJson(id = 1) {
  $.ajax({
    url: `https://jsonplaceholder.typicode.com/todos/${id}`,
    success: (jsonData) => {
      $('[data]').html(genList([jsonData], 'json data'));
    },
  });
}

function loadLnuText() {
  $.ajax({
    url: './data/lnu.txt',
    success: (textData) => {
      $('[data]').html(`
				<div class="card card-body">
					<h3>LNU</h3>
					<p>${textData}</p>
				</div>
			`);
    },
  });
}

function loadLvivText() {
  $.ajax({
    url: './data/lviv.txt',
    success: (textData) => {
      $('[data]').html(`
				<div class="card card-body">
					<h3>Lviv</h3>
					<p>${textData}</p>
				</div>
			`);
    },
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
