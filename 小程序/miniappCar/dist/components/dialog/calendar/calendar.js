"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.isUpSlide = isUpSlide;
exports.isDownSlide = isDownSlide;
exports.isLeftSlide = isLeftSlide;
exports.isRightSlide = isRightSlide;
function newDate(year, month, day) {
  return new Date(year, month, day);
}

/**
 *  todo 数组去重
 * @param {array} array todo 数组
 */
function uniqueTodoLabels() {
  var array = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var uniqueObject = {};
  var uniqueArray = [];
  array.forEach(function (item) {
    uniqueObject[item.year + "-" + item.month + "-" + item.day] = item;
  });
  for (var i in uniqueObject) {
    uniqueArray.push(uniqueObject[i]);
  }
  return uniqueArray;
}

/**
 * 上滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
function isUpSlide(e) {
  var _state$gesture = this.state.gesture,
      startX = _state$gesture.startX,
      startY = _state$gesture.startY;

  if (this.slideLock) {
    var t = e.touches[0];
    var deltaX = t.clientX - startX;
    var deltaY = t.clientY - startY;
    if (deltaY < -60 && deltaX < 20 && deltaX > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}
/**
 * 下滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
function isDownSlide(e) {
  var _state$gesture2 = this.state.gesture,
      startX = _state$gesture2.startX,
      startY = _state$gesture2.startY;

  if (this.slideLock) {
    var t = e.touches[0];
    var deltaX = t.clientX - startX;
    var deltaY = t.clientY - startY;
    if (deltaY > 60 && deltaX < 20 && deltaX > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}
/**
 * 左滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
function isLeftSlide(e) {
  var _state$gesture3 = this.state.gesture,
      startX = _state$gesture3.startX,
      startY = _state$gesture3.startY;

  if (this.slideLock) {
    var t = e.touches[0];
    var deltaX = t.clientX - startX;
    var deltaY = t.clientY - startY;
    if (deltaX < -60 && deltaY < 20 && deltaY > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}
/**
 * 右滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
function isRightSlide(e) {
  var _state$gesture4 = this.state.gesture,
      startX = _state$gesture4.startX,
      startY = _state$gesture4.startY;

  if (this.slideLock) {
    var t = e.touches[0];
    var deltaX = t.clientX - startX;
    var deltaY = t.clientY - startY;

    if (deltaX > 60 && deltaY < 20 && deltaY > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}

var conf = {
  /**
   * 计算指定月份共多少天
   * @param {number} year 年份
   * @param {number} month  月份
   */
  getThisMonthDays: function getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },

  /**
   * 计算指定月份第一天星期几
   * @param {number} year 年份
   * @param {number} month  月份
   */
  getFirstDayOfWeek: function getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },

  /**
   * 计算指定日期星期几
   * @param {number} year 年份
   * @param {number} month  月份
   * @param {number} date 日期
   */
  getDayOfWeek: function getDayOfWeek(year, month, date) {
    return new Date(Date.UTC(year, month - 1, date)).getDay();
  },

  /**
   * 渲染日历
   * @param {number} curYear
   * @param {number} curMonth
   * @param {number} curDate
   */
  renderCalendar: function renderCalendar(curYear, curMonth, curDate) {
    conf.calculateEmptyGrids.call(this, curYear, curMonth);
    conf.calculateDays.call(this, curYear, curMonth, curDate);

    var _ref = this.state.calendar || {},
        todoLabels = _ref.todoLabels;

    var afterCalendarRender = this.config.afterCalendarRender;

    if (todoLabels && todoLabels instanceof Array) {
      conf.setTodoLabels.call(this);
    }
    if (afterCalendarRender && typeof afterCalendarRender === "function" && !this.firstRender) {
      afterCalendarRender();
      this.firstRender = true;
    }
  },

  /**
   * 计算当前月份前后两月应占的格子
   * @param {number} year 年份
   * @param {number} month 月份
   */
  calculateEmptyGrids: function calculateEmptyGrids(year, month) {
    conf.calculatePrevMonthGrids.call(this, year, month);
    conf.calculateNextMonthGrids.call(this, year, month);
  },

  /**
   * 计算上月应占的格子
   * @param {number} year 年份
   * @param {number} month 月份
   */
  calculatePrevMonthGrids: function calculatePrevMonthGrids(year, month) {
    var empytGrids = [];
    var prevMonthDays = conf.getThisMonthDays(year, month - 1);
    var firstDayOfWeek = conf.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      var len = prevMonthDays - firstDayOfWeek;
      for (var i = prevMonthDays; i > len; i--) {
        empytGrids.push(i);
      }
      this.setState({
        empytGrids: empytGrids.reverse()
        // calendar: Object.assign({}, this.state.calendar, {
        //   empytGrids: empytGrids.reverse()
        // })
      });
    } else {
      this.setState({
        empytGrids: null
        // calendar: Object.assign({}, this.state.calendar, { empytGrids: null })
      });
    }
  },

  /**
   * 计算下月应占的格子
   * @param {number} year 年份
   * @param {number} month  月份
   */
  calculateNextMonthGrids: function calculateNextMonthGrids(year, month) {
    var lastEmptyGrids = [];
    var thisMonthDays = conf.getThisMonthDays(year, month);
    var lastDayWeek = conf.getDayOfWeek(year, month, thisMonthDays);
    if (+lastDayWeek !== 6) {
      var len = 7 - (lastDayWeek + 1);
      for (var i = 1; i <= len; i++) {
        lastEmptyGrids.push(i);
      }
      this.setState({
        lastEmptyGrids: lastEmptyGrids
      });
    } else {
      this.setState({
        lastEmptyGrids: null
      });
    }
  },

  /**
   * 设置日历面板数据
   * @param {number} year 年份
   * @param {number} month  月份
   */
  calculateDays: function calculateDays(year, month, curDate) {
    var _this = this;

    var days = [];
    var _state = this.state,
        todayTimestamp = _state.todayTimestamp,
        _state$disableDays = _state.disableDays,
        disableDays = _state$disableDays === undefined ? [] : _state$disableDays,
        _state$enableArea = _state.enableArea,
        enableArea = _state$enableArea === undefined ? [] : _state$enableArea;

    var thisMonthDays = conf.getThisMonthDays(year, month);
    var selectedDay = [];
    if (this.config.defaultDay !== undefined && !this.config.defaultDay) {
      selectedDay = [];
      this.config.defaultDay = undefined;
    } else {
      selectedDay = curDate ? [{
        day: curDate,
        choosed: true,
        year: year,
        month: month
      }] : this.state.selectedDay;
    }

    for (var i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false,
        year: year,
        month: month
      });
    }
    var selectedDayCol = selectedDay.map(function (d) {
      return d.year + "-" + d.month + "-" + d.day;
    });
    var disableDaysCol = disableDays.map(function (d) {
      return d.year + "-" + d.month + "-" + d.day;
    });
    days.map(function (item) {
      var cur = item.year + "-" + item.month + "-" + item.day;
      if (selectedDayCol.indexOf(cur) !== -1) item.choosed = true;
      var timestamp = newDate(item.year, item.month, item.day).getTime();
      if (disableDaysCol.indexOf(cur) !== -1) item.disable = true;
      if (+enableArea[0] > +timestamp || +timestamp > +enableArea[1]) {
        item.disable = true;
        item.choosed = false;
      }
      if (_this.config.disablePastDay && timestamp - todayTimestamp < 0 && !item.disable) item.disable = true;
    });
    var tmp = {
      days: days,
      curYear: year,
      curMonth: month
    };
    if (curDate) {
      tmp.selectedDay = selectedDay;
    }

    this.setState(_extends({}, tmp));
  },

  /**
   * 跳转至今天
   */
  jumpToToday: function jumpToToday() {
    var date = new Date();
    var curYear = date.getFullYear();
    var curMonth = date.getMonth() + 1;
    var curDate = date.getDate();

    conf.renderCalendar.call(this, curYear, curMonth, curDate);
  },

  /**
   * 选择上一月
   */
  choosePrevMonth: function choosePrevMonth() {
    var _state2 = this.state,
        curYear = _state2.curYear,
        curMonth = _state2.curMonth;

    var newYear = curYear;
    var newMonth = curMonth - 1;
    if (newMonth < 1) {
      newYear = curYear - 1;
      newMonth = 12;
    }
    this.setState({
      curYear: newYear,
      curMonth: newMonth
    });
    conf.renderCalendar.call(this, newYear, newMonth);
  },

  /**
   * 选择下一月
   */
  chooseNextMonth: function chooseNextMonth() {
    var curYear = this.state.curYear;
    var curMonth = this.state.curMonth;
    var newMonth = curMonth + 1;
    var newYear = curYear;
    if (newMonth > 12) {
      newYear = curYear + 1;
      newMonth = 1;
    }

    this.setState({
      curYear: newYear,
      curMonth: newMonth
    });
    conf.renderCalendar.call(this, newYear, newMonth);
  },

  /**
   * 选择具体日期
   * @param {!object} e  事件对象
   */
  tapDayItem: function tapDayItem(e) {
    var _e$currentTarget$data = e.currentTarget.dataset,
        idx = _e$currentTarget$data.idx,
        disable = _e$currentTarget$data.disable,
        thisday = _e$currentTarget$data.thisday;

    if (disable) return;
    var currentSelected = {}; // 当前选中日期

    var _ref2 = this.state || [],
        days = _ref2.days,
        selectedDays = _ref2.selectedDay; // 所有选中日期


    var config = this.config;
    var multi = config.multi,
        onTapDay = config.onTapDay;

    var opts = {
      e: e,
      idx: idx,
      thisday: thisday,
      onTapDay: onTapDay,
      currentSelected: currentSelected,
      selectedDays: selectedDays,
      days: days.slice()
    };
    if (multi) {
      conf.whenMulitSelect.call(this, opts);
    } else {
      conf.whenSingleSelect.call(this, opts);
    }
  },
  afterTapDay: function afterTapDay(currentSelected, selectedDays) {
    var config = this.config;
    var multi = config.multi,
        afterTapDay = config.afterTapDay;

    if (afterTapDay && typeof afterTapDay === "function") {
      if (!multi) {
        config.afterTapDay(currentSelected);
      } else {
        config.afterTapDay(currentSelected, selectedDays);
      }
    }
  },

  /**
   * 多选
   * @param {object} opts
   */
  whenMulitSelect: function whenMulitSelect() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var currentSelected = opts.currentSelected,
        selectedDays = opts.selectedDays;
    var days = opts.days,
        thisday = opts.thisday,
        idx = opts.idx,
        onTapDay = opts.onTapDay,
        e = opts.e;

    days[idx].choosed = !days[idx].choosed;
    if (!days[idx].choosed) {
      days[idx].cancel = true; // 点击事件是否是取消日期选择
      currentSelected = days[idx];
      selectedDays = selectedDays.filter(function (item) {
        return item.day !== days[idx].day;
      });
    } else {
      currentSelected = days[idx];
      selectedDays.push(currentSelected);
    }
    if (onTapDay && typeof onTapDay === "function") return this.config.onTapDay(currentSelected, e);
    //周选择
    if (this.state.typeIndex == 1) {
      console.log(currentSelected);

      days.forEach(function (item) {
        item.choosed = false;
      });
      selectedDays = [];
      var d = new Date(thisday.year + "-" + thisday.month + "-" + thisday.day),
          day = d.getDay(),
          date = d.getDate();

      if (day == 0) {
        d.setDate(date);
      } else {
        d.setDate(date - day);
      }
      for (var i = 0; i < 7; i++) {
        selectedDays.push({
          day: d.getDate(),
          month: d.getMonth() + 1,
          year: d.getFullYear()
        });
        d.setDate(d.getDate() + 1);
      }

      days.forEach(function (item) {
        selectedDays.forEach(function (childItem) {
          if (item.day == childItem.day) {
            //TODO:这里的选中逻辑需要优化
            if (currentSelected.day < 7 || currentSelected.day > 25) {
              if (currentSelected.day < 7 && item.day < 7 || currentSelected.day > 25 && item.day > 25) {
                item.choosed = true;
              }
            } else {
              item.choosed = true;
            }
          }
        });
      });
    } else if (this.state.typeIndex == 0) {
      // if (selectedDays.length == 2) {
      //   selectedDays = selectedDays.shift();

      // }
      //日选择
      console.log(selectedDays);
    }
    this.setState({
      days: days,
      selectedDay: selectedDays
    });
    conf.afterTapDay.call(this, currentSelected, selectedDays);
  },

  /**
   * 选择当前周
   */
  choiceWeek: function choiceWeek() {
    var arr = [];
    var d = new Date(),
        day = d.getDay(),
        date = d.getDate();
    if (day == 1) {
      return d;
    } else if (day == 0) {
      d.setDate(date - 6);
    } else {
      d.setDate(date - day + 1);
    }
    for (var i = 0; i < 7; i++) {
      arr.push({
        day: d.getDate(),
        month: d.getMonth() + 1,
        year: d.getFullYear()
      });
      d.setDate(d.getDate() + 1);
    }
    console.log(arr);

    return arr;
  },


  /**
   * 多选
   * @param {object} opts
   */
  whenSingleSelect: function whenSingleSelect() {
    var _this2 = this;

    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var currentSelected = opts.currentSelected,
        _opts$selectedDays = opts.selectedDays,
        selectedDays = _opts$selectedDays === undefined ? [] : _opts$selectedDays;

    var shouldMarkerTodoDay = [];
    var days = opts.days,
        idx = opts.idx,
        onTapDay = opts.onTapDay,
        e = opts.e;

    var _ref3 = selectedDays[0] || {},
        sMonth = _ref3.month,
        sYear = _ref3.year;

    var _ref4 = days[0] || {},
        dMonth = _ref4.month,
        dYear = _ref4.year;

    var _state$calendar = this.state.calendar,
        calendar = _state$calendar === undefined ? {} : _state$calendar;

    if (sMonth === dMonth && sYear === dYear && !this.weekMode) days[selectedDays[0].day - 1].choosed = false;
    if (this.weekMode) {
      days.map(function (item, idx) {
        if (item.day === selectedDays[0].day) days[idx].choosed = false;
      });
    }
    if (calendar.todoLabels) {
      // 过滤所有待办日期中当月有待办事项的日期
      shouldMarkerTodoDay = calendar.todoLabels.filter(function (item) {
        return +item.year === dYear && +item.month === dMonth;
      });
    }
    shouldMarkerTodoDay.forEach(function (item) {
      // hasTodo 是否有待办事项
      if (_this2.weekMode) {
        days.map(function (_item, idx) {
          if (+_item.day === +item.day) {
            days[idx].hasTodo = true;
            if (selectedDays && selectedDays.length && +selectedDays[0].day === +item.day) days[idx].showTodoLabel = true;
          }
        });
      } else {
        days[item.day - 1].hasTodo = true;
        // showTodoLabel 是否显示待办标记
        if (selectedDays && selectedDays.length && +selectedDays[0].day === +item.day) days[selectedDays[0].day - 1].showTodoLabel = true;
      }
    });
    if (days[idx].showTodoLabel) days[idx].showTodoLabel = false;
    days[idx].choosed = true;
    currentSelected = days[idx];
    if (onTapDay && typeof onTapDay === "function") return this.config.onTapDay(currentSelected, e);
    this.setState({
      calendar: Object.assign({}, this.state.calendar, {
        days: days,
        selectedDay: currentSelected
      })
    });
    conf.afterTapDay.call(this, currentSelected);
  },

  /**
   * 设置代办事项标志
   * @param {object} options 代办事项配置
   */
  setTodoLabels: function setTodoLabels() {
    var _this3 = this;

    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var calendar = this.state.calendar;

    if (!calendar || !calendar.days) return console.error("请等待日历初始化完成后再调用该方法");
    var days = calendar.days.slice();
    var curYear = calendar.curYear,
        curMonth = calendar.curMonth;
    var _options$days = options.days,
        todoDays = _options$days === undefined ? [] : _options$days,
        _options$pos = options.pos,
        pos = _options$pos === undefined ? "bottom" : _options$pos,
        _options$dotColor = options.dotColor,
        dotColor = _options$dotColor === undefined ? "" : _options$dotColor;
    var _calendar$todoLabels = calendar.todoLabels,
        todoLabels = _calendar$todoLabels === undefined ? [] : _calendar$todoLabels,
        todoLabelPos = calendar.todoLabelPos,
        todoLabelColor = calendar.todoLabelColor;

    var shouldMarkerTodoDay = todoDays.filter(function (item) {
      return +item.year === curYear && +item.month === curMonth;
    });
    var currentMonthTodoLabels = todoLabels.filter(function (item) {
      return +item.year === curYear && +item.month === curMonth;
    });
    shouldMarkerTodoDay.concat(currentMonthTodoLabels).forEach(function (item) {
      var target = {};
      if (_this3.weekMode) {
        target = days.find(function (d) {
          return +d.day === +item.day;
        });
      } else {
        target = days[item.day - 1];
      }
      if (target) target.showTodoLabel = !target.choosed;
    });
    var o = {
      "calendar.days": days,
      "calendar.todoLabels": uniqueTodoLabels(todoDays.concat(todoLabels))
    };
    if (pos && pos !== todoLabelPos) o["calendar.todoLabelPos"] = pos;
    if (dotColor && dotColor !== todoLabelColor) o["calendar.todoLabelColor"] = dotColor;
    this.setState(o);
  },

  /**
   * 筛选待办事项
   * @param {array} todos 需要删除待办标记的日期
   */
  filterTodos: function filterTodos(todos) {
    var todoLabels = this.state.calendar.todoLabels;

    var deleteTodo = todos.map(function (item) {
      return item.year + "-" + item.month + "-" + item.day;
    });
    return todoLabels.filter(function (item) {
      return deleteTodo.indexOf(item.year + "-" + item.month + "-" + item.day) === -1;
    });
  },

  /**
   *  删除指定日期的待办标识
   * @param {array} todos  需要删除待办标记的日期
   */
  deleteTodoLabels: function deleteTodoLabels(todos) {
    if (!(todos instanceof Array) || !todos.length) return;
    var todoLabels = conf.filterTodos.call(this, todos);
    var _state$calendar2 = this.state.calendar,
        days = _state$calendar2.days,
        curYear = _state$calendar2.curYear,
        curMonth = _state$calendar2.curMonth;

    var currentMonthTodoLabels = todoLabels.filter(function (item) {
      return curYear === +item.year && curMonth === +item.month;
    });
    days.map(function (item) {
      item.showTodoLabel = false;
    });
    currentMonthTodoLabels.forEach(function (item) {
      days[item.day - 1].showTodoLabel = !days[item.day - 1].choosed;
    });

    this.setState({
      calendar: Object.assign({}, this.state.calendar, {
        days: days,
        todoLabels: todoLabels
      })
    });
  },

  /**
   * 清空所有日期的待办标识
   */
  clearTodoLabels: function clearTodoLabels() {
    var _state$calendar$days = this.state.calendar.days,
        days = _state$calendar$days === undefined ? [] : _state$calendar$days;

    var _days = [].concat(days);
    _days.map(function (item) {
      item.showTodoLabel = false;
    });
    this.setState({
      "calendar.days": _days,
      "calendar.todoLabels": []
    });
  },
  calendarTouchstart: function calendarTouchstart(e) {
    var t = e.touches[0];
    var startX = t.clientX;
    var startY = t.clientY;
    this.slideLock = true; // 滑动事件加锁

    this.setState({
      calendar: Object.assign({}, this.state.calendar, {
        startX: startX,
        startY: startY
      })
    });
  },
  calendarTouchmove: function calendarTouchmove(e) {
    if (isLeftSlide.call(this, e)) {
      if (this.weekMode) return conf.calculateNextWeekDays.call(this);
      conf.chooseNextMonth.call(this);
    }
    if (isRightSlide.call(this, e)) {
      if (this.weekMode) return conf.calculatePrevWeekDays.call(this);
      conf.choosePrevMonth.call(this);
    }
  },

  /**
   * 更新当前年月
   */
  updateCurrYearAndMonth: function updateCurrYearAndMonth(type) {
    var _state$calendar3 = this.state.calendar,
        days = _state$calendar3.days,
        curYear = _state$calendar3.curYear,
        curMonth = _state$calendar3.curMonth;

    var Uyear = curYear;
    var Umonth = curMonth;
    var _days$ = days[0],
        firstMonth = _days$.month,
        firstYear = _days$.year;
    var _days2 = days[days.length - 1],
        lastMonth = _days2.month,
        lastYear = _days2.year;

    if (firstMonth !== lastMonth) {
      if (type === "prev") {
        curYear = firstYear;
        Umonth = firstMonth;
      } else {
        curYear = lastYear;
        Umonth = lastMonth;
      }
    }
    var lastDayOfThisMonth = conf.getThisMonthDays(curYear, curMonth);
    var lastDayOfThisWeek = days[days.length - 1];
    var firstDayOfThisWeek = days[0];
    if ((lastDayOfThisMonth === +lastDayOfThisWeek.day || lastDayOfThisWeek.day + 7 > lastDayOfThisMonth) && type === "next") {
      Umonth = Umonth + 1;
      if (Umonth > 12) {
        Uyear = Uyear + 1;
        Umonth = 12;
      }
    } else if (+firstDayOfThisWeek.day <= 7 && type === "prev") {
      Umonth = Umonth - 1;
      if (Umonth <= 0) {
        Uyear = Uyear - 1;
        Umonth = 12;
      }
    }
    return {
      Uyear: Uyear,
      Umonth: Umonth
    };
  },

  /**
   * 计算周视图下当前这一周和当月的最后一天
   */
  calculateLastDay: function calculateLastDay() {
    var _state$calendar4 = this.state.calendar,
        days = _state$calendar4.days,
        curYear = _state$calendar4.curYear,
        curMonth = _state$calendar4.curMonth;

    var lastDayInThisWeek = days[days.length - 1].day;
    var lastDayInThisMonth = conf.getThisMonthDays(curYear, curMonth);
    return { lastDayInThisWeek: lastDayInThisWeek, lastDayInThisMonth: lastDayInThisMonth };
  },

  /**
   * 计算周视图下当前这一周第一天
   */
  calculateFirstDay: function calculateFirstDay() {
    var days = this.state.calendar.days;

    var firstDayInThisWeek = days[0].day;
    return { firstDayInThisWeek: firstDayInThisWeek };
  },

  /**
   * 当月第一周所有日期范围
   * @param {number} year
   * @param {number} month
   */
  firstWeekInMonth: function firstWeekInMonth(year, month) {
    var firstDay = conf.getDayOfWeek(year, month, 1);
    var firstWeekDays = [1, 1 + (6 - firstDay)];
    var days = this.state.calendar.days;

    var daysCut = days.slice(firstWeekDays[0] - 1, firstWeekDays[1]);
    return daysCut;
  },

  /**
   * 当月最后一周所有日期范围
   * @param {number} year
   * @param {number} month
   */
  lastWeekInMonth: function lastWeekInMonth(year, month) {
    var lastDay = conf.getThisMonthDays(year, month);
    var lastDayWeek = conf.getDayOfWeek(year, month, lastDay);
    var lastWeekDays = [lastDay - lastDayWeek, lastDay];
    var days = this.state.calendar.days;

    var daysCut = days.slice(lastWeekDays[0] - 1, lastWeekDays[1]);
    return daysCut;
  },

  /**
   * 渲染日期之前初始化已选日期
   * @param {array} days 当前日期数组
   */
  initSelectedDay: function initSelectedDay(days) {
    var daysCopy = days.slice();
    var _state$calendar5 = this.state.calendar,
        _state$calendar5$sele = _state$calendar5.selectedDay,
        selectedDay = _state$calendar5$sele === undefined ? [] : _state$calendar5$sele,
        _state$calendar5$todo = _state$calendar5.todoLabels,
        todoLabels = _state$calendar5$todo === undefined ? [] : _state$calendar5$todo;

    var selectedDayStr = selectedDay.map(function (item) {
      return item.year + "+" + item.month + "+" + item.day;
    });
    var todoLabelsCol = todoLabels.map(function (d) {
      return d.year + "-" + d.month + "-" + d.day;
    });
    daysCopy.map(function (item) {
      if (selectedDayStr.indexOf(item.year + "+" + item.month + "+" + item.day) !== -1) {
        item.choosed = true;
      } else {
        item.choosed = false;
      }
      if (todoLabelsCol.indexOf(item.year + "-" + item.month + "-" + item.day) !== -1) item.showTodoLabel = !item.choosed;
    });
    return daysCopy;
  },

  /**
   * 计算下一周的日期
   */
  calculateNextWeekDays: function calculateNextWeekDays() {
    var _conf$calculateLastDa = conf.calculateLastDay.call(this),
        lastDayInThisWeek = _conf$calculateLastDa.lastDayInThisWeek,
        lastDayInThisMonth = _conf$calculateLastDa.lastDayInThisMonth;

    var _state$calendar6 = this.state.calendar,
        curYear = _state$calendar6.curYear,
        curMonth = _state$calendar6.curMonth;

    var days = [];
    if (lastDayInThisMonth - lastDayInThisWeek >= 7) {
      var _conf$updateCurrYearA = conf.updateCurrYearAndMonth.call(this, "next"),
          Uyear = _conf$updateCurrYearA.Uyear,
          Umonth = _conf$updateCurrYearA.Umonth;

      curYear = Uyear;
      curMonth = Umonth;
      for (var i = lastDayInThisWeek + 1; i <= lastDayInThisWeek + 7; i++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: i
        });
      }
    } else {
      for (var _i = lastDayInThisWeek + 1; _i <= lastDayInThisMonth; _i++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: _i
        });
      }

      var _conf$updateCurrYearA2 = conf.updateCurrYearAndMonth.call(this, "next"),
          _Uyear = _conf$updateCurrYearA2.Uyear,
          _Umonth = _conf$updateCurrYearA2.Umonth;

      curYear = _Uyear;
      curMonth = _Umonth;
      for (var _i2 = 1; _i2 <= 7 - (lastDayInThisMonth - lastDayInThisWeek); _i2++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: _i2
        });
      }
    }
    days = conf.initSelectedDay.call(this, days);

    this.setState({
      calendar: Object.assign({}, this.state.calendar, {
        curYear: curYear,
        curMonth: curMonth,
        days: days
      })
    });
  },

  /**
   * 计算上一周的日期
   */
  calculatePrevWeekDays: function calculatePrevWeekDays() {
    var _conf$calculateFirstD = conf.calculateFirstDay.call(this),
        firstDayInThisWeek = _conf$calculateFirstD.firstDayInThisWeek;

    var _state$calendar7 = this.state.calendar,
        curYear = _state$calendar7.curYear,
        curMonth = _state$calendar7.curMonth;

    var days = [];

    if (firstDayInThisWeek - 7 > 0) {
      var _conf$updateCurrYearA3 = conf.updateCurrYearAndMonth.call(this, "prev"),
          Uyear = _conf$updateCurrYearA3.Uyear,
          Umonth = _conf$updateCurrYearA3.Umonth;

      curYear = Uyear;
      curMonth = Umonth;
      for (var i = firstDayInThisWeek - 7; i < firstDayInThisWeek; i++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: i
        });
      }
    } else {
      var temp = [];
      for (var _i3 = 1; _i3 < firstDayInThisWeek; _i3++) {
        temp.push({
          year: curYear,
          month: curMonth,
          day: _i3
        });
      }

      var _conf$updateCurrYearA4 = conf.updateCurrYearAndMonth.call(this, "prev"),
          _Uyear2 = _conf$updateCurrYearA4.Uyear,
          _Umonth2 = _conf$updateCurrYearA4.Umonth;

      curYear = _Uyear2;
      curMonth = _Umonth2;
      var prevMonthDays = conf.getThisMonthDays(curYear, curMonth);
      for (var _i4 = prevMonthDays - Math.abs(firstDayInThisWeek - 7); _i4 <= prevMonthDays; _i4++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: _i4
        });
      }
      days = days.concat(temp);
    }
    days = conf.initSelectedDay.call(this, days);

    this.setState({
      calendar: Object.assign({}, this.state.calendar, {
        days: days,
        curYear: curYear,
        curMonth: curMonth
      })
    });
  },

  /**
   * 计算当前选中日期所在周，并重新渲染日历
   * @param {object} currentDay 当前选择日期
   */
  selectedDayWeekAllDays: function selectedDayWeekAllDays(currentDay) {
    var _state$calendar8 = this.state.calendar,
        days = _state$calendar8.days,
        curYear = _state$calendar8.curYear,
        curMonth = _state$calendar8.curMonth;
    var year = currentDay.year,
        month = currentDay.month,
        day = currentDay.day;

    var lastWeekDays = conf.lastWeekInMonth.call(this, year, month);
    var empytGrids = [];
    var lastEmptyGrids = [];
    var firstWeekDays = conf.firstWeekInMonth.call(this, year, month);
    // 判断选中日期的月份是否与当前月份一致
    if (curYear !== year || curMonth !== month) day = 1;
    if (curYear !== year) year = curYear;
    if (curMonth !== month) month = curMonth;
    if (firstWeekDays.find(function (item) {
      return item.day === day;
    })) {
      // 当前选择的日期为该月第一周
      var temp = [];
      var lastDayInThisMonth = conf.getThisMonthDays(year, month - 1);

      var _conf$updateCurrYearA5 = conf.updateCurrYearAndMonth.call(this, "prev"),
          Uyear = _conf$updateCurrYearA5.Uyear,
          Umonth = _conf$updateCurrYearA5.Umonth;

      curYear = Uyear;
      curMonth = Umonth;
      for (var i = lastDayInThisMonth - (7 - firstWeekDays.length) + 1; i <= lastDayInThisMonth; i++) {
        temp.push({
          year: curYear,
          month: curMonth,
          day: i
        });
      }
      days = temp.concat(firstWeekDays);
    } else if (lastWeekDays.find(function (item) {
      return item.day === day;
    })) {
      // 当前选择的日期为该月最后一周
      var _temp = [];
      if (lastWeekDays && lastWeekDays.length < 7) {
        var _conf$updateCurrYearA6 = conf.updateCurrYearAndMonth.call(this, "next"),
            _Uyear3 = _conf$updateCurrYearA6.Uyear,
            _Umonth3 = _conf$updateCurrYearA6.Umonth;

        curYear = _Uyear3;
        curMonth = _Umonth3;
        for (var _i5 = 1, len = 7 - lastWeekDays.length; _i5 <= len; _i5++) {
          _temp.push({
            year: curYear,
            month: curMonth,
            day: _i5
          });
        }
      }
      days = lastWeekDays.concat(_temp);
    } else {
      var week = conf.getDayOfWeek(year, month, day);
      var range = [day - week, day + (6 - week)];
      days = days.slice(range[0] - 1, range[1]);
    }
    days = conf.initSelectedDay.call(this, days);
    this.setState({
      calendar: Object.assign({}, this.state.calendar, {
        days: days,
        empytGrids: empytGrids,
        lastEmptyGrids: lastEmptyGrids
      })
    });
  },


  /**
   * 禁用指定日期
   * @param {array} days  禁用
   */
  disableDays: function disableDays(data) {
    var _state$calendar9 = this.state.calendar,
        _state$calendar9$disa = _state$calendar9.disableDays,
        disableDays = _state$calendar9$disa === undefined ? [] : _state$calendar9$disa,
        days = _state$calendar9.days;

    if (Object.prototype.toString.call(data) !== "[object Array]") return console.error("disableDays 参数为数组");
    var _disableDays = data.concat(disableDays);
    var disableDaysCol = _disableDays.map(function (d) {
      return d.year + "-" + d.month + "-" + d.day;
    });
    days.map(function (item) {
      var cur = item.year + "-" + item.month + "-" + item.day;
      if (disableDaysCol.indexOf(cur) !== -1) item.disable = true;
    });

    this.setState({
      calendar: Object.assign({}, this.state.calendar, {
        days: days,
        disableDays: disableDays
      })
    });
  }
};

/**
 * 获取当前页面实例
 */
function _getCurrentPage() {
  var pages = getCurrentPages();
  var last = pages.length - 1;
  return pages[last];
}

/**
 * 绑定函数到当前页面实例上
 * @param {array} functionArray 函数数组
 */
function bindFunctionToPage(functionArray) {
  var _this4 = this;

  if (!functionArray || !functionArray.length) return;
  functionArray.forEach(function (item) {
    _this4[item] = conf[item].bind(_this4);
  });
}

/**
 * 获取已选择的日期
 */
var getSelectedDay = exports.getSelectedDay = function getSelectedDay() {
  var self = _getCurrentPage();
  return self.state.calendar.selectedDay;
};

exports.default = function () {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var functionArray = ["tapDayItem", "choosePrevMonth", "chooseNextMonth", "calendarTouchstart", "calendarTouchmove"];
  var self = config.$_this;
  self.config = config;

  // 默认日期配置
  if (config.defaultDay && typeof config.defaultDay === "string") {
    var day = config.defaultDay.split("-");
    if (day.length < 3) return console.error("配置 jumpTo 格式应为: 2018-4-2 或 2018-04-02");
    jump(+day[0], +day[1], +day[2]);
  } else {
    conf.jumpToToday.call(self);
  }
  bindFunctionToPage.call(self, functionArray);
};