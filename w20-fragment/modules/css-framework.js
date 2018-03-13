/*
 * Copyright (c) 2013-2016, The SeedStack authors <http://seedstack.org>
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

define([
    'require',
    'module',

    'jquery',
    '{lodash}/lodash',
    '{angular}/angular',

    '{bootstrap}/js/bootstrap',
    '[css]!{bootstrap}/css/bootstrap',
    '{angular-bootstrap}/ui-bootstrap-tpls',
    '[css]!{font-awesome}/css/font-awesome',

    '{w20-core}/modules/env',
    '{w20-core}/modules/culture',
    '{w20-core}/modules/security'

], function (require, module, $, _, angular) {
    'use strict';

    var w20CSSFramework = angular.module('w20CSSFramework', ['ui.bootstrap', 'w20CoreEnv', 'w20CoreSecurity', 'w20CoreCulture']);

    w20CSSFramework.run(['EventService', 'CultureService', 'uibDatepickerConfig', 'uibDatepickerPopupConfig',
        function (eventService, cultureService, datepickerConfig, datepickerPopupConfig) {

            datepickerConfig.formatDay = 'dd';
            datepickerConfig.formatMonth = 'MMMM';
            datepickerConfig.formatYear = 'yyyy';
            datepickerConfig.formatDayHeader = 'ddd';
            datepickerConfig.formatDayTitle = 'MMMM yyyy';
            datepickerConfig.formatMonthTitle = 'yyyy';

            function updateDatePicker(culture) {
                datepickerPopupConfig.datepickerPopup = culture.calendars.standard.patterns.d;
                datepickerPopupConfig.currentText = cultureService.localize('w20.bs3.datepicker.today');
                datepickerPopupConfig.clearText = cultureService.localize('w20.bs3.datepicker.clear');
                datepickerPopupConfig.closeText = cultureService.localize('w20.bs3.datepicker.close');
            }

            eventService.on('w20.culture.culture-changed', function (culture) {
                updateDatePicker(culture);
            });

            updateDatePicker(cultureService.culture());
        }]);

    return {
        angularModules: ['w20CSSFramework'],
        get name() {
            return 'bootstrap-3';
        }
    };
});