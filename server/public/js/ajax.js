var user = {};
// 获取用户登录信息

var login_box = document.getElementById('login_box');
var login = document.getElementById("login");
var username = document.getElementsByClassName('username');
var password = document.getElementsByClassName('password');
var login_btn = document.getElementsByClassName('login_btn');
var edit_my_avatar = document.getElementsByClassName('edit_my_avatar');
var reg = /^[a-zA-Z0-9_-]{3,15}$/;

var main = document.getElementsByClassName('main');
// username[0].onblur = function() {
//     if (reg.test(username[0].value)) {

//     }
// }
// password[0].onblur = function() {
//     if (reg.test(password[0].value)) {}
// }

login_btn[0].onclick = function() {
    login_box.style.display = "none";
    main[0].style.display = "block";
}

var img = document.getElementsByTagName('img');
for (var i = 0; i < img.length; i++) {
    img[i].src = "../images/loading.gif";
}

// 点击登录按钮登录
login_btn[0].onclick = function() {
    var icon_homepage = document.getElementsByClassName('icon_homepage');
    var homepage = document.getElementsByClassName('homepage');
    var person_center = document.getElementsByClassName('person_center');
    var icon_person_center = document.getElementsByClassName('icon_person_center');
    var user_avatar = document.getElementsByClassName('user_avatar');

    homepage[0].style.display = "block";
    icon_homepage[0].style.color = "#e40613";
    person_center[0].style.display = "none";
    icon_person_center[0].style.color = "darkgray";

    var name = username[0].value;
    var psd = password[0].value;
    ajax({
        type: 'post',
        //请求地址
        url: 'http://175.178.193.182:8080/login',
        data: {
            username: name,
            password: psd
        },
        success: function(result) {
            if (result.status == 406) {
                login_box.style.display = "none";
                main[0].style.display = "block";
                console.log(result);
                user.userId = result.userId;
                console.log(user.userId);
                ajax({
                    url: 'http://175.178.193.182:8080/user/baseInfo',
                    data: {
                        userId: user.userId
                    },

                    // 获取用户基本信息
                    success: function(result) {
                        console.log(result);
                        user.nickname = result.user.nickname;
                        user.gender = result.user.gender;
                        user.birthday = result.user.birthday;
                        user.area = result.user.area;
                        user.description = result.user.description;
                        user.avatar = result.user.avatar;
                        my_name[0].innerHTML = result.user.nickname;
                        detailed_name[0].innerHTML = result.user.nickname;
                        detailed_gender[0].innerHTML = result.user.gender;
                        detailed_birthday[0].innerHTML = result.user.birthday;
                        detailed_area[0].innerHTML = result.user.area;
                        detailed_description[0].innerHTML = result.user.description;
                        user_avatar[0].src = result.user.avatar;
                        edit_my_avatar[0].src = result.user.avatar;

                    }
                });

                // 获取推荐页内容
                ajax({
                    url: 'http://175.178.193.182:8080/article/getHomePage',
                    success: function(result) {
                        console.log(result);
                    }
                });


            } else {
                console.log(result.msg);
            }


            // 查看我的获赞情况
            var type_liked = document.getElementsByClassName('type_liked');
            var type_started = document.getElementsByClassName('type_started');
            var liked_box = document.getElementsByClassName('liked_box');
            var started_box = document.getElementsByClassName('started_box');
            ajax({
                url: 'http://175.178.193.182:8080/notice/article/like',
                data: {
                    userId: user.userId
                },
                success: function(liked_result) {
                    console.log(liked_result);
                    liked_box[0].innerHTML = "";
                    for (let i = 0; i < liked_result.like.length; i++) {
                        var div = document.createElement('div');
                        div.innerHTML = `
                <img src="${liked_result.like[i].userInfo.avatar}" class="left">
                <div class="like_my_article_left">
                    <div class="like_my_article_nickname">${liked_result.like[i].userInfo.nickname}</div>
                    <div style="color: #a3a3a3;">赞了你的笔记</div>
                </div>
                <img src="${liked_result.like[i].articleInfo.images[0]}" class="right">`
                        liked_box[0].appendChild(div);
                    }

                }
            });

            // 获取被收藏文章
            ajax({
                url: 'http://175.178.193.182:8080/notice/article/star',
                data: {
                    userId: user.userId
                },
                success: function(started_result) {
                    console.log(started_result);
                    started_box[0].innerHTML = "";
                    for (var i = 0; i < started_result.star.length; i++) {
                        var div = document.createElement('div');
                        div.innerHTML = `
        <img src="${started_result.star[i].userInfo.avatar}" class="left">
        <div class="star_my_article_left">
            <div class="star_my_article_nickname">${started_result.star[i].userInfo.nickname}</div>
            <div style="color: #a3a3a3;">收藏了你的笔记</div>
        </div>
        <img src="${started_result.star[i].articleInfo.images[0]}" class="right">`
                        started_box[0].appendChild(div);
                    }

                }
            });
            //获取粉丝列表
            ajax({
                url: 'http://175.178.193.182:8080/user/fanList',
                data: {
                    userId: user.userId
                },
                success: function(result) {
                    console.log(result);
                    fans_detailed[0].innerHTML = "";
                    for (var i = 0; i < result.fansList.length; i++) {

                        var li = document.createElement('li');

                        li.innerHTML = `
                <div class="fans_left">
                    <img src="${result.fansList[i].avatar}" class="fans_avatar">
                    <div class="fans_nickname">${result.fansList[i].nickname}</div>
                </div>
                <div class="fans_right">未关注</div>`;
                        fans_detailed[0].appendChild(li);

                    }
                }
            });
        },
        error: function(result) {
            alert(result.msg);
            console.log(result);
        }
    });


}
var recommend = document.getElementsByClassName('recommend');
var travel = document.getElementsByClassName('travel');
var food = document.getElementsByClassName('food');
var fashion = document.getElementsByClassName('fashion');
var cosmetics = document.getElementsByClassName('cosmetics');
var efficient = document.getElementsByClassName('efficient');
var skin = document.getElementsByClassName('skin');
var articles = document.getElementsByClassName('articles');
var all_articles = document.getElementsByClassName('all_articles');
var article_enter = document.getElementsByClassName('article_enter');
var article_author_avatar = document.getElementsByClassName('article_author_avatar');
var article_enter_authorName = document.getElementsByClassName('article_enter_authorName');
var article_images_box = document.getElementsByClassName('article_images_box');
var article_enter_title = document.getElementsByClassName('article_enter_title');
var article_enter_content = document.getElementsByClassName('article_enter_content');
var article_enter_tag = document.getElementsByClassName('article_enter_tag');
var article_enter_postDate = document.getElementsByClassName('article_enter_postDate');
var review_num = document.getElementsByClassName('review_num');
var article_enter_my_avatar = document.getElementsByClassName('article_enter_my_avatar');
var review_box = document.getElementsByClassName('review_box');
var detailed_reviews = document.getElementsByClassName('detailed_reviews');
var first_review_box = document.getElementsByClassName('first_review_box');
var say_something = document.getElementsByClassName('say_something');
var review_bottom = document.getElementsByClassName('review_bottom');
var write_my_review = document.getElementsByClassName('write_my_review');
var input_my_review = document.getElementById('input_my_review');
var send_my_review = document.getElementsByClassName('send_my_review');
var cancle_send = document.getElementsByClassName('cancle_send');
var second_review = document.getElementsByClassName('second_review');
var reply_comment = document.getElementsByClassName('reply_comment');
var cancle_reply = document.getElementsByClassName('cancle_reply');
var input_reply_comment = document.getElementById('input_reply_comment');
var send_reply_comment = document.getElementsByClassName('send_reply_comment');
var all_articles_right = document.getElementsByClassName('all_articles_right');
var like_bottom = document.getElementsByClassName('like_bottom');
var star_bottom = document.getElementsByClassName('star_bottom');
var all_review = document.getElementsByClassName('all_review');
var first_review_like = document.getElementsByClassName('first_review_like');
var icon_homepage = document.getElementsByClassName('icon_homepage');
var icon_my_msg = document.getElementsByClassName('icon_my_msg');
var homepage = document.getElementsByClassName('homepage');
var my_msg = document.getElementsByClassName('my_msg');
var person_center = document.getElementsByClassName('person_center');
var icon_person_center = document.getElementsByClassName('icon_person_center');
var follow_number = document.getElementsByClassName('follow_number');
var fans_number = document.getElementsByClassName('fans_number');
var like_number = document.getElementsByClassName('like_number');
var my_msg_like = document.getElementsByClassName('my_msg_like');
var other_person_center = document.getElementsByClassName('other_person_center');
var other_follow_number = document.getElementsByClassName('other_follow_number');
var other_fans_number = document.getElementsByClassName('other_fans_number');
var other_like_number = document.getElementsByClassName('other_like_number');
var footer = document.getElementsByTagName('footer');
var other_node = document.getElementsByClassName('other_node');
var span_box = document.getElementsByClassName('span_box');

// 获取首页文章
ajax({
    url: 'http://175.178.193.182:8080/article/getHomePage',
    success: function(result) {
        console.log(result);
        var types = ['推荐', '旅行', '美食', '时尚', '彩妆', '高效', '护肤'];
        for (let t = 0; t < types.length; t++) {
            // (function(t) {
            for (var i = 0; i < result.pages[types[t]].length; i++) {
                var all_articles = document.createElement('div');
                all_articles.className = "all_articles";
                all_articles.innerHTML = `<img src="${result.pages[types[t]][i].images[0]}" class="article_img">
                    <div class="all_articles_bottom">
                    <div class="all_articles_title">${result.pages[types[t]][i].title}</div>
                    <div class="all_articles_left">
                    <img src="${result.pages[types[t]][i].avatar}">
                    <div>${result.pages[types[t]][i].authorName}</div>
                    </div>
                    </div>`
                articles[t].appendChild(all_articles);
                var click_like = document.createElement('div');
                click_like.innerHTML = ` <div class="all_articles_right" id="click_like">${result.pages[types[t]][i].likes}</div>`;
                all_articles.appendChild(click_like);
                // 文章详情页
                (function(j) {

                    // 喜欢文章
                    var click_like_flag = 1;
                    click_like.onclick = function(e) {
                        // click_like_flag=1;
                        e.stopPropagation();

                        if (click_like_flag) {
                            ajax({
                                type: 'post',
                                url: 'http://175.178.193.182:8080/article/like',
                                data: {
                                    userId: user.userId,
                                    articleId: result.pages[types[t]][j].articleId
                                },
                                success: function(like_result) {
                                    console.log(like_result);
                                    click_like.style.color = "red";
                                    console.log(result.pages[types[t]][j].articleId);
                                    console.log('喜欢');
                                    click_like_flag = 0;
                                }
                            });

                        } else {
                            ajax({
                                type: 'post',
                                url: 'http://175.178.193.182:8080/article/unlike',
                                data: {
                                    userId: user.userId,
                                    articleId: result.pages[types[t]][j].articleId
                                },
                                success: function(like_result) {
                                    console.log(like_result);
                                    console.log(result.pages[types[t]][j].articleId);
                                    click_like.style.color = "black";
                                    console.log('不喜欢');
                                    click_like_flag = 1;
                                }
                            });

                        }

                    }



                    all_articles.onclick = function() {
                        article_enter[0].style.display = "block";
                        main[0].style.display = "none";
                        article_author_avatar[0].src = result.pages[types[t]][j].avatar;
                        // 点击头像进入他人主页
                        article_author_avatar[0].onclick = function() {
                            the_person_center({
                                userId: result.pages[types[t]][j].authorId,
                                avatar: result.pages[types[t]][j].avatar,
                                authorName: result.pages[types[t]][j].authorName
                            });
                            other_person_center[0].style.display = "block";
                            article_enter[0].style.display = "none";

                        }

                        article_enter_authorName[0].innerHTML = result.pages[types[t]][j].authorName;
                        // 获取该文章详细信息
                        ajax({
                            url: 'http://175.178.193.182:8080/article/byId',
                            data: {
                                articleId: result.pages[types[t]][j].articleId
                            },
                            success: function(article) {
                                console.log(article);

                                // 喜欢文章
                                like_bottom[0].onclick = function() {
                                    if (click_like_flag) {
                                        ajax({
                                            type: 'post',
                                            url: 'http://175.178.193.182:8080/article/like',
                                            data: {
                                                userId: user.userId,
                                                articleId: article.article.articleId
                                            },
                                            success: function(like_result) {
                                                console.log(like_result);
                                                click_like.style.color = "red";
                                                console.log(article.article.articleId);
                                                console.log('喜欢');
                                                // click_like.innerHTML = ` <div class="all_articles_right" id="click_like">${result.pages[types[t]][i].likes+1}</div>`;
                                                click_like_flag = 0;
                                            }
                                        });

                                    } else {
                                        ajax({
                                            type: 'post',
                                            url: 'http://175.178.193.182:8080/article/unlike',
                                            data: {
                                                userId: user.userId,
                                                articleId: article.article.articleId
                                            },
                                            success: function(like_result) {
                                                console.log(like_result);
                                                console.log(article.article.articleId);
                                                click_like.style.color = "black";
                                                console.log('不喜欢');
                                                // click_like.innerHTML = ` <div class="all_articles_right" id="click_like">${result.pages[types[t]][i].likes-1}</div>`;
                                                click_like_flag = 1;
                                            }
                                        });

                                    }
                                }

                                // 收藏文章
                                var click_star_flag = 1;
                                star_bottom[0].onclick = function() {

                                    if (click_star_flag) {
                                        ajax({
                                            type: 'post',
                                            url: 'http://175.178.193.182:8080/article/star',
                                            data: {
                                                userId: user.userId,
                                                articleId: article.article.articleId
                                            },
                                            success: function(star_result) {
                                                console.log(star_result);
                                                console.log(article.article.articleId);
                                                console.log('收藏');
                                                click_star_flag = 0;
                                            }
                                        });

                                    } else {
                                        ajax({
                                            type: 'post',
                                            url: 'http://175.178.193.182:8080/article/unstar',
                                            data: {
                                                userId: user.userId,
                                                articleId: result.pages[types[t]][j].articleId
                                            },
                                            success: function(star_result) {
                                                console.log(star_result);
                                                console.log(article.article.articleId);
                                                console.log('取消收藏');
                                                click_star_flag = 1;
                                            }
                                        });

                                    }

                                }
                            }
                        });

                        // 文章图片
                        article_images_box[0].innerHTML = "";
                        span_box[0].innerHTML = "";
                        article_images_box[0].style.transform = "translate(0,0)";
                        for (let i = 0; i < result.pages[types[t]][j].images.length; i++) {
                            var img = document.createElement('img');
                            img.src = result.pages[types[t]][j].images[i];
                            article_images_box[0].appendChild(img);
                            var span = document.createElement('span');
                            span.setAttribute('index', i);
                            span_box[0].appendChild(span);
                            span.addEventListener('click', function() {
                                // 排他思想
                                for (var num = 0; num < span_box[0].children.length; num++) {
                                    span_box[0].children[num].style.backgroundColor = "#a3a3a3";
                                }
                                var index = this.getAttribute('index');
                                var currentLeft = span_box[0].offsetLeft - 400 * index;
                                // 点击小圆点颜色改变
                                span_box[0].children[index].style.backgroundColor = "#e40613";
                                article_images_box[0].style.transform = "translate(" + currentLeft + "px,0)";
                            })


                        }
                        article_enter_title[0].innerHTML = result.pages[types[t]][j].title;
                        article_enter_content[0].innerHTML = result.pages[types[t]][j].content;
                        article_enter_tag[0].innerHTML = '#' + result.pages[types[t]][j].tags[0];
                        article_enter_postDate[0].innerHTML = result.pages[types[t]][j].postDate.slice(5, 10);
                        article_enter_my_avatar[0].src = user.avatar;
                        like_bottom[0].innerHTML = result.pages[types[t]][j].likes;
                        star_bottom[0].innerHTML = result.pages[types[t]][j].stars;
                        all_review[0].innerHTML = result.pages[types[t]][j].reviews;


                        // 获取文章评论
                        ajax({
                            url: 'http://175.178.193.182:8080/review/byArticle',
                            data: {
                                articleId: result.pages[types[t]][j].articleId,
                                pages: 0
                            },
                            success: function(all_reviews) {
                                console.log(all_reviews);
                                review_num[0].innerHTML = `共${ result.pages[types[t]][j].reviews}条评论`;
                                // 获取评论信息
                                detailed_reviews[0].innerHTML = "";
                                // 一级评论

                                for (let i = 0; i < all_reviews.reviews.length; i++) {
                                    var first_review_like = document.getElementsByClassName('first_review_like');
                                    var second_review_like = document.getElementsByClassName('second_review_like');
                                    ajax({
                                        url: 'http://175.178.193.182:8080/user/fullInfo',
                                        data: {
                                            userId: all_reviews.reviews[i].authorId
                                        },
                                        success: function(reviews_info) {
                                            var li = document.createElement('li');
                                            li.className = "first_review";
                                            li.innerHTML = ` 
                                                <div class="first_review_box">
                                                    <div class="first_review_nickname">${reviews_info.user.nickname}</div>
                                                    <div class="first_review_content">${all_reviews.reviews[i].content}</div>
                                                    <div class="first_review_postDate">${all_reviews.reviews[i].postDate.slice(5, 10)}</div>
                                                </div>
                                                `
                                            detailed_reviews[0].appendChild(li);
                                            var first_review_like = document.createElement('first_review_like');
                                            first_review_like.className = "first_review_like";
                                            first_review_like.innerHTML = `<div class="first_review_like">${all_reviews.reviews[i].likes}</div>`;
                                            li.appendChild(first_review_like);
                                            var first_review_avatar = document.createElement('img');
                                            first_review_avatar.className = "first_review_avatar";
                                            first_review_avatar.src = `${reviews_info.user.avatar}`;
                                            li.insertBefore(first_review_avatar, li.children[0]);

                                            // 点击头像进入他人主页
                                            first_review_avatar.onclick = function(e) {
                                                e.stopPropagation();
                                                the_person_center({
                                                    userId: all_reviews.reviews[i].authorId,
                                                    avatar: reviews_info.user.avatar,
                                                    authorName: reviews_info.user.nickname
                                                });
                                                other_person_center[0].style.display = "block";
                                                article_enter[0].style.display = "none";

                                            }


                                            // 删除我的一级评论
                                            // 判断是否是我的文章和评论
                                            if (result.pages[types[t]][j].authorId == user.userId || all_reviews.reviews[i].authorId == user.userId) {
                                                var delete_first = document.createElement('div');
                                                delete_first.innerHTML = `<a href="javascript:;" id="delete_first">点击删除评论</a>`;
                                                li.appendChild(delete_first);
                                                delete_first.onclick = function(e) {
                                                    e.stopPropagation();
                                                    ajax({
                                                        type: 'post',
                                                        url: 'http://175.178.193.182:8080/review/delete',
                                                        data: {
                                                            reviewId: all_reviews.reviews[i].reviewId
                                                        },
                                                        success: function(delete_result) {
                                                            console.log(delete_result);
                                                            li.remove();

                                                        }
                                                    });
                                                }
                                            }

                                            // 喜欢评论
                                            var like_first_comment_flag = 1;
                                            first_review_like.onclick = function(e) {
                                                e.stopPropagation();
                                                // console.log(all_reviews.reviews[i].authorId);
                                                if (like_first_comment_flag) {
                                                    ajax({
                                                        type: 'post',
                                                        url: 'http://175.178.193.182:8080/review/like',
                                                        data: {
                                                            userId: user.userId,
                                                            reviewId: all_reviews.reviews[i].reviewId
                                                        },
                                                        success: function(like_first_comment) {
                                                            console.log(like_first_comment);
                                                            like_first_comment_flag = 0;
                                                        }
                                                    });
                                                } else {
                                                    ajax({
                                                        type: 'post',
                                                        url: 'http://175.178.193.182:8080/review/unlike',
                                                        data: {
                                                            userId: user.userId,
                                                            reviewId: all_reviews.reviews[i].reviewId
                                                        },
                                                        success: function(like_first_comment) {
                                                            console.log(like_first_comment);
                                                            like_first_comment_flag = 1;
                                                        }
                                                    });
                                                }
                                            }

                                            // 回复他人评论
                                            li.onclick = function() {
                                                reply_comment[0].style.display = "block";
                                                input_reply_comment.placeholder = `回复 ${reviews_info.user.nickname}:`;
                                                send_reply_comment[0].onclick = function() {
                                                    ajax({
                                                        type: 'post',
                                                        url: 'http://175.178.193.182:8080/review',
                                                        data: {
                                                            replyToUserId: all_reviews.reviews[i].authorId,
                                                            replyToArticleId: result.pages[types[t]][j].articleId,
                                                            parentReviewId: all_reviews.reviews[i].reviewId,
                                                            authorId: user.userId,
                                                            content: input_reply_comment.value
                                                        },
                                                        success: function(result) {
                                                            console.log(result);
                                                            reply_comment[0].style.display = "none";
                                                            input_reply_comment.value = "";
                                                        }
                                                    });
                                                    var li_second = document.createElement('li');
                                                    li_second.innerHTML = ` <img src="${user.avatar}" class="second_review_avatar">
                                                                <div class="second_review_box">
                                                                    <div class="second_review_nickname">${user.nickname}</div>
                                                                    <div class="second_review_content">${input_reply_comment.value}</div>
                                                                    <div class="second_review_postDate"></div>
                                                                </div>
                                                                <div class="second_review_like">0</div>
                                                                <a href="javascript:;" id="delete_second">点击删除评论</a>`
                                                    li.appendChild(li_second);
                                                }
                                            }
                                            cancle_reply[0].onclick = function() {
                                                reply_comment[0].style.display = "none";
                                            }



                                            // 二级评论
                                            for (let k = 0; k < all_reviews.reviews[i].reviewList.length; k++) {

                                                ajax({
                                                    url: 'http://175.178.193.182:8080/user/fullInfo',
                                                    data: {
                                                        userId: all_reviews.reviews[i].reviewList[k].authorId
                                                    },
                                                    success: function(second_review) {

                                                        var li_second = document.createElement('li');
                                                        li_second.innerHTML = ` 
                                                            <div class="second_review_box">
                                                                <div class="second_review_nickname">${second_review.user.nickname}</div>
                                                                <div class="second_review_content">${all_reviews.reviews[i].reviewList[k].content}</div>
                                                                <div class="second_review_postDate">${all_reviews.reviews[i].reviewList[k].postDate.slice(5, 10)}</div>
                                                            </div>
                                                           `
                                                        li.appendChild(li_second);
                                                        var second_review_like = document.createElement('div');
                                                        second_review_like.innerHTML = `<div class="second_review_like">${all_reviews.reviews[i].reviewList[k].likes}</div>`;
                                                        li_second.appendChild(second_review_like);

                                                        var second_review_avatar = document.createElement('img');
                                                        second_review_avatar.className = "second_review_avatar";
                                                        second_review_avatar.src = `${second_review.user.avatar}`;
                                                        li_second.insertBefore(second_review_avatar, li_second.children[0]);
                                                        // 点击头像进入他人主页
                                                        second_review_avatar.onclick = function(e) {
                                                            e.stopPropagation();
                                                            the_person_center({
                                                                userId: all_reviews.reviews[i].reviewList[k].authorId,
                                                                avatar: second_review.user.avatar,
                                                                authorName: second_review.user.nickname
                                                            });
                                                            other_person_center[0].style.display = "block";
                                                            article_enter[0].style.display = "none";

                                                        }

                                                        // 删除我的二级评论
                                                        // 判断是否是我的文章和评论
                                                        if (result.pages[types[t]][j].authorId == user.userId || all_reviews.reviews[i].reviewList[k].authorId == user.userId) {
                                                            var delete_second = document.createElement('div');
                                                            delete_second.innerHTML = `<a href="javascript:;" id="delete_second">点击删除评论</a>`;
                                                            li.appendChild(delete_second);
                                                            // 开始
                                                            delete_second.onclick = function(e) {
                                                                    e.stopPropagation();
                                                                    ajax({
                                                                        type: 'post',
                                                                        url: 'http://175.178.193.182:8080/review/delete',
                                                                        data: {
                                                                            reviewId: all_reviews.reviews[i].reviewList[k].reviewId
                                                                        },
                                                                        success: function(delete_result) {
                                                                            console.log(delete_result);
                                                                            li_second.remove();
                                                                            delete_second.remove();

                                                                        }
                                                                    });
                                                                }
                                                                // 结束
                                                        }

                                                        // 喜欢二级评论
                                                        var like_second_comment_flag = 1;
                                                        second_review_like.onclick = function(e) {
                                                            e.stopPropagation();
                                                            if (like_second_comment_flag) {
                                                                ajax({
                                                                    type: 'post',
                                                                    url: 'http://175.178.193.182:8080/review/like',
                                                                    data: {
                                                                        userId: user.userId,
                                                                        reviewId: all_reviews.reviews[i].reviewList[k].reviewId
                                                                    },
                                                                    success: function(like_second_comment) {
                                                                        console.log(all_reviews.reviews[i].reviewList[k].reviewId);
                                                                        console.log(like_second_comment);
                                                                        like_second_comment_flag = 0;
                                                                    }
                                                                });
                                                            } else {
                                                                ajax({
                                                                    type: 'post',
                                                                    url: 'http://175.178.193.182:8080/review/unlike',
                                                                    data: {
                                                                        userId: user.userId,
                                                                        reviewId: all_reviews.reviews[i].reviewList[k].reviewId
                                                                    },
                                                                    success: function(like_second_comment) {
                                                                        console.log(all_reviews.reviews[i].reviewList[k].reviewId);
                                                                        console.log(like_second_comment);
                                                                        like_second_comment_flag = 1;
                                                                    }
                                                                });
                                                            }
                                                        }


                                                    }
                                                });


                                            }
                                        }
                                    });

                                }


                            }
                        });

                        // 发表文章评论
                        say_something[0].onclick = function() {
                            write_my_review[0].style.display = "block";
                        }
                        review_bottom[0].onclick = function() {
                            write_my_review[0].style.display = "block";
                        }
                        cancle_send[0].onclick = function() {
                            write_my_review[0].style.display = "none";
                        }
                        send_my_review[0].onclick = function() {
                            ajax({
                                type: 'post',
                                url: 'http://175.178.193.182:8080/review',
                                data: {
                                    replyToUserId: result.pages[types[t]][j].authorId,
                                    replyToArticleId: result.pages[types[t]][j].articleId,
                                    authorId: user.userId,
                                    content: input_my_review.value
                                },
                                success: function(result) {
                                    console.log(result);
                                    write_my_review[0].style.display = "none";
                                    var li = document.createElement('li');
                                    li.innerHTML = ` <img src="${user.avatar}" class="first_review_avatar">
                                                <div class="first_review_box">
                                                    <div class="first_review_nickname">${user.nickname}</div>
                                                    <div class="first_review_content">${input_my_review.value}</div>
                                                    <div class="first_review_postDate"></div>
                                                </div>
                                                <div class="first_review_like">0</div>
                                                <a href="javascript:;" id="delete_first">点击删除评论</a>`

                                    detailed_reviews[0].appendChild(li);
                                    input_my_review.value = "";
                                }
                            });
                        }

                    }
                })(i);
            }
            // })(t);
        }

    }
});



// // 获取我收到的评论
var icon_my_msg = document.getElementsByClassName('icon_my_msg');
var my_comment_box = document.getElementsByClassName('my_comment_box');


icon_my_msg[0].onclick = function() {
    icon_homepage[0].style.color = "darkgray";
    icon_my_msg[0].style.color = "#e40613";
    icon_person_center[0].style.color = "darkgray";
    homepage[0].style.display = "none";
    my_msg[0].style.display = "block";
    person_center[0].style.display = "none";
    // 获取被收藏文章
    ajax({
        url: 'http://175.178.193.182:8080/notice/comment',
        data: {
            userId: user.userId
        },
        success: function(comment_result) {
            console.log(comment_result);
            console.log(111111111);
            my_comment_box[0].innerHTML = "";
            for (var i = 0; i < comment_result.like.length; i++) {
                var div = document.createElement('div');
                div.innerHTML = `
            <img src="${comment_result.like[i].userInfo.avatar}" class="left">
            <div class="my_comment_left">
                <div class="my_comment_nickname">${comment_result.like[i].userInfo.nickname}</div>
                <div style="color: #a3a3a3;">评论了你的笔记</div>
            </div>
            <img src="${comment_result.like[i].articleInfo.images[0]}" class="right">`
                my_comment_box[0].appendChild(div);
            }

        }
    });
}




// 编辑资料
var my_name = document.getElementsByClassName('my_name');
var input_name = document.getElementsByClassName('input_name');
var save_name = document.getElementsByClassName('save_name');
var detailed_name = document.getElementsByClassName('detailed_name');
var input_gender = document.getElementsByClassName('input_gender');
var save_gender = document.getElementsByClassName('save_gender');
var detailed_gender = document.getElementsByClassName('detailed_gender');
var input_birthday = document.getElementsByClassName('input_birthday');
var save_birthday = document.getElementsByClassName('save_birthday');
var detailed_birthday = document.getElementsByClassName('detailed_birthday');
var input_area = document.getElementsByClassName('input_area');
var save_area = document.getElementsByClassName('save_area');
var detailed_area = document.getElementsByClassName('detailed_area');
var input_description = document.getElementsByClassName('input_description');
var save_description = document.getElementsByClassName('save_description');
var detailed_description = document.getElementsByClassName('detailed_description');

save_name[0].onclick = function() {
    nickname = input_name[0].value;
    user.nickname = nickname;

    ajax({
        type: 'post',
        url: 'http://175.178.193.182:8080/user/edit',
        data: {
            userId: user.userId,
            nickname: user.nickname,
            gender: user.gender,
            birthday: user.birthday,
            area: user.area,
            description: user.description
        },
        success: function(result) {
            console.log(result);
            my_name[0].innerHTML = user.nickname;
            detailed_name[0].innerHTML = user.nickname;
            detailed_gender[0].innerHTML = user.gender;
            detailed_birthday[0].innerHTML = user.birthday;
            detailed_area[0].innerHTML = user.area;
            detailed_description[0].innerHTML = user.description;
            upload_name[0].style.display = "none";
            my_edit[0].style.display = "block";
        }
    });

}


save_gender[0].onclick = function() {
    gender = input_gender[0].value;
    user.gender = gender;

    ajax({
        type: 'post',
        url: 'http://175.178.193.182:8080/user/edit',
        data: {
            userId: user.userId,
            nickname: user.nickname,
            gender: user.gender,
            birthday: user.birthday,
            area: user.area,
            description: user.description
        },
        success: function(result) {
            console.log(result);
            detailed_name[0].innerHTML = user.nickname;
            detailed_gender[0].innerHTML = user.gender;
            detailed_birthday[0].innerHTML = user.birthday;
            detailed_area[0].innerHTML = user.area;
            detailed_description[0].innerHTML = user.description;
            upload_gender[0].style.display = "none";
            my_edit[0].style.display = "block";
        }
    });

}


save_birthday[0].onclick = function() {
    birthday = input_birthday[0].value;
    user.birthday = birthday;

    ajax({
        type: 'post',
        url: 'http://175.178.193.182:8080/user/edit',
        data: {
            userId: user.userId,
            nickname: user.nickname,
            gender: user.gender,
            birthday: user.birthday,
            area: user.area,
            description: user.description
        },
        success: function(result) {
            console.log(result);
            detailed_name[0].innerHTML = user.nickname;
            detailed_gender[0].innerHTML = user.gender;
            detailed_birthday[0].innerHTML = user.birthday;
            detailed_area[0].innerHTML = user.area;
            detailed_description[0].innerHTML = user.description;
            upload_birthday[0].style.display = "none";
            my_edit[0].style.display = "block";
        }
    });

}


save_area[0].onclick = function() {
    area = input_area[0].value;
    user.area = area;

    ajax({
        type: 'post',
        url: 'http://175.178.193.182:8080/user/edit',
        data: {
            userId: user.userId,
            nickname: user.nickname,
            gender: user.gender,
            birthday: user.birthday,
            area: user.area,
            description: user.description
        },
        success: function(result) {
            console.log(result);
            detailed_name[0].innerHTML = user.nickname;
            detailed_gender[0].innerHTML = user.gender;
            detailed_birthday[0].innerHTML = user.birthday;
            detailed_area[0].innerHTML = user.area;
            detailed_description[0].innerHTML = user.description;
            upload_area[0].style.display = "none";
            my_edit[0].style.display = "block";
        }
    });

}



save_description[0].onclick = function() {
    description = input_description[0].value;
    user.description = description;

    ajax({
        type: 'post',
        url: 'http://175.178.193.182:8080/user/edit',
        data: {
            userId: user.userId,
            nickname: user.nickname,
            gender: user.gender,
            birthday: user.birthday,
            area: user.area,
            description: user.description
        },
        success: function(result) {
            console.log(result);
            detailed_name[0].innerHTML = user.nickname;
            detailed_gender[0].innerHTML = user.gender;
            detailed_birthday[0].innerHTML = user.birthday;
            detailed_area[0].innerHTML = user.area;
            detailed_description[0].innerHTML = user.description;
            upload_description[0].style.display = "none";
            my_edit[0].style.display = "block";
        }
    });

}



var search_button = document.getElementsByClassName('search_button');
var input_search = document.getElementsByClassName('input_search');
var article_detailed = document.getElementsByClassName('article_detailed');
var user_detailed = document.getElementsByClassName('user_detailed');
var search_article = document.getElementsByClassName('search_article');
var user_right = document.getElementsByClassName('user_right');
var follow_detailed = document.getElementsByClassName('follow_detailed');
var fans_detailed = document.getElementsByClassName('fans_detailed');




search_button[0].onclick = function() {
    // 搜索文章
    if (search_article[0].className == "search_article active_line") {
        article_detailed[0].innerHTML = "";
        // 获取搜索文章
        my_search = input_search[0].value;
        ajax({
            url: 'http://175.178.193.182:8080/search/byArticle',
            data: {
                keyWord: my_search
            },
            success: function(result) {
                console.log(result);
                for (let i = 0; i < result.articles.length; i++) {
                    var search_article = document.createElement('div');
                    search_article.className = "search_article";
                    search_article.innerHTML = `<img src="${result.articles[i].images[0]}" class="article_img">
                    <div class="search_article_bottom">
                    <div class="search_article_title">${result.articles[i].title}</div>
                    <div class="search_article_left">
                    <img src="${result.articles[i].avatar}">
                    <div>${result.articles[i].authorName}</div>
                    </div>
                    <div class="search_article_right">${result.articles[i].likes}</div>
                    </div>`
                    article_detailed[0].appendChild(search_article);
                    search_article.onclick = function() {
                        detailed_article({
                                avatar: result.articles[i].avatar,
                                nickname: result.articles[i].authorName
                            },
                            result.articles[i]
                        )
                        var search_main = document.getElementsByClassName('search_main');
                        search_main[0].style.display = "none";
                        var article_enter_return = document.getElementsByClassName('article_enter_return');
                        article_enter_return[0].onclick = function() {
                            search_main[0].style.display = "block";
                            article_enter[0].style.display = "none";
                        }

                    }
                }
            }
        });
    } else {
        // 搜索用户
        user_detailed[0].innerHTML = "";
        // 获取搜索用户
        my_search = input_search[0].value;
        ajax({
            url: 'http://175.178.193.182:8080/search/byUser',
            data: {
                keyWord: my_search
            },
            success: function(result) {
                console.log(result);
                console.log(result.users.length);
                var followerId = [];
                for (let i = 0; i < result.users.length; i++) {

                    var li = document.createElement('li');

                    li.innerHTML = `<div class="user_left">
                    <img src="${result.users[i].avatar}" class="search_avatar">
                    <div>
                    <div class="user_nickname">${result.users[i].nickname}</div>
                <div class="user_description">${result.users[i].description}</div>
                    </div>
                </div>
                <div class="user_right">未关注</div>`
                    user_detailed[0].appendChild(li);
                    followerId[i] = result.users[i].userId;
                    li.onclick = function() {
                        the_person_center({
                            userId: result.users[i].userId,
                            avatar: result.users[i].avatar,
                            authorName: result.users[i].nickname,
                        });
                        search_main[0].style.display = "none";
                        other_person_center[0].style.display = "block";
                        other_person_center_return[0].onclick = function() {
                            search_main[0].style.display = "block";
                            other_person_center[0].style.display = "none";
                        }
                    }


                }
                // 关注，取消关注他人

                var flag = [];
                // 获取我的关注
                ajax({
                    url: 'http://175.178.193.182:8080/user/followerList',
                    data: {
                        userId: user.userId
                    },
                    success: function(result) {

                        console.log(result);
                        for (var i = 0; i < followerId.length; i++) {

                            flag[i] = 1;
                            user_right[i].innerHTML = "未关注";
                            user_right[i].style.backgroundColor = "#fff";
                            user_right[i].style.color = "#e40613";
                            for (var j = 0; j < result.followsList.length; j++) {

                                if (followerId[i] == result.followsList[j].userId) {

                                    user_right[i].innerHTML = "已关注";
                                    user_right[i].style.backgroundColor = "#e40613";
                                    user_right[i].style.color = "#fff";
                                    flag[i] = 0;

                                }
                            }
                        }


                    }
                });
                for (var i = 0; i < user_right.length; i++) {
                    user_right[i].num = i;

                    user_right[i].onclick = function(e) {
                        e.stopPropagation();

                        var index = this.num;
                        if (flag[index]) {
                            user_right[index].innerHTML = "已关注";
                            user_right[index].style.backgroundColor = "#e40613";
                            user_right[index].style.color = "#fff";
                            flag[index] = 0;
                            // 关注他人
                            ajax({
                                type: 'post',
                                url: 'http://175.178.193.182:8080/user/follow',
                                data: {
                                    userId: user.userId,
                                    followerId: followerId[index]
                                },
                                success: function(result) {
                                    console.log(result);

                                }
                            });

                        } else {
                            user_right[index].innerHTML = "未关注";
                            user_right[index].style.backgroundColor = "#fff";
                            user_right[index].style.color = "#e40613";
                            flag[index] = 1;
                            // 取消关注他人
                            ajax({
                                type: 'post',
                                url: 'http://175.178.193.182:8080/user/cancelFollow',
                                data: {
                                    userId: user.userId,
                                    followerId: followerId[index]
                                },
                                success: function(result) {
                                    console.log(result);

                                }
                            });

                        }

                    }
                }

            }
        });

    }
}









//个人中心获赞收藏情况
var icon_homepage = document.getElementsByClassName('icon_homepage');
var icon_my_msg = document.getElementsByClassName('icon_my_msg');
var homepage = document.getElementsByClassName('homepage');
var my_msg = document.getElementsByClassName('my_msg');
var person_center = document.getElementsByClassName('person_center');
var icon_person_center = document.getElementsByClassName('icon_person_center');
var follow_number = document.getElementsByClassName('follow_number');
var fans_number = document.getElementsByClassName('fans_number');
var like_number = document.getElementsByClassName('like_number');
var my_msg_like = document.getElementsByClassName('my_msg_like');


icon_person_center[0].onclick = function() {
    icon_homepage[0].style.color = "darkgray";
    icon_my_msg[0].style.color = "darkgray";
    icon_person_center[0].style.color = "#e40613";
    homepage[0].style.display = "none";
    my_msg[0].style.display = "none";
    person_center[0].style.display = "block";

    // 获取用户完整信息
    ajax({
        url: 'http://175.178.193.182:8080/user/fullInfo',
        data: {
            userId: user.userId
        },
        success: function(result) {
            console.log(result);
            follow_number[0].innerHTML = result.user.follows.length;
            fans_number[0].innerHTML = result.user.fans.length;
            like_number[0].innerHTML = result.user.likedArticles.length + result.user.staredArticles.length;
        },
        error: function(result) {
            console.log(result);
        }
    });

    // 获取关注列表
    ajax({
        url: 'http://175.178.193.182:8080/user/followerList',
        data: {
            userId: user.userId
        },
        success: function(result) {
            console.log(result);
            follow_detailed[0].innerHTML = "";
            for (var i = 0; i < result.followsList.length; i++) {

                var li = document.createElement('li');

                li.innerHTML = `
                <div class="follow_left">
                    <img src="${result.followsList[i].avatar}" class="follow_avatar">
                    <div class="follow_nickname">${result.followsList[i].nickname}</div>
                </div>
        <div class="follow_right">已关注</div>`;
                follow_detailed[0].appendChild(li);


            }
        }
    });

    // //获取粉丝列表
    // ajax({
    //     url: 'http://175.178.193.182:8080/user/fanList',
    //     data: {
    //         userId: user.userId
    //     },
    //     success: function(result) {
    //         console.log(result);
    //         fans_detailed[0].innerHTML = "";
    //         for (var i = 0; i < result.fansList.length; i++) {

    //             var li = document.createElement('li');

    //             li.innerHTML = `
    //             <div class="fans_left">
    //                 <img src="${result.fansList[i].avatar}" class="fans_avatar">
    //                 <div class="fans_nickname">${result.fansList[i].nickname}</div>
    //             </div>
    //     <div class="fans_right">已关注</div>`;
    //             fans_detailed[0].appendChild(li);


    //         }
    //     }
    // });
    // 判断是否互相关注


    // // 查看我的获赞情况
    // var type_liked = document.getElementsByClassName('type_liked');
    // var type_started = document.getElementsByClassName('type_started');
    // var liked_box = document.getElementsByClassName('liked_box');
    // var started_box = document.getElementsByClassName('started_box');
    // ajax({
    //     url: 'http://175.178.193.182:8080/notice/article/like',
    //     data: {
    //         userId: user.userId
    //     },
    //     success: function(liked_result) {
    //         console.log(liked_result);
    //         liked_box[0].innerHTML = "";
    //         for (var i = 0; i < liked_result.like.length; i++) {
    //             var div = document.createElement('div');
    //             div.innerHTML = `
    //                 <img src="${liked_result.like[i].userInfo.avatar}" class="left">
    //                 <div class="like_my_article_left">
    //                     <div class="like_my_article_nickname">${liked_result.like[i].userInfo.nickname}</div>
    //                     <div style="color: #a3a3a3;">赞了你的笔记</div>
    //                 </div>
    //                 <img src="${liked_result.like[i].articleInfo.images[0]}" class="right">`
    //             liked_box[0].appendChild(div);
    //         }

    //     }
    // });

    // // 获取被收藏文章
    // ajax({
    //     url: 'http://175.178.193.182:8080/notice/article/star',
    //     data: {
    //         userId: user.userId
    //     },
    //     success: function(started_result) {
    //         console.log(started_result);
    //         started_box[0].innerHTML = "";
    //         for (var i = 0; i < started_result.star.length; i++) {
    //             var div = document.createElement('div');
    //             div.innerHTML = `
    //         <img src="${started_result.star[i].userInfo.avatar}" class="left">
    //         <div class="star_my_article_left">
    //             <div class="star_my_article_nickname">${started_result.star[i].userInfo.nickname}</div>
    //             <div style="color: #a3a3a3;">收藏了你的笔记</div>
    //         </div>
    //         <img src="${started_result.star[i].articleInfo.images[0]}" class="right">`
    //             started_box[0].appendChild(div);
    //         }

    //     }
    // });





    // 我的文章
    ajax({
        url: 'http://175.178.193.182:8080/article/byAuthor',
        data: {
            authorId: user.userId
        },
        success: function(result) {
            my_node[0].innerHTML = "";
            console.log(result);
            for (let i = 0; i < result.articles.length; i++) {
                var my_article = document.createElement('div');
                my_article.className = "my_article";
                my_article.innerHTML = `<img src="${result.articles[i].images[0]}" class="article_img">
                <div class="my_node_bottom">
                <div class="all_articles_title"><b>${result.articles[i].title}</b></div>
                <div class="article_left">
                <img src="${user.avatar}">
                <div>${user.nickname}</div>
                </div>
                <div class="article_right">${result.articles[i].likes}</div>
                </div>`
                my_node[0].appendChild(my_article);
                var delete_note = document.createElement('div');
                delete_note.className = "delete_note";
                delete_note.innerHTML = `点击删除文章`;
                my_article.appendChild(delete_note);

                // // 点击删除我的文章
                delete_note.onclick = function(e) {
                    e.stopPropagation();
                    console.log(i);
                    ajax({
                        type: 'post',
                        url: 'http://175.178.193.182:8080/article/delete',
                        data: {
                            articleId: result.articles[i].articleId
                        },
                        success: function(result) {
                            console.log(result);
                            my_article.remove();

                        }
                    });
                }
                my_article.onclick = function() {
                    detailed_article({
                        avatar: user.avatar,
                        nickname: user.nickname
                    }, result.articles[i])
                }
            }
        }
    });
    var my_star_article = document.getElementsByClassName('my_star_article');
    // 我收藏的文章
    ajax({
        url: 'http://175.178.193.182:8080/article/getStar',
        data: {
            userId: user.userId
        },
        success: function(result) {
            my_star_article[0].innerHTML = "";
            console.log(result);
            for (let i = 0; i < result.staredArticles.length; i++) {
                var my_article = document.createElement('div');
                my_article.className = "my_article";
                my_article.innerHTML = `<img src="${result.staredArticles[i].images[0]}" class="article_img">
                    <div class="my_node_bottom">
                    <div class="all_articles_title"><b>${result.staredArticles[i].title}</b></div>
                    <div class="article_left">
                    <img src="${result.staredArticles[i].avatar}">
                    <div>${result.staredArticles[i].authorName}</div>
                    </div>
                    <div class="article_right">${result.staredArticles[i].likes}</div>
                    </div>`
                my_star_article[0].appendChild(my_article);
                my_article.onclick = function() {
                    detailed_article({
                            avatar: result.staredArticles[i].avatar,
                            nickname: result.staredArticles[i].authorName
                        },
                        result.staredArticles[i]
                    )
                }
            }
        }
    });

    var my_like_article = document.getElementsByClassName('my_like_article');
    // 我点赞的文章
    ajax({
        url: 'http://175.178.193.182:8080/article/getLike',
        data: {
            userId: user.userId
        },
        success: function(result) {
            my_like_article[0].innerHTML = "";
            console.log(result);
            for (let i = 0; i < result.likedArticles.length; i++) {
                var my_article = document.createElement('div');
                my_article.className = "my_article";
                my_article.innerHTML = `<img src="${result.likedArticles[i].images[0]}" class="article_img">
                    <div class="my_node_bottom">
                    <div class="all_articles_title"><b>${result.likedArticles[i].title}</b></div>
                    <div class="article_left">
                    <img src="${result.likedArticles[i].avatar}">
                    <div>${result.likedArticles[i].authorName}</div>
                    </div>
                    <div class="article_right">${result.likedArticles[i].likes}</div>
                    </div>`
                my_like_article[0].appendChild(my_article);
                my_article.onclick = function() {
                    detailed_article({
                            avatar: result.likedArticles[i].avatar,
                            nickname: result.likedArticles[i].authorName
                        },
                        result.likedArticles[i]
                    )
                }
            }
        }
    });




}


// 点击头像进入他人主页函数封装
function the_person_center(person_info) {

    var other_follow_detailed = document.getElementsByClassName(' other_follow_detailed');
    var other_fans_detailed = document.getElementsByClassName('other_fans_detailed');

    var other_user_avatar = document.getElementsByClassName('other_user_avatar');
    other_user_avatar[0].src = person_info.avatar;
    var other_name = document.getElementsByClassName('other_name');
    other_name[0].innerHTML = person_info.authorName;
    // 获取用户完整信息
    ajax({
        url: 'http://175.178.193.182:8080/user/fullInfo',
        data: {
            userId: person_info.userId
        },
        success: function(person_info_result) {
            other_follow_number[0].innerHTML = person_info_result.user.follows.length;
            other_fans_number[0].innerHTML = person_info_result.user.fans.length;
            other_like_number[0].innerHTML = person_info_result.user.likedArticles.length + person_info_result.user.staredArticles.length;
        }
    });

    // 获取关注列表
    ajax({
        url: 'http://175.178.193.182:8080/user/followerList',
        data: {
            userId: person_info.userId
        },
        success: function(person_info_result) {


            console.log(person_info_result);
            other_follow_detailed[0].innerHTML = "";
            for (var i = 0; i < person_info_result.followsList.length; i++) {

                var li = document.createElement('li');

                li.innerHTML = `
                <div class="other_follow_left">
                    <img src="${person_info_result.followsList[i].avatar}" class="other_follow_avatar">
                    <div class="other_follow_nickname">${person_info_result.followsList[i].nickname}</div>
                </div>
                `;
                other_follow_detailed[0].appendChild(li);
            }
        }
    });

    //获取粉丝列表
    ajax({
        url: 'http://175.178.193.182:8080/user/fanList',
        data: {
            userId: person_info.userId
        },
        success: function(person_info_result) {
            console.log(person_info_result);
            other_fans_detailed[0].innerHTML = "";
            for (var i = 0; i < person_info_result.fansList.length; i++) {

                var li = document.createElement('li');

                li.innerHTML = `
                <div class="other_fans_left">
                    <img src="${person_info_result.fansList[i].avatar}" class="other_fans_avatar">
                    <div class="other_fans_nickname">${person_info_result.fansList[i].nickname}</div>
                </div>
                `;
                other_fans_detailed[0].appendChild(li);



            }
        }
    });
    // 查看获赞情况
    var type_liked = document.getElementsByClassName('type_liked');
    var type_started = document.getElementsByClassName('type_started');
    var other_liked_box = document.getElementsByClassName('other_liked_box');
    var other_started_box = document.getElementsByClassName('other_started_box');
    ajax({
        url: 'http://175.178.193.182:8080/notice/article/like',
        data: {
            userId: person_info.userId
        },
        success: function(liked_result) {
            console.log(liked_result);
            other_liked_box[0].innerHTML = "";
            for (var i = 0; i < liked_result.like.length; i++) {
                var div = document.createElement('div');
                div.innerHTML = `
                    <img src="${liked_result.like[i].userInfo.avatar}" class="left">
                    <div class="like_other_article_left">
                        <div class="like_other_article_nickname">${liked_result.like[i].userInfo.nickname}</div>
                        <div style="color: #a3a3a3;">赞了他的笔记</div>
                    </div>
                    <img src="${liked_result.like[i].articleInfo.images[0]}" class="right">`
                other_liked_box[0].appendChild(div);
            }

        }
    });

    // 获取被收藏文章
    ajax({
        url: 'http://175.178.193.182:8080/notice/article/star',
        data: {
            userId: person_info.userId
        },
        success: function(started_result) {
            console.log(started_result);
            other_started_box[0].innerHTML = "";
            for (var i = 0; i < started_result.star.length; i++) {
                var div = document.createElement('div');
                div.innerHTML = `
            <img src="${started_result.star[i].userInfo.avatar}" class="left">
            <div class="star_other_article_left">
                <div class="star_other_article_nickname">${started_result.star[i].userInfo.nickname}</div>
                <div style="color: #a3a3a3;">收藏了他的笔记</div>
            </div>
            <img src="${started_result.star[i].articleInfo.images[0]}" class="right">`
                other_started_box[0].appendChild(div);
            }

        }
    });

    // 他人的文章
    ajax({
        url: 'http://175.178.193.182:8080/article/byAuthor',
        data: {
            authorId: person_info.userId
        },
        success: function(result) {
            other_node[0].innerHTML = "";
            console.log(result);
            for (let i = 0; i < result.articles.length; i++) {
                var other_article = document.createElement('div');
                other_article.className = "other_article";
                other_article.innerHTML = `<img src="${result.articles[i].images[0]}" class="other_article_img">
                <div class="other_node_bottom">
                <div class="all_articles_title"><b>${result.articles[i].title}</b></div>
                <div class="other_article_left">
                <img src="${person_info.avatar}">
                <div>${person_info.authorName}</div>
                </div>
                <div class="other_article_right">${result.articles[i].likes}</div>
                </div>`
                other_node[0].appendChild(other_article);
                other_article.onclick = function() {
                    detailed_article({
                        avatar: person_info.avatar,
                        nickname: person_info.authorName
                    }, result.articles[i]);
                    other_person_center[0].style.display = "none";
                    article_enter_return[0].onclick = function() {
                        other_person_center[0].style.display = "block";
                        article_enter[0].style.display = "none";

                    }
                }
            }
        }
    });

    // 他人收藏的文章
    var other_star_article = document.getElementsByClassName('other_star_article');
    ajax({
        url: 'http://175.178.193.182:8080/article/getStar',
        data: {
            userId: person_info.userId
        },
        success: function(result) {
            other_star_article[0].innerHTML = "";
            console.log(result);
            for (let i = 0; i < result.staredArticles.length; i++) {
                var other_article = document.createElement('div');
                other_article.className = "other_article";
                other_article.innerHTML = `<img src="${result.staredArticles[i].images[0]}" class="other_article_img">
                    <div class="other_node_bottom">
                    <div class="all_articles_title"><b>${result.staredArticles[i].title}</b></div>
                    <div class="other_article_left">
                    <img src="${result.staredArticles[i].avatar}">
                    <div>${result.staredArticles[i].authorName}</div>
                    </div>
                    <div class="other_article_right">${result.staredArticles[i].likes}</div>
                    </div>`
                other_star_article[0].appendChild(other_article);
                other_article.onclick = function() {
                    detailed_article({
                        avatar: result.staredArticles[i].avatar,
                        nickname: result.staredArticles[i].authorName
                    }, result.staredArticles[i]);
                    other_person_center[0].style.display = "none";
                    article_enter_return[0].onclick = function() {
                        other_person_center[0].style.display = "block";
                        article_enter[0].style.display = "none";

                    }
                }
            }
        }
    });

    var other_like_article = document.getElementsByClassName('other_like_article');
    // 他人点赞的文章
    ajax({
        url: 'http://175.178.193.182:8080/article/getLike',
        data: {
            userId: person_info.userId
        },
        success: function(result) {
            other_like_article[0].innerHTML = "";
            console.log(result);
            for (let i = 0; i < result.likedArticles.length; i++) {
                var other_article = document.createElement('div');
                other_article.className = "other_article";
                other_article.innerHTML = `<img src="${result.likedArticles[i].images[0]}" class="other_article_img">
                    <div class="other_node_bottom">
                    <div class="all_articles_title"><b>${result.likedArticles[i].title}</b></div>
                    <div class="other_article_left">
                    <img src="${result.likedArticles[i].avatar}">
                    <div>${result.likedArticles[i].authorName}</div>
                    </div>
                    <div class="other_article_right">${result.likedArticles[i].likes}</div>
                    </div>`
                other_like_article[0].appendChild(other_article);

                other_article.onclick = function() {
                    detailed_article({
                        avatar: result.likedArticles[i].avatar,
                        nickname: result.likedArticles[i].authorName
                    }, result.likedArticles[i]);
                    other_person_center[0].style.display = "none";
                    article_enter_return[0].onclick = function() {
                        other_person_center[0].style.display = "block";
                        article_enter[0].style.display = "none";

                    }
                }
            }
        }
    });



}




// 点击文章进入文章详情页函数封装

function detailed_article(author, article) {
    article_enter[0].style.display = "block";
    main[0].style.display = "none";
    article_author_avatar[0].src = author.avatar;
    // 点击头像进入他人主页
    article_author_avatar[0].onclick = function() {
        the_person_center({
            userId: article.authorId,
            avatar: author.avatar,
            authorName: author.nickname
        });
        other_person_center[0].style.display = "block";
        article_enter[0].style.display = "none";
    }
    article_enter_authorName[0].innerHTML = author.nickname;
    // 文章图片
    article_images_box[0].innerHTML = "";
    span_box[0].innerHTML = "";
    article_images_box[0].style.transform = "translate(0,0)";
    for (let j = 0; j < article.images.length; j++) {
        var img = document.createElement('img');
        img.src = article.images[j];
        article_images_box[0].appendChild(img);
        var span = document.createElement('span');
        span.setAttribute('index', j);
        span_box[0].appendChild(span);
        span.addEventListener('click', function() {
            // 排他思想
            for (var num = 0; num < span_box[0].children.length; num++) {
                span_box[0].children[num].style.backgroundColor = "#a3a3a3";
            }
            var index = this.getAttribute('index');
            var currentLeft = span_box[0].offsetLeft - 400 * index;
            // 点击小圆点颜色改变
            span_box[0].children[index].style.backgroundColor = "#e40613";
            article_images_box[0].style.transform = "translate(" + currentLeft + "px,0)";
        })


    }
    article_enter_title[0].innerHTML = article.title;
    article_enter_content[0].innerHTML = article.content;
    article_enter_tag[0].innerHTML = '#' + article.tags[0];
    article_enter_postDate[0].innerHTML = article.postDate.slice(5, 10);
    article_enter_my_avatar[0].src = author.avatar;
    like_bottom[0].innerHTML = article.likes;
    star_bottom[0].innerHTML = article.stars;
    all_review[0].innerHTML = article.reviews;
    // 获取文章评论
    ajax({
        url: 'http://175.178.193.182:8080/review/byArticle',
        data: {
            articleId: article.articleId,
            pages: 0
        },
        success: function(all_reviews) {
            console.log(all_reviews);
            review_num[0].innerHTML = `共${article.reviews}条评论`;
            // 获取评论信息
            detailed_reviews[0].innerHTML = "";
            // 一级评论

            for (let i = 0; i < all_reviews.reviews.length; i++) {
                ajax({
                    url: 'http://175.178.193.182:8080/user/fullInfo',
                    data: {
                        userId: all_reviews.reviews[i].authorId
                    },
                    success: function(reviews_info) {
                        var li = document.createElement('li');
                        li.className = "first_review";
                        li.innerHTML = ` 
                            <div class="first_review_box">
                                <div class="first_review_nickname">${reviews_info.user.nickname}</div>
                                <div class="first_review_content">${all_reviews.reviews[i].content}</div>
                                <div class="first_review_postDate">${all_reviews.reviews[i].postDate.slice(5, 10)}</div>
                            </div>
                            `
                        detailed_reviews[0].appendChild(li);
                        var first_review_like = document.createElement('first_review_like');
                        first_review_like.className = "first_review_like";
                        first_review_like.innerHTML = `<div class="first_review_like">${all_reviews.reviews[i].likes}</div>`;
                        li.appendChild(first_review_like);
                        var first_review_avatar = document.createElement('img');
                        first_review_avatar.className = "first_review_avatar";
                        first_review_avatar.src = `${reviews_info.user.avatar}`;
                        li.insertBefore(first_review_avatar, li.children[0]);

                        // 点击头像进入他人主页
                        first_review_avatar.onclick = function(e) {
                            e.stopPropagation();
                            the_person_center({
                                userId: all_reviews.reviews[i].authorId,
                                avatar: reviews_info.user.avatar,
                                authorName: reviews_info.user.nickname
                            });
                            other_person_center[0].style.display = "block";
                            article_enter[0].style.display = "none";

                        }


                        // 删除我的一级评论
                        // 判断是否是我的文章和评论
                        if (article.authorId == user.userId || all_reviews.reviews[i].authorId == user.userId) {
                            var delete_first = document.createElement('div');
                            delete_first.innerHTML = `<a href="javascript:;" id="delete_first">点击删除评论</a>`;
                            li.appendChild(delete_first);
                            delete_first.onclick = function(e) {
                                e.stopPropagation();
                                ajax({
                                    type: 'post',
                                    url: 'http://175.178.193.182:8080/review/delete',
                                    data: {
                                        reviewId: all_reviews.reviews[i].reviewId
                                    },
                                    success: function(delete_result) {
                                        console.log(delete_result);
                                        li.remove();

                                    }
                                });
                            }
                        }

                        // 喜欢评论
                        var like_first_comment_flag = 1;
                        first_review_like.onclick = function(e) {
                            e.stopPropagation();
                            // console.log(all_reviews.reviews[i].authorId);
                            if (like_first_comment_flag) {
                                ajax({
                                    type: 'post',
                                    url: 'http://175.178.193.182:8080/review/like',
                                    data: {
                                        userId: user.userId,
                                        reviewId: all_reviews.reviews[i].reviewId
                                    },
                                    success: function(like_first_comment) {
                                        console.log(like_first_comment);
                                        like_first_comment_flag = 0;
                                    }
                                });
                            } else {
                                ajax({
                                    type: 'post',
                                    url: 'http://175.178.193.182:8080/review/unlike',
                                    data: {
                                        userId: user.userId,
                                        reviewId: all_reviews.reviews[i].reviewId
                                    },
                                    success: function(like_first_comment) {
                                        console.log(like_first_comment);
                                        like_first_comment_flag = 1;
                                    }
                                });
                            }
                        }

                        // 回复他人评论
                        li.onclick = function() {
                            reply_comment[0].style.display = "block";
                            input_reply_comment.placeholder = `回复 ${reviews_info.user.nickname}:`;
                            send_reply_comment[0].onclick = function() {
                                ajax({
                                    type: 'post',
                                    url: 'http://175.178.193.182:8080/review',
                                    data: {
                                        replyToUserId: all_reviews.reviews[i].authorId,
                                        replyToArticleId: article.articleId,
                                        parentReviewId: all_reviews.reviews[i].reviewId,
                                        authorId: user.userId,
                                        content: input_reply_comment.value
                                    },
                                    success: function(result) {
                                        console.log(result);
                                        reply_comment[0].style.display = "none";
                                        input_reply_comment.value = "";
                                    }
                                });
                                var li_second = document.createElement('li');
                                li_second.innerHTML = ` <img src="${user.avatar}" class="second_review_avatar">
                                            <div class="second_review_box">
                                                <div class="second_review_nickname">${user.nickname}</div>
                                                <div class="second_review_content">${input_reply_comment.value}</div>
                                                <div class="second_review_postDate"></div>
                                            </div>
                                            <div class="second_review_like">0</div>
                                            <a href="javascript:;" id="delete_second">点击删除评论</a>`
                                li.appendChild(li_second);
                            }
                        }
                        cancle_reply[0].onclick = function() {
                            reply_comment[0].style.display = "none";
                        }



                        // 二级评论
                        for (let k = 0; k < all_reviews.reviews[i].reviewList.length; k++) {

                            ajax({
                                url: 'http://175.178.193.182:8080/user/fullInfo',
                                data: {
                                    userId: all_reviews.reviews[i].reviewList[k].authorId
                                },
                                success: function(second_review) {

                                    var li_second = document.createElement('li');
                                    li_second.innerHTML = ` 
                                        <div class="second_review_box">
                                            <div class="second_review_nickname">${second_review.user.nickname}</div>
                                            <div class="second_review_content">${all_reviews.reviews[i].reviewList[k].content}</div>
                                            <div class="second_review_postDate">${all_reviews.reviews[i].reviewList[k].postDate.slice(5, 10)}</div>
                                        </div>
                                       `
                                    li.appendChild(li_second);
                                    var second_review_like = document.createElement('div');
                                    second_review_like.innerHTML = `<div class="second_review_like">${all_reviews.reviews[i].reviewList[k].likes}</div>`;
                                    li_second.appendChild(second_review_like);

                                    var second_review_avatar = document.createElement('img');
                                    second_review_avatar.className = "second_review_avatar";
                                    second_review_avatar.src = `${second_review.user.avatar}`;
                                    li_second.insertBefore(second_review_avatar, li_second.children[0]);
                                    // 点击头像进入他人主页
                                    second_review_avatar.onclick = function(e) {
                                        e.stopPropagation();
                                        the_person_center({
                                            userId: all_reviews.reviews[i].reviewList[k].authorId,
                                            avatar: second_review.user.avatar,
                                            authorName: second_review.user.nickname
                                        });
                                        other_person_center[0].style.display = "block";
                                        article_enter[0].style.display = "none";

                                    }

                                    // 删除我的二级评论
                                    // 判断是否是我的文章和评论
                                    if (article.authorId == user.userId || all_reviews.reviews[i].reviewList[k].authorId == user.userId) {
                                        var delete_second = document.createElement('div');
                                        delete_second.innerHTML = `<a href="javascript:;" id="delete_second">点击删除评论</a>`;
                                        li.appendChild(delete_second);
                                        // 开始
                                        delete_second.onclick = function(e) {
                                                e.stopPropagation();
                                                ajax({
                                                    type: 'post',
                                                    url: 'http://175.178.193.182:8080/review/delete',
                                                    data: {
                                                        reviewId: all_reviews.reviews[i].reviewList[k].reviewId
                                                    },
                                                    success: function(delete_result) {
                                                        console.log(delete_result);
                                                        li_second.remove();
                                                        delete_second.remove();

                                                    }
                                                });
                                            }
                                            // 结束
                                    }

                                    // 喜欢二级评论
                                    var like_second_comment_flag = 1;
                                    second_review_like.onclick = function(e) {
                                        e.stopPropagation();
                                        if (like_second_comment_flag) {
                                            ajax({
                                                type: 'post',
                                                url: 'http://175.178.193.182:8080/review/like',
                                                data: {
                                                    userId: user.userId,
                                                    reviewId: all_reviews.reviews[i].reviewList[k].reviewId
                                                },
                                                success: function(like_second_comment) {
                                                    console.log(all_reviews.reviews[i].reviewList[k].reviewId);
                                                    console.log(like_second_comment);
                                                    like_second_comment_flag = 0;
                                                }
                                            });
                                        } else {
                                            ajax({
                                                type: 'post',
                                                url: 'http://175.178.193.182:8080/review/unlike',
                                                data: {
                                                    userId: user.userId,
                                                    reviewId: all_reviews.reviews[i].reviewList[k].reviewId
                                                },
                                                success: function(like_second_comment) {
                                                    console.log(all_reviews.reviews[i].reviewList[k].reviewId);
                                                    console.log(like_second_comment);
                                                    like_second_comment_flag = 1;
                                                }
                                            });
                                        }
                                    }


                                }
                            });


                        }
                    }
                });

            }


        }
    });
    // 发表文章评论
    say_something[0].onclick = function() {
        write_my_review[0].style.display = "block";
    }
    review_bottom[0].onclick = function() {
        write_my_review[0].style.display = "block";
    }
    cancle_send[0].onclick = function() {
        write_my_review[0].style.display = "none";
    }
    send_my_review[0].onclick = function() {
        ajax({
            type: 'post',
            url: 'http://175.178.193.182:8080/review',
            data: {
                replyToUserId: article.authorId,
                replyToArticleId: article.articleId,
                authorId: user.userId,
                content: input_my_review.value
            },
            success: function(result) {
                console.log(result);
                write_my_review[0].style.display = "none";
                var li = document.createElement('li');
                li.innerHTML = ` <img src="${user.avatar}" class="first_review_avatar">
                        <div class="first_review_box">
                            <div class="first_review_nickname">${user.nickname}</div>
                            <div class="first_review_content">${input_my_review.value}</div>
                            <div class="first_review_postDate"></div>
                        </div>
                        <div class="first_review_like">0</div>
                        <a href="javascript:;" id="delete_first">点击删除评论</a>`

                detailed_reviews[0].appendChild(li);
                input_my_review.value = "";
            }
        });
    }






}













my_msg_like[0].onclick = function() {
    main[0].style.display = "none";
    my_like[0].style.display = "block";
}








// 退出登录
var icon_logout = document.getElementsByClassName('icon_logout');
var logout = document.getElementsByClassName('logout');
var cancle_logout = document.getElementsByClassName('cancle_logout');
var sure_logout = document.getElementsByClassName('sure_logout');
icon_logout[0].onclick = function() {
    logout[0].style.display = "block";
    cancle_logout[0].onclick = function() {
        logout[0].style.display = "none";
    }
    sure_logout[0].onclick = function() {

        ajax({
            type: 'post',
            url: 'http://175.178.193.182:8080/logout',
            data: {
                userId: user.userId
            },
            success: function(result) {
                console.log(result);
                logout[0].style.display = "none";
                login_box.style.display = "block";
                main[0].style.display = "none";

            },
            error: function(result) {
                console.log(result);
            }
        });
    }
}

// 上传头像
var my_avatar = document.getElementById('my_avatar');
var avatar_box = document.getElementById('avatar_box');
my_avatar.onchange = function() {
    // 创建空的FormData表单对象

    var formData = new FormData();
    // 将用户选择文件追加到fromData表单对象中

    formData.append('image', this.files[0]);
    // 创建Ajax对象
    var xhr = new XMLHttpRequest();
    // 对ajax对象进行配置
    xhr.open('post', 'http://175.178.193.182:8080/upload/image');
    // 发送ajax请求
    xhr.send(formData);
    // 监听服务器端响应给客户端的数据
    xhr.onload = function() {
        // 如果服务器端返回的http码类型为200
        // 说明请求成功
        if (xhr.status == 200) {
            // 将服务器端返回的数据显示在控制台中
            var msg = JSON.parse(xhr.responseText);
            var img = document.createElement('img');
            img.src = msg['url'];
            edit_my_avatar[0].src = msg['url'];
            img.onload = function() {
                avatar_box.appendChild(img);
            }
            var avatar = new FormData();
            // 将用户选择文件追加到fromData表单对象中
            formData.append('userId', user.userId);
            formData.append('avatar', my_avatar.files[0]);
            // 创建Ajax对象
            var xhr2 = new XMLHttpRequest();
            // 对ajax对象进行配置
            xhr2.open('post', 'http://175.178.193.182:8080/user/upload');
            // 发送ajax请求
            xhr2.send(formData);
            // 监听服务器端响应给客户端的数据
            xhr2.onload = function() {
                // 如果服务器端返回的http码类型为200
                // 说明请求成功
                if (xhr2.status == 200) {
                    // 将服务器端返回的数据显示在控制台中
                    console.log(xhr2.responseText);

                }
            }
        }
    }


}



// 发布文章
var upload_my_node = document.getElementsByClassName('upload_my_node');
var my_title = document.getElementsByClassName('my_title');
var my_content = document.getElementById('my_content');
var my_tag = document.getElementsByClassName('my_tag');
var article_tag = document.getElementsByClassName('article_tag');
var my_node = document.getElementsByClassName('my_node');
var my_node_bottom = document.getElementsByClassName('my_node_bottom');
var pic_upload = document.getElementsByClassName('pic_upload');
var article_pic = document.getElementsByClassName('article_pic');
var add_pic = document.getElementsByClassName('add_pic');
var my_add_pic = document.getElementsByClassName('my_add_pic');
var box = document.getElementById('box');
var images = [];
var index = 0;
if (index >= 0) {
    upload_images(index);
}
// 为文件选择控件添加onchanges事件
// 在用户选择文件时触发
function upload_images(index) {
    pic_upload[0].onchange = function() {
        // 创建空的FormData表单对象
        var formData = new FormData();
        // 将用户选择文件追加到fromData表单对象中
        for (let i = 0; i < this.files.length; i++) {
            formData.append('image', this.files[i]);
        }
        // 创建Ajax对象
        var xhr = new XMLHttpRequest();
        // 对ajax对象进行配置
        xhr.open('post', 'http://175.178.193.182:8080/upload/image');
        // 发送ajax请求
        xhr.send(formData);
        // 监听服务器端响应给客户端的数据
        xhr.onload = function() {
            // 如果服务器端返回的http码类型为200
            // 说明请求成功
            if (xhr.status == 200) {
                // 将服务器端返回的数据显示在控制台中
                var msg = JSON.parse(xhr.responseText);

                // images[index] = msg['url'];
                images.push(msg['url']);
                var article_pic = document.createElement('img');
                article_pic.className = "article_pic";
                article_pic.src = images[index];
                my_add_pic[index].appendChild(article_pic);
                if (index < 3) {
                    var div = document.createElement('div');
                    div.innerHTML = `<div class="my_add_pic">
                    </div>`
                    add_pic[0].appendChild(div);
                }
                index++;
                pic_upload[0].style.left = 95 * index + 'px';
            }
        }


    }
}



upload_my_node[0].onclick = function() {
    console.log(images);
    ajax({
        type: 'post',
        url: 'http://175.178.193.182:8080/article',
        data: {
            userId: user.userId,
            title: my_title[0].value,
            content: my_content.value,
            tags: article_tag[0].value,
            images: images
        },
        success: function(result) {
            console.log(result);
            main[0].style.display = "block";
            upload_article[0].style.display = "none";
            my_title[0].value = "";
            my_content.value = "";
            article_tag[0].value = "";
            add_pic[0].innerHTML = `<div>
            <div class="my_add_pic">
                <input type="file" class="pic_upload">
            </div>
        </div>`

        }
    });
}




// 结束


// // 删除文章
// ajax({
//     type: 'post',
//     url: 'http://175.178.193.182:8080/article/delete',
//     data: {
//         articleId: 276
//     },
//     success: function(result) {
//         console.log(result);
//     }
// });







// var article = document.createElement('div');
//             article.innerHTML = `<div>${my_title[0].value}</div>
//             <div>${user.nickname}</div>`
//             my_node_bottom[0].appendChild(article);



// ajax({
//     url: 'http://175.178.193.182:8080/article/getHomePage',
//     success: function(result) {
//         console.log(result);
//     }
// });








// ajax函数封装
function ajax(options) {
    //存储默认值
    var defaults = {
        type: 'get',
        url: '',
        data: {},
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success: function() {},
        error: function() {}
    };
    //使用options对象中的属性覆盖defaults对象中的属性
    Object.assign(defaults, options);
    //创建ajax对象
    var xhr = new XMLHttpRequest();
    var params = '';
    //循环用户传递的对象格式参数
    for (var attr in defaults.data) {
        params += attr + '=' + defaults.data[attr] + '&';
    }
    //截取参数最后的&
    params = params.slice(0, params.length - 1);
    if (defaults.type == 'get') {
        defaults.url = defaults.url + '?' + params;
    }
    //配置ajax对象
    xhr.open(defaults.type, defaults.url);
    //发送请求

    //如果请求方式为post
    if (defaults.type == 'post') {
        var contentType = defaults.header["Content-Type"];
        xhr.setRequestHeader('Content-Type', contentType);

        if (contentType == 'application/json') {
            xhr.send(JSON.stringify(defaults.data));
        } else {
            xhr.send(params);
        }
    } else {
        xhr.send();
    }
    //监听xhr对象下面的onload事件
    //当xhr对象接收完响应疏浚后触发
    xhr.onload = function() {

        var contentType = xhr.getResponseHeader('Content-Type');
        //服务器返回的数据
        var responseText = xhr.responseText;
        if (contentType.includes('application/json')) {
            //将json字符串转换为json对象
            responseText = JSON.parse(responseText);
        }
        if (xhr.status >= 200 && xhr.status < 300) {
            defaults.success(responseText);
        } else {
            defaults.error(responseText);
        }
    }

    // xhr.timeout = 2000;
    // xhr.ontimeout = function() {
    //         alert('你的网络不太好哦');
    //     }
    //     // 网络中断触发onerror事件
    // xhr.onerror = function() {
    //     alert('网络出问题啦');
    // }
}