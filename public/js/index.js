const closeIcone = document.querySelector('.fa-circle-xmark');
const popUpSection = document.querySelector('.pop-up-sec');
const postSection = document.querySelector('.posts-section');
const commentSection = document.querySelector('.comments');
const addCommentBtn = document.querySelector('.add-comment');
const createPostsCards = (data) => {
  data.forEach((post) => {
    const postContainer = document.createElement('div');
    postContainer.classList.add('posts-container');
    const votes = document.createElement('div');
    votes.classList.add('votes');
    const upIcone = document.createElement('i');
    upIcone.classList.add('fa-solid');
    upIcone.classList.add('fa-chevron-up');
    upIcone.classList.add('up-vote');
    upIcone.addEventListener('click', () => {
      window.location.href = './html/signin.html';
    });

    const votesNum = document.createElement('div');
    votesNum.classList.add('votes-num');
    votesNum.textContent = post.count;
    const downIcone = document.createElement('i');
    downIcone.classList.add('fa-solid');
    downIcone.classList.add('fa-chevron-down');
    downIcone.classList.add('down-vote');
    downIcone.addEventListener('click', () => {
      window.location.href = './html/signin.html';
    });

    votes.appendChild(upIcone);
    votes.appendChild(votesNum);
    votes.appendChild(downIcone);
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
    user.appendChild(linkName);
    const title = document.createElement('h4');
    title.classList.add('title');
    title.textContent = post.title;
    const content = document.createElement('p');
    content.classList.add('content');
    content.textContent = post.content;
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
    postBody.appendChild(title);
    postBody.appendChild(content);
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
  data.forEach((ele) => {
    const comment = document.createElement('p');
    comment.textContent = ele.comment;
    commentSection.appendChild(comment);
  });
};

addCommentBtn.addEventListener('click', () => {
  window.location.href = './html/signin.html';
});
