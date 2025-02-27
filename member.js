function skillMember() {
    this.name = 'skillMember';
    this.skill = 'JavaScript';
    this.show = function() {
        console.log(this.name + ' has a skill in ' + this.skill);
    };
}
