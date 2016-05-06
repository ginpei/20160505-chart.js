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
					backgroundColor: '#09f',
					borderColor: '#09f',
					label: 'My Data',
				},
			]
		},
	});
})();
