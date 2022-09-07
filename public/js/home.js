const closeIcone = document.querySelector('.fa-circle-xmark');
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

fetch('/username').then((data) => data.json())
.then((data) => userName.textContent = data.user_name);

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
        body: JSON.stringify({ post_id: post.id, user_id: getCookie('user_id') }),
      }).then((data) => data.json()).then(console.log);
    });

    const votesNum = document.createElement('div');
    votesNum.classList.add('votes-num');
    // votesNum.textContent = post.count;
    const downIcon = document.createElement('i');
    downIcon.classList.add('fa-solid');
    downIcon.classList.add('fa-chevron-down');
    downIcon.classList.add('down-vote');

    downIcon.addEventListener('click', () => {
      let flag = true;
      if (flag) {
        fetch('/downvote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ post_id: post.id, user_id: getCookie('user_id') }),
        }).then((data) => data.json()).then((data) => flag = false);
      }
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

    fetch(`/users/${post.user_id}`).then((res) => res.json()).then((res) => {
      linkName.textContent = res.user_name;
    }).catch((err) => console.log('err fetch'));
    // linkName.textContent = post.user_name;
    user.appendChild(linkName);
    const postTitle = document.createElement('h4');
    postTitle.classList.add('title');
    postTitle.textContent = post.title;
    const postContent = document.createElement('p');
    postContent.classList.add('content');
    postContent.textContent = post.content;
    const comment = document.createElement('div');
    comment.classList.add('comment');
    const commentIcone = document.createElement('i');
    commentIcone.classList.add('fa-solid');
    commentIcone.classList.add('fa-comment');
    const spanComment = document.createElement('span');
    spanComment.textContent = ' Comments';
    comment.addEventListener('click', () => {
      popUpSection.classList.add('active');
      fetchComment(post.id);
    });
    comment.appendChild(commentIcone);
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

closeIcone.addEventListener('click', () => {
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
    // console.log(ele)
    const username = document.createElement('small');
    username.textContent = ele.user_name;
    const comment = document.createElement('p');
    comment.textContent = ele.comment;
    const userComment = document.createElement('div');
    userComment.classList.add('userComment');
    userComment.appendChild(username);
    userComment.appendChild(comment);
    commentSection.appendChild(userComment);

    commentBtn.addEventListener('click', () => {
      const commentInput = document.querySelector('.comment-input').value;
      fetch('/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ comment: commentInput, user_id: getCookie('user_id'), post_id: ele.post_id }),
      }).then((res) => res.json()).then((res) => {
        console.log(res);
        const username = document.createElement('small');
        username.textContent = getCookie('user_name');
        const comment = document.createElement('p');
        comment.textContent = res.comment;
        const userComment = document.createElement('div');
        userComment.classList.add('userComment');
        userComment.appendChild(username);
        userComment.appendChild(comment);
        commentSection.appendChild(userComment);
        commentInput.value = '';
      });
    });
  });
};

console.log(document.cookie);

addPostBtn.addEventListener('click', (e) => {
  postPopUp.classList.add('active');
});

postCloseIcon.addEventListener('click', () => {
  postPopUp.classList.remove('active');
  title.classList.remove('error');
  title.classList.remove('success');
  content.classList.remove('error');
  content.classList.remove('success');
  // title.value=''
  //     content.value=''
  small.forEach((e) => {
    e.classList.remove('error');
    e.textContent = '';
  });
});

const submitPost = document.querySelector('.create-post-button');
submitPost.addEventListener('click', () => {
  ValidateInputs();
  const title = document.querySelector('#post-title-input').value;
  const content = document.querySelector('#post-content-input').value;

  fetch('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, content, user_id: getCookie('user_id') }),
  }).then((res) => res.json()).then((data) => {
    createPostsCards(data);
    // title.value = '';
    // content.value = '';
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

  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

console.log(getCookie('user_name'))


// const createComments = (data) => {
//     data.forEach((ele) => {
//       console.log(ele);
//       const popUpBody = document.createElement('div');
//       popUpBody.classList.add('pop-up-body');
//       popUpSection.appendChild(popUpBody);

//       const closeIcon = document.createElement('i');
//       closeIcon.classList.add('fa-solid');
//       closeIcon.classList.add('fa-circle-xmark');
//       closeIcon.addEventListener('click', () => {
//         popUpSection.classList.remove('active');
//       });
//       popUpBody.appendChild(closeIcon);
//       const inputSection = document.createElement('div')
//       inputSection.classList.add('input')
//       const commentInput = document.createElement('input');
//       commentInput.classList.add('comment-input');
//       commentInput.setAttribute('placeholder', 'write a comment');
//       const commentBtn = document.createElement('button');
//       commentBtn.classList.add('add-comment');
//       commentBtn.textContent = 'Add';
//       inputSection.appendChild(commentInput)
//       inputSection.appendChild(commentBtn)
//       const commentSection= document.createElement('div')
//       commentSection.classList.add('comments')
//       const para = document.createElement('p');
//       commentSection.appendChild(para);
//       para.textContent = ele.comment;
//       popUpBody.appendChild(inputSection)
//       popUpBody.appendChild(commentSection)
//       commentBtn.addEventListener('click', () => {
//         const commentInput = document.querySelector('.comment-input').value;
//         fetch('/comments', {
//           method: 'POST',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify({ comment: commentInput, user_id: 3, post_id: ele.post_id }),
//         }).then((res) => res.json()).then((res) => {
//           console.log(res);
//           // const comment = document.createElement('p')
//           // comment.textContent= res.comment;
//           // commentSection.appendChild(comment);
//           // commentInput.value=''
//         });
//       });
//     });
//   };
