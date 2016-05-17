// Basic
(function() {
	var ctx = document.querySelector('#basic').getContext('2d');
	var data = getData('line');  // (data[0].date instanceof Date === true)

	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.map(v=>`${v.date.getFullYear()}-${v.date.getMonth()+1}-${v.date.getDate()}`),
			datasets: [
				{
					data: data.map(v=>(v.value+Math.random()*200-50)/2).reverse(),
				},
				{
					data: data.map(v=>v.value),
					// fill: false,
					backgroundColor: 'rgba(0,153,255,0.3)',
					borderColor: '#09f',
					label: 'My Data',
				},
			]
		},
	});
})();

// Stacked area chart
(function() {
	var ctx = document.querySelector('#stackedArea').getContext('2d');
	var data = getData('line');  // (data[0].date instanceof Date === true)

	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.map(v=>`${v.date.getFullYear()}-${v.date.getMonth()+1}-${v.date.getDate()}`),
			datasets: [
				{
					data: data.map(v=>(v.value+Math.random()*200-50)/2).reverse(),
					backgroundColor: '#f90',
					borderColor: '#f00',
				},
				{
					data: data.map(v=>v.value),
					backgroundColor: '#09f',
					borderColor: '#00f',
					label: 'My Data',
				},
			]
		},
		options: {
			scales: {
				yAxes: [
					{
						stacked: true
					}
				]
			}
		}
	});
})();

// Mixed
(function() {
	var ctx = document.querySelector('#mixed').getContext('2d');
	var data = getData('line and area');

	var chart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: data.map(v=>v.date),
			datasets: [
				{
					backgroundColor: 'transparent',
					borderColor: 'rgb(255,0,0)',
					data: data.map(v=>v.value),
					label: 'Foo',
					type: 'line',
					yAxisID: 'y-axis-2',
				},
				{
					data: data.map(v=>v.ie),
					backgroundColor: 'rgb(0,127,255)',
					borderColor: 'rgb(0,127,255)',
					label: 'IE',
					type: 'bar',
					yAxisID: 'y-axis-1',
				},
				{
					data: data.map(v=>v.ch),
					backgroundColor: 'rgb(127,127,0)',
					borderColor: 'rgb(127,127,0)',
					label: 'Chrome',
					type: 'bar',
					yAxisID: 'y-axis-1',
				},
				{
					data: data.map(v=>v.fx),
					backgroundColor: 'rgb(255,127,0)',
					borderColor: 'rgb(255,127,0)',
					label: 'Firefox',
					type: 'bar',
					yAxisID: 'y-axis-1',
				},
			]
		},
		options: {
			scales: {
				yAxes: [
				{
					id: 'y-axis-1',
					position: 'left',
				},
				{
					id: 'y-axis-2',
					position: 'right',
				},
				],
			},
			tooltips: {
				mode: 'label',
			},
		},
	});
})();

// Pie
(function() {
	var ctx = document.querySelector('#pie').getContext('2d');
	var data = getData('area');

	var chart = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: ['Yes', 'No', 'Don\'t know'],
			datasets: [
				{
					data: [1200, 800, 100],
					backgroundColor: ['rgb(0,127,255)', 'rgb(255,127,0)', 'rgb(127,127,127)'],
				},
			],
		},
		options: {
		},
	});
})();

// Separate numbers each 3 digits
(function() {
	var ctx = document.querySelector('#separatedNumber').getContext('2d');
	var data = getData('line');

	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.map(v=>`${v.date.getFullYear()}-${v.date.getMonth()+1}-${v.date.getDate()}`),
			datasets: [
				{
					data: data.map(v=>v.value*100),
					backgroundColor: 'rgba(0,153,255,0.3)',
					borderColor: '#09f',
					label: 'My Data',
				},
			]
		},
		options: {
			scales: {
				yAxes: [
					{
						ticks: {
							callback: (value, index, ticks)=>{
								var label = Math.floor(value).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,');  // 12345->12,345
								return label;
							}
						}
					}
				],
			},
		},
	});
})();

// Put Legends on Pie Arcs
(function() {
	var ctx = document.querySelector('#pieLegend canvas').getContext('2d');
	var data = getData('area');

	var chart = new Chart(ctx, {
		type: 'pie',
		data: {
			labels: ['Yes', 'No', 'Don\'t know'],
			datasets: [
				{
					data: [1200, 800, 100],
					backgroundColor: ['rgb(0,127,255)', 'rgb(255,127,0)', 'rgb(127,127,127)'],
				},
			],
		},
		options: {
			legend: {
				display: false,
			},
			maintainAspectRatio: false,
		},
	});

	var views = chart.getDatasetMeta(0).data.map(v=>v._model);
	var elParent = document.querySelector('#pieLegend');
	views.forEach((view)=>{
		// calculate position
		var angle = (view.endAngle - view.startAngle) / 2 + view.startAngle;
		var radius = view.outerRadius;
		var x = view.x + radius/2 * Math.cos(angle);
		var y = view.y + radius/2 * Math.sin(angle);

		// add a legend
		var el = document.createElement('span');
		el.classList.add('pieLegend-legend');
		Object.assign(el.style, {
			color: view.backgroundColor,
			left: `${x}px`,
			textShadow: [
				` 1px  1px 0 ${view.borderColor}`,
				` 1px -1px 0 ${view.borderColor}`,
				`-1px  1px 0 ${view.borderColor}`,
				`-1px -1px 0 ${view.borderColor}`,
			].join(','),
			top: `${y}px`,
		});
		el.textContent = view.label;
		elParent.appendChild(el);

		// adjust position
		el.style.left = `${x - el.clientWidth/2}px`;
		el.style.top = `${y - el.clientHeight/2}px`;
	});
})();

// Add Data
(function() {
	var elSection = document.querySelector('#addData');
	var ctx = elSection.querySelector('canvas').getContext('2d');
	var data = [
		Math.floor(Math.random()*100),
		Math.floor(Math.random()*100),
		Math.floor(Math.random()*100),
		Math.floor(Math.random()*100),
		Math.floor(Math.random()*100),
	];

	var chart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: data.map((v,i)=>`#${i}`),
			datasets: [
				{
					data: data,
					backgroundColor: 'rgba(0,153,255,0.3)',
					borderColor: '#09f',
					label: 'My Data',
				},
			]
		},
	});

	elSection.querySelector('form').addEventListener('submit', (event)=>{
		event.preventDefault();
		var elForm = event.currentTarget;
		var number = elSection.querySelector('input').value;

		chart.data.labels.push(`#${chart.data.labels.length}`);
		chart.data.datasets[0].data.push(number);
		chart.update();

		setRandomValue();
	});

	elSection.querySelector('.js-clear').addEventListener('click', (event)=>{
		event.preventDefault();
		var elForm = event.currentTarget;

		chart.data.labels = [];
		chart.data.datasets = [
			{
				data: [],
				backgroundColor: 'rgba(0,153,255,0.3)',
				borderColor: '#09f',
				label: 'My Data',
			},
		];
		chart.update();
	});

	function setRandomValue() {
		elSection.querySelector('input').value = Math.floor(Math.random()*100);
	}

	setRandomValue();
})();
