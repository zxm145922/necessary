require(["config"], function() {
    require(["jquery", "template", "header", "footer", "carousel"], function($, template) {
        $(".carousel").carousel({
            imgs: [
                { src: "/images/rBACVFtqlriAeTh9AAEIDeO4TW4840.jpg", href: "#" },
                { src: "/images/rBACVFtqluqAd-HNAAEpxyTnifc123.jpg", href: "#" },
                { src: "/images/rBACVFtqmB2ARhIeAADCzENN_S4942.jpg", href: "#" },
                { src: "/images/rBACVFtqmNqAAdhmAAD2lEr394M736.jpg", href: "#" },
                { src: "/images/rBACW1tqmK2AeOD6AAD2gpWHNhk177.jpg", href: "#" }
            ],
            width: 1080,
            height: 360,
            isButton: true,
            isCircle: true
        });

        $.getJSON("http://rap2api.taobao.org/app/mock/26028/commodity-list", function(data) {

            // 利用 art-template 渲染模板
            const html = template("detail_list", { list: data.res_body.data });
            $(".index_commodity_list").html(html);
        })
    })
})