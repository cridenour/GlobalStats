$(function() {

    var App = Backbone.Router.extend({

        routes: {
            "mission/:mid": "mission"
        },

        mission: function(mid) {
            console.debug('Loading mission ' + mid);

            var m = new Mission({id: mid});
            var mView = new MissionView({model: m});

            //$.getJSON('test/testdata.json', function(data) {
               // m.attackers.reset(data.attackers);
                //m.defenders.reset(data.defenders);
            //});
        }

    });

    var Player = Backbone.Model.extend({
        initialize: function() {
            try {
            this.playerDetails = new PlayerDetails({id: this.id});
            this.playerDetails.fetch();
            } catch(e) {
                console.debug(e);
            }
        }
    });

    var PlayerDetails = Backbone.Model.extend({
       urlRoot: '/player'
    });

    var Mission = Backbone.Model.extend({
        initialize: function() {
            this.attackers = new Team;
            this.attackers.url = 'mission/' + this.id + '/attackers';
            this.attackers.fetch();

            this.defenders = new Team;
            this.defenders.url = 'mission/' + this.id + '/defenders';
            this.defenders.fetch();
        },

        urlRoot: 'mission'
    });

    var Team = Backbone.Collection.extend({
        model: Player
    });

    var TeamTotals = Backbone.Model.extend({});

    var PlayerView = Backbone.View.extend({
        tagName: 'tr',

        template: _.template($('#player-template').html()),

        events: {
            'click td': 'select'
        },

        'select': function(e) {
            if($(this.el).hasClass('selected')) { var toggle = true; }
            $(".player-rows tr.selected").removeClass('selected');
            if(!toggle) { $(this.el).addClass('selected'); }

            

            e.preventDefault();
        },

        initialize: function() {
            _.bindAll(this, 'render');
            this.model.bind('change', this.render);
            this.model.view = this;
        },

        render: function() {
            $(this.el).html(this.template(this.model.toJSON()));
            return this;
        }

    });

    var MissionView = Backbone.View.extend({

        el: $('#mission-view'),

        initialize: function() {

            if(!this.model)
                console.debug('There is no model, Neo.');

            _.bindAll(this, 'addAttacker', 'addDefender', 'render', 'addAttackers', 'addDefenders');

            this.model.attackers.bind('add',     this.addAttacker);
            this.model.defenders.bind('add',     this.addDefender);

            this.model.attackers.bind('reset',   this.addAttackers);
            this.model.defenders.bind('reset',   this.addDefenders);

            this.model.attackers.bind('filter',  this.render);
            this.model.defenders.bind('filter',  this.render);

            this.model.view = this;
        },

        addAttacker: function(player) {
            var view = new PlayerView({model: player});
            this.$('#attacker-rows').append(view.render().el);
        },

        addDefender: function(player) {
            var view = new PlayerView({model: player});
            this.$('#defender-rows').append(view.render().el);
        },

        addAttackers: function() {
            this.model.attackers.each(this.addAttacker);

        },

        addDefenders: function() {
            this.model.defenders.each(this.addDefender);
        },

        render: function() {
            return;
        }


    });

    app = new App;
    Backbone.history.start();
});