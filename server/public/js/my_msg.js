// 点击进入我的评论和@
var my_comment_return = document.getElementsByClassName('my_comment_return');
var main = document.getElementsByClassName('main');
var my_comment = document.getElementsByClassName('my_comment');
var my_msg_comment = document.getElementsByClassName('my_msg_comment');
my_msg_comment[0].onclick = function() {
    main[0].style.display = "none";
    my_comment[0].style.display = "block";
}
my_comment_return[0].onclick = function() {
    main[0].style.display = "block";
    my_comment[0].style.display = "none";
}

// 点击查看我的新增关注
var my_msg_follow = document.getElementsByClassName('my_msg_follow');
var fans_person = document.getElementsByClassName('fans_person');
my_msg_follow[0].onclick = function() {
    main[0].style.display = "none";
    fans_person[0].style.display = "block";
}