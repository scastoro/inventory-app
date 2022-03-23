/* eslint-disable no-undef */
const delete_product = () => {
  const delete_btn = document.querySelector('.delete-btn');

  delete_btn.addEventListener('click', showModal);
};

const showModal = () => {
  const modal = document.querySelector('.delete-container');
  const yes = document.querySelector('.yes-btn');
  const no = document.querySelector('.no-btn');

  modal.style.display = 'flex';
  yes.addEventListener('click', productDelete);
  no.addEventListener('click', () => {
    modal.style.display = 'none';
    yes.removeEventListener('click', productDelete);
  });
};

async function productDelete() {
  const path = window.location.pathname.split('/');
  const response = await fetch(`/products/delete/${path[2]}`, { method: 'POST' });
  if (response.status === 200) {
    window.location.href = '/products';
  }
}

delete_product();
