; /**** game/Modules/Scavenging/Widgets/UnlockOptionDialog/UnlockOptionStateReducer.js ****/
define("Ig/TribalWars/Modules/Scavenging/Widgets/UnlockOptionDialog/UnlockOptionStateReducer", ["Ig/TribalWars/Modules/Common/Widget/AbstractStateReducer", "Ig/TribalWars/Modules/Scavenging/Widgets/UnlockOptionDialog/StateReductionActions"], function(e, t) {
    "use strict";

    function o() {
        e.apply(this)
    }
    return o.prototype = Object.create(e.prototype), $.extend(o.prototype, {
        newStateFromNothing: function() {
            return {
                title: null,
                res_label: _("5e2bc1b784edf7c3144e867ecacdfb38"),
                wood: null,
                stone: null,
                iron: null,
                wood_affordable: null,
                stone_affordable: null,
                iron_affordable: null,
                duration_seconds: null,
                button_text: _("7e7123b0d269ad5d9ec8d12c52a8ed8a"),
                is_button_disabled: null,
                disabled_explanation: "",
                waiting_unlock_request: !1,
                resource_forecast_html: ""
            }
        },
        newStateFromModels: function(e, t, o) {
            var n = t.village,
                a = t.option,
                r = $.extend(!0, {}, e);
            null === r.title && (r.title = s(_("67650110ddd6cbe7438c9b96d7e4994b"), a.getName()));
            var l = a.getUnlockCost();
            null === r.wood && (r.wood = l.wood, r.stone = l.stone, r.iron = l.iron, r.duration_seconds = a.getUnlockDurationSeconds()), r.wood_affordable = n.res.wood >= r.wood, r.stone_affordable = n.res.stone >= r.stone, r.iron_affordable = n.res.iron >= r.iron;
            var i = ResourcesForecaster.getForecast(l, game_data.village, t.rate_schedule, t.amount_schedule),
                d = i.available;
            d === ResourcesForecast.AVAILABLE_FUTURE && (r.resource_forecast_html = i.toHTML());
            var c = d === ResourcesForecast.AVAILABLE_NOW,
                u = d === ResourcesForecast.AVAILABLE_NEVER,
                b = a.arePrerequisitesMet(n.options);
            return r.is_button_disabled = r.waiting_unlock_request || !b || !c, r.is_button_disabled !== e.is_button_disabled && (r.disabled_explanation = "", u && (r.disabled_explanation += i.toHTML() + "<br />"), b || (r.disabled_explanation += _("368757654e9386c570f6b5d5460db6ac"))), r
        },
        _action_reducers: {}
    }), o.prototype._action_reducers[t.START_UNLOCK_REQUEST] = function(e, t, o) {
        var n = $.extend(!0, {}, e);
        return n.waiting_unlock_request = !0, n
    }, o.prototype._action_reducers[t.END_UNLOCK_REQUEST] = function(e, t, o) {
        var n = $.extend(!0, {}, e);
        return n.waiting_unlock_request = !1, n
    }, o
});
