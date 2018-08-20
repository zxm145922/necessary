require(["config"], function() {
    require(["jquery", "template", "footer", "carousel"], function($, template) {
        $(".btn_reg").on("click", function() {
            // 获取注册需要向服务器接口提交的数据
            const data = $(".form_reg").serialize();
            // ajax 访问注册API接口
            $.post("http://localhost/php/register.php", data, function(data) {
                console.log(data);
                if (data.res_code === 1) {
                    alert("用户注册成功");
                    location = "/html/login.html";
                } else {
                    alert("用户注册失败");
                }
            }, "json");
        });

        function loadCode() {
            $.get("http://route.showapi.com/932-2?showapi_appid=29550&showapi_sign=cdcf453166de4d518f69e25b07d7962a", function(data) {
                $(".code").attr("src", data.showapi_res_body.image);
                $(".code").data("sid", data.showapi_res_body.sid);
            }, "json");
        }
        loadCode();
        $(".code_info").click(loadCode);
        $(".code").click(loadCode);

        // 输入完毕校验验证码是否正确
        $(".input_code").on("blur", function() {
            const _input = $(this).val(),
                _sid = $(".code").data("sid");
            $.getJSON(`http://route.showapi.com/932-1?showapi_appid=29550&showapi_sign=cdcf453166de4d518f69e25b07d7962a&checkcode=${_input}&sid=${_sid}`, function(data) {
                if (data.showapi_res_body.valid) {
                    $(".code_info").text("正确");
                } else {
                    $(".code_info").text("输入有误");
                }
            })
        });

    })
})