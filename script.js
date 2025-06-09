document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('year').textContent = new Date().getFullYear();

    const galleryItems = document.querySelectorAll('.gallery-image, .gallery-item');
    const modal = document.getElementById('mediaModal');
    const modalImage = document.getElementById('modalImage');
    const modalVideo = document.getElementById('modalVideo');
    const modalDescription = document.getElementById('modalDescription');
    const closeModalBtn = document.getElementById('closeModal');

    const closeModal = () => {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
        if (modalImage) modalImage.src = '';
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.src = '';
        }
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const type = item.dataset.type || 'image';
            const src = item.dataset.src;
            const description = item.dataset.description;

            modalDescription.textContent = description;
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';

            if (type === 'video' && modalVideo) {
                modalVideo.src = src;
                modalVideo.classList.remove('hidden');
                if (modalImage) modalImage.classList.add('hidden');
            } else {
                modalImage.src = src;
                modalImage.classList.remove('hidden');
                if (modalVideo) modalVideo.classList.add('hidden');
            }
        });
    });

    if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && !modal.classList.contains('hidden')) closeModal();
    });
});


// background animation
window.addEventListener('DOMContentLoaded', () => {
  const canvas = document.createElement('canvas');
  canvas.id = 'bg-canvas';
  document.body.prepend(canvas);

  const style = document.createElement('style');
  style.textContent = `
    canvas#bg-canvas {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      display: block;
    }
  `;
  document.head.appendChild(style);

  const ctx = canvas.getContext('2d');
  let w, h;

  function resizeCanvas() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  let lines = Array.from({ length: 40 }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    speed: 0.5 + Math.random() * 1.5,
    length: 20 + Math.random() * 30
  }));

  function draw() {
    ctx.fillStyle = 'rgba(20, 20, 30, 0.2)';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = '#00ffff';
    ctx.lineWidth = 1;

    lines.forEach(line => {
      ctx.beginPath();
      ctx.moveTo(line.x, line.y);
      ctx.lineTo(line.x, line.y + line.length);
      ctx.stroke();

      line.y += line.speed;
      if (line.y > h) {
        line.y = -line.length;
        line.x = Math.random() * w;
      }
    });

    requestAnimationFrame(draw);
  }

  draw();
});
