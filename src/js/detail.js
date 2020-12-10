// 获取list详情页传过来的id来渲染页面
let id=$.getCookie('id')
let info_now=null
// console.log(id)
detail()
async function detail(){
    let list=await $.get('../server/getDetail.php',{'id':id},null,'json')
    let arr=list.data[0]
    info_now=arr
    // console.log(arr)
    console.log(info_now)
    
    let str=`
    <div class="left">
    <div class="top">
        <p><img src="${arr.goods_small_logo}" alt=""></p>
        <div class="show1"></div>
    </div>
    <div class="bottom">
        <p><img src="${arr.goods_small_logo}" data-show="${arr.goods_small_logo}" data-back="${arr.goods_big_logo}"></p>
    </div>
    <div class="back"></div>
    </div>
    <div class="right">
    <p>${arr.goods_name}</p>
    <h1 class="gray">促销价<i>￥</i><span>${arr.goods_price}</span><b>超值优惠</b></h1>
    <span class="gray">型号</span>
    <div class="btn-group btn-group-lg btns">
        <button type="button" class="btn btn-default">S</button>
        <button type="button" class="btn btn-default">M</button>
        <button type="button" class="btn btn-default">L</button>
        <button type="button" class="btn btn-default">XL</button>
    </div>
    <div class="num">
        <span class="gray">数量</span>
        <div class="big">
            <div class="btn">
                <input type="text">
                <p><button>👆</button><button>👇</button></p>
            </div>
            <span class="gray">件</span>
            <span class="gray">库存<i>${arr.goods_number}</i>件</span>
        </div>
    </div>
    <div class="go">
        <button class="btn btn-default cash">立即购买</button>
        <button data-id="1" class="btn btn-danger addCart">加入购物车</button>
    </div>
    <h2 class="gray text">
        服务承诺
        <span>正品保证</span>
        <span>急速退款</span>
        <span>退货运费险</span>
        <span>七天无理由退换</span>
    </h2>
    <div class="hideshow">
        <div class="do one active">
            <span>支付方式 ↓</span>
            <div>
                <span>信用卡</span>
                <span>快捷支付</span>
                <span>蚂蚁花呗</span>
                <span>余额宝</span>
            </div>
        </div>
        <div class="do gray two">
            <span>支付方式 ↑</span>
        </div>
    </div>
</div>
    `
    
    $('.box').html(str)
    $('.box .left .back').css({background:`url('${arr.goods_big_logo}') no-repeat 0 0/800px 800px`})
    $('.right .num .big .btn input').val(1)
    move()
}
// 支付方式点击变化
$('.box').on('click','.right .hideshow div',function(){
    $(this).addClass('active').siblings().removeClass('active')
})

// 放大镜,要在页面渲染完毕的时候来进行调用
function move(){
    let top_width=$('.box .left .top').innerWidth()
    let top_height=$('.box .left .top').innerHeight()
    let back_width=$('.box .left .back').innerWidth()
    let back_height=$('.box .left .back').innerHeight()
    let back=document.querySelector('.box .left .back')
    // console.log(backimg)
    let backimg_width=parseInt($('.box .left .back').css('backgroundSize').split(' ')[0])
    let backimg_height=parseInt($('.box .left .back').css('backgroundSize').split(' ')[1])
    
    // 获取show的宽高
    let show_width=top_width*back_width/backimg_width
    let show_height=top_height*back_height/backimg_height
    $('.box .show1').css({width:show_width,height:show_height})
    // console.log(back_width)
    // console.log(back_height)
    // 鼠标移动时候show进行移动事件
    $('.box .left .top').on('mousemove',e=>{
        e=e||window.event
        let x=e.offsetX-show_width/2
        let y=e.offsetY-show_height/2
        if(x<=0) x=0
        if(x>top_width-show_width) x=top_width-show_width
        if(y<=0) y=0
        if(y>top_height-show_height) y=top_height-show_height
        $('.box .left .show1').css({left:x,top:y})
        
        // 鼠标移动时候右边的背景图一起跟着移动
        backimg_x=x*back_width/show_width
        backimg_y=y*back_height/show_height
        $(".box .back").css({backgroundPositionX:-backimg_x, backgroundPositionY:-backimg_y})
 
    })

    stop()
    function stop(){
        $('.box .left .top').on('mouseover',function(){
            $('.box .left .show1').css({'display':'block'})
            $('.box .left .back').css({'display':'block'})
        })
        $('.box .left .top').on('mouseout',function(){
            $('.box .left .show1').css({'display':'none'})
            $('.box .left .back').css({'display':'none'})
        })
    }
    //点击左下方的图片时整套更换
    $('.box .left .bottom').on('click','img',function(){
        let data_show=$(this).attr('data-show')
        let data_back=$(this).attr('data-back')
        console.log(data_show)
        console.log(data_back)
        $('.box .left .top p img').attr('src',data_show)
        $('.box .left .back').css({background:`url('${data_back}')`})
    })
}

// 加入购物车事件
$('.box').on('click','.addCart',function(){
    let cart=JSON.parse(window.localStorage.getItem('cart'))||[]
    let flag=cart.some(function(item){
    return item.goods_id===id
    })
    if(flag){
        let info_now=cart.filter(function(item){
            return item.goods_id===id
        })[0]
        let num = $('.right .num .big .btn input').val()-0
        info_now.cart_number=info_now.cart_number-0+num
        }else{
            info_now.cart_number=1
            cart.push(info_now)
        }
    window.localStorage.setItem('cart',JSON.stringify(cart))
})

$('.box').on('click','.right .num .big .btn p button:first-of-type',function(){
    let num=$('.right .num .big .btn input').val()-0+1
    $('.right .num .big .btn input').val(num)
})
$('.box').on('click','.right .num .big .btn p button:last-of-type',function(){
    let num=$('.right .num .big .btn input').val()-0-1
    if(num<=1) num=1
    $('.right .num .big .btn input').val(num)
})

$('.box').on('click','.cash',function(){
    window.location.href='./cart.html'
})