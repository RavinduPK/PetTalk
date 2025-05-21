function animateStats() {
    const stats = [
        { id: 'adoptions', end: 500, duration: 2000 },
        { id: 'volunteers', end: 150, duration: 2000 },
        { id: 'years', end: 3, duration: 2000 },
        { id: 'Available', end: 650, duration: 2000 }
    ];

    stats.forEach(stat => {
        const element = document.getElementById(stat.id);
        let start = 0;
        const step = stat.end / (stat.duration / 16); // 60fps
        const interval = setInterval(() => {
            start += step;
            element.textContent = Math.round(start);
            if (start >= stat.end) {
                element.textContent = stat.end;
                clearInterval(interval);
            }
        }, 16);
    });
}

function observeStats() {
    const impactSection = document.querySelector('.impact');
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.5 });
    observer.observe(impactSection);
}

document.addEventListener('DOMContentLoaded', () => {
    observeStats();
});

let counter = 1;

setInterval(() => {
  document.getElementById('radio' + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 4000);
