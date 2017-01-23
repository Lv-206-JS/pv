define(['backbone',
        'underscore',
        'JST',
        'models/Ownership',
        'collections/Ownerships'],
    function (Backbone, _, JST, OwnershipModel, OwnershipsCollection) {
        'use strict';

        var OwnershipView = Backbone.View.extend({
            template: JST['project:ownership'],
            className: 'ownership-view show-content',

            initialize: function (options) {
                this.readersList = [];
                this.editorsList = [];
                this.projectId = options.projectId;
                this.collection = OwnershipsCollection;
                this.collection.fetch();
                this.collection.on('sync', _.bind(this.onCollectionLoad, this));

            },

            events: {
                'click .ok-button, .cancel-button': 'hideOwnershipView',
                'submit': 'addOwnership',
                'click .delete-ownership': 'deleteOwnership'
            },

            onCollectionLoad: function () {
                this.owneships = this.collection.toJSON();
                this.getOwnershipLists();
            },

            render: function render() {
                this.$el.html(this.template({
                    readersList: this.readersList,
                    editorsList: this.editorsList
                }));
                return this;
            },

            getOwnershipLists: function () {
                this.readersList = [];
                this.editorsList = [];
                for (var i = 0; i < this.owneships.length; i++) {
                    if (this.owneships[i].role == 'reader') {
                        this.readersList.push(this.owneships[i]);
                    }
                    else if (this.owneships[i].role == 'editor') {
                        this.editorsList.push(this.owneships[i]);
                    }
                }
                this.render();
            },

            addOwnership: function (event) {
                event.preventDefault();
                var email = this.$el.find('.user-email').val();
                var role = this.$el.find("input:radio[name=ownership]:checked").val();
                var ownershipToCreate = new OwnershipModel({
                    projectId: this.projectId,
                    email: email,
                    role: role
                });
                ownershipToCreate.save({}, {
                    success: function (model, response) {
                        if (!response.error) {
                            this.collection.add(ownershipToCreate);
                        }
                        else {
                            var errors = response.error;
                            console.log(errors);
                        }
                    }.bind(this)
                });
            },

            deleteOwnership: function (event) {
                event.preventDefault();
                var target = $(event.currentTarget);
                var email = target.data('email');
                var ownershipToRemove = this.collection.where({email: email})[0];
                ownershipToRemove.setUrl(email);
                this.email = email;
                ownershipToRemove.destroy({
                    success: function (model, response) {
                        this.collection.remove(this.collection.where({email: this.email}));
                        this.onCollectionLoad();
                    }.bind(this)
                });
            },

            hideOwnershipView: function (event) {
                event.preventDefault();
                this.$el.remove();
            }
        });

        return OwnershipView;
    });