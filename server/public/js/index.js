// 获取不同的tag切换页面
var main = document.getElementsByClassName('main');
var icon_homepage = document.getElementsByClassName('icon_homepage');
var icon_my_msg = document.getElementsByClassName('icon_my_msg');
var icon_person_center = document.getElementsByClassName('icon_person_center');
var homepage = document.getElementsByClassName('homepage');
var my_msg = document.getElementsByClassName('my_msg');
var person_center = document.getElementsByClassName('person_center');
var add = document.getElementsByClassName('add');
var search = document.getElementsByClassName('search');
var search_main = document.getElementsByClassName('search_main');
var search_article = document.getElementsByClassName('search_article');
var search_user = document.getElementsByClassName('search_user');
var search_button = document.getElementsByClassName('search_button');

// 点击三个tag切换页面
icon_homepage[0].onclick = function() {
    icon_homepage[0].style.color = "#e40613";
    icon_my_msg[0].style.color = "darkgray";
    icon_person_center[0].style.color = "darkgray";
    homepage[0].style.display = "block";
    my_msg[0].style.display = "none";
    person_center[0].style.display = "none";
}



// icon_person_center[0].onclick = function() {
//     icon_homepage[0].style.color = "darkgray";
//     icon_my_msg[0].style.color = "darkgray";
//     icon_person_center[0].style.color = "#e40613";
//     homepage[0].style.display = "none";
//     my_msg[0].style.display = "none";
//     person_center[0].style.display = "block";


// }

// 点击加号进入发表文章页面
var add = document.getElementsByClassName('add');
var upload_article = document.getElementsByClassName('upload_article');
var my_tag = document.getElementsByClassName('my_tag');
var my_tag_box = document.getElementsByClassName('my_tag_box');
var article_tag = document.getElementsByClassName('article_tag');
var tag_cancle = document.getElementsByClassName('tag_cancle');
var tag_sure = document.getElementsByClassName('tag_sure');
add[0].onclick = function() {
        main[0].style.display = "none";
        upload_article[0].style.display = "block";
        my_tag[0].onclick = function() {
            my_tag_box[0].style.display = "block";
        }
        tag_cancle[0].onclick = function() {
            my_tag_box[0].style.display = "none";
            article_tag[0].value = "";
        }
        tag_sure[0].onclick = function() {
            my_tag_box[0].style.display = "none";
        }
    }
    // 点击返回首页
var upload_article_return = document.getElementsByClassName('upload_article_return');
upload_article_return[0].onclick = function() {
    main[0].style.display = "block";
    upload_article[0].style.display = "none";
}


// 点击搜索进入搜索页面
search[0].onclick = function() {
    main[0].style.display = 'none';
    search_main[0].style.display = 'block';
}

search_article[0].onclick = function() {
    search_article[0].className = "search_article active_line";
    search_user[0].className = "search_user";
    article_detailed[0].style.display = "block";
    user_detailed[0].style.display = "none";
}

search_user[0].onclick = function() {
    search_user[0].className = "search_user active_line";
    search_article[0].className = "search_article";
    article_detailed[0].style.display = "none";
    user_detailed[0].style.display = "block";
}

// 点击返回
var search_return = document.getElementsByClassName('search_return');
search_return[0].onclick = function() {
    main[0].style.display = 'block';
    search_main[0].style.display = 'none';
}



// 点击标签切换不同类型文章
var tag = document.getElementsByClassName('tag');
var articles = document.getElementsByClassName('articles');
for (var i = 0; i < tag.length; i++) {
    tag[i].index = i;
    tag[i].onclick = function() {
        for (var i = 0; i < tag.length; i++) {
            tag[i].className = "tag";
            articles[i].style.display = "none";
        }
        var index = this.index;
        tag[index].className = "tag active_line";
        articles[index].style.display = "block";
    }
}

// 文章详情页返回
var article_enter = document.getElementsByClassName('article_enter');
var article_enter_return = document.getElementsByClassName('article_enter_return');
article_enter_return[0].onclick = function() {
    main[0].style.display = "block";
    article_enter[0].style.display = "none";
}