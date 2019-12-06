const context = document.getElementById('myChart').getContext('2d');
const datasets = [];
const labels = [];

const randomNumber = (max, min = 0) => min + Math.floor(Math.random() * (max - min));
const generateColor = () => `rgb(${randomNumber(256)},${randomNumber(256)},${randomNumber(256)})`;
const refreshGraph = (datasets, labels, ctx = context) => new Chart(ctx, {
  // The type of chart we want to create
  type: 'line',

  // The data for our dataset
  data: {
    labels,
    datasets
  },

  // Configuration options go here
  options: {
    animation: false
  }
});

const pushFixedLength = (entry, array, length = 10) => {
  array.push(entry);

  if (array.length >= length) {
    array.shift()
  }

  return array;
};

const pump = (controller, reader, decoder = new TextDecoder("utf-8")) => async () => {
  const {done, value} = await reader.read();

  if (done) {
    controller.close();
    return;
  }

  const stringValue = decoder.decode(value);
  let data;

  try {
    data = JSON.parse(stringValue);
  } catch (e) {
    console.log(e);
  }

  for (const [label, entry] of Object.entries(data)) {
    const {iowait} = value;
    const label = new Date().toLocaleTimeString('en');

    entry.data = pushFixedLength(iowait, entry.data);
    pushFixedLength(label, labels);
  }


  controller.enqueue(value);
  refreshGraph(datasets, labels);
  pump();
}

fetch('/stats')
  .then(response => response.body)
  .then(body => {
    const reader = body.getReader();
    const colors = new Array(12).fill('').map(i => generateColor(i));

    const entry = {
      label: 'cpu',
      backgroundColor: colors,
      borderColor: colors,
      data: []
    };

    datasets.push(entry);

    return new ReadableStream({
      start(controller) {
        return pump(controller, reader)();
      }
    })
  });

