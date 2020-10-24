function func0 () {  //Starting question
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "_*Toaster Diagnostic Routine*_\nIf your toaster is not producing sufficiently heated bread, follow the steps below."
				}
			},
			{
				"type": "divider"
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :thumbsup: if your toaster is plugged in.\nReact with :thumbsdown: if it is not."
				}
			}
		]
	}
	var answer = [	{"emoji":"thumbsup", "function": func2()},
					{"emoji":"thumbsdown", "function": func1()}]
	return { "q":question, "a":answer }
}

function func1 () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "Plug the toaster into an electrical socket."
				}
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :thumbsup: if that fixed the issue.\nReact with :thumbsdown: if it did not."
				}
			}
		]
	}
	var answer = [	{"emoji":"thumbsup", "function": fixed()},
					{"emoji":"thumbsdown", "function": func2()}]
	return { "q":question, "a":answer }
}

function func2 () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :thumbsup: if there is any bread in the toaster.\nReact with :thumbsdown: if there is not."
				}
			}
		]
	}
	var answer = [	{"emoji":"thumbsup", "function": func4()},
					{"emoji":"thumbsdown", "function": func3()}]
	return { "q":question, "a":answer }
}

function func3 () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "Put some bread into the toaster."
				}
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :thumbsup: if that fixed the issue.\nReact with :thumbsdown: if it did not."
				}
			}
		]
	}
	var answer = [	{"emoji":"thumbsup", "function": fixed()},
					{"emoji":"thumbsdown", "function": func4()}]
	return { "q":question, "a":answer }
}

function func4 () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :thumbsup: if the heat is set between 3 and 5.\nReact with :thumbsdown: if it is not."
				}
			}
		]
	}
	var answer = [	{"emoji":"thumbsup", "function": func6()},
					{"emoji":"thumbsdown", "function": func5()}]
	return { "q":question, "a":answer }
}

function func5 () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "Set the heat of the toaster to between 3 and 5."
				}
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :thumbsup: if that fixed the issue.\nReact with :thumbsdown: if it did not."
				}
			}
		]
	}
	var answer = [	{"emoji":"thumbsup", "function": fixed()},
					{"emoji":"thumbsdown", "function": func6()}]
	return { "q":question, "a":answer }
}

function func6 () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :thumbsup: if the toaster is pushed down.\nReact with :thumbsdown: if it is not."
				}
			}
		]
	}
	var answer = [	{"emoji":"thumbsup", "function": not_fixed()},
					{"emoji":"thumbsdown", "function": func7()}]
	return { "q":question, "a":answer }
}

function func7 () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "Push the toaster down."
				}
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :thumbsup: if that fixed the issue.\nReact with :thumbsdown: if it did not."
				}
			}
		]
	}
	var answer = [	{"emoji":"thumbsup", "function": fixed()},
					{"emoji":"thumbsdown", "function": not_fixed()}]
	return { "q":question, "a":answer }
}

function fixed () {  // Called if the issue is diagnosed.
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "Thanks for using me.\nHave a nice day!"
				}
			}
		]
	}
	var answer = []
	return { "q":question, "a":answer }
}

function not_fixed () {  //Called if the issue cannot be diagnosed/
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "Sorry, I can't help you. Please ping someone in maintenance for additional assistance."
				}
			}
		]
	}
	var answer = []
	return { "q":question, "a":answer }
}
