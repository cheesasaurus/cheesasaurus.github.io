/**** game/Modules/Overview/ScavengingOverview.js ****/
define("Ig/TribalWars/Modules/Overview/ScavengingOverview", ["Ig/TribalWars/Modules/Scavenging/ScavengeOption", "Ig/TribalWars/Modules/Scavenging/ScavengingService", "Ig/TribalWars/Modules/Scavenging/ScavengeVillage", "Ig/TribalWars/Modules/VillagePlace/ScavengeScreen/DialogLauncher", "Ig/TribalWars/Modules/Scavenging/ScavengeVillageSynchronizer"], function(o, t, i, r, n) {
    "use strict";

    function e(n, e) {
        for (var a in this.option_bases = n, this.scavenging_service = new t, this.village_data = {}, e) e.hasOwnProperty(a) && (this.village_data[a] = i.createFromDTO(this.option_bases, e[a]))
    }
    return e.prototype = {
        init: function() {
            var i = this;
            $.each(i.village_data, function(n, t) {
                i.updateVillageStatus(t), $.each(t.options, function(n, e) {
                    var a = t;
                    e.on(o.EVENT_STATUS_CHANGED, function() {
                        i.updateVillageStatus(a)
                    })
                })
            }), UI.ToolTip(".scavenging-row .scavenging-option", {
                bodyHandler: function() {
                    var n = $(this),
                        e = n.parents(".scavenging-row"),
                        a = i.village_data[e.data("village")],
                        t = n.data("option");
                    return i.getTooltipBody(a, t)
                }
            }), $(".scavenging-row .scavenging-option").on("mouseover", function() {
                Timing.tickHandlers.timers.initTimers("scavenging-timer", null)
            }).on("click", function() {
                return i.handleClick($(this)), !1
            }), this.village_synchronizer = new n(this.village_data, this.scavenging_service), $(TribalWars).on("global_tick", function() {
                i.village_synchronizer.processTiming()
            })
        },
        handleClick: function(n) {
            var e = n.parents(".scavenging-row").data("village"),
                a = n.data("option"),
                t = this.village_data[e],
                i = t.options[a];
            i.getStatus() === o.STATUS_LOCKED ? new r(t, this.scavenging_service, null, null).openUnlockOptionDialog(a) : i.getStatus() === o.STATUS_INACTIVE && Dialog.fetch("scavenge", "place", {
                ajax: "scavenge",
                village: e,
                option: a
            }, null, {}, function() {
                window.ScavengeScreen.unload()
            });
            return !1
        },
        updateVillageStatus: function(t) {
            var i = this,
                s = $("#scav_village_" + t.village_id);
            $.each(t.options, function(n, e) {
                var a = s.find(".scavenging-option-" + n);
                i.updateVillageOption(t, a, e)
            })
        },
        updateVillageOption: function(n, e, a) {
            e.find(".dot").attr("class", a.getOverviewDotClass())
        },
        getTooltipBody: function(n, e) {
            var a = n.options[e];
            if (a.getStatus() === o.STATUS_LOCKED) {
                var t = "<strong>" + _("d0f2e5376298c880665077b565ffd7dd") + "</strong><br />";
                return t += this.getResFragment(a.getUnlockCost()) + ' <span class="icon header time"></span>' + Format.timeSpan(1e3 * a.getUnlockDurationSeconds()), a.arePrerequisitesMet(n.options) || (t += '<br /><span class="red">' + _("368757654e9386c570f6b5d5460db6ac") + "</span>"), t
            }
            if (a.getStatus() === o.STATUS_UNLOCKING) return "<strong>" + s(_("e98abff26f106973edac94193806cacf"), '<span class="scavenging-timer" data-endtime="' + a.unlock_time + '"></span>') + "</strong>";
            if (a.getStatus() === o.STATUS_INACTIVE) return "<strong>" + _("78945de8de090e90045d299651a68a9b") + "</strong>";
            if (a.getStatus() === o.STATUS_ACTIVE) {
                t = "<strong>" + _("af28073c7fd2f2f0f9cfdad262bc3f69") + "</strong><br />";
                return t += this.getResFragment(a.scavenging_squad.loot_res), t += "<br />" + s(_("6b3d1468951e41d4f249465fd9192d3a"), '<span class="scavenging-timer" data-endtime="' + a.scavenging_squad.return_time + '"></span>')
            }
        },
        getResFragment: function(e) {
            return ["wood", "stone", "iron"].map(function(n) {
                return '<span class="icon header ' + n + '"></span>' + Format.number(e[n])
            }).join(" ")
        }
    }, e
});

;
