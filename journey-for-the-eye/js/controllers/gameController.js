var currentPrompt = null;
var name = "";
var gender = "";
var player = null;
var troll = null;

var newGame = function() {
	console.log("Game created");
	currentPrompt = null;
	introduction();
}

var gameLoop = function() {
	var hasEnded = false;
	while (!hasEnded) {
		hasEnded = true;
	}
}

var processInput = function(input) {
	console.log(input);
	responses.appendChild(createResponseDiv("::" + input));
	responses.appendChild(createResponseDiv("===================================="));
	if (currentPrompt !== null) {

		if (currentPrompt.question == "go-on-quest?") {
			if (input.toUpperCase() == currentPrompt.yes
				|| input.toUpperCase() == "Y") {
				applicationName();
			} else {
				responses.appendChild(createResponseDiv("GAME OVER"));
				currentPrompt = null;
			}
		}

		else if (currentPrompt.question == "name") {
			name = input.capitalize();
			applicationGender();
		}

		else if (currentPrompt.question == "gender") {
			if (currentPrompt.answers.indexOf(input.toUpperCase())
				!== -1) {
				gender = input.toUpperCase();
				player = new Character(name, gender);
				applicationWeapon();
			} else {
				responses.appendChild(createResponseDiv("<em>Enter a valid gender (<strong>M</strong> or <strong>F</strong>)</em>"));
			}
		}

		else if (currentPrompt.question == "weapon") {
			player.weapon = input;
			console.log(player);
			applicationComplete();
		}

		else if (currentPrompt.question == "mountains-or-village") {
			if (currentPrompt.answers.indexOf(input.toLowerCase())
				!== -1) {
				if (input.toLowerCase() == "mountains") {
					goToMountains();
				} else {
					goToVillage();
				}
			} else {
				responses.appendChild(createResponseDiv("<em>Please enter either <strong>mountains</strong> or <strong>village</strong></em>"));
			}
		}

		else if (currentPrompt.question == "store-or-leave") {
			if (currentPrompt.answers.indexOf(input.toLowerCase())
				!== -1) {
				if (input.toLowerCase() == "store") {
					goToStore();
				} else {
					goToMountains();
				}
			} else {
				responses.appendChild(createResponseDiv("<em>Please enter either <strong>store</strong> or <strong>leave</strong></em>"));
			}
		}

		else if (currentPrompt.question == "buy") {
			if (currentPrompt.answers.indexOf(input.toLowerCase())
				!== -1) {
				input = input.toLowerCase();
				if (input.includes("info")
					|| input == "1" || input == "one") {
					if (player.money >= 50) {
						player.money -= 50;
						getInformation();
						doStore();
					} else {
						responses.appendChild(createResponseDiv("Not enough money"));
					}
				} else if (input == "2" || input == "two"
					|| input.includes("bomb")) {
					if (player.money >= 75) {
						player.money -= 75;
						player.items.bombs = 5;
						doStore();
					} else {
						responses.appendChild(createResponseDiv("Not enough money"));
					}
				} else {
					var story = "You leave the store and find yourself back in the village. All the other buildings are homes and seem to serve little to no significance.";
					responses.appendChild(createResponseDiv(story));
					goToVillageAfterStore();
				}
			} else {
				responses.appendChild(createResponseDiv("Unknown command, try again"));
			}
		}

		else if (currentPrompt.question == "fight-or-flee") {
			if (currentPrompt.answers.indexOf(input.toLowerCase())
				!== -1) {
				input = input.toLowerCase();
				if (input == "fight") {
					var story = "You decide to fight the troll, as dangerous as it may be.";
					responses.appendChild(createResponseDiv(story));
					doCombat();
				} else {
					goToVillageAfterStore();
				}
			} else {
				responses.appendChild(createResponseDiv("Unknown command, try again"));
			}
		}

		else if (currentPrompt.question == "attacking") {
			if (currentPrompt.answers.indexOf(input.toLowerCase())
				!== -1) {
				input = input.toLowerCase();
				if (input == "1" || input == "one" || input == "attack") {
					responses.appendChild(createResponseDiv("You swing your mighty " + player.weapon + " at the foul beast!"));
					var random = Math.random();
					var damage = Math.floor(Math.random() * 2 + 2);
					if (random >= .15) {
						responses.appendChild(createResponseDiv("The strike hits for " + damage + " damage!"));
						troll.health -= damage;
					} else {
						responses.appendChild(createResponseDiv("How could you miss when you're fighting such a huge enemy?"));
					}
				} else if (input == "2" || input == "two" || input.includes("potion")) {
					if (player.items.healthpotion > 0) {
						responses.appendChild(createResponseDiv("You used a health potion and restored 10hp!"));
						player.health += 15;
						player.items.healthpotion -= 1;
					} else {
						doCombat();
					}
				} else {
					if (player.items.bombs > 0) {
						responses.appendChild(createResponseDiv("You throw a bomb and it deals 5 damage to the troll!"));
						troll.health -= 5;
						player.items.bombs -= 1;
					} else {
						doCombat();
					}
				}
				var damage = Math.floor(Math.random() * 3 + 2);
				responses.appendChild(createResponseDiv("The troll lands a blow from his gigantic club, dealing " + damage + " damage to you!"));
				player.health -= damage;
				doCombat();
			} else {
				responses.appendChild(createResponseDiv("Unknown command, try again"));
			}
		}

		else if (currentPrompt.question == "cave-or-village") {
			if (currentPrompt.answers.indexOf(input.toLowerCase())
				!== -1) {
				input = input.toLowerCase();
				if (input == "enter") {
					var story = "You enter the cave. It is damp and cold, and there is a strong draft coming from the passageway before you. The draft brings with it an air of dread--a misery unlike any you've ever felt. You understand now how those who came before could have failed what seemed to be a simple task.";
					responses.appendChild(createResponseDiv(story));
					goToCave();
				} else {
					if (!player.beenToVillage) {
						goToVillage();
					} else {
						goToVillageAfterStore();
					}
				}
			} else {
				responses.appendChild(createResponseDiv("Unknown command, try again"));
			}
		}

		else if (currentPrompt.question == "end-or-leave") {
			if (currentPrompt.answers.indexOf(input.toLowerCase())
				!== -1) {
				input.toLowerCase();
				if (input == "forward") {
					console.log("I'M HERE");
					goToEnding();
				} else if (input == "leave") {
					goToMountains();
				} else if (input == "left") {
					goToLeftPassage();
				} else {
					console.log(input);
					responses.appendChild(createResponseDiv("Unknown command, try again"));
				}
			} else {
				responses.appendChild(createResponseDiv("Unknown command, try again"));
			}
		}

		else if (currentPrompt.question == "smash-or-take") {
			console.log(currentPrompt);
			if (currentPrompt.answers.indexOf(input.toLowerCase())
				!== -1) {
				input = input.toLowerCase();
				if (input == "smash") {
					goToDestructionEnding();
				} else {
					goToCorruptedEnding();
				}
			} else {
				responses.appendChild(createResponseDiv("Unknown command, try again"));
			}
		}
	}
	scrollToBottom();
}

var createResponseDiv = function(input) {
	var div = document.createElement("div");
	div.className += "response";
	div.innerHTML = input;
	return div;
}

var introduction = function() {
	var storyIntro = "&quot;" +
		"Welcome to the wondrous land of Caldro-Go! My name is Royce, and I'm the court magistrate. You're here for the quest to obtain The Eye, correct?"
	+ "&quot;";

	responses.appendChild(createResponseDiv(storyIntro));

	currentPrompt = {
		question: "go-on-quest?",
		yes: "YES"
	};
}

var applicationName = function() {
	var speech = "&quot;" +
		"Very good! Now, here's an application I'll need you to fill out. It's got some legal information on there too; we're not liable for anything if you die on the quest."
	+ "&quot;";
	responses.appendChild(createResponseDiv(speech));

	var story = "Royce hands you a sheet of parchment fastened neatly to a slab of wood along with a quill and ink. You glance around for a place to sit, finding suitable accomodations under a tent just to your right. Reading the application, the first line simply asks for your name.";
	responses.appendChild(createResponseDiv(story));

	var prompt = "<em>Enter a <strong>name</strong> for your character</em>";
	responses.appendChild(createResponseDiv(prompt));

	currentPrompt = {
		question: "name"
	};

}

var applicationGender = function() {
	var story = "You scribble your name, " + name + ", onto the page and move on to the next question.";
	responses.appendChild(createResponseDiv(story));

	var prompt = "<em>Enter a gender (<strong>M</strong> or <strong>F</strong></em>)";
	responses.appendChild(createResponseDiv(prompt));

	currentPrompt = {
		question: "gender",
		answers: ["M", "F"]
	};
}

var applicationWeapon = function() {
	var story = "With your gender filled out, you move on. A look of surprise takes over as you read &quot;What kind of weapon are you proficient with?&quot; <em>A weapon? I don't know how to use any weapons!</em> you think, for you were unaware that a weapon was necessary. Although now that you think about it, the whole dying thing was pretty ominous too. Maybe you should rethink going on this adventure.";
	responses.appendChild(createResponseDiv(story));

	var prompt = "<em>Pick a <strong>weapon</strong> (anything will do)";
	responses.appendChild(createResponseDiv(prompt));

	currentPrompt = {
		question: "weapon"
	};
}

var applicationComplete = function() {
	var story = "As your pen leaves the page of parchment before you, you see that you've reached the end of the front of the application. There's a long paragraph of legal jargon on the back, but you ignore it and check the box at the bottom denoting that you have indeed read it.";
	responses.appendChild(createResponseDiv(story));

	story = "You return to Royce with the quill, ink, and application. He thanks you and wedges the still inked quill between his ear and temple before perusing the application. Stroking his long greying beard, he questions you.";
	responses.appendChild(createResponseDiv(story));

	story = "&quot;" +
		"You're really proficient with the " + player.weapon + "? Well, alright, we can get you one from the armory. Just ask Bob before you leave. Well, everything checks out, and I see you read the legal notice on the back! Wonderful. Be careful on your journey, " + player.name + ". Oh, and here's a map so you don't get lost!"
	+ "&quot;";
	responses.appendChild(createResponseDiv(story));

	story = "You go to the armory and pick up the " + player.weapon + " from Bob before leaving north from the city. You see a <strong>village</strong> to the east and <strong>mountains</strong> continuing north.";
	responses.appendChild(createResponseDiv(story));

	currentPrompt = {
		question: "mountains-or-village",
		answers: ["mountains", "village"]
	}
}

var goToVillage = function() {
	var story = "You walk toward the village. It is small with only a few buildings, each with thatched roofing. The roads are dirt and the people living there are mostly older. Everything in town seems weathered.";
	responses.appendChild(createResponseDiv(story));

	story = "A woman with grey hair and large, round, black eyes approaches you; she is slightly hunched over and moves as a tortoise. She speaks to you as slowly as she walks.";
	responses.appendChild(createResponseDiv(story));

	var speech = "&quot;" +
		"Another one of Caldro-Go's adventurers, eh? I've seen many of you come and go, never to return, so what I'm about to tell you is probably for naught. Either way, you should know that The Eye is not something to be trifled with. It corrupts absolutely whoever touches it. You'll probably die anyways, but if you do make it to the Chamber of Secrets, don't pick up the eye; destroy it."
	+ "&quot;";
	responses.appendChild(createResponseDiv(speech));

	var prompt = "<em>You give the old woman a glance of pure discomfort. There's a <strong>store</strong> in the village that you can go to, or you can <strong>leave</strong></em>";
	responses.appendChild(createResponseDiv(prompt));

	player.beenToVillage = true;

	currentPrompt = {
		question: "store-or-leave",
		answers: ["store", "leave"]
	};
}

var goToStore = function() {
	if (!player.beenToStore) {
		var story = "You enter the store and see a large man behind the counter with shelves of items behind him. He seems reluctant to sell anything. Maybe he doesn't actually want to make money.";
		responses.appendChild(createResponseDiv(story));

		var speech = "&quot;" +
			"You're a new face. I'll only sell certain things, so what can I do for you?"
		+ "&quot;";
		responses.appendChild(createResponseDiv(speech));

		player.beenToStore = true;

		doStore();
	} else {
		var story = "You enter the store and the man welcomes you back.";
		responses.appendChild(createResponseDiv(story));

		doStore();
	}
}

var goToVillageAfterStore = function() {
	var prompt = "<em>Go back to the <strong>store</strong>, or you can <strong>leave</strong> the village and proceed to the mountains.</em>";
	responses.appendChild(createResponseDiv(prompt));

	currentPrompt = {
		question: "store-or-leave",
		answers: ["store", "leave"]
	};
}

var goToMountains = function() {
	if (!player.beenToMountains) {
		troll = new Enemy("troll", 15, 25);
		var story = "You arrive at the base of the mountains. Mangled and battered skeletons litter the surrounding area. You feel a cold emptiness wash over you as the realization that you're in way over your head crawls into your mind.";
		responses.appendChild(createResponseDiv(story));

		story = "A sound of rustling behind you chills your bones. You turn around to see a troll leap through the air (how, he's huge!) at you. You jump to the left as he slams face first into the granite ground. He stands up, clearly dazed from his magnificent landing. Trolls aren't known to be the brightest of course. Harry and Ron felled one in their first year!";
		responses.appendChild(createResponseDiv(story));

		var prompt = "<em><strong>Fight</strong> the troll or <strong>flee</strong> back to the village</em>";
		responses.appendChild(createResponseDiv(prompt));

		currentPrompt = {
			question: "fight-or-flee",
			answers: ["fight", "flee"]
		};

		player.beenToMountains = true;
	} else {
		if (!player.defeatedTroll) {
			troll = new Enemy("troll", 5, 25);
			var story = "You see the troll walking around. He lifts his massive club up in the air far too excitedly and drops it on his head, causing him to fall to his knee and take 10 damage.";
			responses.appendChild(createResponseDiv(story));

			var prompt = "<em><strong>Fight</strong> the troll or <strong>flee</strong> back to the village</em>";
			responses.appendChild(createResponseDiv(prompt));

			currentPrompt = {
				question: "fight-or-flee",
				answers: ["fight", "flee"]
			};
		} else {
			var story = "You see an entrance to the cave. Spider webs and purple shadows emanate from the blackness that you presume to be the entrance.";
			responses.appendChild(createResponseDiv(story));

			var prompt = "<em><strong>Enter</strong> the cave or go back to the <strong>village</strong></em>";
			responses.appendChild(createResponseDiv(prompt));

			currentPrompt = {
				question: "cave-or-village",
				answers: ["enter", "village"]
			};
		}
	}
}

var doStore = function() {
	var prompt = "<em><strong>1. Information (50 money)</strong><br><strong>2. Bombs (75 money for 5)</strong><br><strong>3. Leave</strong></em>";
	responses.appendChild(createResponseDiv(prompt));
	responses.appendChild(createResponseDiv("Money: " + player.money));

	currentPrompt = {
		question: "buy",
		answers: ["1", "2", "3", "one", "info", "information", "two", "bombs", "three", "leave"]
	};
}

var doCombat = function() {
	if (troll.health <= 0) {
		var story = "You've defeated the troll! You've earned " + troll.money + " money!";
		responses.appendChild(createResponseDiv(story));
		player.defeatedTroll = true;
		player.money += troll.money;

		goToMountains();
	} else if (player.health <= 0) {
		responses.appendChild(createResponseDiv("GAME OVER"));
		currentPrompt = null;
	} else {
		var prompt = "<em><strong>1. Attack<br>2. Use Health Potion: " + player.items.healthpotion + "<br>3. Use Bomb: " + player.items.bombs + "</strong></em>";
		responses.appendChild(createResponseDiv(prompt));

		var stats = "<strong>" + player.name + "'s Health:</strong> " + player.health + "<br><strong>" + troll.name.capitalize() + "'s Health:</strong> " + troll.health;
		responses.appendChild(createResponseDiv(stats));

		currentPrompt = {
			question: "attacking",
			"answers": ["1", "2", "3", "one", "two", "three", "attack", "potion", "bomb"]
		};
	}
}

var goToCave = function() {
	currentPrompt = {
		question: "end-or-leave",
		answers: ["forward", "leave"]
	};

	var prompt = "<em>Move <strong>forward</strong> to the drafty tunnel or <strong>leave</strong> the cave.</em>";

	if (player.hasInfo && !player.openedWall) {
		if (player.items.bombs > 0) {
			story = "You examine your surroundings more closely, armed with the knowledge the shopkeep gave you. You notice the wall to the left is not a solid wall, but boulders stacked, blocking off a passage. You set a bomb down to blow the makeshift wall down, light it, and run outside the cave. After the blast, you return to see the passageway revealed.";
			responses.appendChild(createResponseDiv(story));

			prompt = "<em>Enter the <strong>left</strong> passageway, move <strong>forward</strong> to the drafty tunnel, or <strong>leave</strong> the cave.</em>";
			currentPrompt.answers.push("left");
			player.openedWall = true;
		} else {
			story = "You examine your surroundings more closely, armed with the knowledge the shopkeep gave you. You notice the wall to the left is not a solid wall, but boulders stacked, blocking off a passage. You'll need bombs to remove it.";
			responses.appendChild(createResponseDiv(story));

			prompt = "<em>Move <strong>forward</strong> to the drafty tunnel or <strong>leave</strong> the cave.</em>";
		}
	}
	console.log(currentPrompt);
	responses.appendChild(createResponseDiv(prompt));
}

var getInformation = function() {
	var speech = "&quot;" +
		"One of the walls in the cave is not very sturdy. You heard what the old lady said, I assume, since she stands out there all day and night to warn anyone wanting to get The Eye. Behind that wall is where they say the only item in the universe capable of destroying The Eye resides. Check it out. I sell bombs by the way. You'll need them. :)"
	+ "&quot;";
	responses.appendChild(createResponseDiv(speech));
	player.hasInfo = true;
}

var goToLeftPassage = function() {
	var story = "You enter the passage you've just cleared out. Within the small cavern sits a skeleton not yet withered by the heartless beast that is time. Its head leans against the granite behind it, with an object in its hands. The object glows eerily, but it must be device capable of destroying The Eye. You pick it up. The object cause your hands to tingle sharply. With it, you move back out to to the cave's entrance, ready to confront The Eye itself.";
	responses.appendChild(createResponseDiv(story));
	player.canDestroyEye = true;
	goToCave();
}

var goToEnding = function() {
	var story = "You move forward into the tormented passage. Each step you take depletes a little bit of joy from your soul. You can feel your mind cracking, nigh to the point of shattering. Your sanity oozes from your body as viscious tendrils of shadow tear through the air from beyond the dark, dank tunnel.";
	responses.appendChild(createResponseDiv(story));

	story = "You finally reach a cavern, large and open; it is empty save for a lone pedestal towards the back. You lurch forward, the tendrils flailing madly from seemingly no source. Yet you press on, holding to your quest. You've made it this far, after all. Finally, you reach The Eye which sits atop the pedestal. You can feel the immense power of The Eye as it tears into your head--your very soul being crushed by an immense weight of fear.";
	responses.appendChild(createResponseDiv(story));

	if (player.canDestroyEye) {
		story = "You have a device capable of destroying The Eye, a short rod with a symbol of a cracked eye carved into it.";
		responses.appendChild(createResponseDiv(story));

		var prompt = "<em><strong>Smash</strong> The Eye or <strong>take</strong> it as your own.</em>";
		responses.appendChild(createResponseDiv(prompt));

		currentPrompt = {
			question: "smash-or-take",
			answers: ["smash", "take"]
		};
	} else {
		goToCorruptedEnding();
	}
}

var goToDestructionEnding = function() {
	currentPrompt = null;

	var story = "You raise the rod over your head and deal a swift blow to The Eye. It appears as though nothing happens, but after a moment of anxiety and fear, a small crack formed. The crack continued to grow around the evil orb before you until the entire circumference of The Eye was cracked and it split into two halves.";
	responses.appendChild(createResponseDiv(story));

	story = "As the halves fell apart, a massive amount of energy released into the world along with the screams and moans of thousands of lost souls. The tormented despair that previously gripped you floated away, releasing you from its drowning hold.";
	responses.appendChild(createResponseDiv(story));

	story = "You walked out of the cave and sat down, just outside of it. You did it. You destroyed a dangerously destructive artifact that destroyed the minds of any who drew near to it. Even so, you couldn't help feeling that you weren't the same as you were before you entered the cave...";
	responses.appendChild(createResponseDiv(story));
}

var goToCorruptedEnding = function() {
	currentPrompt = null;

	var story = "You reach for The Eye, grasping it tightly with both hands. You notice your hands begin to shrivel as if the life is being drained from them. The shriveling crawls up your arms and to the rest of your body until you become a greying husk of what you once were. A devilish voice rang through your mind, rasping and with multiple tones--male and female.";
	responses.appendChild(createResponseDiv(story));

	var pronoun = player.gender == "M" ? "boy" : "girl";

	var speech = "<em>&quot;" +
		"Well done " + pronoun + "... How does it feel to have made it so far? What lies beyond you is unlike anything that could be experienced in this world. Your soul will be vacated from your shell and lie awake in helpless torment for the rest of eternity with me in the realm of the void."
	+ "&quot;</em>";
	responses.appendChild(createResponseDiv(speech));

	story = "The voice laughs with pure insanity. You feel your body decay into nothing and you feel your soul spiral into a realm, devoid of life and joy. You slowly lose all comprehension of thought and self as you slip away...";
	responses.appendChild(createResponseDiv(story));
}

newGame();