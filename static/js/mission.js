$(function() {
   window.Player = Backbone.Model.extend({
       defaults: {
           id: 0,
           class: "",
           level: 0,
           name: "",
           kills: 0,
           deaths: 0,
           assists: 0,
           damage: 0,
           botDamage: 0,
           healing: 0,
           botKills: 0,
           objective: 0,
           defense: 0,
           absorbed: 0,
           minutes: 0
       },

       initialize: function() {
           if(!this.get("id")) {
               alert('Invalid player.');
           }
       }
   });

    window.Attackers = Backbone.Collection.extend({
        model: Player,

        sum: function(stat) {
            total = 0;
            this.each(function(book) {
                total = total + book[stat];
            });
        }
    })
});