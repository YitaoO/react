function newDate(year, month, day) {
  return new Date(year, month, day);
}

/**
 *  todo 数组去重
 * @param {array} array todo 数组
 */
function uniqueTodoLabels(array = []) {
  let uniqueObject = {};
  let uniqueArray = [];
  array.forEach(item => {
    uniqueObject[`${item.year}-${item.month}-${item.day}`] = item;
  });
  for (let i in uniqueObject) {
    uniqueArray.push(uniqueObject[i]);
  }
  return uniqueArray;
}

/**
 * 上滑
 * @param {object} e 事件对象
 * @returns {boolean} 布尔值
 */
export function isUpSlide(e) {
  const { startX, startY } = this.state.gesture;
  if (this.slideLock) {
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;
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
export function isDownSlide(e) {
  const { startX, startY } = this.state.gesture;
  if (this.slideLock) {
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;
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
export function isLeftSlide(e) {
  const { startX, startY } = this.state.gesture;
  if (this.slideLock) {
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;
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
export function isRightSlide(e) {
  const { startX, startY } = this.state.gesture;
  if (this.slideLock) {
    const t = e.touches[0];
    const deltaX = t.clientX - startX;
    const deltaY = t.clientY - startY;

    if (deltaX > 60 && deltaY < 20 && deltaY > -20) {
      this.slideLock = false;
      return true;
    } else {
      return false;
    }
  }
}

const conf = {
  /**
   * 计算指定月份共多少天
   * @param {number} year 年份
   * @param {number} month  月份
   */
  getThisMonthDays(year, month) {
    return new Date(year, month, 0).getDate();
  },
  /**
   * 计算指定月份第一天星期几
   * @param {number} year 年份
   * @param {number} month  月份
   */
  getFirstDayOfWeek(year, month) {
    return new Date(Date.UTC(year, month - 1, 1)).getDay();
  },
  /**
   * 计算指定日期星期几
   * @param {number} year 年份
   * @param {number} month  月份
   * @param {number} date 日期
   */
  getDayOfWeek(year, month, date) {
    return new Date(Date.UTC(year, month - 1, date)).getDay();
  },
  /**
   * 渲染日历
   * @param {number} curYear
   * @param {number} curMonth
   * @param {number} curDate
   */
  renderCalendar(curYear, curMonth, curDate) {
    conf.calculateEmptyGrids.call(this, curYear, curMonth);
    conf.calculateDays.call(this, curYear, curMonth, curDate);
    const { todoLabels } = this.state.calendar || {};
    const { afterCalendarRender } = this.config;
    if (todoLabels && todoLabels instanceof Array) {
      conf.setTodoLabels.call(this);
    }
    if (
      afterCalendarRender &&
      typeof afterCalendarRender === "function" &&
      !this.firstRender
    ) {
      afterCalendarRender();
      this.firstRender = true;
    }
  },
  /**
   * 计算当前月份前后两月应占的格子
   * @param {number} year 年份
   * @param {number} month 月份
   */
  calculateEmptyGrids(year, month) {
    conf.calculatePrevMonthGrids.call(this, year, month);
    conf.calculateNextMonthGrids.call(this, year, month);
  },
  /**
   * 计算上月应占的格子
   * @param {number} year 年份
   * @param {number} month 月份
   */
  calculatePrevMonthGrids(year, month) {
    let empytGrids = [];
    const prevMonthDays = conf.getThisMonthDays(year, month - 1);
    const firstDayOfWeek = conf.getFirstDayOfWeek(year, month);
    if (firstDayOfWeek > 0) {
      const len = prevMonthDays - firstDayOfWeek;
      for (let i = prevMonthDays; i > len; i--) {
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
  calculateNextMonthGrids(year, month) {
    let lastEmptyGrids = [];
    const thisMonthDays = conf.getThisMonthDays(year, month);
    const lastDayWeek = conf.getDayOfWeek(year, month, thisMonthDays);
    if (+lastDayWeek !== 6) {
      const len = 7 - (lastDayWeek + 1);
      for (let i = 1; i <= len; i++) {
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
  calculateDays(year, month, curDate) {
    let days = [];
    const { todayTimestamp, disableDays = [], enableArea = [] } = this.state;
    const thisMonthDays = conf.getThisMonthDays(year, month);
    let selectedDay = [];
    if (this.config.defaultDay !== undefined && !this.config.defaultDay) {
      selectedDay = [];
      this.config.defaultDay = undefined;
    } else {
      selectedDay = curDate
        ? [
            {
              day: curDate,
              choosed: true,
              year,
              month
            }
          ]
        : this.state.selectedDay;
    }

    for (let i = 1; i <= thisMonthDays; i++) {
      days.push({
        day: i,
        choosed: false,
        year,
        month
      });
    }
    const selectedDayCol = selectedDay.map(
      d => `${d.year}-${d.month}-${d.day}`
    );
    const disableDaysCol = disableDays.map(
      d => `${d.year}-${d.month}-${d.day}`
    );
    days.map(item => {
      const cur = `${item.year}-${item.month}-${item.day}`;
      if (selectedDayCol.indexOf(cur) !== -1) item.choosed = true;
      const timestamp = newDate(item.year, item.month, item.day).getTime();
      if (disableDaysCol.indexOf(cur) !== -1) item.disable = true;
      if (+enableArea[0] > +timestamp || +timestamp > +enableArea[1]) {
        item.disable = true;
        item.choosed = false;
      }
      if (
        this.config.disablePastDay &&
        timestamp - todayTimestamp < 0 &&
        !item.disable
      )
        item.disable = true;
    });
    const tmp = {
      days: days,
      curYear: year,
      curMonth: month
    };
    if (curDate) {
      tmp.selectedDay = selectedDay;
    }

    this.setState({
      ...tmp
    });
  },
  /**
   * 跳转至今天
   */
  jumpToToday() {
    const date = new Date();
    const curYear = date.getFullYear();
    const curMonth = date.getMonth() + 1;
    const curDate = date.getDate();

    conf.renderCalendar.call(this, curYear, curMonth, curDate);
  },
  /**
   * 选择上一月
   */
  choosePrevMonth() {
    const { curYear, curMonth } = this.state;
    let newYear = curYear;
    let newMonth = curMonth - 1;
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
  chooseNextMonth() {
    const curYear = this.state.curYear;
    const curMonth = this.state.curMonth;
    let newMonth = curMonth + 1;
    let newYear = curYear;
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
  tapDayItem(e) {
    const { idx, disable, thisday } = e.currentTarget.dataset;
    if (disable) return;
    let currentSelected = {}; // 当前选中日期
    let { days, selectedDay: selectedDays } = this.state || []; // 所有选中日期
    const config = this.config;
    const { multi, onTapDay } = config;
    const opts = {
      e,
      idx,
      thisday,
      onTapDay,
      currentSelected,
      selectedDays,
      days: days.slice()
    };
    if (multi) {
      conf.whenMulitSelect.call(this, opts);
    } else {
      conf.whenSingleSelect.call(this, opts);
    }
  },

  afterTapDay(currentSelected, selectedDays) {
    const config = this.config;
    const { multi, afterTapDay } = config;
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
  whenMulitSelect(opts = {}) {
    let { currentSelected, selectedDays } = opts;
    const { days, thisday, idx, onTapDay, e } = opts;
    days[idx].choosed = !days[idx].choosed;
    if (!days[idx].choosed) {
      days[idx].cancel = true; // 点击事件是否是取消日期选择
      currentSelected = days[idx];
      selectedDays = selectedDays.filter(item => item.day !== days[idx].day);
    } else {
      currentSelected = days[idx];
      selectedDays.push(currentSelected);
    }
    if (onTapDay && typeof onTapDay === "function")
      return this.config.onTapDay(currentSelected, e);
    //周选择
    if (this.state.typeIndex == 1) {
      console.log(currentSelected);

      days.forEach(item => {
        item.choosed = false;
      });
      selectedDays = [];
      const d = new Date(`${thisday.year}-${thisday.month}-${thisday.day}`),
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

      days.forEach(item => {
        selectedDays.forEach(childItem => {
          if (item.day == childItem.day) {
            //TODO:这里的选中逻辑需要优化
            if (currentSelected.day < 7 || currentSelected.day > 25) {
              if (
                (currentSelected.day < 7 && item.day < 7) ||
                (currentSelected.day > 25 && item.day > 25)
              ) {
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
  choiceWeek() {
    let arr = [];
    const d = new Date(),
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
  whenSingleSelect(opts = {}) {
    let { currentSelected, selectedDays = [] } = opts;
    let shouldMarkerTodoDay = [];
    const { days, idx, onTapDay, e } = opts;
    const { month: sMonth, year: sYear } = selectedDays[0] || {};
    const { month: dMonth, year: dYear } = days[0] || {};
    const { calendar = {} } = this.state;
    if (sMonth === dMonth && sYear === dYear && !this.weekMode)
      days[selectedDays[0].day - 1].choosed = false;
    if (this.weekMode) {
      days.map((item, idx) => {
        if (item.day === selectedDays[0].day) days[idx].choosed = false;
      });
    }
    if (calendar.todoLabels) {
      // 过滤所有待办日期中当月有待办事项的日期
      shouldMarkerTodoDay = calendar.todoLabels.filter(
        item => +item.year === dYear && +item.month === dMonth
      );
    }
    shouldMarkerTodoDay.forEach(item => {
      // hasTodo 是否有待办事项
      if (this.weekMode) {
        days.map((_item, idx) => {
          if (+_item.day === +item.day) {
            days[idx].hasTodo = true;
            if (
              selectedDays &&
              selectedDays.length &&
              +selectedDays[0].day === +item.day
            )
              days[idx].showTodoLabel = true;
          }
        });
      } else {
        days[item.day - 1].hasTodo = true;
        // showTodoLabel 是否显示待办标记
        if (
          selectedDays &&
          selectedDays.length &&
          +selectedDays[0].day === +item.day
        )
          days[selectedDays[0].day - 1].showTodoLabel = true;
      }
    });
    if (days[idx].showTodoLabel) days[idx].showTodoLabel = false;
    days[idx].choosed = true;
    currentSelected = days[idx];
    if (onTapDay && typeof onTapDay === "function")
      return this.config.onTapDay(currentSelected, e);
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
  setTodoLabels(options = {}) {
    const { calendar } = this.state;
    if (!calendar || !calendar.days)
      return console.error("请等待日历初始化完成后再调用该方法");
    const days = calendar.days.slice();
    const { curYear, curMonth } = calendar;
    const { days: todoDays = [], pos = "bottom", dotColor = "" } = options;
    const { todoLabels = [], todoLabelPos, todoLabelColor } = calendar;
    const shouldMarkerTodoDay = todoDays.filter(
      item => +item.year === curYear && +item.month === curMonth
    );
    let currentMonthTodoLabels = todoLabels.filter(
      item => +item.year === curYear && +item.month === curMonth
    );
    shouldMarkerTodoDay.concat(currentMonthTodoLabels).forEach(item => {
      let target = {};
      if (this.weekMode) {
        target = days.find(d => +d.day === +item.day);
      } else {
        target = days[item.day - 1];
      }
      if (target) target.showTodoLabel = !target.choosed;
    });
    const o = {
      "calendar.days": days,
      "calendar.todoLabels": uniqueTodoLabels(todoDays.concat(todoLabels))
    };
    if (pos && pos !== todoLabelPos) o["calendar.todoLabelPos"] = pos;
    if (dotColor && dotColor !== todoLabelColor)
      o["calendar.todoLabelColor"] = dotColor;
    this.setState(o);
  },
  /**
   * 筛选待办事项
   * @param {array} todos 需要删除待办标记的日期
   */
  filterTodos(todos) {
    const { todoLabels } = this.state.calendar;
    const deleteTodo = todos.map(
      item => `${item.year}-${item.month}-${item.day}`
    );
    return todoLabels.filter(
      item =>
        deleteTodo.indexOf(`${item.year}-${item.month}-${item.day}`) === -1
    );
  },
  /**
   *  删除指定日期的待办标识
   * @param {array} todos  需要删除待办标记的日期
   */
  deleteTodoLabels(todos) {
    if (!(todos instanceof Array) || !todos.length) return;
    const todoLabels = conf.filterTodos.call(this, todos);
    const { days, curYear, curMonth } = this.state.calendar;
    const currentMonthTodoLabels = todoLabels.filter(
      item => curYear === +item.year && curMonth === +item.month
    );
    days.map(item => {
      item.showTodoLabel = false;
    });
    currentMonthTodoLabels.forEach(item => {
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
  clearTodoLabels() {
    const { days = [] } = this.state.calendar;
    const _days = [].concat(days);
    _days.map(item => {
      item.showTodoLabel = false;
    });
    this.setState({
      "calendar.days": _days,
      "calendar.todoLabels": []
    });
  },

  calendarTouchstart(e) {
    const t = e.touches[0];
    const startX = t.clientX;
    const startY = t.clientY;
    this.slideLock = true; // 滑动事件加锁

    this.setState({
      calendar: Object.assign({}, this.state.calendar, {
        startX: startX,
        startY: startY
      })
    });
  },
  calendarTouchmove(e) {
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
  updateCurrYearAndMonth(type) {
    let { days, curYear, curMonth } = this.state.calendar;
    let Uyear = curYear;
    let Umonth = curMonth;
    const { month: firstMonth, year: firstYear } = days[0];
    const { month: lastMonth, year: lastYear } = days[days.length - 1];
    if (firstMonth !== lastMonth) {
      if (type === "prev") {
        curYear = firstYear;
        Umonth = firstMonth;
      } else {
        curYear = lastYear;
        Umonth = lastMonth;
      }
    }
    const lastDayOfThisMonth = conf.getThisMonthDays(curYear, curMonth);
    const lastDayOfThisWeek = days[days.length - 1];
    const firstDayOfThisWeek = days[0];
    if (
      (lastDayOfThisMonth === +lastDayOfThisWeek.day ||
        lastDayOfThisWeek.day + 7 > lastDayOfThisMonth) &&
      type === "next"
    ) {
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
      Uyear,
      Umonth
    };
  },
  /**
   * 计算周视图下当前这一周和当月的最后一天
   */
  calculateLastDay() {
    const { days, curYear, curMonth } = this.state.calendar;
    const lastDayInThisWeek = days[days.length - 1].day;
    const lastDayInThisMonth = conf.getThisMonthDays(curYear, curMonth);
    return { lastDayInThisWeek, lastDayInThisMonth };
  },
  /**
   * 计算周视图下当前这一周第一天
   */
  calculateFirstDay() {
    const { days } = this.state.calendar;
    const firstDayInThisWeek = days[0].day;
    return { firstDayInThisWeek };
  },
  /**
   * 当月第一周所有日期范围
   * @param {number} year
   * @param {number} month
   */
  firstWeekInMonth(year, month) {
    const firstDay = conf.getDayOfWeek(year, month, 1);
    const firstWeekDays = [1, 1 + (6 - firstDay)];
    const { days } = this.state.calendar;
    const daysCut = days.slice(firstWeekDays[0] - 1, firstWeekDays[1]);
    return daysCut;
  },
  /**
   * 当月最后一周所有日期范围
   * @param {number} year
   * @param {number} month
   */
  lastWeekInMonth(year, month) {
    const lastDay = conf.getThisMonthDays(year, month);
    const lastDayWeek = conf.getDayOfWeek(year, month, lastDay);
    const lastWeekDays = [lastDay - lastDayWeek, lastDay];
    const { days } = this.state.calendar;
    const daysCut = days.slice(lastWeekDays[0] - 1, lastWeekDays[1]);
    return daysCut;
  },
  /**
   * 渲染日期之前初始化已选日期
   * @param {array} days 当前日期数组
   */
  initSelectedDay(days) {
    const daysCopy = days.slice();
    const { selectedDay = [], todoLabels = [] } = this.state.calendar;
    const selectedDayStr = selectedDay.map(
      item => `${item.year}+${item.month}+${item.day}`
    );
    const todoLabelsCol = todoLabels.map(d => `${d.year}-${d.month}-${d.day}`);
    daysCopy.map(item => {
      if (
        selectedDayStr.indexOf(`${item.year}+${item.month}+${item.day}`) !== -1
      ) {
        item.choosed = true;
      } else {
        item.choosed = false;
      }
      if (
        todoLabelsCol.indexOf(`${item.year}-${item.month}-${item.day}`) !== -1
      )
        item.showTodoLabel = !item.choosed;
    });
    return daysCopy;
  },
  /**
   * 计算下一周的日期
   */
  calculateNextWeekDays() {
    let { lastDayInThisWeek, lastDayInThisMonth } = conf.calculateLastDay.call(
      this
    );
    let { curYear, curMonth } = this.state.calendar;
    let days = [];
    if (lastDayInThisMonth - lastDayInThisWeek >= 7) {
      const { Uyear, Umonth } = conf.updateCurrYearAndMonth.call(this, "next");
      curYear = Uyear;
      curMonth = Umonth;
      for (let i = lastDayInThisWeek + 1; i <= lastDayInThisWeek + 7; i++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: i
        });
      }
    } else {
      for (let i = lastDayInThisWeek + 1; i <= lastDayInThisMonth; i++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: i
        });
      }
      const { Uyear, Umonth } = conf.updateCurrYearAndMonth.call(this, "next");
      curYear = Uyear;
      curMonth = Umonth;
      for (let i = 1; i <= 7 - (lastDayInThisMonth - lastDayInThisWeek); i++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: i
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
  calculatePrevWeekDays() {
    let { firstDayInThisWeek } = conf.calculateFirstDay.call(this);
    let { curYear, curMonth } = this.state.calendar;
    let days = [];

    if (firstDayInThisWeek - 7 > 0) {
      const { Uyear, Umonth } = conf.updateCurrYearAndMonth.call(this, "prev");
      curYear = Uyear;
      curMonth = Umonth;
      for (let i = firstDayInThisWeek - 7; i < firstDayInThisWeek; i++) {
        days.push({
          year: curYear,
          month: curMonth,
          day: i
        });
      }
    } else {
      let temp = [];
      for (let i = 1; i < firstDayInThisWeek; i++) {
        temp.push({
          year: curYear,
          month: curMonth,
          day: i
        });
      }
      const { Uyear, Umonth } = conf.updateCurrYearAndMonth.call(this, "prev");
      curYear = Uyear;
      curMonth = Umonth;
      const prevMonthDays = conf.getThisMonthDays(curYear, curMonth);
      for (
        let i = prevMonthDays - Math.abs(firstDayInThisWeek - 7);
        i <= prevMonthDays;
        i++
      ) {
        days.push({
          year: curYear,
          month: curMonth,
          day: i
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
  selectedDayWeekAllDays(currentDay) {
    let { days, curYear, curMonth } = this.state.calendar;
    let { year, month, day } = currentDay;
    let lastWeekDays = conf.lastWeekInMonth.call(this, year, month);
    let empytGrids = [];
    let lastEmptyGrids = [];
    const firstWeekDays = conf.firstWeekInMonth.call(this, year, month);
    // 判断选中日期的月份是否与当前月份一致
    if (curYear !== year || curMonth !== month) day = 1;
    if (curYear !== year) year = curYear;
    if (curMonth !== month) month = curMonth;
    if (firstWeekDays.find(item => item.day === day)) {
      // 当前选择的日期为该月第一周
      let temp = [];
      const lastDayInThisMonth = conf.getThisMonthDays(year, month - 1);
      const { Uyear, Umonth } = conf.updateCurrYearAndMonth.call(this, "prev");
      curYear = Uyear;
      curMonth = Umonth;
      for (
        let i = lastDayInThisMonth - (7 - firstWeekDays.length) + 1;
        i <= lastDayInThisMonth;
        i++
      ) {
        temp.push({
          year: curYear,
          month: curMonth,
          day: i
        });
      }
      days = temp.concat(firstWeekDays);
    } else if (lastWeekDays.find(item => item.day === day)) {
      // 当前选择的日期为该月最后一周
      const temp = [];
      if (lastWeekDays && lastWeekDays.length < 7) {
        const { Uyear, Umonth } = conf.updateCurrYearAndMonth.call(
          this,
          "next"
        );
        curYear = Uyear;
        curMonth = Umonth;
        for (let i = 1, len = 7 - lastWeekDays.length; i <= len; i++) {
          temp.push({
            year: curYear,
            month: curMonth,
            day: i
          });
        }
      }
      days = lastWeekDays.concat(temp);
    } else {
      const week = conf.getDayOfWeek(year, month, day);
      const range = [day - week, day + (6 - week)];
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
  disableDays(data) {
    const { disableDays = [], days } = this.state.calendar;
    if (Object.prototype.toString.call(data) !== "[object Array]")
      return console.error("disableDays 参数为数组");
    const _disableDays = data.concat(disableDays);
    const disableDaysCol = _disableDays.map(
      d => `${d.year}-${d.month}-${d.day}`
    );
    days.map(item => {
      const cur = `${item.year}-${item.month}-${item.day}`;
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
  const pages = getCurrentPages();
  const last = pages.length - 1;
  return pages[last];
}

/**
 * 绑定函数到当前页面实例上
 * @param {array} functionArray 函数数组
 */
function bindFunctionToPage(functionArray) {
  if (!functionArray || !functionArray.length) return;
  functionArray.forEach(item => {
    this[item] = conf[item].bind(this);
  });
}

/**
 * 获取已选择的日期
 */
export const getSelectedDay = () => {
  const self = _getCurrentPage();
  return self.state.calendar.selectedDay;
};

export default (config = {}) => {
  const functionArray = [
    "tapDayItem",
    "choosePrevMonth",
    "chooseNextMonth",
    "calendarTouchstart",
    "calendarTouchmove"
  ];
  const self = config.$_this;
  self.config = config;

  // 默认日期配置
  if (config.defaultDay && typeof config.defaultDay === "string") {
    const day = config.defaultDay.split("-");
    if (day.length < 3)
      return console.error("配置 jumpTo 格式应为: 2018-4-2 或 2018-04-02");
    jump(+day[0], +day[1], +day[2]);
  } else {
    conf.jumpToToday.call(self);
  }
  bindFunctionToPage.call(self, functionArray);
};
