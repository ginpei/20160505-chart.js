// Basic
(function() {
	var ctx = document.querySelector('#basic').getContext('2d');
	var data = getData('line');  // (data[0].date instanceof Date === true)

	var chart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: data.map(v=>`${v.date.getFullYear()}-${v.date.getMonth()+1}-${v.date.getDay()}`),
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
			labels: data.map(v=>`${v.date.getFullYear()}-${v.date.getMonth()+1}-${v.date.getDay()}`),
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
