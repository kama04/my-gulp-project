
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', e => {
        const circle = document.createElement('span');
        circle.classList.add('ripple');
        btn.appendChild(circle);

        const rect = btn.getBoundingClientRect();
        circle.style.left = `${e.clientX - rect.left}px`;
        circle.style.top = `${e.clientY - rect.top}px`;

        setTimeout(() => circle.remove(), 600);

        const card = btn.closest('.card');
        const index = card.dataset.index;
        alert(`Ти натиснув кнопку в карточці №${index}! 🎉`);
    });
});

document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const { width, height, left, top } = card.getBoundingClientRect();
        const x = e.clientX - left - width / 2;
        const y = e.clientY - top - height / 2;
        card.style.transform = `rotateY(${x / 10}deg) rotateX(${-y / 10}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateY(0deg) rotateX(0deg)';
    });
});
