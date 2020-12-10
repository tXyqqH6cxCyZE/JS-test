$(function(){
    $('#signupForm').validate({
        rules:{
            username:{
                required:true,
                minlength:1
            },
            password:{
                required:true,
                minlength:3,
                maxlength:12
            }
        },
        messages:{
            username:{
                required:"请输入用户名",
                minlength:"用户名必须包含至少一个字符哦"
            },
            password:{
                required:"请输入密码",
                minlength:"密码必须包含至少三个字符哦",
                maxlength:"密码包含最多十二个字符哦"
            }
        },
        submitHandler(form){
            // console.log(11111111111)
            const info=$(form).serialize()
            console.log(info)   
            $.get('../server/login.php',info,null,'json').then(function(res){
                console.log(res)
                if(res.code===0){
                    // console.log(11111122)
                    $('.info-error').css('display','flex')
                }else if(res.code===1){
                    $.setCookie('nickname',res.nickname)
                    window.location.href='../html/index.html'
                } 
            })
        }

    })

})
