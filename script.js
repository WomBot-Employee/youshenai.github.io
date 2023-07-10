const chatOutput = document.querySelector('.chat-output');
const chatInput = document.querySelector('.chat-input input');
const chatButton = document.querySelector('.chat-input button');


// Array of random tips
const tips = [
  "type personality to change the ai personality",
  "look in the top right for the ai generation, please",
  // Add more tips here
];

function getRandomTip() {
  return tips[Math.floor(Math.random() * tips.length)];
}

function scrollToBottom() {
  chatOutput.scrollTop = chatOutput.scrollHeight;
}


// Display a random tip on page load
window.addEventListener('DOMContentLoaded', function() {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message', 'api-response', 'yellow-tip');
  messageElement.textContent = getRandomTip();
  chatOutput.appendChild(messageElement);
});


chatButton.addEventListener('click', () => {
  const message = chatInput.value;
  if (message.trim() === '') {
    return;
    scrollToBottom();
  }
  
	const messageElement = document.createElement('div');
	messageElement.classList.add('message', 'outgoing');
	messageElement.textContent = message;
	chatOutput.appendChild(messageElement);
	chatInput.value = '';

	var request = new XMLHttpRequest();
	request.open('GET', 'https://www.botlibre.com/rest/api/form-chat?&application=2493172129497750699&instance=165&message=' + message.trim(), true);
	request.onreadystatechange = function() {
		if (request.readyState === 4 && request.status === 200) {
			const parser = new DOMParser();
			const xmlDoc = parser.parseFromString(request.responseText, "text/xml");
			const message = xmlDoc.getElementsByTagName("message")[0].textContent;
			chatOutput.innerHTML += '<div class="message api-response">' + message + '</div>';
        scrollToBottom();
		}
	};
	request.send();
  scrollToBottom();
});

chatInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		chatButton.click();
	}
});
