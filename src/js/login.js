require(["config"], function() {
    require(["jquery", "template", "header", "footer", "cookie"], function($, template) {
        $.cookie.json = true;
        $(".form_login").on("submit", function(e) {
            // 获取登录表单中的用户名与密码数据
            const data = $(this).serialize();
            // ajax 登录
            $.post("http://localhost/php/login.php", data, function(data) {
                console.log(data);
                if (data.res_code === 1) {
                    alert("用户登录成功");

                    // 将登录成功的用户信息保存到 cookie 中
                    $.cookie("login_user", data.res_body, { path: "/" });

                    location = "/index.html";
                } else {
                    alert("用户名或密码错误");
                }
            }, "json");

        })
    })
});