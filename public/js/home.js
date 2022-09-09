const closeIcon = document.querySelector('.fa-circle-xmark');
const popUpSection = document.querySelector('.pop-up-sec');
const postSection = document.querySelector('.posts-section');
const commentSection = document.querySelector('.comments');
const inputSection = document.querySelector('.input');
const addPostBtn = document.querySelector('.add-post-btn');
const postPopUp = document.querySelector('.popup-post-container');
const postCloseIcon = document.querySelector('.fa-xmark');
const title = document.querySelector('#post-title-input');
const content = document.querySelector('#post-content-input');
const small = document.querySelectorAll('.small');
const userName = document.querySelector('.user-name');
const logOutBtn = document.querySelector('.logout-btn');
const submitPost = document.querySelector('.create-post-button');

const user = { user_name: '' };
fetch('/username').then((data) => data.json())
  .then((data) => {
    user.user_name = data.user_name;
    userName.textContent = data.user_name;
  });

logOutBtn.addEventListener('click', () => {
  fetch('/logout').then((data) => data.json()).then(window.location.href = '/');
});

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
      .then(data=> votesNum.textContent = Number(post.count) + 1)
      // .then((data) => location.reload());
    });

    const votesNum = document.createElement('div');
    votesNum.classList.add('votes-num');
    votesNum.textContent = post.count;
    const downIcon = document.createElement('i');
    downIcon.classList.add('fa-solid');
    downIcon.classList.add('fa-chevron-down');
    downIcon.classList.add('down-vote');
// const vote={
//   count: ''
// }
//     fetch(`./votes/${post.id}`).then(data=> data.json()).then(data=> console.log(data.length)
    downIcon.addEventListener('click', () => { 
      fetch('/downvote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ post_id: post.id }),
      }).then((data) => data.json())
      .then(data=>  votesNum.textContent = Number(post.count) - 1)
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

addPostBtn.addEventListener('click', () => {
  postPopUp.classList.add('active');
});

postCloseIcon.addEventListener('click', () => {
  postPopUp.classList.remove('active');
  title.classList.remove('error');
  title.classList.remove('success');
  content.classList.remove('error');
  content.classList.remove('success');
  small.forEach((e) => {
    e.classList.remove('error');
    e.textContent = '';
  });
});

submitPost.addEventListener('click', () => {
  ValidateInputs();

  fetch('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title.value, content: content.value }),
  }).then((res) => res.json()).then((data) => {
    data[0].user_name = user.user_name;
    data[0].count = 0;
    createPostsCards(data);
    title.value = '';
    content.value = '';
    small.forEach((e) => {
      e.classList.remove('error');
      e.textContent = '';
    });
    content.classList.remove('success')
    title.classList.remove('success')
  });
});

// client side validation for create post form

const ValidateInputs = () => {
  const titleValue = title.value.trim();
  const contentValue = content.value.trim();

  if (titleValue === '') {
    setError(title, 'title is required', 0);
  } else {
    setSuccess(title);
  }

  if (contentValue === '') {
    setError(content, 'content can\'t be empty', 1);
  } else {
    setSuccess(content);
  }
};

const setError = (element, msg, index2) => {
  small.forEach((e, index) => {
    if (index === index2) {
      e.classList.add('error');
      e.textContent = msg;
    }
  });
  element.classList.add('error');
  element.classList.remove('success');
};

const setSuccess = (element, msg) => {
  // const small = document.querySelector('.small');
  small.innerText = '';

  element.classList.add('success');
  element.classList.remove('error');
};
  // end client side validation for create post form

