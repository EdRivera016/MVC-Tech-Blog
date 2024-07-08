// public/js/deletePost.js
const deletePostHandler = async (event) => {
  if (event.target.classList.contains('delete-post-btn')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert('Failed to delete post');
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const postList = document.querySelector('.post-list');

  if (postList) {
    postList.addEventListener('click', deletePostHandler);
  }
});