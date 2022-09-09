const logOutBtn = document.querySelector('.logout-btn');
const userName = document.querySelector('.user-name');
const userSide = document.querySelector('.user-name-side');
const postSection = document.querySelector('.posts-section');
const popUpSection = document.querySelector('.pop-up-sec');
const closeIcon = document.querySelector('.fa-circle-xmark');
const commentSection = document.querySelector('.comments');
const inputSection = document.querySelector('.input');

logOutBtn.addEventListener('click', () => {
  fetch('/logout').then((data) => data.json()).then(window.location.href = '/');
});

const user = { user_name: '' };
fetch('/username').then((data) => data.json())
  .then((data) => {
    user.user_name = data.user_name;
    userName.textContent = data.user_name;
    userSide.textContent = data.user_name;
  });

fetch('/user-posts').then((data) => data.json()).then((data) => createPostsCards(data));

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
      fetch('/upvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: post.id }),
      }).then((data) => data.json())
        .then((data) => votesNum.textContent = Number(post.count) + 1);
    });

    const votesNum = document.createElement('div');
    votesNum.classList.add('votes-num');
    votesNum.textContent = post.count;
    const downIcon = document.createElement('i');
    downIcon.classList.add('fa-solid');
    downIcon.classList.add('fa-chevron-down');
    downIcon.classList.add('down-vote');

    downIcon.addEventListener('click', () => {
      fetch('/downvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: post.id }),
      }).then((data) => data.json())
        .then((data) => votesNum.textContent = Number(post.count) - 1);
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
    linkName.textContent = 'You';
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
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid');
    deleteIcon.classList.add('fa-trash');
    const spanDelete = document.createElement('span');
    spanDelete.textContent = ' Delete';

    deleteIcon.addEventListener('click', () => {
      fetch('/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: post.id }),
      }).then((data) => data.json()).then((data) => location.reload());
    });

    commentIcon.addEventListener('click', () => {
      popUpSection.classList.add('active');
      fetchComment(post.id);
    });

    comment.appendChild(commentIcon);
    comment.appendChild(spanComment);
    comment.appendChild(deleteIcon);
    comment.appendChild(spanDelete);
    postBody.appendChild(user);
    postBody.appendChild(postTitle);
    postBody.appendChild(postContent);
    postBody.appendChild(comment);
    postContainer.appendChild(postBody);
    postSection.appendChild(postContainer);
  });
};

const fetchComment = (id) => {
  fetch(`/comments/${id}`).then((res) => res.json()).then((data) => createComments(data, id));
};

closeIcon.addEventListener('click', () => {
  popUpSection.classList.remove('active');
});

const createComments = (data, id) => {
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
    userComment.classList.add('user-comment');
    userComment.appendChild(username);
    userComment.appendChild(comment);
    commentSection.appendChild(userComment);
  });

  commentBtn.addEventListener('click', () => {
    fetch('/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ comment: commentInput.value, post_id: id }),
    }).then((res) => res.json()).then((res) => {
      const username = document.createElement('small');
      username.textContent = user.user_name;
      const comment = document.createElement('p');
      comment.textContent = res.comment;
      const userComment = document.createElement('div');
      userComment.classList.add('user-comment');
      userComment.appendChild(username);
      userComment.appendChild(comment);
      commentSection.appendChild(userComment);
      commentInput.value = '';
    });
  });
};
