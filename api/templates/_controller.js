'use strict';

//dependencies
var mongoose = require('mongoose');
var <%= className %> = mongoose.model('<%= className %>');

/**
 * <%= className %> Controller
 *
 * @description :: Server-side logic for managing <%= className %>.
 */
module.exports = {
    /**
     * <%= classPlural.toLowerCase() %>.index()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    index: function(request, response) {
        <%= className %>
            .paginate({},
                request.query.page,
                request.query.limit,
                function(error, pages, <%= classPlural.toLowerCase() %>, total) {
                    if (error) {
                        response.json(error);
                    } else {
                        response.format({
                            'text/html': function() {
                                response
                                    .render('<%= classPlural.toLowerCase() %>/index.html', {
                                        <%= classPlural.toLowerCase() %>: <%= classPlural.toLowerCase() %>,
                                        pages: pages,
                                        count: total
                                    });
                            },

                            'application/json': function() {
                                response.json({
                                    <%= classPlural.toLowerCase() %>: <%= classPlural.toLowerCase() %>,
                                    pages: pages,
                                    count: total
                                });
                            },

                            'default': function() {
                                // hanlde unaccepted format
                                response
                                    .status(406)
                                    .send('Not Acceptable');
                            }
                        });

                    }
                });
    },

    
    /**
     * <%= classPlural.toLowerCase() %>.create()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    create: function(request, response) {
        <%= className %>
            .create(request.body, function(error, <%= className.toLowerCase() %>) {
                if (error) {
                    response.json(error);
                } else {
                    response.format({
                        'text/html': function() {
                            response
                                .redirect('/<%= classPlural.toLowerCase() %>');
                        },

                        'application/json': function() {
                            response
                                .json(<%= className.toLowerCase() %>);
                        },

                        'default': function() {
                            //handle unaccepted format
                            response
                                .status(406)
                                .send('Not Acceptable');
                        }
                    });
                }
            });
    },


    /**
     * <%= classPlural.toLowerCase() %>.show()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    show: function(request, response) {
        <%= className %>
            .findById(request.params.id, function(error, <%= className.toLowerCase() %>) {
                if (error) {
                    response.json(error);
                } else {
                    response.format({
                        'text/html': function() {
                            response
                                .render('<%= classPlural.toLowerCase() %>/show.html', {
                                    <%= className.toLowerCase() %>: <%= className.toLowerCase() %>
                                });
                        },

                        'application/json': function() {
                            response.json(<%= className.toLowerCase() %>);
                        },

                        'default': function() {
                            //hanlde unacceptable format
                            response
                                .status(406)
                                .send('Not Acceptable');
                        }
                    });
                }
            });
    },


    /**
     * <%= classPlural.toLowerCase() %>.update()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    update: function(request, response) {
        <%= className %>
            .findByIdAndUpdate(
                request.params.id,
                request.body,
                function(error, <%= className.toLowerCase() %>) {
                    if (error) {
                        response.json(error);
                    } else {
                        response.format({
                            'text/html': function() {
                                response
                                    .redirect('/<%= classPlural.toLowerCase() %>');
                            },

                            'application/json': function() {
                                response
                                    .json(<%= className.toLowerCase() %>);
                            },

                            'default': function() {
                                // hanlde unacceptable format
                                response
                                    .status(406)
                                    .send('Not Acceptable');
                            }
                        });

                    }
                });
    },


    /**
     * <%= classPlural.toLowerCase() %>.destroy()
     * @param  {HttpRequest} request  a http request
     * @param  {HttpResponse} response a http response
     */
    destroy: function(request, response) {
        <%= className %>
            .findByIdAndRemove(
                request.params.id,
                function(error, <%= className.toLowerCase() %>) {
                    if (error) {
                        response.json(error);
                    } else {
                        response.format({
                            'text/html': function() {
                                response
                                    .redirect('/<%= classPlural.toLowerCase() %>');
                            },

                            'application/json': function() {
                                response
                                    .json(<%= className.toLowerCase() %>);
                            },

                            'default': function() {
                                // handle unacceptable format
                                response
                                    .status(406)
                                    .send('Not Acceptable');
                            }
                        });
                    }
                });
    }

}