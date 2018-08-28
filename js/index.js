"use strict";
$(() => {
    let main = {
        init() {
            let _this = this;
            _this.anime();
            _this.navSide();
            _this.clickEvent();
            let viewWidth = $("body").width();
            if (viewWidth > 900) {//如果是移动端，取消顶部导航动画
                _this.scrollEvent();
                // _this.hoverEvent();
            }
            if (viewWidth < 800) {
                _this.mobileEvent();
            }
        },
        hoverEvent() {
            $(".member ul li p").hover(function () {
                $(this).next().fadeIn(300);
            }, function () { });
            $(".member ul li .allIntro").hover(function () { },
                function () {
                    $(this).fadeOut(300);
                })
        },
        mobileEvent() {
            $(".navBtn").on("click", () => {
                $(".nav").toggle()
            });
            $(".nav li a").on("click", () => {
                setTimeout(() => {
                    $(".nav").hide()
                }, 50)
            })
        },
        navSide() {
            $(".nav ul a").on("click", function () {
                let navName = $(this).attr("href");
                let top = $(navName).offset().top;
                $("html,body").animate({
                    scrollTop: top - 40 + "px"
                }, {
                        duration: 600,
                        easing: "swing"
                    })
            })
        },
        scrollEvent() {
            window.onscroll = function () {
                //变量t是滚动条滚动时，距离顶部的距离
                let top = $(document).scrollTop() || $("body").scrollTop();
                let header = $("header");
                //当滚动到距离顶部200px时，返回顶部的锚点显示
                if (top > 40) {
                    header.removeClass("headerBefore");
                    header.addClass("headerAfter");
                } else {          //恢复正常
                    header.removeClass("headerAfter");
                    header.addClass("headerBefore");
                }
            }
        },
        anime() {
            let box = $(".box");
            var canvas = document.getElementById('canvas'),
                ctx = canvas.getContext('2d'),
                w = canvas.width = box.width(),
                h = canvas.height = box.height(),

                hue = 217,
                stars = [],
                count = 0,
                maxStars = 1000;

            // Thanks @jackrugile for the performance tip! http://codepen.io/jackrugile/pen/BjBGoM
            // Cache gradient
            var canvas2 = document.createElement('canvas'),
                ctx2 = canvas2.getContext('2d');
            canvas2.width = 100;
            canvas2.height = 100;
            var half = canvas2.width / 2,
                gradient2 = ctx2.createRadialGradient(half, half, 0, half, half, half);
            gradient2.addColorStop(0.025, '#fff');
            gradient2.addColorStop(0.1, 'hsl(' + hue + ', 61%, 33%)');
            gradient2.addColorStop(0.25, 'hsl(' + hue + ', 64%, 6%)');
            gradient2.addColorStop(1, 'transparent');

            ctx2.fillStyle = gradient2;
            ctx2.beginPath();
            ctx2.arc(half, half, half, 0, Math.PI * 2);
            ctx2.fill();

            // End cache

            function random(min, max) {
                if (arguments.length < 2) {
                    max = min;
                    min = 0;
                }

                if (min > max) {
                    var hold = max;
                    max = min;
                    min = hold;
                }

                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            var Star = function () {

                this.orbitRadius = random(w / 2 - 50);
                this.radius = random(100, this.orbitRadius) / 10;
                this.orbitX = w / 2;
                this.orbitY = h / 2;
                this.timePassed = random(0, maxStars);
                this.speed = random(this.orbitRadius) / 4000000;
                this.alpha = random(2, 10) / 10;

                count++;
                stars[count] = this;
            }

            Star.prototype.draw = function () {
                var x = Math.sin(this.timePassed + 1) * this.orbitRadius + this.orbitX,
                    y = Math.cos(this.timePassed) * this.orbitRadius / 2 + this.orbitY,
                    twinkle = random(10);

                if (twinkle === 1 && this.alpha > 0) {
                    this.alpha -= 0.02;
                } else if (twinkle === 2 && this.alpha < 1) {
                    this.alpha += 0.02;
                }

                ctx.globalAlpha = this.alpha;
                ctx.drawImage(canvas2, x - this.radius / 2, y - this.radius / 2, this.radius, this.radius);
                this.timePassed += this.speed;
            }

            for (var i = 0; i < maxStars; i++) {
                new Star();
            }

            function animation() {
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 0.8;
                ctx.fillStyle = 'hsla(' + hue + ', 64%, 6%, 1)';
                ctx.fillRect(0, 0, w, h)

                ctx.globalCompositeOperation = 'lighter';
                for (var i = 1, l = stars.length; i < l; i++) {
                    stars[i].draw();
                };

                window.requestAnimationFrame(animation);
            }

            animation();
        },
        clickEvent() {
            $(".faq-title").on("click", function () {
              $(this).siblings().toggle();
            });
        }
    }
    main.init()
})
