// 判断是向上/向下滑动
var points = {
                start: {
                    pageX: "",
                    pageY: ""
                },
                end : {
                    pageX: "",
                    pageY: ""
                }
             };

var moveDirection = function(points) {
    var x = points.end.pageX - points.start.pageX;
    var y = points.end.pageY - points.start.pageY;
    var diff = x*1*x - y*1*y;
    if (diff < 0) {
        if (y > 30) {
            return "down";
        } else if (y < -30) {
            return "up";
        } else {
            return "static";
            }
    } else {
        if (x > 30) {
            return "left";
        } else if (x < -30) {
            return "right";
        } else {
            return "static";
        }
    }
}

//倒计时
var InterValObj; //timer变量，控制时间
var count = 60; //间隔函数，1秒执行
var curCount;//当前剩余秒数
//timer处理函数
function setRemainTime() {
    if (curCount == 0) {
        $("#btnGetVerifyCode").removeClass("bg-gray").addClass("bg-yellow");
        $("#btnGetVerifyCode").attr("onclick","getVerifyCode()").attr("value","获取验证码");
        window.clearInterval(InterValObj);//停止计时器
    } else {
        $("#btnGetVerifyCode").attr("onclick","javascript:void(0);").attr("value", curCount + "秒后获取");
        curCount--;
    }
}

function verifyTelephone(telephone) {
    return telephone && (/^1\d{10}$/).exec(telephone);
}

function getVerifyCode() {
    var tel = $("input[name='orderTel']").val();
    if (verifyTelephone(tel)) {
        // 点击按钮后，间隔1分钟后允许再次请求
        var ctxPath = $("input[name='ctxPath']").val();
        $.ajax({
            url: ctxPath + "/rental/activity/getVerifyCode",
            type: 'POST',
            data: {
                orderTel:$("input[name='orderTel']").val(),
                activityId:$("input[name='activityId']").val(),
            },
            dataType: 'json',
            success: function(data) {
                if (data.success) {
                    $("#btnGetVerifyCode").removeClass("bg-yellow").addClass("bg-gray");
                    curCount=count;
                    InterValObj = window.setInterval(setRemainTime, 1000); //启动计时器，1秒执行一次
                    $("input[name='telephone']").val(tel); // 设定预订电话号码
                } else {
                    layer.msg(data.message, 1, -1); //2秒后自动关闭，-1代表不显示图标
                    $("input[name='telephone']").val(""); // 清空预订电话号码
                }
            }
        });
    } else {
        layer.msg("请输入正确的手机号！", 1, -1); //2秒后自动关闭，-1代表不显示图标
    }
}

$(document).ready(function() {
    if ($("input[name='moveTo']").val()) {
        var target = $("input[name='moveTo']").val();
        window.location=target;
    } else {
        $("#btnCommit").click(function(){
            var ctxPath = $("input[name='ctxPath']").val();
            $.ajax({
                url: ctxPath + "/rental/activity/shilihe_reserve",
                type: 'POST',
                data:{
                    weixinId:$("input[name='weixinId']").val(),
                    tradeNo:$("input[name='tradeNo']").val(),
                    payStatus:$("input[name='payStatus']").val(),
                    verifyCode:$("input[name='verifyCode']").val(),
                    orderTel:$("input[name='orderTel']").val(),
                    couponFee:$("input[name='couponFee']").val()
                },
                dataType : 'json',
                beforeSend: function() {
                    $("#btnCommit").attr("disabled", true);
                    curCount = 0;
                },
                success : function(data){
                    $("#btnCommit").attr("disabled", false);
                    if (data.success) {
                        if (data.action == 'refund') {
                            $("#shilihe_reserve").attr("action", ctxPath + "/pay/refund");
                        } else {
                            // 设定电话号码
                            if ($("input[name='orderTel']").val()) {
                                $("input[name='telephone']").val($("input[name='orderTel']").val());
                            }
                        }
                        $("#shilihe_reserve").submit();
                    } else {
                        $("input[name='verifyCode']").val("");
                        layer.msg(data.message, 1, -1); //2秒后自动关闭，-1代表不显示图标
                    }
                }
            });
        });

        // 向上滑动轮播图可以翻页
        $("div.banner img").on("touchstart", function(e){
            var point  = e.originalEvent.touches[0];
            console.log("X:" + point.pageX + "/" + "Y:" + point.pageY);
            points.start.pageX = point.pageX;
            points.start.pageY = point.pageY;
            points.end.pageX = point.pageX;
            points.end.pageY = point.pageY;
        });

        $("div.banner img").on("touchmove", function(e){
            var point  = e.originalEvent.touches[0];
            points.end.pageX = point.pageX;
            points.end.pageY = point.pageY;
            var direction = moveDirection(points);
            if (direction == "up") {
                $.fn.fullpage.moveTo(2);
            }
        });
    }
});
