; /**** game/Modules/VillagePlace/ScavengeScreen/DialogLauncher.js ****/
define("Ig/TribalWars/Modules/VillagePlace/ScavengeScreen/DialogLauncher", ["Ig/TribalWars/Modules/Scavenging/Widgets/UnlockOptionDialog/UnlockOptionWidget"], function(t) {
    function e(e, i, n, t) {
        this.village = e, this.scavenging_service = i, this.rate_schedule = n, this.amount_schedule = t
    }
    return e.prototype = {
        openUnlockOptionDialog: function(e) {
            var i = "unlock-option-" + e,
                n = new t(this.village, e, this.scavenging_service, this.rate_schedule, this.amount_schedule);
            Dialog.openWidget(i, n)
        }
    }, e
});
