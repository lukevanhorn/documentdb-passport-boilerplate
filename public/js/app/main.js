$(document).ready(function () {
    
    $("#logoutLink").hide();

    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });

	$("#docLink").on('click', function (e) {
		e.preventDefault();

		window.ajax.getHTML('/documentation', null, true, function success(html) {
            $('#main-content div:first').html(html);
		});
	});

	$("#logoutLink").on('click', function (e) {   
		e.preventDefault();
        $("#logoutLink").disable();
        window.ajax.post('/auth/signout', null, true, function success() {
                  
		}, function error(data) {
            $("#logoutLink").enable();
		});

	});

    window.ajax.getJSON('/user/me', null, true, function success(user){
        window.user = user;
        $("#logoutLink").show();
    });

	window.ajax.getHTML('/main', null, true, function success(html) {
        $('#main-content div:first').html(html);
	});
});


