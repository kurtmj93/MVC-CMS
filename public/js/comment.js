const newComment = async function(event) {
    event.preventDefault();
    
    const commentText = document.querySelector('textarea[name="commentText"]').value;
    const postIdFromURL = window.location.href.toString().split("/")[4];


    const response = await fetch(`/api/posts/${postIdFromURL}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        text: commentText
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.reload(); // reload
      } else {
        alert('Failed to comment :('); 
      }
  
};
  
  document
    .querySelector('#newComment')
    .addEventListener('submit', newComment);