// const { css } = require("jquery")

const ul=document.querySelector('.search .right ul')
const inp=document.querySelector('.search .right input')
const right=document.querySelector('.search .right')
const button=document.querySelector('.search .right button')


$(function(){
    //第十一个导航栏中的li移入移出变化
    $('.header .li_11').on('mouseover',function(){
        $('.header > .bottom .header-bottom ul li:nth-of-type(11) .nth11').stop().slideDown('0.5s')
    })
    $('.header .li_11').on('mouseout',function(){
        $('.header > .bottom .header-bottom ul li:nth-of-type(11) .nth11').stop().slideUp('0.5s')
    })
    
    //登录的时候获取购物车内商品渲染下拉菜单
    let cart=JSON.parse(window.localStorage.getItem('cart'))||[]
    function html(){
// console.log(cart)
        if(cart.length!==0){
            // 购物车内有商品的时候
            $('.header .li_17').on('mouseover',function(){
                $('.on').stop().slideDown('0.5s').css({display:'block',color:'gray'})
                .siblings().addClass('hide')
            })
            $('.header .li_17').on('mouseout',function(){
                $('.on').removeClass('hide').stop().slideUp('0.5s')
            })
            let str=``
            let num=0
            let money=0
            cart.forEach(function(item){
                num+=item.cart_number
// console.log(num)
                money+=item.cart_number*item.goods_price
                str+=`
                <div class="buy">
                    <h1><img src="${item.goods_small_logo}" alt=""></h1> 
                    <span>${item.goods_name}</span>
                    <span>${item.goods_price}元 × ${item.cart_number}</span>
                    <button class="del" data-id="${item.goods_id}">x</button>
                </div>
                `
            })
            str+=`
            <div class="sum">
                <p><span>共${num}件商品</span><span>${money.toFixed(2)}元</span></p>
                <button class="cash">去购物车结算</button>
            </div>
            `
            $('.on').html(str)
            $('.header .li_17 .cart_num').html(`(${num})`)
            $('.on').css('overflow','auto')
        }else{
            //购物车内无商品的时候
            //移入事件
            $('.header .li_17').on('mouseover',function(){
                // console.log('出来不')
                $(this).find('.off')
                .stop().slideDown('0.5s').css({display:'flex'}).siblings().addClass('hide')
                $('.header > .li_17').css('color','orange')
                $(this).find('.off').on('click',function(){
                    window.location.href='./list.html'
                })
            })
            //移出事件
            $('.header .li_17').on('mouseout',function(){
                // console.log('回去吧')
                $(this).find('.off').addClass('hide').stop().slideUp('0.5s')
                // $('.header > .li_17').css('color','#B0B0B0')
                $('.header .li_17 .on').stop().slideUp('0.5s')
            })
        }
    }

    //登录显示用户名
    const nickname=$.getCookie('nickname')
    if(!nickname){
        //首页有无登录时候昵称显示变化
        $('.header .li_14 p').css('display','none')
        $('.header .li_14 a').css('display','flex')

    }else{
        $('.header .li_14 p').css({'display':'flex','color':'orange'})
        $('.header .li_14 a').css('display','none')
        $('.header .li_14 p').html(`您好,${nickname}`)
        html()
        // height()
    }

    //点击购物车下拉菜单中的删除按钮事件
    $('.on').on('click','.del',function(){
        let id=$(this).attr('data-id')
        for(let i=0;i<cart.length;i++){
            if(cart[i].goods_id==id){
                cart.splice(i,1)
            }
        }
        window.localStorage.setItem('cart',JSON.stringify(cart))
        html()
        height()
        if(cart.length===0){
            window.location.reload()
            $('.header .li_17 .cart_num').html(0)
        }
    })
    //
    height()
    function height(){
        //获取整个可视页面的高度
        let html_height=$('html').outerHeight(true)
        //获取导航栏上方向偏移量
        let nav_height=$('.bottom').offset().top+40//整个40是导航栏的高度
        //获取购物车下拉菜单的动态高度
        let on_height=$('.on').outerHeight()
        console.log(on_height)
        // console.log(html_height - nav_height)
        // console.log(on_height>html_height - nav_height)
        if(on_height>html_height - nav_height){
            $('.on').css({height:html_height - nav_height})
            $('.on').css('overflow','auto')
            console.log('大于')
        }
        // else if(on_height<html_height - nav_height){
        //     $('.on').css({height:'auto'})
        //     console.log('小于')
        // }
    }
    //点击去结算跳转
    $('.on').on('click','.cash',function(){
        window.location.href='./cart.html'
    })



    //搜索栏jsonp事件
    inp.addEventListener('input',function(){
        const value=this.value.trim()
        if(!value) {
            ul.style.display='none'
            return
        }
        const script=document.createElement('script')
        // const url=`https://api2.order.mi.com/search/query?query=${value}&page_index=1&jsonpcallback=bindhtml`
        const url=`https://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&sugsid=1446,32857,33124,33061,32973,33099,33101,32962,22159&wd=${value}&req=2&csor=1&cb=bindhtml&_=16057689369931`
        script.src=url
        document.body.appendChild(script)
        script.remove()
    })
    inp.addEventListener('click',function(){
        right.style.border='1px orange solid'
        button.style.borderLeft='1px orange solid'
        ul.style.border='1px orange solid'
        ul.style.zIndex='1000'
        ul.style.position='relative'
    })
    
    // $('.search .right input').on('input',function(){
    //     const value=$('.search .right input').val().trim()
    //     // console.log(value)
    //     if(!value) return
    //     // const script=$('<script></script>')
    //     // console.log(script)
    //     const url=`https://api2.order.mi.com/search/query?query=${value}&page_index=1&jsonpcallback=bindhtml`
    //     $('<script></script>').src=url
    //     document.body.append($('<script></script>'))
    //     $('<script></script>').remove()
    // })
       

// search部分下拉列表
$('.search .search-center ul li a').on('mouseover',function(){
    $(this).css('color','orange')
    $('.all').stop().slideDown('1s')
    
})
$('.search .search-center ul li a').on('mouseout',function(){
    $(this).css('color','#333')
    $('.all').stop().slideUp('1s')
})

// banner 轮播图
class Infinte {
    constructor(ele) {
        this.box = document.querySelector(ele)
        this.imgbox = this.box.querySelector('ul')
        this.pointer = this.box.querySelector('ol')
        this.leftright = this.box.querySelector('.leftright')
        this.index = 0
        this.timer = 0
        this.init()
    }
    init() {
        this.createPoints()
        // this.changeOne(true)
        this.autoplay()
        this.stop()
        this.clickPointer()
        this.clickleftright()
        this.change()
    }
    createPoints() {
        const num = this.imgbox.children.length
        const frg = document.createDocumentFragment()
        for (let i = 0; i < num; i++) {
            const li = document.createElement('li')
            li.setAttribute('id', i)
            if (i === 0) li.classList.add('active')
            frg.appendChild(li)
        }
        this.pointer.appendChild(frg)
        this.pointer.style.width = this.pointer.children.length * 20 * 1.5 + 'px'
    }
    changeOne(type) {
        this.imgbox.children[this.index].classList.remove('active')
        this.pointer.children[this.index].classList.remove('active')
        if(type===true){this.index++}
        else if(type===false){this.index--}
        else {this.index=type}//这个地方是赋值,不是等于
        if (this.index < 0) {
            this.index = this.imgbox.children.length - 1
        }
        if (this.index >= this.imgbox.children.length) {
            this.index = 0
        }

        this.imgbox.children[this.index].classList.add('active')
        this.pointer.children[this.index].classList.add('active')
        // console.log(this.index)
        // console.log(this.imgbox.children[this.index].className)
    }
    autoplay() {
        this.timer = setInterval(() => {
            this.changeOne(true)
        }, 3000)
    }
    stop() {
        this.box.addEventListener('mouseover', () => {
            clearInterval(this.timer)
            this.leftright.style.display = 'flex'
        })
        this.box.addEventListener('mouseout', () => {
            this.autoplay()
            this.leftright.style.display = 'none'
        })
    }
    clickPointer() {
        this.pointer.addEventListener('click', e => {
            e = e || window.event
            let target = e.target || e.srcElement
            if (target.nodeName === 'LI') {
                const n = target.getAttribute('id') - 0
                this.changeOne(n)
            }
        })
    }
    clickleftright(){
        this.leftright.addEventListener('click',e=>{
            e=e||window.event
            let target=e.target||e.srcElement
            if(target.className==='left'){
                this.changeOne(false)
            }
            if(target.className==='right'){
                this.changeOne(true)
            }
        })
    }
    change(){
        document.addEventListener('visibilitychange',()=>{
            const state=document.visibilityState
            if(state==='hidden') clearInterval(this.timer)
            if(state==='visible') this.autoplay()
        })
    }
}
new Infinte('.box')

//倒计时事件
setInterval(function(){
    timeDiff()
},1000)
function timeDiff(){
    let time1=new Date("2020-12-11, 12:00:00")
    let time2=new Date()
    let time=(time1.getTime()-time2.getTime())/1000
    // let day=Math.floor(time/(60*60*24))
    let hour=Math.floor(time/(60*60))
    let minute=Math.floor(time%(60*60)/60)
    let second=Math.round(time%60)
    if(hour<10) hour+="0"+hour
    if(minute<10) minute=`0${minute}`
    if(second<10) second=`0${second}`
    $('.back .left h6 span:nth-of-type(1)').html(hour)
    $('.back .left h6 span:nth-of-type(2)').html(minute)
    $('.back .left h6 span:nth-of-type(3)').html(second)

}

// 石英表的滚动和上边的按钮点击事件
// move()
function move(){
    setInterval(function(){
        let left=$('.back .shoping .bottom .right ul li:nth-of-type(1)').offset().left
        // console.log(left)
        let li_width=$('.back .shoping .bottom .right ul li:nth-of-type(1)').outerWidth(true)
        // console.log(li_width)
        // if(left===0){
        //     $('.back .shoping .top p span:first-of-type').addClass('active')
        //     console.log($('.back .shoping .top p span:first-of-type'))
        // }

        $('.back .shoping .bottom .right ul').mouseover(function(){
            $(this).removeClass('active')
            console.log($(this).css('animation',''))
        })



    },10)
}

// 定位栏
let pict_top=$('.back p.pict').offset().top
  // console.log(pict_top)
  window.onscroll=function(e){
    e=e||window.event
    let scrollTop=document.documentElement.scrollTop||document.body.scrollTop
    // console.log(scrollTop)
    if(scrollTop>=pict_top){
      $('.location p').removeClass('active')
    }else{
      $('.location p').addClass('active')
    }
  }
})

//搜索引擎问题的执行函数
function bindhtml(res){
    // console.log(res)
    if (!res.g) {
        ul.classList.remove('active')
        return
      }
      console.log(inp.value)
      let str = ''
      for (let i = 0; i < res.g.length; i++) {
        str += `
          <li>${ res.g[i].q }</li>
        `
      }
      ul.innerHTML = str
      ul.style.display='block'
}

