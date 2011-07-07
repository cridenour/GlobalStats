$(function () {

    var Message = Backbone.Model.extend({ });

    var Messages = Backbone.Collection.extend({ model: Message, url: '/notifications' });

    window.Notifications = new Messages;

    var NotificationView = Backbone.View.extend({

        tagName: 'div',

        render: function() {
            $(this.el).html(this.model.get('message'));
            return this;
        }

    });

    var NotificationsView = Backbone.View.extend({
        el: $("#notifications"),

        events: {
            'click #handle': 'toggle',
            'click .next' : 'next',
            'click .prev' : 'prev',
            'click .delete' : 'delete'
        },

        delete: function() {
            this.$("#items > div").eq(this.current - 1).remove();
            var m = Notifications.at(this.current - 1);
            Notifications.remove(m);
            if(Notifications.length == 0)
                this.toggle();
            else
                this.$("#items > div").eq(this.current).fadeIn();
        },

        next: function() {
            var c = this.$("#items > div").eq(this.current - 1);
            var n = this.$("#items > div").eq(this.current);
            if(n.length == 0) { n = $("#items > div:first"); }
            c.fadeOut('slow', function() { n.fadeIn('fast'); });

            this.current++;
            if(this.current > Notifications.length)
                this.current = 1;
            this.render();
        },

        prev: function() {
            var c = this.$("#items > div").eq(this.current - 1);
            var n = this.$("#items > div").eq(this.current - 2);
            if(n.length == 0) { n = $("#items > div:last"); }
            c.fadeOut('slow', function() { n.fadeIn('fast'); });

            this.current--;
            if(this.current < 1)
                this.current = Notifications.length;
            this.render();
        },

        render: function() {
            this.$(".count").text(Notifications.length);
            this.$("#current").text(this.current);
        },

        toggle: function() {
            var pane = this.$("#pane");

            if(pane.is(':visible')) {
                pane.slideUp().parent().removeClass('open');
            } else {
                pane.slideDown().parent().addClass('open');
            }
        },

        initialize: function() {
            _.bindAll(this, 'addMessage', 'addAll', 'render', 'toggle', 'showHandle', 'next', 'prev');

            Notifications.bind('add', this.addMessage);
            Notifications.bind('reset', this.addAll);
            Notifications.bind('all', this.render);

            Notifications.fetch();

            if(Notifications.length > 0) {
                this.current = 1;
                this.showHandle();
            }
        },

        addMessage: function(message) {
            var view = new NotificationView({ model: message });
            this.$("#items").append(view.render().el);
            if(!this.current) {
                this.current = 1;
                this.showHandle();
            } else {
                $("#items > div:last").hide();
            }
        },

        showHandle: function() {
            this.$("#handle").fadeIn();
        },

        addAll: function() {
            Notifications.each(this.addMessage);
        }
    });

    var NotificationApp = new NotificationsView;
    
});