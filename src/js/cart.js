require(["config"], function() {
    require(["jquery", "template", "header", "footer", "cookie", "carousel", "zoom"], function($, template) {
        $.cookie.json = true;
        let products = $.cookie("products") || [];
        console.log(products);
        const totalAmount = products.reduce(function(sum, curr) {
            return sum += +curr.amount;
        }, 0);
        $(".totalAmount").text(totalAmount);

        if (products.length === 0) { // 为空
            return;
        };
        // 购物车不为空，则显示出所有购物车中商品
        $(".cart_empty").hide().siblings(".cart_list").show();
        // 动态渲染购物车页面数据(利用art-template模板引擎)
        const html = template("cart_temp", { products });
        // console.log(html);
        $(".cart_table_body").html(html);
        /*******************************************************/
        // 删除
        $(".cart_table_body").on("click", ".del", function() {
            // 获取当前删除链接所在行
            const tr = $(this).parents("span");
            // 获取当前删除商品的id
            const id = $(tr).data("id");
            // 从数组中删除元素
            products = products.filter(function(curr) {
                if (curr.id == id)
                    return false;
                return true;
            });
            // 覆盖保存回cookie中
            $.cookie("products", products, { expires: 10, path: "/" });
            // 从DOM树删除
            $(tr).remove();
            // 判断是否购物车为空
            if (products.length === 0) { // 空
                $(".cart_empty").show().siblings(".cart_list").hide();
            }

            // 计算合计
            calcTotal();
        });
        /*******************************************************/
        // 修改数量+/-
        $(".cart_table_body").on("click", ".increment,.decrement", function() {
            // 获取所在行
            const tr = $(this).parents("span");
            // 商品id
            const id = $(tr).data("id");
            // 行对应商品
            let prod = null;
            products.some(function(curr) {
                if (curr.id == id) {
                    prod = curr;
                    return true;
                }
            });
            // 修改 prod 商品的数量
            if ($(this).is(".increment")) {
                prod.amount++;
            } else {
                if (prod.amount <= 1)
                    return;
                prod.amount--;
            }

            // 保存到cookie中
            $.cookie("products", products, { expires: 10, path: "/" });

            // 将修改后数量填充到文本框中
            // $(tr).find(".amount").val(prod.amount);
            $(this).siblings(".cart_amount").val(prod.amount);
            // 显示小计
            $(tr).find(".sub").text((prod.amount * prod.price).toFixed(2));

            // 计算合计
            calcTotal();
        });
        // 输入修改数量
        $(".cart_table_body").on("blur", ".cart_amount", function() {
            // 获取所在行
            const tr = $(this).parents("span");
            // 商品id
            const id = $(tr).data("id");
            // 行对应商品
            let prod = null;
            products.some(function(curr) {
                if (curr.id == id) {
                    prod = curr;
                    return true;
                }
            });
            // 修改 prod 商品的数量
            const _amount = $(this).val();
            if (!/^[1-9]\d*$/.test(_amount)) {
                $(this).val(prod.amount);
                return;
            }
            prod.amount = Number(_amount);

            // 保存到cookie中
            $.cookie("products", products, { expires: 10, path: "/" });

            // 显示小计
            $(tr).find(".sub").text((prod.amount * prod.price).toFixed(2));

            // 计算合计
            calcTotal();
        });

        /************************************************************/
        // 全选
        $(".ck_all1,.ck_all2").click(function() {
            // 获取当前“全选”框的选中状态
            // const status = this.checked; // 原生JS
            // const status = $(this).attr("checked") // <==> getAttribute("checked")
            const status = $(this).prop("checked") // <==> .checked
                // 将所有商品行前复选框选中状态设置为与 "全选" 一致
            $(".ck_prod2").prop("checked", status);
            $(".ck_all1").prop("checked", status);
            $(".ck_all2").prop("checked", status);
            // 计算合计
            calcTotal();
        });

        // 部分选中
        // $(".ck_prod1").click(function() {
        //     console.log($(".ck_prod1:checked").length);
        //     // 当全部选中时，”全选“复选框勾选，否则取消勾选
        //     $(".ck_all").prop("checked", $(".ck_prod1:checked").length === products.length);

        //     // 计算合计
        //     calcTotal();
        // });

        //店铺选中
        $(".detail_group").on("click", ".ck_prodh4", function() {
            const status1 = $(this).prop("checked")
            console.log($(this).parent().siblings(".detail_ul").children(".ck_prod1"));
            $(this).parent().siblings(".detail_ul").find(".ck_prod1").prop("checked", status1);
            // 当全部选中时，”全选“复选框勾选，否则取消勾选
            $(".ck_all").prop("checked", $(".ck_prod1:checked").length === products.length);

            // 计算合计
            calcTotal();
        })
        $(".detail_group").on("click", ".ck_prod1", function() {
                const status2 = $(this).prop("checked")
                console.log($(this).parent().prev());
                $(this).parents(".detail_ul").prev().children().prop("checked", status2);
                // 当全部选中时，”全选“复选框勾选，否则取消勾选
                $(".ck_all").prop("checked", $(".ck_prod1:checked").length === products.length);

                // 计算合计
                calcTotal();
            })
            // 定义函数，计算合计金额，在修改数量、删除、选中时都会计算合计，所以定义函数复用
        function calcTotal() {
            let sum = 0;
            $(".ck_prod1:checked").each(function(index, element) {
                // 当前遍历到行的小计
                const _sub = Number($(element).parents("span").find(".sub").text())
                    // 累加到总计
                sum += _sub;
            });
            // 显示合计金额
            $(".cart_sum").text(sum.toFixed(2));
        }
    })
})