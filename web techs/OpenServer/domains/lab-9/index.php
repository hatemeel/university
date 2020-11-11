<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css">

	<style>
		pre {
			white-space: pre-line;
			color: #e83e8c;
			margin-bottom: 0;
		}

		pre:before {
			content: '<\?php\A';
		}

		pre:after {
			content: '?>';
		}
	</style>
</head>

<body>
	<div class="container pb-4">

		<section class="card mt-4">
			<div class="card-header">Task 1</div>
			<pre class="card-body border-bottom">
				echo 'Hello World';
			</pre>

			<div class="card-body">
				<?php
				echo 'Hello World';
				?>
			</div>
		</section>

		<section class="card mt-4">
			<div class="card-header">Task 2</div>
			<pre class="card-body border-bottom">
				echo date('D, d M Y H:i:s');
			</pre>

			<div class="card-body">
				<?php
				echo date('D, d M Y H:i:s');
				?>
			</div>
		</section>

		<section class="card mt-4">
			<div class="card-header">Task 3</div>
			<pre class="card-body border-bottom">
				$number = 11;
				$counter = 0;

				while ($i <= $number) {
					if (strpos(strval($i), strval($number)[0]) !== false) {
						$counter += substr_count(strval($i), strval($number)[0]);
					}

					$i++;
				}

				echo $number . ' has ' . $counter . ' of ' . strval($number)[0];
			</pre>

			<div class="card-body">
				<?php
				$number = 11;
				$counter = 0;

				while ($i <= $number) {
					if (strpos(strval($i), strval($number)[0]) !== false) {
						$counter += substr_count(strval($i), strval($number)[0]);
					}

					$i++;
				}

				echo $number . ' has ' . $counter . ' of ' . strval($number)[0];
				?>
			</div>
		</section>

		<section class="card mt-4">
			<div class="card-header">Task 4</div>
			<pre class="card-body border-bottom">
				$in = [1, 5, -7, 4, -10, 0, 6];

				$out = array_map(function ($num) {
					return $num > 0 ? 0 : $num;
				}, $in);

				echo 'in: [' . implode(', ', $in) . ']<&#8203;br>out: [' . implode(', ', $out) . ']';
			</pre>

			<div class="card-body">
				<?php
				$in = [1, 5, -7, 4, -10, 0, 6];

				$out = array_map(function ($num) {
					return $num > 0 ? 0 : $num;
				}, $in);

				echo 'in: [' . implode(', ', $in) . ']<br>out: [' . implode(', ', $out) . ']';
				?>
			</div>
		</section>

		<section class="card mt-4">
			<div class="card-header">Task 5</div>
			<pre class="card-body border-bottom">
				$number = 123456;

				echo $number . ' reversed to ' . intval(strrev(strval($number)));
			</pre>

			<div class="card-body">
				<?php
				$number = 123456;

				echo $number . ' reversed to ' . intval(strrev(strval($number)));
				?>
			</div>
		</section>

		<section class="card mt-4">
			<div class="card-header">Task 6</div>
			<pre class="card-body border-bottom">
				$phrase = 'Lorem ipsum dolor sit amet ...';
				$phrase = explode(' ', $phrase);

				sort($phrase);

				echo implode(' ', $phrase);
			</pre>

			<div class="card-body">
				<?php
				$phrase = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia cumque sed harum, quae recusandae est delectus libero quidem omnis voluptate esse expedita distinctio illum laudantium tempora nesciunt porro. Debitis eum error sint nemo. Labore asperiores inventore ab atque officiis minima fugit provident ut consequatur! Minus nobis placeat delectus reprehenderit eaque.';
				$phrase = explode(' ', $phrase);

				sort($phrase);

				echo implode(' ', $phrase);
				?>
			</div>
		</section>

	</div>
</body>

</html>