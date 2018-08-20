require(["config"], function() {
    require(["jquery", "template", "cookie", "footer", "header", "carousel", "fly", "zoom"], function($, template) {

        console.log(2)
        const id = location.search.slice(4);
        $.getJSON(`http://rap2api.taobao.org/app/mock/26028/detail?id=${id}`, function(data) {
            // 利用 art-template 渲染模板
            const html = template("detail_template", { detail: data.res_body.data });
            $(".detail_container").html(html);
        }).done(function() {
            $(".add_cart").on("click", function(e) {
                const currProd = {
                    id: $(".id").text(),
                    title: $(".title").text(),
                    price: $(".price").text(),
                    img: $(".cart_img").attr("src"),
                    amount: $(".amount").val()
                };
                console.log(currProd.img);
                $.cookie.json = true;
                const products = $.cookie("products") || [];
                console.log(products);
                const has = products.some(function(curr) {
                    if (curr.id == currProd.id) { // 有购买过，则修改数量
                        curr.amount++;
                        return true;
                    }
                });
                if (!has) // 没有购买过，则将当前选购商品对象添加到数组中保存
                    products.push(currProd);

                $.cookie("products", products, { expires: 10, path: "/" });

                const end = $(".my_cart").offset();
                const start = { left: e.pageX, top: e.pageY };
                const flyer = $(`<img src="/images/appLogo.png" style="width:50px; z-index:99;">`);
                flyer.fly({
                    start: {
                        left: start.left - $(window).scrollLeft(),
                        top: start.top - $(window).scrollTop()
                    },
                    end: {
                        left: end.left - $(window).scrollLeft(),
                        top: end.top - $(window).scrollTop()
                    },
                    onEnd: function() { // 结束时，将抛物线运动元素删除
                        this.destroy();
                    }
                });
                // 显示所有选购商品的总数量
                const totalAmount = products.reduce(function(sum, curr) {
                    return sum += +curr.amount;
                }, 0);
                $(".totalAmount").text(totalAmount);

                return false;
            })
        }).done(function() {
            $(".mask").mouseover(function() {
                $(".float_layer").show()
                $(".big_box").show()
            })
            $(".mask").mouseout(function() {
                $(".float_layer").hide()
                $(".big_box").hide()
            })

            $(".small_img").on("click", "img", function() {
                console.log(this);
                $(".detail_img").attr("src", $(this).attr("src"));
                $(".small_img img").removeClass();
                $(this).toggleClass("special");
            })

            $(".mask").mousemove(function(e) {
                var l = e.pageX - $(".small_box").offset().left - ($(".float_layer").width() / 2)
                var t = e.pageY - $(".small_box").offset().left - ($(".float_layer").height())
                if (l < 0) {
                    l = 0
                }
                if (l > $(this).width() - $(".float_layer").width()) {
                    l = $(this).width() - $(".float_layer").width()
                }
                if (t < 0) {
                    t = 0
                }
                if (t > $(this).height() - $(".float_layer").height()) {
                    t = $(this).height() - $(".float_layer").height()
                }

                $(".float_layer").css({
                    "left": l,
                    "top": t
                })
                var pX = l / ($(".mask").width() - $(".float_layer").width())
                var pY = t / ($(".mask").height() - $(".float_layer").height())
                $(".big_box img").css({
                    "left": -pX * ($(".big_box img").width() - $(".big_box").width()),
                    "top": -pY * ($(".big_box img").height() - $(".big_box").height())
                })



            })
        }).done(function() {
            $(".inner_ul").on("click", "img", function() {
                console.log($(this).parent())
                $(".inner_ul li").removeClass();
                $(this).parent().toggleClass("special_style");
            });
            $(".detail_size").on("click", "li", function() {
                console.log($(this).parent())
                $(".detail_size li").removeClass();
                $(this).toggleClass("special_style");
            });
        });

    })
})