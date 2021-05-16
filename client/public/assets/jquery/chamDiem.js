function validateForm() {
    
     if ( document.myForm.fPas.value == "" && document.myForm.fId.value == "") {
        alert("Bạn gì đó ơi! Cho mình xin thông tin với nào.");
        return false;
    }
    else if (document.myForm.fId.value == "") {
        alert("Uầy! Nhập ID vào bạn ơi.");
        return false;
    }
    else if ( document.myForm.fPas.value == "") {
        alert("Ối! Còn phải nhập mật khẩu nữa bạn ơi.");
        return false;
    }
    else if ( document.myForm.fPas.value == "" && document.myForm.fId.value == "") {
        alert("Bạn gì đó ơi! Cho mình xin thông tin với nào.");
        return false;
    }
    else
     return true;
}