define(function(require,exports,module){

(function() {
window["JST"] = window["JST"] || {};

window["JST"]["landing"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<!--<div class="landing-menu-container"></div>-->\n<!--<div class="landing-container"></div>-->\n\n<div class="landing-wrapper">\n    <div class="landing-header"><h1>plan&view</h1></div>\n\n    <!--<div class="auth">-->\n        <div class="landing-main-img"><img src="/images/landing-gantt.png" ></div>\n   <!-- </div>-->\n\n\n    <div class="gantt-chart-description">\n        <h3>Achive fast, easy, efficient project management using Gantt charts.</h3><br>\n        <h3>What is a Gantt chart</h3>\n        <p class="landing-description">Gantt charts are interactive bar charts that help managers and teams completely outline and schedule projects on a timeline.\n            They allow you to illustrate and visualize every step from day one to the end, connect tasks with\n            dependent relationships, and track project progress to make sure you’ll meet your projected deadline.</p>\n    </div>\n\n    <div class="block">\n        <div class="landing-img"><img src="/images/img1.png" ></div>\n\n        <div class="landing-list">\n            <h3>Features</h3>\n            <p class="landing-p">\n                Timeline broken up into days, months, years.<br>\n                Task dependency lines or arrows <br>\n                Milestones<br>\n                Bars to show the full duration of each task<br>\n                A line to denote the current date within the project schedule<br>\n                Critical path timeline\n            </p>\n        </div>\n\n        <div class="landing-img"><img src="/images/img2.png" ></div>\n\n    </div>\n\n</div>\n<footer class="landing-footer">\n    <label>Plan&View &copy; 2016</label>\n</footer>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["landingMenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="landing-menu">\n    <img class="logo" src="/images/plan-view-logo.svg" alt="logo">\n    <ul>\n            <div class="landing-menu-left ';
 if (!userId) {;
__p += 'not-logined';
 } ;
__p += '">\n        ';
 if (userId) {;
__p += '\n            <li><a class="go-to-projects menu-button">my projects</a></li>\n            </div>\n            <div class="landing-menu-right ';
 if (!userId) {;
__p += 'not-logined';
 } ;
__p += '">\n                <li><p class="show-user-name user-name">hello, ' +
((__t = ( userName )) == null ? '' : __t) +
' </p></li>\n                <li><a class="sign-out-button menu-button">Sign Out</a></li>\n\n        ';
 } else { ;
__p += '\n            <li><a class="registration-btn menu-button">Sign Up</a></li>\n            <li><a class="login-btn menu-button">Sign In</a></li>\n            </div>\n        ';
 } ;
__p += '\n    </ul>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:attachments"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper">\n    <div class="form-title">\n        <div>Attachments</div>\n    </div>\n    <div class="attachments-container">\n        <div class="tab-container" >\n            <div class="add-attachment">\n                <div class="form-input-file">\n                    <label>\n                        <input id="add-attachment-file" type="file" name="file"/>\n                        <img class="add-img" src="/images/add.svg">\n                        <span>Upload File</span>\n                    </label>\n                </div>\n            </div>\n            <div class="attachments-attachments">\n                ';
 for( var i=0; i<attachments.length; i++) { ;
__p += '\n                <div class="attachment-item">\n                    <div id="delete-attachment" data-id="' +
((__t = ( attachments[i].attachmentId )) == null ? '' : __t) +
'" >\n                        <img src="/images/cancel.svg" class="delete"  alt="delete attachment"/>\n                    </div>\n                    ';
var mimetype = attachments[i].mimetype;
                    var copyMimetype = mimetype.slice(0, mimetype.indexOf('/'));
                    switch(copyMimetype){
                        case 'application':
                            if(mimetype == 'application/pdf') {
                                copyMimetype = mimetype.slice(mimetype.indexOf('/'));
                            }
                            else if(mimetype == 'application/msword'){
                                copyMimetype = mimetype.slice(mimetype.indexOf('/'));
                            }
                            else {
                                copyMimetype = 'text';
                            }
                    }
                    var scrMimetype = '/images/mimetype_icons/' + copyMimetype + '.png';
                    ;
__p += '\n                    <a class="file-reference" href="' +
((__t = (attachments[i].relativePath)) == null ? '' : __t) +
'" target="_blank">\n                        <img src="' +
((__t = (scrMimetype)) == null ? '' : __t) +
'" class="attachment-image" alt="attachment image"/>\n                        ';
 var str = attachments[i].fileName; ;
__p += '\n                        ';
 if(attachments[i].fileName.length>9)  { str = attachments[i].fileName.substring(0,9)+'..';} ;
__p += '\n\n                        <div class="attachment-name" id="reference-name">' +
((__t = ( str )) == null ? '' : __t) +
'</div>\n                    </a>\n                </div>\n                ';
 } ;
__p += '\n            </div>\n        </div>\n    </div>\n    <div class="attachment-form-bottom">\n        <input class="form-button ok-button" type="submit" value="ok">\n    </div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:ganttChart"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="table-date-header">\n    <div class="table-date-header-top">\n        <div class="table-date-top">Week</div>\n        <div class="table-date-top">Week</div>\n        <div class="table-date-top">Week</div>\n        <div class="table-date-top">Week</div>\n    </div>\n    <div class="table-date-header-bottom">\n        <div class="table-date-bottom">\n            <div class="table-date-bottom-cell">M</div>\n            <div class="table-date-bottom-cell">T</div>\n            <div class="table-date-bottom-cell">W</div>\n            <div class="table-date-bottom-cell">T</div>\n            <div class="table-date-bottom-cell">F</div>\n        </div>\n        <div class="table-date-bottom">\n            <div class="table-date-bottom-cell">M</div>\n            <div class="table-date-bottom-cell">T</div>\n            <div class="table-date-bottom-cell">W</div>\n            <div class="table-date-bottom-cell">T</div>\n            <div class="table-date-bottom-cell">F</div>\n        </div>\n        <div class="table-date-bottom">\n            <div class="table-date-bottom-cell">M</div>\n            <div class="table-date-bottom-cell">T</div>\n            <div class="table-date-bottom-cell">W</div>\n            <div class="table-date-bottom-cell">T</div>\n            <div class="table-date-bottom-cell">F</div>\n        </div>\n        <div class="table-date-bottom">\n            <div class="table-date-bottom-cell">M</div>\n            <div class="table-date-bottom-cell">T</div>\n            <div class="table-date-bottom-cell">W</div>\n            <div class="table-date-bottom-cell">T</div>\n            <div class="table-date-bottom-cell">F</div>\n        </div>\n    </div>\n</div>\n<div class="table-date-row">\n    <div class="table-date-row-block">\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n    </div>\n    <div class="table-date-row-block">\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n    </div>\n    <div class="table-date-row-block">\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n    </div>\n    <div class="table-date-row-block">\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n        <div class="table-date-cell"></div>\n    </div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:ganttContainer"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="left-panel"></div>\n<div class="right-panel"></div>\n<div id="splitter"></div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:infoBar"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="info-bar-item">\n    <div class="info-bar-label">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n    <div class="info-bar-label"> Author: ' +
((__t = ( author )) == null ? '' : __t) +
'</div>\n</div>\n<div class="info-bar-item">\n    <div class="info-bar-label">Start Date: ' +
((__t = ( startDate )) == null ? '' : __t) +
'</div>\n    <div class="info-bar-label">Modified: ' +
((__t = ( modifiedDate )) == null ? '' : __t) +
'</div>\n</div>\n<div class="info-bar-item">\n    <div class="description">Description: ' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:milestone"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="milestone-center">\n    <div class="start-date">Start Date</div>\n    <div class="project-timeline">\n        <div class="milestone-date">Milestone date</div>\n        <div class="milestone-img"></div>\n    </div>\n    <div class="end-date">End Date</div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:milestoneEdit"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div>Milestone Edit</div>\n        </div>\n    <div class="tabs">\n        <div class="tabs-menu ">\n            <a class="tab-link tab-general w--current">General</a>\n            <a class="tab-link tab-dependencies hide-content">Depends On</a>\n        </div>\n    </div>\n    <div class="milestones-container">\n        <div class="tab-container">\n            <div class="tab-container general-content show-content">\n                <div class="table-milestone-header-row">\n                    <div class="table-header-milestone-cell">Name</div>\n                    <div class="table-header-milestone-cell">Start date</div>\n                </div>\n                <div class="table-row">\n                    <img class="add-milestone-img" src="../../../images/add.svg">\n                    <a class="add-milestone-link" id="create-milestone">Milestone</a>\n                </div>\n                ';
for(var i = 0; i <  milestones.length; i++) {;
__p += '\n                <div class="table-milestone-row">\n                    <div class="table-cell-milestone">\n                        <div data-name="' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'">' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'</div>\n                        <span class="milestone-link remove-milestone" data-name="' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'"></span>\n                        <span class="milestone-link edit-milestone" data-name="' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'"></span>\n                    </div>\n                    ';

                        var mDate = new Date(milestones[i].date);
                        function date(n) {
                            return n < 10 ? "0"+n : n;
                        }
                        mDate = mDate.getFullYear()+"-"+date(mDate.getMonth()+1)+"-"+ date(mDate.getDate());
                    ;
__p += '\n                    <div class="table-cell-milestone">' +
((__t = ( mDate)) == null ? '' : __t) +
'</div>\n                </div>\n                ';
 } ;
__p += '\n            </div>\n\n            <div class="tab-container dependencies-content hide-content">\n                <form>\n                    ';

                    var dateobj = new Date(milestoneEdit.date);
                    function pad(n) {
                        return n < 10 ? "0"+n : n;
                    }
                    dateobj = dateobj.getFullYear()+"-"+pad(dateobj.getMonth()+1)+"-"+ pad(dateobj.getDate());
                    ;
__p += '\n                    <label>Name:</label>\n                    <input class="milestone-form-input-text" id="milestone-settings-name" type="text" value="' +
((__t = (milestoneEdit.name)) == null ? '' : __t) +
'" required>\n                    <label>Start date:</label>\n                    <input class="milestone-form-input-text" id="milestone-settings-date" type="date" value="' +
((__t = (dateobj)) == null ? '' : __t) +
'">\n                </form>\n                <label class="dependancy-label form-label">Task List</label>\n                <label class="dependancy-label form-label">Depends On</label>\n                <div  class="milestone-drop-list scrollable">\n                    <table id="tasks-list">\n                        <tbody>\n                            ';
 for(var i = 0;i < tasksList.length; i++) { ;
__p += '\n                            <tr class="task-item" id="' +
((__t = ( tasksList[i].taskId)) == null ? '' : __t) +
'">\n                                <td> ' +
((__t = ( tasksList[i].taskName )) == null ? '' : __t) +
'</td>\n                            </tr>\n                            ';
 } ;
__p += '\n                        </tbody>\n                    </table>\n                </div>\n                <div class="milestone-drop-list scrollable">\n                    <table id="dependencies-list">\n                        <tbody>\n                            ';
 for(var i = 0; i < dependenciesList.length; i++) { ;
__p += '\n                            <tr class="task-item" id="' +
((__t = ( dependenciesList[i].taskId)) == null ? '' : __t) +
'">\n                                <td>' +
((__t = ( dependenciesList[i].taskName )) == null ? '' : __t) +
'</td>\n                            </tr>\n                        </tbody>\n                        ';
 } ;
__p += '\n                    </table>\n                </div>\n                <div class="wrapper" style="text-align: center;">\n                    <button class="save-milestones-button" data-name="' +
((__t = (milestoneEdit.name)) == null ? '' : __t) +
'">Save</button>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="form-bottom">\n        <input class="form-button ok-button" type="submit" value="ok">\n        <input class="form-button cancel-button" type="submit" value="cancel">\n    </div>\n    </form>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:project"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="menu-toolbar">\n    ';
 if (page !== 'projects') { ;
__p += '\n    <p class="show-project-name"> </p>\n    ';
 } ;
__p += '\n    <div class="tool-bar">\n        <a class="tool-img tool-zoom-in"></a>\n        <a class="tool-img tool-zoom-out"></a>\n        <a class="tool-img tool-undo"></a>\n        <a class="tool-img tool-redo"></a>\n        <a class="edit-milestone tool-img tool-milestone"></a>\n        <a class="tool-critical-way tool-img"></a>\n        <a class="show-attachments tool-attachment tool-img"></a>\n        <a class="show-settings tool-settings tool-img"></a>\n    </div>\n</div>\n<div id="milestone-view-container"></div>\n<div id="gantt-view-container"></div>\n<div id="info-bar-view-container"></div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:settings"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div>Settings</div>\n        </div>\n        <div class="tabs">\n            <div class="tabs-menu ">\n                <a class="tab-link tab-general w--current">General</a>\n                <a class="tab-link tab-time-settings">Time Settings</a>\n            </div>\n            <div class="settings-container">\n                <div class="tab-container">\n                    <div class="tab-container general-content show-content">\n                        <label class="form-label">Name:</label>\n                        <input class="form-input-text name" maxlength="256" value="' +
((__t = ( model.name )) == null ? '' : __t) +
'" placeholder="Project Name" type="text">\n                        <label class="form-label">Author:</label>\n                        <input class="form-input-text author" maxlength="256" value="' +
((__t = ( model.author )) == null ? '' : __t) +
'" placeholder="Author" type="text">\n                        <label class="form-label description-label">Description:</label>\n                        <textarea class="form-input-description task-description" maxlength="5000" placeholder="Project Description">' +
((__t = ( model.description )) == null ? '' : __t) +
'</textarea>\n                    </div>\n                    <div class="tab-container settings-content hide-content">\n\n                        <label class="form-label">Start Date:</label>\n                        <input class="form-input-text " maxlength="256" value="" placeholder="Project Start Date" type="date">\n                        <label class="form-label day-start-label">Working Day Start:</label>\n                        <input class="form-input-text day-start" maxlength="256" value="" placeholder="Working Day Start" type="number">\n                        <label class="form-label">Hours Per Day:</label>\n                        <input class="form-input-text day-duration" maxlength="256" value="" placeholder="Working Hours Per Day" type="number">\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="settings-form-bottom">\n            <input class="form-button ok-button" type="submit" value="ok">\n            <input class="form-button cancel-button" type="submit" value="cancel">\n        </div>\n    </form>\n</div>\n\n\n\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:task"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div>Task Edit</div>\n        </div>\n        <div class="tabs">\n            <div class="tabs-menu ">\n                <a class="tab-link tab-general w--current">General</a>\n                <a class="tab-link tab-dependencies">Depends On</a>\n                <a class="tab-link tab-attachments">Attachments</a>\n            </div>\n            <div class="tasks-container">\n                <div class="tab-container">\n                    <div class="tab-container general-content show-content">\n                        <label class="form-label">Task Name:</label>\n                        <input class="form-input-text task-name" maxlength="256" value="' +
((__t = ( task.name )) == null ? '' : __t) +
'" placeholder="Task Name" required="required" type="text">\n                        <label class="form-label">Assignee:</label>\n                        <input class="form-input-text task-resource" maxlength="256" value="' +
((__t = ( task.resource )) == null ? '' : __t) +
'" placeholder="Assignee Name" type="text">\n                        <label class="form-label">Estimate:</label>\n                        <input class="form-input-text task-estimate" maxlength="256" value="' +
((__t = ( task.estimateTime )) == null ? '' : __t) +
'" placeholder="Estimate hours" type="text">\n                        <label class="form-label description-label">Description:</label>\n                        <textarea class="form-input-description task-description" maxlength="5000" placeholder="Task Description">' +
((__t = ( task.description )) == null ? '' : __t) +
'</textarea>\n                    </div>\n                    <div class="tab-container dependencies-content hide-content">\n                        <label class="dependancy-label form-label">Task List</label>\n                        <label class="dependancy-label form-label">Depends On</label>\n                        <div class="clone">\n                        <div class="drop-list scrollable" id="list-of-tasks">\n                            <table id="tasks-list">\n                                <tbody>\n                                    ';
 for(var i=0;i<tasksList.length;i++) { ;
__p += '\n                                    <tr class="task-item" id="' +
((__t = ( tasksList[i].taskId)) == null ? '' : __t) +
'"><td> ' +
((__t = ( tasksList[i].name )) == null ? '' : __t) +
'</td></tr>\n                                    ';
 } ;
__p += '\n                                </tbody>\n                            </table>\n                        </div>\n\n                        <div class="drop-list scrollable" id="list-of-dependencies">\n                            <table id="dependencies-list">\n                                <tbody>\n                                    ';
 for(var i=0;i<dependenciesList.length;i++) { ;
__p += '\n                                    <tr class="task-item" id="' +
((__t = ( dependenciesList[i].taskId)) == null ? '' : __t) +
'"><td>' +
((__t = ( dependenciesList[i].name )) == null ? '' : __t) +
'</td> </tr>\n                                    ';
 } ;
__p += '\n                                </tbody>\n                            </table>\n                        </div>\n                        </div>\n                    </div>\n                    <div class="tab-container attachments-content hide-content" >\n                        <div class="add-attachment">\n                            <div class="form-input-file">\n                                <label>\n                                    <input id="add-attachment-file" type="file" name="file"/>\n                                    <img class="add-img" src="/images/add.svg">\n                                    <span>Upload File</span>\n                                </label>\n                            </div>\n                        </div>\n                        <div class="task-attachments">\n                            ';
 for( var i=0; i<task.attachments.length; i++) { ;
__p += '\n                            <div class="attachment-item">\n                                <div id="delete-attachment" data-id="' +
((__t = ( task.attachments[i].attachmentId )) == null ? '' : __t) +
'" >\n                                    <img src="/images/cancel.svg" class="delete"  alt="delete attachment"/>\n                                </div>\n                                <a class="file-reference" href="' +
((__t = (task.attachments[i].relativePath)) == null ? '' : __t) +
'" target="_blank">\n                                    <img src="/images/word.png" class="attachment-image" alt="attachment image"/>\n                                    ';
 var str = task.attachments[i].fileName; ;
__p += '\n                                    ';
 if(task.attachments[i].fileName.length>9)  { str = task.attachments[i].fileName.substring(0,9)+'..';} ;
__p += '\n\n                                    <div class="attachment-name" id="reference-name">' +
((__t = ( str )) == null ? '' : __t) +
'</div>\n                                </a>\n                            </div>\n                            ';
 } ;
__p += '\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="task-form-bottom">\n            <input class="form-button ok-button" type="submit" value="ok">\n            <input class="form-button cancel-button" type="submit" value="cancel">\n        </div>\n    </form>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:taskRow"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="table-cell-task">\n    <div id="' +
((__t = ( task.taskId)) == null ? '' : __t) +
'" class="cell-task">' +
((__t = ( task.name)) == null ? '' : __t) +
'</div>\n    <a class="task-link icon-edit" id="' +
((__t = ( task.taskId)) == null ? '' : __t) +
'"></a>\n    <a class="task-link icon-remove" id="' +
((__t = ( task.taskId)) == null ? '' : __t) +
'"></a>\n</div>\n<div class="table-cell task-estimateTime">' +
((__t = ( task.estimateTime)) == null ? '' : __t) +
'</div>\n';
 var dependencies = [];;
__p += '\n';
 for (var j = 0; j < task.dependsOn.length; j++) { ;
__p += '\n    <!--TO DO false id string in db-->\n    ';
 if (task.dependsOn[j].taskId != "false") { ;
__p += '\n        ';
 dependencies.push(task.dependsOn[j].taskId); ;
__p += '\n    ';
 } ;
__p += '\n';
 } ;
__p += '\n';
 for (j = 0; j < dependencies.length; j++) { ;
__p += '\n    ';
 for (var i = 0; i < tasks.length; i++) { ;
__p += '\n        ';
 if (tasks[i].taskId == dependencies[j]) { ;
__p += '\n            ';
 dependencies[j] = tasks[i].name; ;
__p += '\n        ';
 } ;
__p += '\n    ';
 } ;
__p += '\n';
 } ;
__p += '\n<div class="table-cell-dependsOn task-dependsOn">' +
((__t = ( dependencies.toString() )) == null ? '' : __t) +
'</div>\n<div class="table-cell task-resource">' +
((__t = ( task.resource)) == null ? '' : __t) +
'</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:tasksList"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="table-task-header">\n    <div class="table-header-row">\n        <div class="table-cell-task">Name</div>\n        <div class="table-cell">Estimate</div>\n        <div class=" table-cell-dependsOn">Depends on</div>\n        <div class="table-cell">Assignee</div>\n    </div>\n    <div class="table-header-row">\n        <img class="add-task-img" src="../../../images/add.svg">\n        <a class="add-link add-task">Task</a>\n        <a class="add-link edit-milestone">Milestone</a>\n    </div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["projects:projectsAbout"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '\n<div class="project-description-header"><h3>Currently selected project description</h3></div>\n\n<div class="project-description"> ' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["projects:projectsArea"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="create-button-container">\n    <button class="create-project">New Project</button>\n</div>\n<div class="projects-list-block"></div>\n<div class="project-about-block"></div>\n<div class="popup-container"></div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["projects:projectsEdit"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper">\n    <div class="main-form">\n\n        <div class="form-title">\n            <div>Project Edit</div>\n        </div>\n\n              <div class="tab-container">\n                <label class="form-label">' +
((__t = ( project.name ? 'Update' : 'Create' )) == null ? '' : __t) +
' Project</label>\n                <input class="form-input-text" id="name" type="text" name="name" placeholder="Project Name" value="' +
((__t = ( project.name )) == null ? '' : __t) +
'">\n\n\n                <label class="form-label description-label">Description</label>\n                  <textarea class="form-input-description" id="description" maxlength="5000" name="description" placeholder="Description">' +
((__t = ( project.description )) == null ? '' : __t) +
'</textarea>\n                <!--<input class="form-input-description" type="text" name="description" placeholder="Description"-->\n                       <!--value="' +
((__t = ( project.description )) == null ? '' : __t) +
'">-->\n\n            ';
 if(project) { ;
__p += '\n            <input type="hidden" name="id" value="' +
((__t = ( project.id )) == null ? '' : __t) +
'"/>\n            ';
 }; ;
__p += '\n              </div>\n\n        <div class="form-bottom">\n            <input class="form-button ok-button" type="submit" value="' +
((__t = ( project.name ? 'Update' : 'Create' )) == null ? '' : __t) +
'">\n            <input class="form-button cancel-button" type="submit" value="cancel">\n        </div>\n\n    </form>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["projects:projectsList"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n<div class="projects-list-header"><h3>Projects List</h3></div>\n\n<ul>\n    ';
 for(var i = 0; i < projects.length; i++) {;
__p += '\n        <li class="projects-list-item ';
 if (projects[i].id === activeId) { ;
__p += 'active';
 } ;
__p += '" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'">\n            <a class="projects-link-name"> ' +
((__t = ( projects[i].name )) == null ? '' : __t) +
' </a>\n            <a class="project-link edit-project" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'"></a>\n            <a class="project-link delete-project" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'"></a>\n            <button class="projects-go-link" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'">Go to!</button>\n        </li>\n    ';
 } ;
__p += '\n</ul>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["projects:projectsTitle"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="projects-title">\n\n    <div class="project-title-text">\n            <p><strong>Click on project name to see it\'s description or click on "Go to!" to visit it\'s\n                page! Press New to create project or Edit/Remove signs for existing one.</strong></p>\n    </div>\n\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:logIn"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="form-wrapper">\n    <div class="form-title">\n        <div>Account Login</div>\n    </div>\n    <form method="post" action="/users/login">\n        <div class="tab-container">\n            <div class="tab-container">\n                <label class="form-label">Email:</label>\n                <input class="form-input-text" maxlength="256" name="email" placeholder="Email" type="email">\n                <label class="form-label">Password:</label>\n                <input class="form-input-text" maxlength="256" name="password" placeholder="Password" type="password">\n            </div>\n        </div>\n        <div class="login-form-bottom">\n            <input class="form-button ok-button" type="submit" value="ok">\n            <input id="exit-button" class="form-button" type="submit" value="cancel">\n        </div>\n    </form>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:main"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="main-menu-container"></div>\n<div class="main-container"></div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:mainMenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav class="menu">\n    <div>\n        <a class="back-to-landing-view" >\n            <img class="logo" src="../../../images/plan-view-logo.svg" alt="logo">\n        </a>\n        ';
 if (page !== 'projects') { ;
__p += '\n        <a class="go-to-projects button-dark menu-button">my projects</a>\n        ';
 } ;
__p += '\n    </div>\n    <div>\n        <p class="show-user-name user-name">hello, ' +
((__t = ( userName )) == null ? '' : __t) +
' </p>\n        <a class="sign-out-button button-dark menu-button">Sign Out</a>\n    </div>\n</nav>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:register"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="form-wrapper">\n    <div class="form-title">\n        <div>Register</div>\n    </div>\n    <form id="regisrationForm">\n        <div class="tab-container">\n            <div class="tab-container">\n                <label class="form-label">First Name:</label>\n                <input class="form-input-text" maxlength="256" type="text"  placeholder="First Name" name="firstname" id="firstname" value=\'\'>\n                <label class="form-label">Last Name:</label>\n                <input class="form-input-text" maxlength="256" type="text"  placeholder="Last Name" name="lastname" id="lastname" value=\'\'>\n                <label class="form-label">Email:</label>\n                <input class="form-input-text" maxlength="256" type="email" placeholder="Email" name="email" value=\'\' id="email">\n                <label class="form-label">Password:</label>\n                <input class="form-input-text" maxlength="256" type="password" placeholder="Password" name="password" id="password">\n                <label class="form-label confirm-password-label">Confirm Password:</label>\n                <input class="form-input-text confirm-password-input" maxlength="256" type="password" placeholder="Password" name="password2">\n            </div>\n        </div>\n        <div class="register-form-bottom">\n            <input id="post_user" class="form-button ok-button" type="submit" value="ok">\n            <input id="exit-button" class="form-button" type="submit" value="cancel">\n        </div>\n    </form>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:signIn"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<h2 class="page-header">Account Login</h2>\n<form action="">\n    <div class="form-group">\n        <label>Username</label>\n        <input type="text" class="form-control" name="email" placeholder="Username">\n    </div>\n    <div class="form-group">\n        <label>Password</label>\n        <input type="password" class="form-control" name="password" placeholder="Password">\n    </div>\n    <button type="submit" class="btn btn-default">Submit</button>\n</form>';

}
return __p
}})();
return JST;

});
