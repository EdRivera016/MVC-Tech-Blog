document.addEventListener('DOMContentLoaded', () => {
  // Function to toggle edit form visibility based on localStorage
  const toggleEditFormVisibility = (id) => {
    const cardBody = document.querySelector(`.card[data-id="${id}"] .card-body`);
    const editForm = document.querySelector(`.card[data-id="${id}"] .edit-form`);

    if (!cardBody || !editForm) {
      console.error(`Could not find elements for post with id ${id}`);
      return;
    }

    const editFormVisible = localStorage.getItem(`editFormVisible-${id}`);

    if (editFormVisible === 'true') {
      cardBody.style.display = 'none';
      editForm.style.display = 'block';
    } else {
      cardBody.style.display = 'block';
      editForm.style.display = 'none';
    }
  };

  // New Post Form Handler
  const newFormHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();

    if (title && content) {
      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({ title, content }),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          document.location.replace('/dashboard');
        } else {
          alert('Failed to create post');
        }
      } catch (err) {
        console.error('Error creating post:', err);
      }
    }
  };

  // Edit Post Handler
  const editPostHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');
    const titleInput = document.querySelector(`input[name="post-title-${id}"]`);
    const contentTextarea = document.querySelector(`textarea[name="post-content-${id}"]`);

    if (!titleInput || !contentTextarea) {
      console.error(`Could not find elements for post with id ${id}`);
      return;
    }

    const title = titleInput.value.trim();
    const content = contentTextarea.value.trim();

    if (title && content) {
      try {
        const response = await fetch(`/api/posts/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ title, content }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Update localStorage to reflect edit form visibility
          localStorage.setItem(`editFormVisible-${id}`, 'false');

          // Toggle visibility of post content and edit form
          toggleEditFormVisibility(id);

          // Redirect to dashboard
          document.location.replace('/dashboard');
        } else {
          alert('Failed to edit post');
        }
      } catch (err) {
        console.error('Error editing post:', err);
      }
    }
  };

  // Delete Post Handler
  const deletePostHandler = async (event) => {
    event.preventDefault();
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to delete post');
      }
    } catch (err) {
      console.error('Error deleting post:', err);
    }
  };

  // Event listeners for edit and delete buttons
  const editButtons = document.querySelectorAll('.edit-post-btn');
  const deleteButtons = document.querySelectorAll('.delete-post-btn');

  editButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const id = event.target.getAttribute('data-id');

      // Toggle visibility of edit form and post content
      toggleEditFormVisibility(id);

      // Update localStorage to reflect edit form visibility
      localStorage.setItem(`editFormVisible-${id}`, 'true');
    });
  });

  deleteButtons.forEach(button => {
    button.addEventListener('click', deletePostHandler);
  });

  // Event listener for new post form submission
  const newPostForm = document.querySelector('.new-post-form');
  if (newPostForm) {
    newPostForm.addEventListener('submit', newFormHandler);
  }

  // Initialize edit form visibility based on localStorage
  const allPostCards = document.querySelectorAll('.card');
  allPostCards.forEach(card => {
    const id = card.getAttribute('data-id');
    toggleEditFormVisibility(id);
  });
});
