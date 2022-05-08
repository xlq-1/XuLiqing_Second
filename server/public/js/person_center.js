// 获取我的关注
var follow_box = document.getElementsByClassName('follow_box');
var follow_person = document.getElementsByClassName('follow_person');
var follow_return = document.getElementsByClassName('follow_return');
var main = document.getElementsByClassName('main');
var article_enter = document.getElementsByClassName('article_enter');
var other_person_center = document.getElementsByClassName('other_person_center');
follow_box[0].onclick = function() {
    follow_person[0].style.display = "block";
    main[0].style.display = "none";
}
follow_return[0].onclick = function() {
    follow_person[0].style.display = "none";
    main[0].style.display = "block";
}

// 获取他人的关注
var other_follow_box = document.getElementsByClassName('other_follow_box');
var other_follow_person = document.getElementsByClassName('other_follow_person');
var other_follow_return = document.getElementsByClassName('other_follow_return');
other_follow_box[0].onclick = function() {
    other_follow_person[0].style.display = "block";
    other_person_center[0].style.display = "none";
}
other_follow_return[0].onclick = function() {
    other_follow_person[0].style.display = "none";
    other_person_center[0].style.display = "block";
}

// 获取我的粉丝
var fans_box = document.getElementsByClassName('fans_box');
var fans_person = document.getElementsByClassName('fans_person');
var fans_return = document.getElementsByClassName('fans_return');
fans_box[0].onclick = function() {
    fans_person[0].style.display = "block";
    main[0].style.display = "none";
}
fans_return[0].onclick = function() {
    fans_person[0].style.display = "none";
    main[0].style.display = "block"
}

// 获取他人的粉丝
var other_fans_box = document.getElementsByClassName('other_fans_box');
var other_fans_person = document.getElementsByClassName('other_fans_person');
var other_fans_return = document.getElementsByClassName('other_fans_return');
other_fans_box[0].onclick = function() {
    other_fans_person[0].style.display = "block";
    other_person_center[0].style.display = "none";
}
other_fans_return[0].onclick = function() {
    other_fans_person[0].style.display = "none";
    other_person_center[0].style.display = "block"
}


// 获取我获赞和收藏
var like_box = document.getElementsByClassName('like_box');
var my_like = document.getElementsByClassName('my_like');
var like_return = document.getElementsByClassName('like_return');
var type_liked = document.getElementsByClassName('type_liked');
var type_started = document.getElementsByClassName('type_started');
var liked_box = document.getElementsByClassName('liked_box');
var started_box = document.getElementsByClassName('started_box');


like_box[0].onclick = function() {
    my_like[0].style.display = "block";
    main[0].style.display = "none";
}
like_return[0].onclick = function() {
    my_like[0].style.display = "none";
    main[0].style.display = "block";
}
type_liked[0].onclick = function() {
    type_liked[0].className = "type_liked active_line";
    type_started[0].className = "type_started";
    liked_box[0].style.display = "block";
    started_box[0].style.display = "none";
}
type_started[0].onclick = function() {
    type_liked[0].className = "type_liked";
    type_started[0].className = "type_started active_line";
    liked_box[0].style.display = "none";
    started_box[0].style.display = "block";
}


// 获取他人的获赞和收藏
var other_like_box = document.getElementsByClassName('other_like_box');
var other_like = document.getElementsByClassName('other_like');
var other_like_return = document.getElementsByClassName('other_like_return');
var other_type_liked = document.getElementsByClassName('other_type_liked');
var other_type_started = document.getElementsByClassName('other_type_started');
var other_liked_box = document.getElementsByClassName('other_liked_box');
var other_started_box = document.getElementsByClassName('other_started_box');


other_like_box[0].onclick = function() {
    other_like[0].style.display = "block";
    other_person_center[0].style.display = "none";
}
other_like_return[0].onclick = function() {
    other_like[0].style.display = "none";
    other_person_center[0].style.display = "block";
}
other_type_liked[0].onclick = function() {
    other_type_liked[0].className = "other_type_liked active_line";
    other_type_started[0].className = "other_type_started";
    other_liked_box[0].style.display = "block";
    other_started_box[0].style.display = "none";
}
other_type_started[0].onclick = function() {
    other_type_liked[0].className = "other_type_liked";
    other_type_started[0].className = "other_type_started active_line";
    other_liked_box[0].style.display = "none";
    other_started_box[0].style.display = "block";
}


// 退出他人主页

var other_person_center_return = document.getElementsByClassName('other_person_center_return');
var article_enter = document.getElementsByClassName('article_enter');
other_person_center_return[0].onclick = function() {
    other_person_center[0].style.display = "none";
    article_enter[0].style.display = "block";
}




// 获取我的编辑资料列表
var edit = document.getElementsByClassName('edit');
var my_edit = document.getElementsByClassName('my_edit');
edit[0].onclick = function() {
    my_edit[0].style.display = "block";
    main[0].style.display = "none";
}


// 点击修改昵称

var information_name = document.getElementsByClassName('information_name');
var upload_name = document.getElementsByClassName('upload_name');
information_name[0].onclick = function() {
    my_edit[0].style.display = "none";
    upload_name[0].style.display = "block";
}

// 点击修改性别

var information_gender = document.getElementsByClassName('information_gender');
var upload_gender = document.getElementsByClassName('upload_gender');
information_gender[0].onclick = function() {
    my_edit[0].style.display = "none";
    upload_gender[0].style.display = "block";
}

// 点击修改生日

var information_birthday = document.getElementsByClassName('information_birthday');
var upload_birthday = document.getElementsByClassName('upload_birthday');
information_birthday[0].onclick = function() {
    my_edit[0].style.display = "none";
    upload_birthday[0].style.display = "block";
}

// 点击修改地区

var information_area = document.getElementsByClassName('information_area');
var upload_area = document.getElementsByClassName('upload_area');
information_area[0].onclick = function() {
    my_edit[0].style.display = "none";
    upload_area[0].style.display = "block";
}


// 点击修改简介

var information_description = document.getElementsByClassName('information_description');
var upload_description = document.getElementsByClassName('upload_description');
information_description[0].onclick = function() {
    my_edit[0].style.display = "none";
    upload_description[0].style.display = "block";
}

// 点击取消返回编辑资料列表
var cancel = document.getElementsByClassName('cancel');
var upload = document.getElementsByClassName('upload');
var num = 0;
for (var i = 0; i < cancel.length; i++) {
    cancel[i].num = i;
    cancel[i].onclick = function() {
        var index = this.num;
        upload[index].style.display = "none";
        my_edit[0].style.display = "block";

    }
}


// 编辑资料表返回按钮
var my_edit_return = document.getElementsByClassName('my_edit_return');
my_edit_return[0].onclick = function() {
    my_edit[0].style.display = "none";
    main[0].style.display = "block";
}


// 切换笔记收藏点赞页面
var note = document.getElementsByClassName('note');
var collect = document.getElementsByClassName('collect');
var liked = document.getElementsByClassName('liked');
var my_node = document.getElementsByClassName('my_node');
var my_star_article = document.getElementsByClassName('my_star_article');
var my_like_article = document.getElementsByClassName('my_like_article');
note[0].onclick = function() {
    note[0].className = "note active_line";
    collect[0].className = "collect";
    liked[0].className = "liked";
    my_node[0].style.display = "block";
    my_star_article[0].style.display = "none";
    my_like_article[0].style.display = "none";

}
collect[0].onclick = function() {
    note[0].className = "note";
    collect[0].className = "collect active_line";
    liked[0].className = "liked";
    my_node[0].style.display = "none";
    my_star_article[0].style.display = "block";
    my_like_article[0].style.display = "none";
}
liked[0].onclick = function() {
    note[0].className = "note";
    collect[0].className = "collect";
    liked[0].className = "liked active_line";
    my_node[0].style.display = "none";
    my_star_article[0].style.display = "none";
    my_like_article[0].style.display = "block";
}



var other_note = document.getElementsByClassName('other_note');
var other_collect = document.getElementsByClassName('other_collect');
var other_liked = document.getElementsByClassName('other_liked');
var other_node = document.getElementsByClassName('other_node');
var other_star_article = document.getElementsByClassName('other_star_article');
var other_like_article = document.getElementsByClassName('other_like_article');
other_note[0].onclick = function() {
    other_note[0].className = "other_note active_line";
    other_collect[0].className = "other_collect";
    other_liked[0].className = "other_liked";
    other_node[0].style.display = "block";
    other_star_article[0].style.display = "none";
    other_like_article[0].style.display = "none";

}
other_collect[0].onclick = function() {
    other_note[0].className = "other_note";
    other_collect[0].className = "other_collect active_line";
    other_liked[0].className = "other_liked";
    other_node[0].style.display = "none";
    other_star_article[0].style.display = "block";
    other_like_article[0].style.display = "none";
}
other_liked[0].onclick = function() {
    other_note[0].className = "other_note";
    other_collect[0].className = "other_collect";
    other_liked[0].className = "other_liked active_line";
    other_node[0].style.display = "none";
    other_star_article[0].style.display = "none";
    other_like_article[0].style.display = "block";
}