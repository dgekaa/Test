
window.onload = () => {
	clickBtns();
}

	const rocessingRequest = (length = 0, substr="") => {
		const inputData = document.querySelector(".enterData");
		const checkbox = document.querySelector(".register");
		const output = document.querySelector(".output");

		output.innerHTML = "";
		
		if(inputData.value){
			fetch("https://cors.io/?http://www.mrsoft.by/data.json")
			.then(response => response.json())
			.then(data => {
				data.data
					.filter((el) => el.length > length )
					.filter((el) => 
						checkbox.checked 
							? el.indexOf(substr) === -1 
								? null 
								: el
							: el.toUpperCase().indexOf(substr.toUpperCase()) === -1 
								? null 
								: el
					)
					.forEach((el, i) => {
						let li = document.createElement("li");
						li.innerHTML = el;
						output.appendChild(li);
						inputData.value = "";
					});
			})
			.catch(err => console.log(err))
		}
		return null
	}

const clickBtns = () => {
	const form = document.querySelector("form");
	const inputData = document.querySelector(".enterData");
	const lengthBTN = document.querySelector(".filterLength");
	const substrBTN = document.querySelector(".filterSubstr");

	inputData.focus();

	form.addEventListener("submit", e => e.preventDefault());

	lengthBTN.addEventListener("click", () => {
		rocessingRequest(inputData.value);	
	})

	substrBTN.addEventListener("click", () => {
		rocessingRequest(0, inputData.value);	
	})
}