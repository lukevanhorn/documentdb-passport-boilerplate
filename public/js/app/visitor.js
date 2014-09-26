window.state = 'default';


$(document).ready(function () {
    
    updateScreen();

    $('[data-toggle="offcanvas"]').click(function () {
        $('.row-offcanvas').toggleClass('active');
    });

	$("#docLink").on('click', function (e) {
		e.preventDefault();

		window.ajax.getHTML('/documentation', null, true, function success(html) {
            $('#main-content div:first').html(html);
            window.state = 'default';
            updateScreen();
		}, function error(data) {
            $('#main-content').html(data || 'unknown error');
		});
	});

	$("#registerLink").on('click', function (e) {
		window.state = 'register';
		updateScreen();
		e.preventDefault();
	});

	$("#loginLink").on('click', function (e) {
		window.state = 'login';
		updateScreen();
	});

	$("#recoverLink").on('click', function (e) {
		window.state = 'recover';
		updateScreen();
		e.preventDefault();
	});
				
	$("#loginPassword").on('keypress', function(e){				
		if(e.keyCode == 13) {
			$("#loginButton").click();
		}
	});

    $("#registerConfirm").on('keypress', function(e){				
		if(e.keyCode == 13) {
			$("#registerButton").click();
		}
	});

	$('#loginForm').on('submit', function (e) {
		e.preventDefault();
		$('#loginError').html();

		var data = {
			email: $(this).find('input[name="email"]').val(),
			password: $(this).find('input[name="password"]').val()
		}

        if(!data.email || !data.password){
            $('#loginError').html('enter a username and password');
        }

		window.ajax.post('/auth/signin', data, true, function success(user) {
            window.user = user;
            window.location = "/";    
		}, function error(data) {
			$('#loginError').html(data.message || data || 'unknown error');
		});
	});

	$('#registerForm').on('submit', function (e) {
        e.preventDefault();
        
        $('#registerError').html();

		var data = {
			email: $(this).find('input[name="email"]').val(),
			password: $(this).find('input[name="password"]').val(),
            confirm: $(this).find('input[name="confirmpassword"]').val()
		}

        if(!data.email) {
            $('#registerError').html('error: passwords do not match');
            return;
        }
        
        if(data.password != data.confirm) {            
            $('#registerError').html('error: passwords do not match');
            return;
        }    
            
		window.ajax.post('/auth/register', data, true, function success(user) {
            window.user = user;
            window.location = "/";    
		}, function error(data) {
			$('#registerError').html(data || 'unknown error');
		});
	});
});


function updateScreen() {

	switch (window.state) {
		case 'register':
            $('#registerError').html('');
			$("#registerForm").show();
			$("#loginForm").hide();
            $("#auth-content").show();
            $("#main-content").hide();
            $("#registerEmail").focus();
			break;
		case 'login':
            $('#loginError').html('');
			$("#registerForm").hide();
			$("#loginForm").show();
            $("#auth-content").show();
            $("#main-content").hide();
            $("#loginEmail").focus();
			break;
		default:
			$("#registerForm").hide();
			$("#loginForm").hide();
            $("#auth-content").hide();
            $("#main-content").show();
			break;
	} 
}

