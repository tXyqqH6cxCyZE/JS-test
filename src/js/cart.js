$(function(){
    let cart=JSON.parse(window.localStorage.getItem('cart'))||[]
    // 判断是否有购物车内的商品来显示哪个页面
    if(cart.length==0){
        $('.off').removeClass('active')
        $('.on').addClass('active')
    }
    //判断是不是登录了,如果没有登录返回登录页面
    let nickname=$.getCookie('nickname')
    if(!nickname){
        window.location.href='./login.html'
    }
    // 渲染页面
    bindhtml()
    function bindhtml(){
        let selectAll=cart.every(function(item){
            return item.is_select==1
        })
        // console.log(selectAll)
        let num_Select=0//选中的商品件数
        let totalnum=0//购物车中总的商品件数
        let totalmoney=0//选中的商品总金额
        cart.forEach(function(item){
            totalnum+=item.cart_number
            if(item.is_select==1){
                num_Select+=item.cart_number
                totalmoney+=item.cart_number*item.goods_price
            }
        }) 
        let str=``
        str+= `
            <div class="all">
                <input type="checkbox" ${selectAll?'checked':''}>
                <span>全选</span>
                <span>商品名称</span>
                <span>单价</span>
                <span>数量</span>
                <span>小计</span>
                <span>操作</span>
            </div>
                <div class="item">
            <ul>`
        cart.forEach(function(item){
            let total=(item.cart_number*item.goods_price).toFixed(2)
            // console.log(item.is_select)
            str+=`
                <li>
                    <input type="checkbox" ${item.is_select==1?'checked':''} class="checkbox" data-id="${item.goods_id}">
                    <p><img src="${item.goods_big_logo}" alt=""></p>
                    <span>${item.goods_name}</span>
                    <span><i>${item.goods_price}</i>元</span>
                    <div class="div">
                        <button class="cut" data-id="${item.goods_id}">-</button>
                        <input type="text" value="${item.cart_number}">
                        <button class="add" data-id="${item.goods_id}">+</button>
                    </div>
                    <span>${total}元</span>
                    <button class="del" data-id="${item.goods_id}">X</button>
                </li>`
        })
        str+=`
        </ul>
        </div>
        <div class="third center">
            <p>
                <h1>继续购物</h1>
                <h2>共<span class="totalnum">${totalnum}</span>件商品,已选择<span class="total">${num_Select}</span>件</h2>
            </p>
            <div><p>合计:<span>${totalmoney.toFixed(2)}</span>元</p></div>
            <button class="clear">清空购物车</button>
            <button>去结算</button>
        </div>
            `
        $('.second').html(str)
    }
    // 每一个选项的点击事件
    $('.second').on('click','.checkbox',function(){
        let type=$(this)[0].checked
        let id=$(this).attr('data-id')
        let info_now=cart.filter(function(item){
            return item.goods_id==id
        })[0]
        if(type){
            info_now.is_select=1
        }else{
            info_now.is_select=0
        }
        // console.log(type)
        // console.log(info_now.is_select)
        bindhtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    // 点击总选项的时候的事件
    $('.second').on('click','.all input',function(){
        let type=this.checked
        console.log(type)
        cart.forEach(function(item){
            if(type){
                item.is_select=1
                // console.log(1111111)
            }else{
                item.is_select=0
                // console.log(2222222)
            }
        }) 
        bindhtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))  
    })
    //点击数量中的减号的时候
    $('.second').on('click','.cut',function(){
        let id=$(this).attr('data-id')
        let info_now=cart.filter(function(item){
            return item.goods_id==id
        })[0]
        info_now.cart_number--
        if(info_now.cart_number<=1)info_now.cart_number=1
        bindhtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    //点击数量中的减号的时候
    $('.second').on('click','.add',function(){
        let id=$(this).attr('data-id')
        let info_now=cart.filter(function(item){
            return item.goods_id==id
        })[0]
        info_now.cart_number++
        bindhtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
    })
    //点击删除的时候
    $('.second').on('click','.del',function(){
        let id=$(this).attr('data-id')
        for(let i=0;i<cart.length;i++){
            if(cart[i].goods_id==id){
                cart.splice(i,1)
            }
        }
        // console.log(cart)
        bindhtml()
        window.localStorage.setItem('cart',JSON.stringify(cart))
        if(cart.length==0){
            window.location.reload()
        }
    })
    //点击清除购物车的时候
    $('.second').on('click','.clear',function(){
        cart=[]
        window.localStorage.setItem('cart',JSON.stringify(cart))
        if(cart.length==0){
            window.location.reload()
        }
    })


})
