const newPost = async function(event) {
    event.preventDefault();
    
    const postTitle = document.querySelector('#titleInput').value;
    const postContent = document.querySelector('textarea[name="postContent"]').value;
  
    const response = await fetch(`/api/posts/`, {
      method: 'POST',
      body: JSON.stringify({
        title: postTitle,
        content: postContent
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/dashboard'); // send user to dashboard
      } else {
        alert('Failed to post :('); 
      }
  
};
  
  document
    .querySelector('#newPost')
    .addEventListener('submit', newPost);