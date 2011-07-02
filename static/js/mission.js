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
            if (!this.get("id")) {
                alert('Invalid player.');
            }
        }
    });

    window.Team = Backbone.Collection.extend({
        model: Player,

        sum: function(stat) {
            total = 0;
            this.each(function(book) {
                total = total + book[stat];
            });
            return total;
        }
    });

    window.Attackers = new Team;
    window.Defenders = new Team;

    window.PlayerView = Backbone.View.extend({
        tagName: 'tr',

        template: _.template($('#player-template').html()),

        initialize: function() {
            _.bindAll(this, 'render', 'close');
            this.model.bind('change', this.render);
            this.model.view = this;
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            this.setContent();
            return this;
        },

        setContent: function() {
            var fields = ['class', 'level', 'name', 'kills', 'deaths', 'assists', 'damage', 'botKills', 'botDamage', 'healing', 'objective', 'defense', 'absorbed', 'minutes'];
            fields.forEach(function(s) {
                var d = this.model.get(s);
                this.$('.player-' + s).text(d);
            });
        }

    });

    window.MissionView = Backbone.View.extend({

        el: $('#mission-view'),

        initialize: function() {

            _.bindAll(this, 'addOne', 'render');

            this.input    = this.$("#new-todo");

            Attackers.bind('add',     this.addOne);
            Attackers.bind('all',     this.render);


            Attackers.create({
                "id": 3492949,
                "class": "Recon",
                "level": 36,
                "name": "juganout",
                "kills": 18,
                "deaths": 11,
                "assists": 12,
                "damage": 101153,
                "botDamage": 35017,
                "healing": 0,
                "botKills": 14,
                "objective": "55378.7",
                "defense": 0,
                "absorbed": 5134,
                "minutes": 16
            });
        },

        addOne: function(player) {
            var view = new PlayerView({model: player});
            this.$('#player-rows').append(view.render().el);
        },

        render: function() {

        }


    });

    window.Mission = new MissionView();

});