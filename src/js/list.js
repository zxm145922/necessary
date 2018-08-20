require(["config"], function() {
    require(["jquery", "template", "header", "footer", "carousel"], function($, template) {

        $.getJSON("http://rap2api.taobao.org/app/mock/26028/list_main", function(data) {

            // 利用 art-template 渲染模板
            let html = "";
            html += template("list_main", { list_container: data.res_body.data });
            $(".list_container_main").html(html);
        })

    })
})