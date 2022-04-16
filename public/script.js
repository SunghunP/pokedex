// variables
const submitBtn = document.getElementById('submit-button');
const inputs = document.querySelectorAll('input');
console.log(inputs)

// function to check if input fields are empty or not
function disableEmptyInput () {
	inputs.forEach(input => {
		console.log(input.value)
		// if the input returns an empty string...
		// an empty string is a falsy value so we want to ask if it is false.
		// the ! operator will make "" become true therefore running the code block. 
		// "" = false, !"" = true
		if (!input.value) {
			// if the value is empty meaning no user input then we disable the input 
			input.setAttribute("disabled", "disabled");
		}
	});
}

// create an event listener that disables empty input fields 
submitBtn.addEventListener("click", () => {
	disableEmptyInput()
})