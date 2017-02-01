define(function(require,exports,module){

(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:confirmDelete"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="form-wrapper">\n    <div>\n        <div class="confirm-delete-main">Are you sure, you want to delete this?</div>\n        <div class="form-bottom">\n            <button class="form-button ok-button" type="button">ok</button>\n            <button class="form-button cancel-button" type="button">cancel</button>\n        </div>\n    </div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:landing"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="landing-wrapper">\n\n    <div class="landing-first-block landing-block-height">\n        <div class="landing-first-block-description">\n        <img class="big-logo" src="images/plan-view-logo-1.svg">\n        <h1 class="landing-h">Create a beautiful project plan in minutes with Plan&amp;View free gantt chart software.</h1>\n\n            ';
 if (!userId) { ;
__p += '\n                <a class="landing-started-button" >TRY PLAN&amp;VIEW NOW!</a>\n            ';
 } else { ;
__p += '\n            <div class="landing-started-button-hidden"></div>\n            ';
 } ;
__p += '\n\n        </div>\n    </div>\n\n    <div class="landing-manage-block landing-block-height">\n        <div class="w-row">\n            <div class="landing-manage-block-description">\n                <h1 class="landing-manage-h ">Manage Workloads</h1>\n                <p class="landing-manage-p">One of the benefits of using gantt charts with built in&nbsp;resource management software, is that you can see what each person is working on any given day. See who’s busy and who’s not. Be more realistic about project timelines and easily understand if you need more staffing. Improve company morale by not stressing people out with too much work.</p>\n            </div>\n            <div class="landing-manage-block-img"></div>\n        </div>\n    </div>\n\n\n    <div class="landing-info-block">\n        <h1 class="landing-info-h">Online Gantt Chart Software</h1>\n        <p class="landing-info-p">Plan&amp;View is the refreshing solution that brings gantt chart software online.You can now plan and manage your projects with this super easy to use gantt software. Inviting your co-workers, teammates, and friends to view and edit your gantt chart is fun!</p>\n    </div>\n\n    <div class="landing-section landing-block-height">\n\n        <div class="landing-column-l landing-block-height"></div>\n\n        <div class="landing-column-r landing-block-height">\n            <h1 class="landing-manage-h">Why Use Gantt Charts?</h1>\n            <p class="landing-manage-p">Plan&amp;View&nbsp;A Gantt chart is one of the most important tools in a project’s managers arsenal.\n                It helps organize complex projects, improve project visibility, and keep everyone on track. <br>\n                Here are five reasons why you should use Gantt charts in project management: <span class="advantages-description"> determine all necessary tasks; identify when tasks need to be completed; discover the critical path; keep your team informed of progress; simplify complex tasks;</span> </p>\n        </div>\n\n    </div>\n\n\n    <div class="landing-features-block">\n        <h1 class="landing-h-features">More Features</h1>\n        <div class="w-row">\n            <div class="landing-features-block-description">\n                <div class="landing-icon-style"><img class="landing-icon" src="images/icon-multiple.svg">\n                    <div class="landing-icon-description">\n                        <h5 class="landing-icon-h">Multiple projects in one Gantt</h5>\n                        <p class="landing-icon-p">Finally, you can see all your in a single glorious view. See how resources are affected across projects.</p>\n                    </div>\n                </div>\n                <div class="landing-icon-style"><img class="landing-icon" src="images/icon-easy.svg">\n                    <div class="landing-icon-description">\n                        <h5 class="landing-icon-h">Easy for non-project managers too</h5>\n                        <p class="landing-icon-p">Powerful enough to be a&nbsp;MS project alternative, but built to be intuitive and usable by everyone on your team.</p>\n                    </div>\n                </div>\n                <div class="landing-icon-style"><img class="landing-icon" src="images/icon-file-upload.svg">\n                    <div class="l-icon-description">\n                        <h5 class="landing-icon-h">File upload</h5>\n                        <p class="landing-icon-p">Upload any file directly to a task or project.</p>\n                    </div>\n                </div>\n            </div>\n            <div class="landing-features-block-description">\n                <div class="landing-icon-style"><img class="landing-icon" src="images/icon-depend.svg">\n                    <div class="l-icon-description">\n                        <h5 class="landing-icon-h">Dependencies between tasks</h5>\n                        <p class="landing-icon-p">What tasks need to finish, before others can start? How will a effect the rest of the project? dependencies give you the answer visually.,</p>\n                    </div>\n                </div>\n                <div class="landing-icon-style"><img class="landing-icon" src="images/icon-critical-psth.svg" width="117">\n                    <div class="l-icon-description">\n                        <h5 class="landing-icon-h">Critical Path</h5>\n                        <p class="landing-icon-p">The critical path is a chain of linked tasks that directly affects the project finish date. If any task on the critical path is late, the whole project is late.</p>\n                    </div>\n                </div>\n                <div class="landing-icon-style"><img class="landing-icon" src="images/manage-resourse.svg" width="117">\n                    <div class="l-icon-description">\n                        <h5 class="landing-icon-h">Manage resources</h5>\n                        <p class="landing-icon-p">The Resource Utilization gives an overview of how your team member\'s time is being utilized.</p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    <div class="landing-footer">Plan&amp;View-2017 &copy;</div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:landingMain"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="landing-menu-container"></div>\n<div class="landing-container"></div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:landingMenu"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<nav class="landing-menu">\n    <img class="logo" src="/images/plan-view-logo.svg" alt="logo">\n    <ul>\n        <div class="landing-menu-left ';
 if (!userId) { ;
__p += 'not-logined';
 } ;
__p += '">\n            ';
 if (userId) { ;
__p += '\n            <li><a class="go-to-projects menu-button">my projects</a></li>\n        </div>\n        <div class="landing-menu-right ';
 if (!userId) { ;
__p += 'not-logined';
 } ;
__p += '">\n            <li><p class="show-user-name user-name">hello, ' +
((__t = ( userName )) == null ? '' : __t) +
' </p></li>\n            <li><a class="sign-out-button menu-button">Sign Out</a></li>\n\n            ';
 } else { ;
__p += '\n            <li><a class="registration-btn menu-button">Sign Up</a></li>\n            <li><a class="login-btn menu-button">Sign In</a></li>\n        </div>\n        ';
 } ;
__p += '\n    </ul>\n</nav>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:landingMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n    <div class="mobile-landing-actions">\n        ';
 if (userId) { ;
__p += '\n        <img class="mobile-logo" src="images/plan-view-logo-1.svg">\n        <h1 class="landing-mobile-h">Create a beautiful project plan in minutes with Plan&amp;View free gantt chart software.</h1>\n            <span class="show-user-name user-name">hello, ' +
((__t = ( userName )) == null ? '' : __t) +
' </span>\n            <input class="go-to-projects mobile-form-button" type="submit" value="my projects">\n            <input class="sign-out-button mobile-form-button" type="submit" value="sign out">\n\n        ';
 } else { ;
__p += '\n                <img class="mobile-logo" src="images/plan-view-logo-1.svg">\n                <input class="login-btn mobile-form-button" type="submit" value="sign in">\n        ';
 } ;
__p += '\n\n    </div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:login"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="form-wrapper">\n    <div class="main-form">\n\n        <div class="form-title">\n            <div>Account Login</div>\n        </div>\n\n        <div class="tab-container">\n\n            <label class="form-label">Email:</label>\n            <input class="form-input-text form-control" maxlength="50" name="email" placeholder="Email"\n                   type="email">\n            <div class="form-error email-error"></div>\n\n            <label class="form-label">Password:</label>\n            <input class="form-input-text form-control" maxlength="50" name="password" placeholder="Password"\n                   type="password">\n            <div class="form-error password-error"></div>\n        </div>\n\n        <div class="login-form-bottom">\n            <input class="form-button ok-button" type="submit" value="ok">\n            <input class="form-button cancel-button" id="exit-button" type="submit" value="cancel">\n        </div>\n\n    </div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:loginMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '\n<div class="mobile-form-title">\n    <img class="mobile-logo" src="images/plan-view-logo-1.svg">\n    <span>Sign In with Account</span>\n</div>\n\n<div class="mobile-tab-container">\n    <input class="mobile-form-input-text mobile-form-control" maxlength="50" name="email" placeholder="Email"\n       type="email">\n\n    <input class="mobile-form-input-text mobile-form-control" maxlength="50" name="password" placeholder="Password"\n       type="password">\n    <div class="mobile-form-error email-error"></div>\n    <div class="mobile-form-error password-error"></div>\n</div>\n\n<div class="mobile-login-form-bottom">\n    <input class="mobile-form-button ok-button" type="submit" value="ok">\n    <input class="mobile-form-button cancel-button" id="exit-button" type="submit" value="cancel">\n</div>\n\n';

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
__p += '<nav class="menu">\n    <ul>\n        <li class="menu-left">\n        <a class="back-to-landing-view" >\n            <img class="logo" src="/images/plan-view-logo.svg" alt="logo">\n        </a>\n        ';
 if (page !== 'projects') { ;
__p += '\n            <a class="go-to-projects button-dark">my projects</a>\n        ';
 } ;
__p += '\n        </li>\n        <li class="menu-right">\n            <p class="show-user-name user-name">hello, ' +
((__t = ( userName )) == null ? '' : __t) +
' </p>\n            <a class="sign-out-button button-dark menu-button">Sign Out</a>\n        </li>\n    </ul>\n</nav>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["common:register"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="form-wrapper">\n    <div class="form-title">\n        <div>Register</div>\n    </div>\n    <form id="regisrationForm">\n        <div class="tab-container">\n            <div class="tab-container">\n                <label class="form-label">First Name:</label>\n                <input class="form-input-text form-control" maxlength="256" type="text"  placeholder="Name" name="firstname" id="firstname">\n                <div class="form-error firstname-error"></div>\n                <label class="form-label">Last Name:</label>\n                <input class="form-input-text form-control" maxlength="256" type="text"  placeholder="Last Name" name="lastname" id="lastname">\n                <div class="form-error lastname-error"></div>\n                <label class="form-label">Email:</label>\n                <input class="form-input-text form-control" maxlength="256" type="email" placeholder="Email" name="email" id="email">\n                <div class="form-error email-error"></div>\n                <label class="form-label">Password:</label>\n                <input class="form-input-text form-control" maxlength="256" type="password" placeholder="Password" name="password" id="password">\n                <div class="form-error password-error"></div>\n                <label class="form-label confirm-password-label">Confirm Password:</label>\n                <input class="form-input-text form-control confirm-password-input" maxlength="256" type="password" placeholder="Confirm Password" name="password2" id="password2">\n                <div class="form-error password2-error"></div>\n            </div>\n        </div>\n        <div class="register-form-bottom">\n            <input id="post_user" class="form-button ok-button" type="submit" value="ok">\n            <input id="exit-button" class="form-button" type="submit" value="cancel">\n        </div>\n    </form>\n</div>\n';

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
__p += '<div class="form-wrapper">\n    <div class="form-title">\n        <div class="left">Attachments</div>\n        <div class="center"></div>\n        <div class="right"><input class="close-btn ok-button form-button cancel-button" type="button" value="" > </div>\n    </div>\n    <div class="attachments-container">\n        <div class="tab-container">\n            <div class="add-attachment">\n                <div class="form-input-file">\n                    <label>\n                        <input id="add-attachment-file" type="file" name="file"/>\n                        <img class="add-img" src="/images/add.svg">\n                        <span>Upload File</span>\n                    </label>\n                </div>\n            </div>\n            <div class="attachments-attachments">\n                ';
 for( var i = 0; i < attachments.length; i++) { ;
__p += '\n                <div class="attachment-item">\n                    <div id="delete-attachment" data-id="' +
((__t = ( attachments[i].attachmentId )) == null ? '' : __t) +
'">\n                        <img src="/images/delete-button.png" class="delete" alt="delete attachment"/>\n                    </div>\n                    ';
 var mimetype = attachments[i].mimetype;
                        var copyMimetype = mimetype.slice(0, mimetype.indexOf('/'));
                        switch (copyMimetype) {
                            case 'application':
                                if (mimetype == 'application/pdf') {
                                    copyMimetype = mimetype.slice(mimetype.indexOf('/'));
                                }
                                else if (mimetype == 'application/msword') {
                                    copyMimetype = mimetype.slice(mimetype.indexOf('/'));
                                }
                                else {
                                    copyMimetype = 'text';
                                }
                        }
                        var scrMimetype = '/images/mimetype_icons/' + copyMimetype + '.png';
                    ;
__p += '\n                    <a class="file-reference" download href="' +
((__t = ( attachments[i].relativePath )) == null ? '' : __t) +
'" target="_blank">\n                        <img src="' +
((__t = ( scrMimetype )) == null ? '' : __t) +
'" class="attachment-image" alt="attachment image"/>\n                        ';
 var str = attachments[i].fileName; ;
__p += '\n                        ';
 if (attachments[i].fileName.length > 9) {
                            str = attachments[i].fileName.substring(0, 9) + '..';
                        } ;
__p += '\n\n                        <div class="attachment-name" id="reference-name">' +
((__t = ( str )) == null ? '' : __t) +
'</div>\n                    </a>\n                </div>\n                ';
 } ;
__p += '\n            </div>\n            <div class="drag-hint">\n                <p>* You can drag\'n\'drop files from your system</p>\n            </div>\n        </div>\n    </div>\n    <div class="attachment-form-bottom">\n        <input class="form-button ok-button" type="submit" value="ok">\n    </div>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:editResource"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper edit-resource">\n    <form class="main-form">\n        <div class="form-title">\n            <div>' +
((__t = ( resource.resourceId ? 'Resource Edit': 'Add Resource' )) == null ? '' : __t) +
'</div>\n        </div>\n        <div class="tabs">\n            <div class="tab-container">\n                <div class="tab-container tab-edit-resource-content show-content">\n                    <label class="form-label">Resource Name:</label>\n                    <input class="form-input-text resource-name" maxlength="256" placeholder="Resource Name" required="required" type="text" value="' +
((__t = ( resource.resourceName )) == null ? '' : __t) +
'">\n                    <label class="form-label">Type:</label>\n                    <select class="form-input-text resource-type" name="type" placeholder="Resource Type">\n                        <option value="worker" ';
 if( resource.type == 'worker') { ;
__p += ' selected ';
 } ;
__p += ' >Worker</option>\n                        <option value="freelancer" ';
 if( resource.type == 'freelancer') { ;
__p += ' selected ';
 } ;
__p += ' >Freelancer</option>\n                        <option value="machine" ';
 if( resource.type == 'machine') { ;
__p += ' selected ';
 } ;
__p += ' >Machine</option>\n                    </select>\n\n                    <label class="form-label">Rate:</label>\n                    <input class="form-input-text resource-rate" maxlength="256" placeholder="Money Per Hour" type="number" value="' +
((__t = ( resource.rate )) == null ? '' : __t) +
'">\n                </div>\n            </div>\n        </div>\n        <div class="resources-form-bottom">\n            <input class="form-button save-button" type="submit" value="' +
((__t = (resource.resourceId ? 'save' : 'add')) == null ? '' : __t) +
'">\n            <input class="form-button cancel-button" type="submit" value="cancel">\n        </div>\n    </form>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:ganttChart"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<svg id="dates" width="100%" height="100%" class="table-task-header gantt-date-header" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n    <svg id="topDates" class="table-header-row gantt-date-top" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>\n    <svg id="bottomDates" class="table-header-row gantt-date-bottom" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>\n</svg>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:ganttChartMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<svg id="dates" width="100%" height="100%" class="table-task-header gantt-date-header" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">\n    <svg id="topDates" class="table-header-row gantt-date-top" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>\n    <svg id="bottomDates" class="table-header-row gantt-date-bottom" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>\n</svg>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:ganttContainer"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {

 if ($('#gantt-view-container').hasClass('resizable')) { ;
__p += '\n<div id="task-container" class="resize-left"></div>\n<div id="splitter"></div>\n<div id="gantt-chart-container"></div>\n';
 }  else { ;
__p += '\n<div id="task-container"></div>\n<div id="gantt-chart-container"></div>\n';
 } ;


}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:ganttTaskRow"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<svg id="gantt-chart-svg" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:ganttTaskRowMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<svg id="gantt-chart-svg" width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"></svg>';

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
((__t = ( moment.unix(startDate).format("DD MMM YYYY hh:mm a") )) == null ? '' : __t) +
'</div>\n    <div class="info-bar-label">Modified: ' +
((__t = (  moment.unix(modifiedDate).format('DD MMM YYYY hh:mm a') )) == null ? '' : __t) +
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
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="milestone-view">\n<div class="milestone-center">\n    <div class="start-date">' +
((__t = ( moment.unix(startDate).format('DD/MM/YY HH:mm') )) == null ? '' : __t) +
'</div>\n    <div class="project-timeline">\n        ';
 for (var i = 0; i < milestones.length; i++) { ;
__p += '\n        <div class="milestone-position" style="left:' +
((__t = ( milestonesPositions[i] )) == null ? '' : __t) +
'%">\n            <div class="milestone-img"></div>\n            <div class="milestone-date-wrap">\n            <div class="milestone-date">' +
((__t = ( moment.unix(milestonesDates[i]).format('DD/MM/YY HH:mm') )) == null ? '' : __t) +
'</div>\n            </div>\n        </div>\n        ';
 } ;
__p += '\n    </div>\n    <div class="end-date">' +
((__t = ( moment.unix(endDate).format('DD/MM/YY HH:mm') )) == null ? '' : __t) +
'</div>\n</div>\n</div>';

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
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div class="left">Milestone Edit</div>\n            <div class="center"></div>\n            <div class="right"><input class="close-btn form-button cancel-button" type="button" value="" > </div>\n        </div>\n        <div class="milestones-container">\n            <div class="tab-container">\n                <div class="tab-container general-content show-content">\n                    <div class="table-milestone-header-row">\n                        <div class="table-header-milestone-cell">Name</div>\n                        <div class="table-header-milestone-cell">Start date</div>\n                    </div>\n                    <div class="table-row">\n                        <img class="add-milestone-img" src="../../../images/add.svg">\n                        <a class="add-milestone-link" id="create-milestone">Milestone</a>\n                    </div>\n                    ';
 for(var i = 0; i < milestones.length; i++) { ;
__p += '\n                    <div class="table-milestone-row">\n                        <div class="table-cell-milestone">\n                            <div class="milestone-task-name"\n                                 data-name="' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'">' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'</div>\n                        </div>\n                        <div class="table-cell-milestone">\n                            <span class="milestone-link edit-single-milestone" title="Edit"\n                                  data-name="' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'"></span>\n                            <span class="milestone-link remove-milestone" title="Delete"\n                                  data-name="' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'"></span>\n                        </div>\n                        <div class="table-cell-milestone">' +
((__t = ( moment.unix(milestones[i].date).format('DD/MM/YY HH:mm') )) == null ? '' : __t) +
'</div>\n                    </div>\n                    ';
 } ;
__p += '\n                </div>\n            </div>\n        </div>\n        <div class="form-bottom">\n            <input class="form-button ok-button" type="button" value="ok">\n            <input class="form-button cancel-button" type="button" value="cancel">\n        </div>\n    </form>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:milestoneMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="mobile-milestone-header">\n    <span class="mobile-milestone-header-title">Milestones</span>\n</div>\n<div class="mobile-milestone-container">\n    ';
 for (var i = 0; i < milestones.length; i++) {;
__p += '\n    <div>\n        <p class="milestone-name">' +
((__t = ( milestones[i].name )) == null ? '' : __t) +
'</p>\n        <p>Date: ' +
((__t = ( milestonesDates[i] )) == null ? '' : __t) +
'</p>\n        <p>Depends on tasks:</p>\n        ';
 for (var j = 0; j < milestones[i].dependsOn.length; j++) {;
__p += '\n        <p class="tasks">' +
((__t = ( milestones[i].dependsOn[j].taskName )) == null ? '' : __t) +
'</p>\n        ';
};
__p += '\n    </div>\n    ';
};
__p += '\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:ownership"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <p class="left">Ownership</p>\n            <div class="center"></div>\n            <div class="right"><input class="close-btn form-button cancel-button" type="button" value="" > </div>\n        </div>\n        <div class="ownership-container">\n            <div class="ownership-input-container">\n                <label class="form-label">Input user email:</label>\n                <form class="add-ownership">\n                    <input class="ownership-form-input-text user-email" type="email" required>\n                    <button class="add-ownership-button">Add</button>\n                </form>\n                <div class="ownerhip-radio">\n                    <input type="radio" id="reader" name="ownership" value="reader" checked="checked">reader\n                    <input type="radio" id="editor" name="ownership" value="editor">editor\n                </div>\n            </div>\n            <label class="ownership-form-label">Readers</label>\n            <label class="ownership-form-label">Editors</label>\n            <div class="ownership-drop-list">\n                <table id="ownership-readers-list">\n                    <tbody>\n                    ';
 for(var i = 0;i < readersList.length; i++) { ;
__p += '\n                    <tr class="task-item" id="' +
((__t = ( readersList[i].email )) == null ? '' : __t) +
'">\n                        <td> ' +
((__t = ( readersList[i].email )) == null ? '' : __t) +
'\n                            <span class="ownership-link delete-ownership"\n                                  data-email="' +
((__t = ( readersList[i].email )) == null ? '' : __t) +
'"></span>\n                        </td>\n                    </tr>\n                    ';
 } ;
__p += '\n                    </tbody>\n                </table>\n            </div>\n            <div class="ownership-drop-list">\n                <table id="ownership-editors-list">\n                    <tbody>\n                    ';
 for(var i = 0;i < editorsList.length; i++) { ;
__p += '\n                    <tr class="task-item" id="' +
((__t = ( editorsList[i].email )) == null ? '' : __t) +
'">\n                        <td> ' +
((__t = ( editorsList[i].email )) == null ? '' : __t) +
'\n                            <span class="ownership-link delete-ownership"\n                                  data-email="' +
((__t = ( editorsList[i].email )) == null ? '' : __t) +
'"></span>\n                        </td>\n\n                    </tr>\n                    ';
 } ;
__p += '\n                    </tbody>\n                </table>\n            </div>\n        </div>\n\n        <div class="form-bottom">\n            <input class="form-button ok-button" value="ok">\n            <input class="form-button cancel-button" value="cancel">\n        </div>\n    </form>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:price"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div class="left">Project Price</div>\n            <div class="center"></div>\n            <div class="right"><button class="close-btn form-button cancel-button ok-button" type="button"></button></div>\n        </div>\n        <div class="tab-container">\n            <div class="tab-container">\n                <label class="form-label project-price">Project Price:</label>\n                <div class="price-container">\n                    <div class="table-price-header">\n                        <div class="table-item">Name</div>\n                        <div class="table-item">Price</div>\n                    </div>\n                    <div class="resources-prices">\n                        ';
 for(var i = 0; i < resources.length; i++) { ;
__p += '\n                            <div class="table-resource-row">\n                                <div class="price-item">' +
((__t = ( resources[i].resourceName )) == null ? '' : __t) +
'</div>\n                                <div class="price-item">' +
((__t = ( price.resourcesPrice[i])) == null ? '' : __t) +
'</div>\n                            </div>\n                        ';
 } ;
__p += '\n                    </div>\n                    <br>\n                    <div class="total-price-label">Total Price: </div>\n                    <div class="total-price-value">' +
((__t = ( price.price )) == null ? '' : __t) +
'</div>\n                </div>\n                <br>\n                <label class="form-label project-duratione">Project Duration:</label>\n                <div class="duration-value">' +
((__t = ( duration )) == null ? '' : __t) +
'</div>\n            </div>\n        </div>\n        <div class="project-price-form-bottom">\n            <button type="button" class="form-button ok-button">ok</button>\n        </div>\n    </form>\n</div>\n';

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
__p += '<div class="menu-toolbar">\n    <div class="project-name-and-icon">\n    ';
 if (page !== 'projects') { ;
__p += '\n    <div>\n        <img class="project-logo" src="">\n    </div>\n    <p class="show-project-name"> </p>\n    ';
 } ;
__p += '\n    </div>\n    <div class="tool-bar">\n        <a class="tool-img tool-zoom-out" title="Zoom Out"></a>\n        <label id="zoom-value" class="zoom-value">100%</label>\n        <a class="tool-img tool-zoom-in" title="Zoom In"></a>\n        <a class="tool-img tool-fit" title="Fit To Screen"></a>\n        <a class="tool-img tool-undo" title="Undo" id="undo" disabled="disabled"></a>\n        <a class="tool-img tool-redo" title="Redo" id="redo" disabled="disabled"></a>\n        <a class="tool-img tool-price" title="Project Price" id="price"></a>\n        <a class="edit-milestone tool-img tool-milestone" title="Milestones"></a>\n        <a class="tool-critical-way tool-img" title="Critical Path"></a>\n        <a class="show-attachments tool-attachment tool-img" title="Attachments"></a>\n        <a class="show-resources tool-resources tool-img" title="Resources"></a>\n        <a class="show-ownership tool-ownership tool-img" title="Ownership"></a>\n        <a class="show-settings tool-settings tool-img" title="Settings"></a>\n    </div>\n</div>\n<div id="milestone-view-container"></div>\n<!--Added class resible to show splitter between inner containers-->\n<div id="gantt-view-container" class="resizable"></div>\n<div id="info-bar-view-container"></div>\n<div id="task-info-view-container"></div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:projectInfoMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="mobile-project-info-header">\n    <span class="mobile-project-info-header-title">Project Info</span>\n</div>\n\n<ul class="project-info-mobile">\n    <span class="project-info-mobile-item">Author: ' +
((__t = ( project.author )) == null ? '' : __t) +
'</span>\n    <span class="project-info-mobile-item">StartDate: ' +
((__t = ( moment.unix(project.startDate).format('DD/MM/YY HH:mm') )) == null ? '' : __t) +
'</span>\n    <span class="project-info-mobile-item">Description:</span>\n    <span class="project-info-mobile-block"> ' +
((__t = ( project.description )) == null ? '' : __t) +
'</span>\n</ul>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:projectMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<nav id="menu" class="menu-mobile slideout-menu slideout-menu-left">\n\n    <header class="mobile-menu-header">\n        <span class="mobile-menu-header-title">Project Menu</span>\n    </header>\n\n    <div class="mobile-menu-section">\n        <ul class="mobile-menu-section-list">\n            <li class="mobile-menu-section-item"><a class="back-to-projects">List of Projects</a></li>\n            <li class="mobile-menu-section-item"><a class="show-tasks-list">Tasks</a></li>\n            <li class="mobile-menu-section-item"><a class="show-ganttchart">Gantt Chart</a></li>\n            <li class="mobile-menu-section-item"><a class="show-milestones">Milestones</a></li>\n            <li class="mobile-menu-section-item"><a class="show-resources">Resources</a></li>\n            <li class="mobile-menu-section-item"><a class="sign-out-button">Sign Out</a></li>\n        </ul>\n    </div>\n</nav>\n\n<main id="panel" class="panel slideout-panel slideout-panel-left">\n    <header class="panel-header">\n        <button class="toggle-button">&#9776;</button>\n        <span class="mobile-panel-header-title"> ' +
((__t = ( project.name )) == null ? '' : __t) +
'</span>\n    </header>\n    <!--This empty CONTENT div below is for rendering our views like: ProjectInfo, TasksList, Milestones, Resources-->\n    <div class="mobile-project-content"></div>\n</main>\n\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:resources"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div class="left">Resources</div>\n            <div class="center"></div>\n            <div class="right"><input class="close-btn form-button cancel-button" type="button" value="" > </div>\n        </div>\n        <div class="resources-container">\n            <div class="tab-container">\n                <div class="tab-container tab-general-content show-content">\n                    <div class="table-resource-header-row">\n                        <div class="table-header-resource-cell">Name</div>\n                        <div class="table-header-resource-cell rate">Rate</div>\n                        <div class="table-header-resource-cell type">Type</div>\n                    </div>\n                    <div class="table-row">\n                        <img class="add-resource-img" src="../../../images/add.svg">\n                        <a class="add-resource-link" id="create-resource">Resource</a>\n                    </div>\n                    <div class="resources-list">\n                        ';
for(var i = 0; i < resources.length; i++) {;
__p += '\n                        <div class="table-resource-row">\n                            <div class="table-cell-resource">\n                                <div class="edit" id="' +
((__t = ( i )) == null ? '' : __t) +
'">' +
((__t = ( resources[i].resourceName )) == null ? '' : __t) +
'</div>\n                            </div>\n                            <div class="table-cell-resource rate">' +
((__t = ( resources[i].rate )) == null ? '' : __t) +
'</div>\n                            <div class="table-cell-resource">\n                                <div class="type">' +
((__t = ( resources[i].type )) == null ? '' : __t) +
'</div>\n                                <span class="resource-link remove-resource" id="' +
((__t = ( i )) == null ? '' : __t) +
'"></span>\n                                <span class="resource-link edit-resource" id="' +
((__t = ( i )) == null ? '' : __t) +
'"></span>\n                            </div>\n                        </div>\n                        ';
 } ;
__p += '\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="resources-form-bottom">\n            <input class="form-button ok-button" type="submit" value="save">\n            <input class="form-button cancel-button" type="submit" value="cancel">\n        </div>\n    </form>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:resourcesMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="mobile-resource-header">\n    <span class="mobile-resource-header-title">Resources</span>\n</div>\n\n<div class="mobile-resource-container">\n    ';
 for(var i = 0; i < resources.length; i++) { ;
__p += '\n    <li class="resources-list-item" data-id="' +
((__t = ( resources[i].resourceId )) == null ? '' : __t) +
'">\n        <a class="resources-name"> ' +
((__t = ( resources[i].resourceName )) == null ? '' : __t) +
' </a>\n        <a class="resources-name"> Rate: ' +
((__t = ( resources[i].rate )) == null ? '' : __t) +
' ($) </a>\n        <a class="resources-name"> ' +
((__t = ( resources[i].type )) == null ? '' : __t) +
' </a>\n        ';
 } ;
__p += '\n    </li>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:settings"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div class="left">Settings</div>\n            <div class="center"></div>\n           <div class="right"><input class="close-btn form-button cancel-button" type="button" value="" > </div>\n        </div>\n        <div class="tabs">\n            <div class="tabs-menu ">\n                <a class="tab-link tab-general w--current">General</a>\n                <a class="tab-link tab-time-settings">Time Settings</a>\n            </div>\n            <div class="settings-container">\n                <div class="tab-container">\n                    <div class="tab-container general-content show-content">\n                        <label class="form-label">Name:</label>\n                        <input class="form-input-text form-control name" maxlength="256" value="' +
((__t = ( model.name )) == null ? '' : __t) +
'" name="name" placeholder="Project Name" type="text">\n                        <!--<div class="form-error name-error"></div>-->\n                        <label class="form-label">Author:</label>\n                        <input class="form-input-text form-control author" maxlength="256" value="' +
((__t = ( model.author )) == null ? '' : __t) +
'" name="author" placeholder="Author" type="text">\n                        <!--<div class="form-error author-error"></div>-->\n                        <label class="form-label description-label">Description:</label>\n                        <textarea class="form-input-description form-control description" maxlength="5000" name="description" placeholder="Project Description">' +
((__t = ( model.description )) == null ? '' : __t) +
'</textarea>\n                        <!--<div class="form-error description-error"></div>-->\n\n                        <div class="add-project-icon ">\n                           <label class="form-label pr-icon">Project icon:</label>\n                        <div class="add-attachment" >\n                            <div class="form-input-file input-project-icon">\n                                <label>\n                                    <input id="add-attachment-file" type="file" name="file" accept="image/*" />\n                                    <img class="add-img" src="/images/add.svg">\n                                    <span>Add img</span>\n                                </label>\n                            </div>\n                        </div>\n\n                       </div>\n                    </div>\n                    <div class="tab-container settings-content hide-content">\n                        <label class="form-label">Start Date:</label>\n                        <input class="form-input-text form-control start-date" value="' +
((__t = ( moment.unix(+model.startDate).format('YYYY-MM-DD'))) == null ? '' : __t) +
'"  name="startDate" placeholder="Project Start Date" type="date">\n                        <!--<div class="form-error startDate-error"></div>-->\n                        <label class="form-label day-start-label">Working Day Start:</label>\n                        <input class="form-input-text form-control working-day-start" value="' +
((__t = ( moment.duration(+settings.dayStart, 'seconds').asHours() )) == null ? '' : __t) +
'" name="dayStart" placeholder="Working Day Start" type="number" min="0" max="24">\n                        <!--<div class="form-error dayStart-error"></div>-->\n                        <label class="form-label">Hours Per Day:</label>\n                        <input class="form-input-text form-control day-duration" value="' +
((__t = ( moment.duration(+settings.dayDuration, 'seconds').asHours() )) == null ? '' : __t) +
'" name="dayDuration" placeholder="Working Hours Per Day" type="number" min="0" max="24">\n                        <!--<div class="form-error dayDuration-error"></div>-->\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="settings-form-bottom">\n            <input class="form-button ok-button" type="button" value="ok">\n            <input class="form-button cancel-button" type="button" value="cancel">\n        </div>\n    </form>\n</div>\n\n\n\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:singleMilestone"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div>' +
((__t = ( milestone.name ? 'Edit milestone' : 'Create milestone' )) == null ? '' : __t) +
'</div>\n        </div>\n        <div class="milestones-container">\n            <div class="tab-container">\n                <div class="tab-container dependencies-content">\n                    <div class="set-milestone-name">\n                        <label>Name:</label>\n                        <input class="milestone-form-input-text" id="milestone-settings-name" type="text"\n                               value="' +
((__t = ( milestone.name )) == null ? '' : __t) +
'" required>\n                    </div>\n                    <label class="dependancy-label form-label">Task List</label>\n                    <label class="dependancy-label form-label">Depends On</label>\n                    <div class="milestone-clone">\n                        <div class="milestone-drop-list scrollable">\n                            <table id="milestone-tasks-list">\n                                <tbody>\n                                ';
 for(var i = 0;i < tasksList.length; i++) { ;
__p += '\n                                <tr class="milestone-task-item" id="' +
((__t = ( tasksList[i].taskId )) == null ? '' : __t) +
'">\n                                    <td> ' +
((__t = ( tasksList[i].name )) == null ? '' : __t) +
'</td>\n                                </tr>\n                                ';
 } ;
__p += '\n                                </tbody>\n                            </table>\n                        </div>\n                        <div class="milestone-drop-list scrollable">\n                            <table id="dependencies-list">\n                                <tbody>\n                                ';
 for(var i = 0; i < dependenciesList.length; i++) { ;
__p += '\n                                <tr class="milestone-task-item" id="' +
((__t = ( dependenciesList[i].taskId )) == null ? '' : __t) +
'">\n                                    <td>' +
((__t = ( dependenciesList[i].name )) == null ? '' : __t) +
'</td>\n                                </tr>\n                                </tbody>\n                                ';
 } ;
__p += '\n                            </table>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class="form-bottom">\n            <input class="form-button ok-button" type="button" value="save">\n            <input class="form-button cancel-button" type="button" value="cancel">\n        </div>\n    </form>\n</div>\n';

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
__p += '<div class="form-wrapper">\n    <form class="main-form">\n        <div class="form-title">\n            <div class="left">Task Edit</div>\n            <div class="center"></div>\n            <div class="right"><input class="close-btn form-button cancel-button" type="button" value="" > </div>\n        </div>\n        <div class="tabs">\n            <div class="tabs-menu ">\n                <a class="tab-link tab-general w--current">General</a>\n                <a class="tab-link tab-dependencies">Depends On</a>\n                <a class="tab-link tab-attachments">Attachments</a>\n            </div>\n\n            <div class="tasks-container">\n                <div class="tab-container">\n                    <div class="tab-container general-content show-content">\n                        <label class="form-label">Task Name:</label>\n                        <input class="form-input-text task-name" maxlength="256" value="' +
((__t = ( task.name )) == null ? '' : __t) +
'" placeholder="Task Name" required="required" type="text">\n                        <label class="form-label">Assignee:</label>\n                        ';
 var resourceName = ''; ;
__p += '\n                        ';
 for(var i = 0; i < resources.length; i++) { ;
__p += '\n                        ';
    if(task.resource === resources[i].resourceName) { ;
__p += '\n                        ';
         resourceName = resources[i].resourceName; ;
__p += '\n                        ';
    } ;
__p += '\n                        ';
 } ;
__p += '\n                        <select class="form-input-text task-resource" name="resource" value="' +
((__t = ( resourceName )) == null ? '' : __t) +
'">\n                            <option value="default" ></option>\n                            ';
 for(var i = 0; i < resources.length; i++) { ;
__p += '\n                                <option value="' +
((__t = ( resources[i].resourceName )) == null ? '' : __t) +
'" ';
 if(resourceName == resources[i].resourceName) { ;
__p += 'selected';
 } ;
__p += '>' +
((__t = ( resources[i].resourceName )) == null ? '' : __t) +
'</option>\n                            ';
 } ;
__p += '\n                        </select>\n                        <label class="form-label">Estimate:</label>\n                        <input class="form-input-text task-estimate" maxlength="256" value="' +
((__t = ( moment.duration(task.estimateTime, 'seconds').asHours() )) == null ? '' : __t) +
'" placeholder="Estimate hours" type="number" min="0">\n                        <label class="form-label description-label">Description:</label>\n                        <textarea class="form-input-description task-description" maxlength="5000" placeholder="Task Description">' +
((__t = ( task.description )) == null ? '' : __t) +
'</textarea>\n                    </div>\n                    <div class="tab-container dependencies-content hide-content">\n                        <label class="dependancy-label form-label">Task List</label>\n                        <label class="dependancy-label form-label">Depends On</label>\n                        <div class="clone">\n                            <div class="drop-list scrollable" id="list-of-tasks">\n                                <table id="all-tasks-list">\n                                    <tbody>\n                                        ';
 for(var i=0;i<tasksList.length;i++) { ;
__p += '\n                                        <tr class="task-item" id="' +
((__t = ( tasksList[i].taskId)) == null ? '' : __t) +
'"><td> ' +
((__t = ( tasksList[i].name )) == null ? '' : __t) +
'</td></tr>\n                                        ';
 } ;
__p += '\n                                    </tbody>\n                                </table>\n                            </div>\n                            <div class="drop-list scrollable" id="list-of-dependencies">\n                                <table id="dependencies-list">\n                                    <tbody>\n                                        ';
 for(var i=0;i<dependenciesList.length;i++) { ;
__p += '\n                                        <tr class="task-item" id="' +
((__t = ( dependenciesList[i].taskId)) == null ? '' : __t) +
'"><td>' +
((__t = ( dependenciesList[i].name )) == null ? '' : __t) +
'</td> </tr>\n                                        ';
 } ;
__p += '\n                                    </tbody>\n                                </table>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="tab-container attachments-content hide-content" >\n                        <div class="add-attachment">\n                            <div class="form-input-file">\n                                <label>\n                                    <input id="add-attachment-file" type="file" name="file"/>\n                                    <img class="add-img" src="/images/add.svg">\n                                    <span>Upload File</span>\n                                </label>\n                            </div>\n                        </div>\n                        <div class="task-attachments">\n                            ';
 for( var i=0; i<task.attachments.length; i++) { ;
__p += '\n                            <div class="attachment-item">\n                                <div id="delete-attachment" data-id="' +
((__t = ( task.attachments[i].attachmentId )) == null ? '' : __t) +
'" >\n                                    <img src="/images/cancel.svg" class="delete"  alt="delete attachment"/>\n                                </div>\n                                <a class="file-reference" download href="' +
((__t = (task.attachments[i].relativePath)) == null ? '' : __t) +
'" target="_blank">\n                                    <img src="' +
((__t = ( mimetypes[i])) == null ? '' : __t) +
'" class="attachment-image" alt="attachment image"/>\n                                    ';
 var str = task.attachments[i].fileName; ;
__p += '\n                                    ';
 if(task.attachments[i].fileName.length>9)  { str = task.attachments[i].fileName.substring(0,9)+'..';} ;
__p += '\n                                    <div class="attachment-name" id="reference-name">' +
((__t = ( str )) == null ? '' : __t) +
'</div>\n                                </a>\n                            </div>\n                            ';
 } ;
__p += '\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n        </div>\n        <div class="task-form-bottom">\n            <button type="button" id="delete-task" class="form-button delete-task ';
 if (deleteTask === true) { ;
__p += ' hide-content ';
 } ;
__p += ' ';
 if (deleteTask === false) { ;
__p += ' show-content ';
 } ;
__p += '">delete</button>\n            <input type="button" class="form-button ok-button" value="ok">\n            <input type="button" class="form-button cancel-button" value="cancel">\n        </div>\n    </form>\n</div>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:taskInfo"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="info-bar-item">\n    <div class="info-bar-label">' +
((__t = ( name )) == null ? '' : __t) +
'</div>\n    <div class="description">Description: ' +
((__t = ( description )) == null ? '' : __t) +
'</div>\n</div>\n<div class="info-bar-item">\n    <div class="info-bar-label">Estimate Time: ' +
((__t = ( estimateTime )) == null ? '' : __t) +
' hour(s)</div>\n    <div class="info-bar-label">Resource Name: ' +
((__t = ( resource )) == null ? '' : __t) +
'</div>\n</div>\n<div class="info-bar-item">\n    <div class="info-bar-label">Start Date: ' +
((__t = ( startDate )) == null ? '' : __t) +
'</div>\n    <div class="info-bar-label">End Date: ' +
((__t = ( endDate )) == null ? '' : __t) +
'</div>\n</div>\n<div class="info-bar-item">\n    <div class="info-bar-label">Depends On Tasks: ' +
((__t = ( dependsOn )) == null ? '' : __t) +
'</div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:taskInfoMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="mobile-task-info-header">\n    <span class="mobile-task-info-header-title">Task Info</span>\n</div>\n\n<ul class="task-info-mobile">\n    <span class="task-info-mobile-item">Name: ' +
((__t = ( task.name )) == null ? '' : __t) +
'</span>\n    <span class="task-info-mobile-item">Resource: ' +
((__t = ( task.resource )) == null ? '' : __t) +
'</span>\n    <span class="task-info-mobile-item">StartDate: ' +
((__t = ( moment.unix(task.startDate).format('DD/MM/YY HH:mm') )) == null ? '' : __t) +
'</span>\n    <span class="task-info-mobile-item">Description:</span>\n    <span class="task-info-mobile-block"> ' +
((__t = ( task.description )) == null ? '' : __t) +
'</span>\n</ul>\n';

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
__p += '<div class="table-task-row" data="' +
((__t = ( task.taskId )) == null ? '' : __t) +
'">\n    <div class="table-cell-task">\n        <button class="task-link icon-edit" title="Edit" id="' +
((__t = ( task.taskId )) == null ? '' : __t) +
'"></button>\n        <div id="' +
((__t = ( task.taskId )) == null ? '' : __t) +
'" class="cell-task">' +
((__t = ( task.name )) == null ? '' : __t) +
'</div>\n    </div>\n\n    <div class="table-cell task-estimateTime table-cell-number">' +
((__t = ( estimateTime )) == null ? '' : __t) +
'</div>\n\n    <div class="table-cell task-startDate table-cell-number">' +
((__t = ( startDate )) == null ? '' : __t) +
'</div>\n    <!--';
 var dependencies = []; ;
__p += '-->\n    <!--';
 for (var j = 0; j < task.dependsOn.length; j++) { ;
__p += '-->\n    <!--TO DO "false" string in db-->\n    <!--';
 if (task.dependsOn[j].taskId != "false") { ;
__p += '-->\n    <!--';
 dependencies.push(task.dependsOn[j].taskId); ;
__p += '-->\n    <!--';
 } ;
__p += '-->\n    <!--';
 } ;
__p += '-->\n    <!--';
 for (j = 0; j < dependencies.length; j++) { ;
__p += '-->\n    <!--';
 for (var i = 0; i < tasks.length; i++) { ;
__p += '-->\n    <!--';
 if (tasks[i].taskId == dependencies[j]) { ;
__p += '-->\n    <!--';
 dependencies[j] = tasks[i].name; ;
__p += '-->\n    <!--';
 } ;
__p += '-->\n    <!--';
 } ;
__p += '-->\n    <!--';
 } ;
__p += '-->\n    <!--<div class="table-cell-dependsOn task-dependsOn">' +
((__t = ( dependencies.toString() )) == null ? '' : __t) +
'</div>-->\n\n    <div class="table-cell task-resource">' +
((__t = ( task.resource )) == null ? '' : __t) +
'</div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:tasksList"] = function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += '<div class="table-task-header">\n    <div class="table-header-row">\n    </div>\n    <div class="table-header-row">\n        <div class="table-cell-task">\n            <a class="add-task add-task-icon" title="Add task"></a>\n            Task Name\n        </div>\n        <div class="table-cell">Estimate (man*hrs)</div>\n        <div class="table-cell">Start Date</div>\n        <div class="table-cell">Assignee</div>\n    </div>\n</div>';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["project:tasksListMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '\n<div class="mobile-tasks-header">\n    <span class="mobile-tasks-header-title">Tasks List</span>\n</div>\n\n<ul class="mobile-tasks-list">\n    ';
 for(var i = 0; i < tasks.length; i++) {;
__p += '\n    <li class="tasks-list-item" data-id="' +
((__t = ( tasks[i].taskId )) == null ? '' : __t) +
'">\n        <a class="tasks-name"> ' +
((__t = ( tasks[i].name )) == null ? '' : __t) +
' </a>\n        <a class="tasks-link icon-open-mobile" title="Open" data-id="' +
((__t = ( tasks[i].taskId )) == null ? '' : __t) +
'"></a>\n    </li>\n    ';
 } ;
__p += '\n</ul>';

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
__p += '<div class="create-button-container">\n    <button class="create-project">New Project</button>\n</div>\n<div class="projects-list-block"></div>\n<div class="project-about-block"></div>\n<div class="popup-container"></div>\n';

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
__p += '<div class="form-wrapper">\n    <div class="main-form">\n\n        <div class="form-title">\n            <div>Project Edit</div>\n            <div class="center"></div>\n            <div class="right"><input class="close-btn form-button cancel-button" type="button" value="" > </div>\n        </div>\n\n        <div class="tab-container">\n\n            <label class="form-label">' +
((__t = ( project.name ? 'Update' : 'Create' )) == null ? '' : __t) +
' Project</label>\n            <input class="form-input-text form-control" id="name" type="text" name="name" placeholder="Project Name"\n                   value="' +
((__t = ( project.name )) == null ? '' : __t) +
'">\n            <div class="form-error name-error"></div>\n\n            <label class="form-label description-label">Description</label>\n            <textarea class="form-input-description form-control" id="description" maxlength="50" name="description"\n                      placeholder="Description">' +
((__t = ( project.description )) == null ? '' : __t) +
'</textarea>\n            <div class="form-error description-error"></div>\n            ';
 if(project) { ;
__p += '\n            <input type="hidden" name="id" value="' +
((__t = ( project.id )) == null ? '' : __t) +
'"/>\n            ';
 } ;
__p += '\n        </div>\n\n        <div class="form-bottom">\n            <input class="form-button ok-button" type="submit" value="' +
((__t = ( project.name ? 'Update' : 'Create' )) == null ? '' : __t) +
'">\n            <input class="form-button cancel-button" type="submit" value="cancel">\n        </div>\n\n    </div>\n</div>\n';

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
' </a>\n            <a class="project-link icon-edit" title="Edit" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'"></a>\n            <a class="project-link icon-remove" title="Delete" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'"></a>\n            <a class="project-link icon-open" title="Open" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'"></a>\n        </li>\n    ';
 } ;
__p += '\n</ul>\n';

}
return __p
}})();
(function() {
window["JST"] = window["JST"] || {};

window["JST"]["projects:projectsListMobile"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<div class="mobile-projects-header">\n    <span class="mobile-projects-header-title">Projects List</span>\n</div>\n\n<ul class="mobile-projects-list">\n    ';
 for(var i = 0; i < projects.length; i++) {;
__p += '\n    <li class="projects-list-item" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'">\n        <a class="projects-name"> ' +
((__t = ( projects[i].name )) == null ? '' : __t) +
' </a>\n        <a class="projects-link icon-open-mobile" title="Open" data-id="' +
((__t = ( projects[i].id )) == null ? '' : __t) +
'"></a>\n    </li>\n    ';
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
__p += '<div class="projects-title">\n\n    <div class="project-title-text">\n            <p><strong>Click on project name to see it\'s description and use doubleclick or "Go to!" button to visit it\'s\n                page! Press New to create project or Edit/Remove signs for existing one.</strong></p>\n    </div>\n\n</div>';

}
return __p
}})();
return JST;

});
