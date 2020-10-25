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
					"text": "React with :+1: if your toaster is plugged in.\nReact with :-1: if it is not."
				}
			}
		]
	}
	var answer = {"+1": check_bread, "-1": plug_in}
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
					"text": "React with :+1: if that fixed the issue.\nReact with :-1: if it did not."
				}
			}
		]
	}
	var answer = {"+1": fixed, "-1": check_bread}
	return { "q":question, "a":answer }
}

function check_bread () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :+1: if there is any bread in the toaster.\nReact with :-1: if there is not."
				}
			}
		]
	}
	var answer = {"+1": heat_settings, "-1": insert_bread}
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
					"text": "React with :+1: if that fixed the issue.\nReact with :-1: if it did not."
				}
			}
		]
	}
	var answer = {"+1": fixed, "-1": heat_settings}
	return { "q":question, "a":answer }
}

function heat_settings () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :+1: if the heat is set between 3 and 5.\nReact with :-1: if it is not."
				}
			}
		]
	}
	var answer = {"+1": is_pushed_down, "-1": set_heat}
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
					"text": "React with :+1: if that fixed the issue.\nReact with :-1: if it did not."
				}
			}
		]
	}
	var answer = {"+1": fixed, "-1": is_pushed_down}
	return { "q":question, "a":answer }
}

function is_pushed_down () {
	var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "React with :+1: if the toaster is pushed down.\nReact with :-1: if it is not."
				}
			}
		]
	}
	var answer = {"+1": not_fixed, "-1": push_down}
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
					"text": "React with :+1: if that fixed the issue.\nReact with :-1: if it did not."
				}
			}
		]
	}
	var answer = {"+1": fixed, "-1": not_fixed}
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