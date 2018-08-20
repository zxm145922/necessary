define(['jquery', 'cookie'], function($) {
    $.ajax("/html/include/header.html").done(function(data) {
        $("header").html(data);



    }).done(function() {

        $(".search_input input:first").keyup(function() {
            const
                word = $(this).val(),
                url = `https://suggest.taobao.com/sug?code=utf-8&q=${word}&callback=?`;
            // JSONP跨域
            $.getJSON(url, function(data) {
                console.log(data);
                let html = "";
                data.result.forEach(function(curr) {
                    html += `<div>${curr[0]}</div>`;
                });
                $(".suggest").html(html); // .innerHTML = html;
            });
        });
    }).done(function() {
        $(".suggest").on("click", "div", function() {
            // console.log(this); // this === event.target
            $(".search input:first").val($(this).html()); // this.innerHTML
            // $(this).text(); // this.innerText
            $(".suggest").empty();

        });

    }).done(
        function() {
            $(".search_input input:first").blur(function() {
                $(".suggest").empty();
                // $(this).css("placeholder", "请输入要搜索的商品");
                return false;
            });

        }).done(function() {
        // 显示所有选购商品的总数量
        $.cookie.json = true;
        const products = $.cookie("products") || [];
        const totalAmount = products.reduce(function(sum, curr) {
            return sum += curr.amount;
        }, 0);
        $(".totalAmount").text(totalAmount);
    })
});