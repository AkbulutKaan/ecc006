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
