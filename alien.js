	moveDirection		= null
	jumpDirection	 	= null
	timer            	= null
	jumpTimer 		 	= null
	jumpCounter 	 	= 0
	currentImage     	= 0
	window.onkeydown 	= checkKey;

	window.onload = function() {
		windowWidth = window.innerWidth;
		imgWidth = document.getElementById("c").width;
		posTopLeft = windowWidth-imgWidth;

		console.log(posTopLeft)

	}


	yUp = 0;
	yDown = 60;


	function moveRight(){
		currentImage++
		if(currentImage >= 30){
			currentImage = 0
		}
		
		document.getElementById('c').src = "alien/alienrwalk" + currentImage + ".gif"


		/*===========
			Alien moves left if it hits the right edge of the browser
		============*/
		if (document.getElementById("c").style.left == posTopLeft + "px") {
			clearInterval(timer)
			timer = setInterval("moveLeft()", 10)
			moveDirection = "left"

		/*===========
			Otherwise Alien will keep moving right
		============*/
		} else {
			document.getElementById('c').style.left=parseInt(document.getElementById('c').style.left) + 1 + "px"
		}
	}

	function moveLeft(){
		currentImage++
		if(currentImage >= 30){
			currentImage = 0
		}
		
		document.getElementById('c').src = "alien/alienlwalk" + currentImage + ".gif"

		/*===========
			Alien moves right if it hits the left edge of the browser
		============*/
		if (document.getElementById("c").style.left == "0px") {
			clearInterval(timer)
			timer = setInterval("moveRight()", 10)
			moveDirection = "right"

		/*===========
			Otherwise Alien will keep moving left
		============*/
		} else {
			document.getElementById('c').style.left=parseInt(document.getElementById('c').style.left) - 1 + "px"
		}
	}


	function jump() {
			
			if (yUp < 60) {
				console.log(moveDirection)
				document.getElementById('c').style.top=parseInt(document.getElementById('c').style.top) - 1 + "px";
				yUp++;
				console.log("up")
				if (yUp == 60) {
					yDown = 60;
				}

				if (moveDirection == "right") {
					console.log("moving right up")

					document.getElementById('c').style.left=parseInt(document.getElementById('c').style.left) + 1 + "px"


					//in the below code i'm trying to make the alien stay within the browser width when he happens to jump right before he hits the edge of the browser:

					/*if (document.getElementById("c").style.left == posTopLeft + "px") {
						clearInterval(timer)
						//timer = setInterval("moveLeft()", 10)
						document.getElementById('c').src = "alien/alienlwalk" + currentImage + ".gif"

						document.getElementById('c').style.left=parseInt(document.getElementById('c').style.left) - 1 + "px"

						
					} else {
						document.getElementById('c').style.left=parseInt(document.getElementById('c').style.left) + 1 + "px"
					}
					*/

					//clearInterval(timer)
					//timer = setInterval("moveRight()", 10)


				} else if (moveDirection == "left") {
					console.log("moving left up")

					document.getElementById('c').style.left=parseInt(document.getElementById('c').style.left) - 1 + "px"
					//clearInterval(timer)
					//timer = setInterval("moveLeft()", 10)
				}

				
			} else if (yDown > 0 ) {
				//document.getElementById('c').style.top--
				document.getElementById('c').style.top=parseInt(document.getElementById('c').style.top) + 1 + "px";
				yDown--;
				console.log("down")
				if (yDown == 0) {
					yUp = 0;
				}

				if (moveDirection == "right") {
					console.log("moving right down")

					document.getElementById('c').style.left=parseInt(document.getElementById('c').style.left) + 1 + "px"
					clearInterval(timer)
					timer = setInterval("moveRight()", 10)

				} else if (moveDirection == "left") {
					console.log("moving left down")

					document.getElementById('c').style.left=parseInt(document.getElementById('c').style.left) - 1 + "px"
					clearInterval(timer)
					timer = setInterval("moveLeft()", 10)

				}

			}
		
	}




	function checkKey(e){
		var keyCode = null

		if(e.event){
			keyCode = e.event
		}else if(e.which){
			keyCode = e.which
		}
		if(keyCode == null){
			alert("can't handle this key")
		}

		if (document.getElementById('c').style.top == "60px") {

			if(keyCode == 39){
			    if(moveDirection != "right"){
					clearInterval(timer)
					timer = setInterval("moveRight()", 10)
					moveDirection = "right"
					console.log("moving right")
					console.log(moveDirection)

				}
			}else if(keyCode == 37){
			    if(moveDirection != "left"){
					clearInterval(timer)
					timer = setInterval("moveLeft()", 10)
					moveDirection = "left"
					console.log("moving left")
					console.log(moveDirection)
				}
				
			}else if(keyCode == 32) {
				clearInterval(timer) // clears the timer that calls the moveRight() or moveLeft() functions, therefore stopping the alien walk animation so that when the alien jumps, it will remain on one image
				clearInterval(jumpTimer)
				jumpTimer = setInterval("jump()", 10);
				setTimeout("clearInterval(jumpTimer)", 1210); //tells the jumpTimer to stop after 1210 seconds
			}

			//alert(keyCode)
		}		

	}