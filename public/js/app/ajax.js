(function(){

    window.ajax = {
        socket: null,

        waitDiv: $('<div class="modal fade" id="pleaseWaitDialog" data-backdrop="static" data-keyboard="false"><div class="modal-dialog modal-sm"><div class="modal-content"><div class="modal-body"><div class="clearfix"><div class="pull-left"><h3>Please Wait...</h3></div> <div class="pull-right"><img src="/images/load.gif" /></div></div></div></div></div></div>'),

        showWait: function() {
            var self = this;

            self.waitDiv.modal();
        },

        hideWait: function() {
            var self = this;

            self.waitDiv.modal('hide');
        },

        loadURL: function(url, container, showWait, onSuccess, onError, onComplete) {
        	var self = this;
            container = container || $("#content");

	        $.ajax({
		        type : "GET",
		        url : url,
		        dataType : 'html',
		        beforeSend : function() {
                    if(showWait) {
                        self.showWait();
                    }
			        if (container[0] == $("#main-content")[0]) {
				        // scroll up
				        $("html, body").animate({
					        scrollTop : 0
				        }, "fast");
			        } else {
				        container.animate({
					        scrollTop : 0
				        }, "fast");
			        }
		        },
		        success : function(data) {
			        container.css({
				        opacity : '0.0'
			        }).html(data).delay(50).animate({
				        opacity : '1.0'
			        }, 300);
		        },
		        error : function(xhr, status, error) {
                    if(onError) {
                        onError(xhr.responseText);
                    } else {
                        window.ajax.addError(xhr.responseText);
                    }           
		        },
                complete: function() {
                    if(showWait) {
                        self.hideWait();
                    }
                    $('#status').html('');
                }        
	        });
        },

       getScript: function(url, showWait, onSuccess, onError, onComplete) {
	        var self = this;

	        $.ajax({
		        type : "GET",
		        url : url,
		        dataType : 'script',
		        beforeSend : function() {
                    if(showWait) {
                        self.showWait();
                    }
                },
		        success : function(data) {  
                        if(onSuccess) {
                            onSuccess(data);
                        }                               
		        },
		        error : function(xhr, status, error) {
                    if(onError) {
                        onError(xhr.responseText);
                    } else {
                        window.ajax.addError(xhr.responseText);
                    }           
		        },
                complete: function() {
                    if(showWait) {
                        self.hideWait();
                    }
                    if(onComplete) {
                        onComplete();
                    }
                }
	        });            
        },

        getText: function(url, data, showWait, onSuccess, onError, onComplete) {
	        var self = this;

	        $.ajax({
		        type : "GET",
		        url : url,
                data: data,
		        dataType : 'text',
		        beforeSend : function() {
                    if(showWait) {
                        self.showWait();
                    }
                },
		        success : function(data) {  
                        if(onSuccess) {
                            onSuccess(data);
                        }                               
		        },
		        error : function(xhr, status, error) {
                    if(onError) {
                        onError(xhr.responseText);
                    } else {
                        window.ajax.addError(xhr.responseText);
                    }           
		        },
                complete: function() {
                    if(showWait) {
                        self.hideWait();
                    }
                    if(onComplete) {
                        onComplete();
                    }
                }
	        });            
        },

        getHTML: function(url, data, showWait, onSuccess, onError, onComplete) {
	        var self = this;

	        $.ajax({
		        type : "GET",
		        url : url,
                data: data,
		        dataType : 'html',
		        beforeSend : function() {
                    if(showWait) {
                        self.showWait();
                    }
                },
		        success : function(data) {  
                        if(onSuccess) {
                            onSuccess(data);
                        }                               
		        },
		        error : function(xhr, status, error) {
                    if(onError) {
                        onError(xhr.responseText);
                    } else {
                        window.ajax.addError(xhr.responseText);
                    }           
		        },
                complete: function() {
                    if(showWait) {
                        self.hideWait();
                    }
                    if(onComplete) {
                        onComplete();
                    }
                }
	        });            
        },

        getJSON: function(url, data, showWait, onSuccess, onError, onComplete ) {
            var self = this;

	        $.ajax({
		        type : "GET",
		        url : url,
                data: data,
		        dataType : 'json',
		        beforeSend : function() {
                    if(showWait) {
                        self.showWait();
                    }
                },
		        success : function(data) {             
                        if(onSuccess) {
                            onSuccess(data);
                        }
		        },
		        error : function(xhr, status, error) {
                    if(onError) {
                        onError(xhr.responseText);
                    } else {
                        self.addError(xhr.responseText);
                    }           
		        },
                complete: function() {
                    if(showWait) {
                        self.hideWait();
                    }
                    if(onComplete) {
                        onComplete();
                    }
                }
	        });
        },

        post: function(url, data, showWait, onSuccess, onError, onComplete ) {
	        var self = this;

	        $.ajax({
		        type : "POST",
		        url : url,
                data: data,
		        dataType : 'json',
		        beforeSend : function() {
                    if(showWait) {
                        self.showWait();
                    }
                },
		        success : function(data) {
                    if(onSuccess) {
                        onSuccess(data);
                    } 
		        },
		        error : function(xhr, status, error) {
                    if(onError) {
                        onError(xhr.responseText);
                    } else {
                        window.ajax.addError(xhr.responseText);
                    }           
		        },
                complete: function() {
                    if(showWait) {
                        self.hideWait();
                    }
                    if(onComplete) {
                        onComplete();
                    }
                }
	        });
        },

        addError: function(error) {
	        var self = this;	        
           
	        $("#status").html(error);
        }

    }


})();