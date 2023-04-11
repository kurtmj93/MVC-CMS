const editPost = async function(event) {
    event.preventDefault();
    
    const postTitle = document.querySelector('#titleInput').value;
    const postContent = document.querySelector('textarea[name="postContent"]').value;
    const postIdFromURL = window.location.href.toString().split("/")[4];
  
    const response = await fetch(`/api/posts/${postIdFromURL}`, {
      method: 'PUT',
      body: JSON.stringify({
        title: postTitle,
        content: postContent
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);

    if (response.ok) {
        document.location.reload(); // reload
      } else {
        alert('Failed to update post :('); 
      }
  
};
  
  document
    .querySelector('#editPost')
    .addEventListener('submit', editPost);