let arrFranjaHoraria = [
    { '10:00': 3 }, { '10:15': 3 },
    { '10:30': 3 }, { '10:45': 3 },
    { '11:00': 3 }, { '11:15': 3 },
    { '11:30': 3 }, { '11:45': 3 },
    { '12:00': 3 }, { '12:15': 3 },
    { '12:30': 3 }, { '12:45': 3 },
    { '13:00': 3 }, { '13:15': 3 },
    { '13:30': 3 }, { '13:45': 3 },
    { '14:00': 3 }, { '14:15': 3 },
    { '14:30': 3 }, { '14:45': 3 }
  ]

  let arreglosTomados = [ '13:00', '13:00', '13:15' ]
  const counts = {}
  arreglosTomados.forEach(function (i) { counts[i] = (counts[i] || 0) + 1; });
  console.log(counts);


for (let i = 0; i <= arreglosTomados.length; i++) {
    for (let horarios in arrFranjaHoraria) {
      console.log(`${horarios}:${arrFranjaHoraria[horarios]}`);
    }
  }