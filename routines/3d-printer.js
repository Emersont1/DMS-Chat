function turned_on() {
    var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
					"text": "_*3D Printer Diagnosis and Fault Finding*_\nThis is for the *CREALITY CR-10S PRO* Printer Model"
				}
            },
            {
				"type": "divider"
            },
            {
				"type": "section",
				"text": {
					"type": "mrkdwn",
                    "text": "*Important Notice:* Ensure the USB cable is not plugged in before proceeding"
				}
			},
			{
				"type": "divider"
			},
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
                    "text": "Is your 3D printer plugged in via the IEC-C13 Cable (the large cable towards the back of the machine on the right)\nReact :+1: for yes, :-1: for no"
				}
			}
		]
	}
	var answer = {"+1": connect_usb, "-1": plug_in_iec}
	return { "q":question, "a":answer }
}

function plug_in_iec(){
    var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
                    "text": "Please Do the following:\n* Plug in the IEC Cable\n* Ensure the Printer is switched on at the switch besides it and the touchscreen is lit\n* Plug in the USB cable\n* Go to the octoprint server https://example.com and press connect in the top left\nDid that fix it? React :+1: for yes, :-1: for no"
				}
			}
		]
	}
	var answer = {"+1": fixed, "-1": check_filament}
	return { "q":question, "a":answer }
}


function connect_usb(){
    var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
                    "text": "Please Do the following:\n* Plug in the USB cable\n* Go to the octoprint server https://example.com and press connect in the top left\nDid that fix it? React :+1: for yes, :-1: for no"
				}
			}
		]
	}
	var answer = {"+1": fixed, "-1": check_filament}
	return { "q":question, "a":answer }
}

function check_filament(){
    var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
                    "text": "Is the Filament Correctly loaded? React :+1: for yes, :-1: for no"
				}
			}
		]
	}
	var answer = {"+1": check_bed_levelling, "-1": load_filament}
	return { "q":question, "a":answer } 
}

function load_filament(){
    var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
                    "text": "Please load the filament according to this guide http://example.com/3d-printer/load-filament\nDid that fix it? React :+1: for yes, :-1: for no"
				}
			}
		]
	}
	var answer = {"+1": fixed, "-1": check_bed_levelling}
	return { "q":question, "a":answer } 
}

function check_bed_levelling(){
    var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
                    "text": "Has the bed been levelled?"
				}
			}
		]
	}
	var answer = {"+1": not_fixed, "-1": level_bed}
	return { "q":question, "a":answer } 
}

function level_bed(){
    var question = {
		"blocks": [
			{
				"type": "section",
				"text": {
					"type": "mrkdwn",
                    "text": "Please level the bed according to this guide http://example.com/3d-printer/level-bed\nDid that fix it? React :+1: for yes, :-1: for no"
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
    "func0": turned_on
}