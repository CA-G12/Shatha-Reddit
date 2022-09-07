const closeIcon = document.querySelector('.fa-circle-xmark');
const popUpSection = document.querySelector('.pop-up-sec');
const postSection = document.querySelector('.posts-section');
const commentSection = document.querySelector('.comments');
const inputSection = document.querySelector('.input');
const addCommentBtn = document.querySelector('.add-comment');

const createPostsCards = (data) => {
  data.forEach((post) => {
    const postContainer = document.createElement('div');
    postContainer.classList.add('posts-container');
    const votes = document.createElement('div');
    votes.classList.add('votes');
    const upIcon = document.createElement('i');
    upIcon.classList.add('fa-solid');
    upIcon.classList.add('fa-chevron-up');
    upIcon.classList.add('up-vote');

    upIcon.addEventListener('click', () => {
      window.location.href = './html/signin.html';
    });
    const votesNum = document.createElement('div');
    votesNum.classList.add('votes-num');
    votesNum.textContent = post.count;
    const downIcon = document.createElement('i');
    downIcon.classList.add('fa-solid');
    downIcon.classList.add('fa-chevron-down');
    downIcon.classList.add('down-vote');

    downIcon.addEventListener('click', () => {
      window.location.href = './html/signin.html';
    });

    votes.appendChild(upIcon);
    votes.appendChild(votesNum);
    votes.appendChild(downIcon);
    postContainer.appendChild(votes);
    const postBody = document.createElement('div');
    postBody.classList.add('post-body');
    const user = document.createElement('div');
    user.classList.add('user');
    user.textContent = 'by ';
    const linkName = document.createElement('a');
    linkName.href = '#';
    linkName.textContent = post.user_name;
    user.appendChild(linkName);

    const postTitle = document.createElement('h4');
    postTitle.classList.add('title');
    postTitle.textContent = post.title;
    const postContent = document.createElement('p');
    postContent.classList.add('content');
    postContent.textContent = post.content;
    const comment = document.createElement('div');
    comment.classList.add('comment');
    const commentIcon = document.createElement('i');
    commentIcon.classList.add('fa-solid');
    commentIcon.classList.add('fa-comment');
    const spanComment = document.createElement('span');
    spanComment.textContent = ' Comments';

    comment.addEventListener('click', () => {
      popUpSection.classList.add('active');
      fetchComment(post.id);
    });

    comment.appendChild(commentIcon);
    comment.appendChild(spanComment);
    postBody.appendChild(user);
    postBody.appendChild(postTitle);
    postBody.appendChild(postContent);
    postBody.appendChild(comment);
    postContainer.appendChild(postBody);
    postSection.appendChild(postContainer);
  });
};

fetch('/posts').then((data) => data.json())
  .then((data) => createPostsCards(data))
  .catch((err) => console.log(err));

closeIcon.addEventListener('click', () => {
  popUpSection.classList.remove('active');
});

const fetchComment = (id) => {
  fetch(`/comments/${id}`).then((res) => res.json()).then((data) => createComments(data));
};

const createComments = (data) => {
  commentSection.textContent = '';
  inputSection.textContent = '';
  const commentInput = document.createElement('input');
  commentInput.classList.add('comment-input');
  commentInput.setAttribute('placeholder', 'write a comment');
  const commentBtn = document.createElement('button');
  commentBtn.classList.add('add-comment');
  commentBtn.textContent = 'Add';
  inputSection.appendChild(commentInput);
  inputSection.appendChild(commentBtn);

  data.forEach((ele) => {
    const username = document.createElement('small');
    username.textContent = ele.user_name;
    const comment = document.createElement('p');
    comment.textContent = ele.comment;
    const userComment = document.createElement('div');
    userComment.classList.add('userComment');
    userComment.appendChild(username);
    userComment.appendChild(comment);
    commentSection.appendChild(userComment);
  });
  commentBtn.addEventListener('click',() => {
    window.location.href = './html/signin.html';
  } )
  
};


addCommentBtn.addEventListener('click', () => {
  window.location.href = './html/signin.html';
});
