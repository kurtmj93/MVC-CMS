const postId = document.querySelector('input[name="post_id"]').value;

const deletePost = async function() {
  await fetch(`/api/posts/${postId}`, {
    method: 'DELETE'
  });

  document.location.replace('/dashboard');

};

document
  .querySelector('#deletePost')
  .addEventListener('click', deletePost);