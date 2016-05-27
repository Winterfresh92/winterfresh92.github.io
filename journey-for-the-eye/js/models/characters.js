var Character = function(name, gender) {
	this.name = name;
	this.gender = gender;
	this.health = 20;
	this.money = 100;
	this.beenToStore = false;
	this.beenToMountains = false;
	this.beenToVillage = false;
	this.defeatedTroll = false;
	this.hasInfo = false;
	this.canDestroyEye = false;
	this.openedWall = false;
	this.items = {
		healthpotion: 1,
		bombs: 0
	};
}

var Enemy = function(name, health, money) {
	this.name = name;
	this.health = health;
	this.money = money;
}