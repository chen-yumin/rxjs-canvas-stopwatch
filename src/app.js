import Rx from 'rxjs/Rx';

var source = Rx.Observable
    .interval(100 /* ms */)
    .timeInterval();

var subscription = source.subscribe(
    x => {
        draw(x.value);
    });

const draw = (time) => {
  const canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const watchSize = 128;

    ctx.beginPath();

    // Outer circle
    ctx.arc(watchSize, watchSize, watchSize, 0, Math.PI * 2, true);

    // 12 longer lines
    for (let i = 0; i < 12; i++) {
      let angle = i * (Math.PI * 2 / 12);
      const armLength = watchSize * 0.2;
      ctx.moveTo(watchSize + watchSize * Math.cos(angle) * 0.95, watchSize + watchSize * Math.sin(angle) * 0.95);
      ctx.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle), watchSize + (watchSize - armLength) * Math.sin(angle));
    }

    // 60 shorter lines
    for (let i = 0; i < 60; i++) {
      let angle = i * (Math.PI * 2 / 60);
      const armLength = watchSize * 0.1;
      ctx.moveTo(watchSize + watchSize * Math.cos(angle) * 0.95, watchSize + watchSize * Math.sin(angle) * 0.95);
      ctx.lineTo(watchSize + (watchSize - armLength) * Math.cos(angle), watchSize + (watchSize - armLength) * Math.sin(angle));
    }

    // Longer hand (minute), each minute goes a full circle
    let angle = (time / 600) * (Math.PI * 2);
    let armLength = watchSize * 0.5;
    ctx.moveTo(watchSize, watchSize);
    ctx.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    // Shorter hand (second), each second goes a full circle
    angle = (time / 10) * (Math.PI * 2);
    armLength = watchSize * 0.8;
    ctx.moveTo(watchSize, watchSize);
    ctx.lineTo(watchSize + armLength * Math.cos(angle), watchSize + armLength * Math.sin(angle));

    ctx.stroke();
  }
}

draw();
