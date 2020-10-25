function plugged_in () {  //Starting question
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
	var answer = {"thumbsup": check_bread, "thumbsdown": plug_in}
	return { "q":question, "a":answer }
}

function plug_in () {
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
	var answer = {"thumbsup": fixed, "thumbsdown": check_bread}
	return { "q":question, "a":answer }
}

function check_bread () {
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
	var answer = {"thumbsup": heat_settings, "thumbsdown": insert_bread}
	return { "q":question, "a":answer }
}

function insert_bread () {
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
	var answer = {"thumbsup": fixed, "thumbsdown": heat_settings}
	return { "q":question, "a":answer }
}

function heat_settings () {
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
	var answer = {"thumbsup": is_pushed_down, "thumbsdown": set_heat}
	return { "q":question, "a":answer }
}

function set_heat () {
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
	var answer = {"thumbsup": fixed, "thumbsdown": is_pushed_down}
	return { "q":question, "a":answer }
}

function is_pushed_down () {
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
	var answer = {"thumbsup": not_fixed, "thumbsdown": push_down}
	return { "q":question, "a":answer }
}

function push_down () {
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
	var answer = {"thumbsup": fixed, "thumbsdown": not_fixed}
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
	var answer = {}
	return { "q":question, "a":answer }
}

function not_fixed () {  //Called if the issue cannot be diagnosed.
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
	var answer = {}
	return { "q":question, "a":answer }
}

module.exports = {
    "func0":plugged_in
}