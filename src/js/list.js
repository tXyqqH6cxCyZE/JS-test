$(function(){
    let nickname=$.getCookie('nickname')
    if(!nickname){
        $('.header > .bottom .header-bottom ul li:nth-of-type(14) a').css('display','flex')
        $('.header > .bottom .header-bottom ul li:nth-of-type(14) p').css('display','none')
    }else{
        $('.header > .bottom .header-bottom ul li:nth-of-type(14) a').css('display','none')
        $('.header > .bottom .header-bottom ul li:nth-of-type(14) p').css('display','flex')
        $('.header > .bottom .header-bottom ul li:nth-of-type(14) p').html(`您好,${nickname}`)
        $('.header > .bottom .header-bottom ul li:nth-of-type(14) p').css('color','orange')
    }
    // 分页器


// 渲染选项栏
// 准备一个传回后端的对象
let list_info={
    cat_one_id:"all",
    cat_two_id:"all",
    cat_three_id:"all",
    method:"综合",
    type:"ASC",
    number:"ASC",
    pagesize:8,
    current:1,
}
let info_current=null
// 获取一级列表
getOne()
async function getOne(){
    let list=await $.get('../server/getOne.php',null,null,'json')
    const arr=list.data
    // console.log(list)
    let str=`<span data-name="all" class="active">全部</span>`
    arr.forEach(function(item){
        str+=`
        <span data-name=${item.cat_one_id}>${item.cat_one_id}</span>
        `
    })
    $('.one').html(str)
}
// 获取二级列表
getTwo()
async function getTwo(){
    let list=await $.get('../server/getTwo.php',{cat_one_id:list_info.cat_one_id},null,'json')
    let arr=list.data
    // console.log(arr)
    let str=`<span  data-name="all" class="active">全部</span>`
    if(list_info.cat_one_id!="all"){
        arr.forEach(function(item){
            str+=`
            <span data-name=${item.cat_two_id}>${item.cat_two_id}</span>  
            `
        })
    }
    $('.two').html(str)
}
// 获取三级列表
getThree()
async function getThree(){
    let list=await $.get('../server/getThree.php',list_info,null,'json')
    // console.log(list)
    let arr=list.data
    let str=`<span  data-name="all" class="active">全部</span>`
    if(list_info.cat_one_id!="all"&&list_info.cat_two_id!="all"){
        arr.forEach(function(item){
            str+=`
            <span data-name=${item.cat_three_id}>${item.cat_three_id}</span>  
            `
        })
    }
    $('.three').html(str)
}
// 获取分页器
getCount()
async function getCount(){
    let list=await $.get('../server/getCount.php',list_info,null,'json')
    // console.log(list)
    // console.log(list.count),
    $('.boxmin').pagination({
        coping: true,
        homePage: '首页',
        endPage: '末页',
        prevContent: '上页',
        nextContent: '下页',
        pageCount:list.count,
        callback(index){
            list_info.current=index.getCurrent()
            getGoods()
        }
    })
}
// 获取商品列表
getGoods()
async function getGoods(){
    let list=await $.get('../server/getGoods.php',list_info,null,'json')
    console.log(list)
    let arr=list.data
    info_current=arr
    let str=`<p>小米秒杀</p>`
    arr.forEach(function(item){
        str+=`
        <div>
            <p><img src="${item.goods_big_logo}" alt="" data-id="${item.goods_id}"></p>
            <h3>${item.cat_id}</h3>
            <h6>${item.goods_name}
            </h6>
            <h4>¥<span>${item.goods_price}</span>商品余量<span>${item.goods_number}</span>ID:<span>${item.goods_id}</span></h4>
            <h5>
                <button class="addCart" data-id="${item.goods_id}">加入购物车</button>
                <button class="cash">去结算</button>
            </h5>
        </div>
        `
        $('.item').html(str)
    })

}
// 点击一级分类事件
$('.one').on('click','span',function(){
    $(this).addClass('active').siblings().removeClass('active')
    let name=$(this).attr('data-name')
    list_info.cat_one_id=name
    list_info.cat_two_id='all'
    list_info.cat_three_id='all'
    $('.two').html('<span data-name="all" class="active">全部</span>')
    $('.three').html('<span data-name="all" class="active">全部</span>')
    list_info.current=1
    getTwo()
    getCount()
    getGoods()
    // console.log(name)
})
// 点击二级分类事件
$('.two').on('click','span',function(){
    $(this).addClass('active').siblings().removeClass('active')
    let name=$(this).attr('data-name')
    list_info.cat_two_id=name
    list_info.cat_three_id='all'
    $('.three').html('<span data-name="all" class="active">全部</span>')
    list_info.current=1
    getThree()
    getCount()
    getGoods()
})
// 获取三级分类列表
$('.three').on('click','span',function(){
    $(this).addClass('active').siblings().removeClass('active')
    let name=$(this).attr('data-name')
    list_info.cat_three_id=name
    list_info.current=1
    getCount()
    getGoods()
})
// 获取排序事件
$('.four').on('click','p',function(){
    let method=$(this).attr('data-method')
    let type=$(this).attr('data-type')
    list_info.method=method
    list_info.type=type
    getCount()
    getGoods()
})

// 加入购物车事件
// info_id代表当前点击的这个商品的id
// info_now代表当前点击的这个商品
$('.item').on('click','.addCart',function(){
    let cart=JSON.parse(window.localStorage.getItem('cart'))||[]
    let id=$(this).attr('data-id')
    // console.log(id)
    // console.log(cart)
    let flag=cart.some(function(item){
        return item.goods_id===id
    })
    if(flag){
        // 说明现在购物车里面是有点击的这个商品的,只需要改变商品的数量就可以了
        let info_now=cart.filter(function(item){
            return item.goods_id===id
        })[0]
        info_now.cart_number=info_now.cart_number-0+1
        console.log(info_now)
    }else{
        info_now=info_current.filter(function(item){
            return item.goods_id===id
        })[0]
        // console.log(info_current)
        // console.log(info_now)
        info_now.cart_number=1
        cart.push(info_now)
    }
    window.localStorage.setItem('cart',JSON.stringify(cart))
    console.log(cart)
 })
//  去结算逻辑
$('.item').on('click','.cash',function(){
    window.location.href='./cart.html'
})
// 跳转详情页逻辑
$('.item').on('click','img',function(){
    let id=$(this).attr('data-id')
    $.setCookie('id',id)
    window.location.href='./detail.html'
})

    

})


