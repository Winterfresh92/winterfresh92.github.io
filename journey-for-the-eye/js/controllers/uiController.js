var responses = document.getElementById("responses");
var inputBox = document.getElementById("input");

function scrollToBottom() {
	responses.scrollTop = responses.scrollHeight;
}

responses.addEventListener("change", function() {
});

inputBox.addEventListener("keyup", function(event) {
	event.preventDefault();
	var input = inputBox.value.trim();
	if (event.keyCode == 13 && input !== "") {
		processInput(input);
		inputBox.value = "";
	}
});

String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};

var resetColors = function() {
	document.getElementsByTagName("BODY")[0].classList.remove("dark");
	document.getElementsByTagName("BODY")[0].classList.remove("dos");
	document.getElementById("input").classList.remove("dark");
	document.getElementById("input").classList.remove("dos");
}

var defaultColor = function(btn) {
	resetColors();
}

var darkColor = function(btn) {
	resetColors();
	document.getElementsByTagName("BODY")[0].classList.add("dark");
	document.getElementById("input").classList.add("dark");
}

var dosColor = function(btn) {
	resetColors();
	document.getElementsByTagName("BODY")[0].classList.add("dos");
	document.getElementById("input").classList.add("dos");
}