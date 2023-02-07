/* eslint-disable no-console */
/* eslint-disable prefer-destructuring */
/* eslint-disable consistent-return */
/* eslint-disable prefer-rest-params */
/* eslint-disable no-shadow */
/* eslint-disable prefer-spread */
/* eslint-disable no-continue */
/* eslint-disable no-plusplus */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
const momentModule = require('moment');
const minimatch = require('minimatch');
const localeData = require('../locale/default');

const moment = momentModule.default || momentModule;

moment.updateLocale(moment.locale(), localeData);

function getLocaleData(key) {
  return moment.localeData()[`_${key}`];
}

function openingTimes(d) {
  d = d.clone();
  const hours = getLocaleData('workinghours');
  if (!d.isWorkingDay()) {
    return null;
  }
  return toWorkingTimeSegments(
    hours[d.day()].map(function(time) {
      time = time.split(':');
      const _d = d.clone();
      _d.hours(time[0]);
      _d.minutes(time[1] || 0);
      _d.seconds(time[2] || 0);
      _d.milliseconds(0);
      return _d;
    }),
  );
}

function incrementDays(fn) {
  return function(n, d) {
    while (n) {
      d[fn](1, 'day');
      if (d.isWorkingDay()) {
        n--;
      }
    }
    return d;
  };
}

function addUnit(unit) {
  return function(n, d) {
    if (!d.isWorkingTime()) {
      d = d.nextWorkingTime();
    }
    let i = 0;
    while (n > 0) {
      const segment = openingTimes(d)[i];
      if (!segment || d.isBefore(segment[0])) {
        i = 0;
        continue;
      }
      if (d.isAfter(segment[1])) {
        i++;
        continue;
      }
      let jump = segment[1].diff(d, unit);
      if (jump > n) {
        jump = n;
      }
      if (jump < 1) {
        jump = 1;
      }
      const then = d.clone().add(jump, unit);
      n -= jump;
      if (then.isSameOrBefore(segment[1])) {
        d = d.add(jump, unit);
      } else {
        const next = then.nextWorkingTime();
        const diff = then.diff(segment[1], unit, true);
        d = next.add(diff, unit);
      }
    }
    return d;
  };
}

function subtractUnit(unit) {
  return function(n, d) {
    if (!d.isWorkingTime()) {
      d = d.lastWorkingTime();
    }
    let i = 0;
    while (n > 0) {
      const segment = openingTimes(d)[i];
      if (!segment || d.isBefore(segment[0])) {
        i = 0;
        continue;
      }
      if (d.isAfter(segment[1])) {
        i++;
        continue;
      }
      let jump = -1 * segment[0].diff(d, unit);
      if (jump > n) {
        jump = n;
      }
      if (jump < 1) {
        jump = 1;
      }
      const then = d.clone().subtract(jump, unit);
      n -= jump;
      if (then.isWorkingTime()) {
        d = d.subtract(jump, unit);
      } else {
        const next = then.lastWorkingTime();
        const diff = then.diff(segment[0], unit, true);
        d = next.add(diff, unit);
      }
    }
    return d;
  };
}

function copy(from, to) {
  ['year', 'month', 'date', 'hour', 'minute', 'second', 'millisecond'].forEach(
    function(unit) {
      to.set(unit, from.get(unit));
    },
  );
  return to;
}

function add(d, num, unit) {
  if (num < 0) {
    return subtract(d, -num, unit);
  }

  unit = moment.normalizeUnits(unit);

  if (unit === 'day') {
    d = incrementDays('add')(num, d);
    // prevent calculation error when break between two working time segments is less than 1 hour
  } else if (unit === 'hour') {
    d = addUnit('minute')(num * 60, d);
  } else if (unit) {
    d = addUnit(unit)(num, d);
  }
  return d;
}

function subtract(d, num, unit) {
  if (num < 0) {
    return add(d, -num, unit);
  }
  unit = moment.normalizeUnits(unit);
  if (unit === 'day') {
    d = incrementDays('subtract')(num, d);
    // prevent calculation error when break between two working time segments is less than 1 hour
  } else if (unit === 'hour') {
    d = subtractUnit('minute')(num * 60, d);
  } else if (unit) {
    d = subtractUnit(unit)(num, d);
  }
  return d;
}

function addOrSubtractMethod(fn) {
  return function(num, unit) {
    if (typeof unit !== 'string') {
      throw new Error('unit must be defined');
    }
    if (typeof num !== 'number') {
      throw new Error('duration must be defined');
    }
    let args = [].slice.call(arguments);
    if (args.length % 2) {
      throw new Error(
        'moment#(add/subtract)WorkingTime requires an even number of arguments',
      );
    }

    let d = this;

    while (args.length >= 2) {
      d = fn.bind(null, d).apply(null, args.slice(-2));
      args = args.slice(0, -2);
    }

    return copy(d, this);
  };
}

function toWorkingTimeSegments(openingTimes) {
  return openingTimes.reduce(function(rows, key, index) {
    return (
      (index % 2 === 0 ? rows.push([key]) : rows[rows.length - 1].push(key)) &&
      rows
    );
  }, []);
}

moment.fn.addWorkingTime = addOrSubtractMethod(add);
moment.fn.subtractWorkingTime = addOrSubtractMethod(subtract);

moment.fn.isBusinessDay = function isBusinessDay() {
  const hours = getLocaleData('workinghours');
  return !!hours[this.day()] && !this.isHoliday();
};
moment.fn.isWorkingDay = moment.fn.isBusinessDay;

moment.fn.isWorkingTime = function isWorkingTime(opts) {
  const { ignoreBreaks } = opts || {};
  let segments = openingTimes(this);
  if (!segments) {
    return false;
  }
  if (ignoreBreaks) {
    segments = [[segments[0][0], segments.pop()[1]]];
  }
  const self = this;
  return segments.some(function(openinghours) {
    return (
      self.isSameOrAfter(openinghours[0]) &&
      self.isSameOrBefore(openinghours[1])
    );
  });
};

moment.fn.isHoliday = function isHoliday() {
  let isHoliday = false;
  const today = this.format('YYYY-MM-DD');
  (getLocaleData('holidays') || []).forEach(function(holiday) {
    if (minimatch(today, holiday)) {
      isHoliday = true;
    }
  });
  return isHoliday;
};

moment.fn.nextWorkingDay = function nextWorkingDay() {
  let d = this.clone();
  d = d.add(1, 'day');
  while (!d.isWorkingDay()) {
    d = d.add(1, 'day');
  }
  return d;
};

moment.fn.lastWorkingDay = function nextWorkingDay() {
  let d = this.clone();
  d = d.subtract(1, 'day');
  while (!d.isWorkingDay()) {
    d = d.subtract(1, 'day');
  }
  return d;
};

moment.fn.nextWorkingTime = function nextWorkingTime() {
  if (this.isWorkingDay()) {
    const segments = openingTimes(this);
    let openinghours;
    let lastSegment;
    for (let i = 0; i < segments.length; i++) {
      openinghours = segments[i];
      lastSegment = i === segments.length - 1;
      if (this.isBefore(openinghours[0])) {
        return openinghours[0];
      }
      if (this.isAfter(openinghours[1])) {
        if (!lastSegment) {
          continue;
        }
        return openingTimes(this.nextWorkingDay())[0][0];
      }
      return this.clone();
    }
  } else {
    return openingTimes(this.nextWorkingDay())[0][0];
  }
};

moment.fn.nextTransitionTime = function nextTransitionTime() {
  if (this.isWorkingDay()) {
    const segments = openingTimes(this);
    let openinghours;
    let lastSegment;
    for (let i = 0; i < segments.length; i++) {
      openinghours = segments[i];
      lastSegment = i === segments.length - 1;
      if (this.isBefore(openinghours[0])) {
        return { transition: 'open', moment: openinghours[0] };
      }
      if (this.isBefore(openinghours[1])) {
        return { transition: 'close', moment: openinghours[1] };
      }
      if (this.isAfter(openinghours[1])) {
        if (!lastSegment) {
          continue;
        }
        return {
          transition: 'open',
          moment: openingTimes(this.nextWorkingDay())[0][0],
        };
      }
    }
  } else {
    return {
      transition: 'open',
      moment: openingTimes(this.nextWorkingDay())[0][0],
    };
  }
};

moment.fn.lastWorkingTime = function nextWorkingTime() {
  if (this.isWorkingDay()) {
    const segments = openingTimes(this);
    let openinghours;
    let firstSegment;
    for (let i = segments.length - 1; i >= 0; i--) {
      openinghours = segments[i];
      firstSegment = i === 0;
      if (this.isAfter(openinghours[1])) {
        return openinghours[1];
      }
      if (this.isBefore(openinghours[0])) {
        if (!firstSegment) {
          continue;
        }
        return openingTimes(this.lastWorkingDay()).slice(-1)[0][1];
      }
      return this.clone();
    }
  } else {
    return openingTimes(this.lastWorkingDay()).slice(-1)[0][1];
  }
};

moment.fn.lastTransitionTime = function lastTransitionTime() {
  if (this.isWorkingDay()) {
    const segments = openingTimes(this);
    let openinghours;
    let firstSegment;
    for (let i = segments.length - 1; i >= 0; i--) {
      openinghours = segments[i];
      firstSegment = i === 0;
      if (this.isAfter(openinghours[1])) {
        return { transition: 'close', moment: openinghours[1] };
      }
      if (this.isAfter(openinghours[0])) {
        return { transition: 'open', moment: openinghours[0] };
      }
      if (this.isBefore(openinghours[0])) {
        if (!firstSegment) {
          continue;
        }
        return {
          transition: 'close',
          moment: openingTimes(this.lastWorkingDay()).slice(-1)[0][1],
        };
      }
    }
  } else {
    return {
      transition: 'close',
      moment: openingTimes(this.lastWorkingDay()).slice(-1)[0][1],
    };
  }
};

moment.fn.workingDiff = function workingDiff(comparator, unit, detail) {
  unit = unit || 'milliseconds';
  unit = unit.match(/^calendarDay(s?)$/)
    ? 'calendarDay'
    : moment.normalizeUnits(unit);
  comparator = moment(comparator);

  if (['year', 'month', 'week'].indexOf(unit) > -1) {
    return this.diff(comparator, unit, detail);
  }

  // ensure `from` is always before `to`
  let from;
  let to;
  let diff = 0;
  let multiplier = 1;
  if (this.isAfter(comparator)) {
    to = this.clone();
    from = comparator.clone();
    multiplier = -1;
  } else {
    to = comparator.clone();
    from = this.clone();
  }
  if (unit === 'calendarDay') {
    from = from.startOf('day');
    to = to.startOf('day');
  } else {
    if (!from.isWorkingTime({ ignoreBreaks: true })) {
      from = from.nextWorkingTime();
    }
    if (!to.isWorkingTime({ ignoreBreaks: true })) {
      to = to.lastWorkingTime();
    }
  }

  // if `from` is now after `to` then we have two timestamps on the same night, so diff is zero
  if (from.isAfter(to)) {
    return 0;
  }

  if (unit === 'day') {
    if (
      !from.isAfter(openingTimes(from)[0][0]) &&
      !to.isBefore(openingTimes(to).pop()[1])
    ) {
      diff--;
    }
  }

  if (unit === 'day' || unit === 'calendarDay') {
    // iterate to the same day
    while (
      !from
        .clone()
        .addWorkingTime(1, 'day')
        .isAfter(to)
    ) {
      diff--;
      from.addWorkingTime(1, 'day');
    }
    if (detail && unit === 'day') {
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          'WARNING: passing `true` as a third argument to `workingDiff` may lead to ambiguous results',
        );
        console.warn(
          'See https://github.com/lennym/moment-business-time/issues/12#issuecomment-199710566',
        );
      }
      const hours = from.diff(to, 'hour', true);
      const denominator = comparator.isWorkingDay()
        ? comparator
        : comparator.nextWorkingDay();
      const total = openingTimes(denominator)
        .slice(-1)[0][1]
        .diff(openingTimes(denominator)[0][0], 'hour', true);
      diff += hours / total;
    }
  } else {
    let segments = openingTimes(from);
    while (from.isBefore(to)) {
      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        if (from.isAfter(segment[1])) {
          continue;
        }
        diff += moment
          .max(from, segment[0])
          .diff(moment.min(segment[1], to), unit, true);
      }
      segments = openingTimes(from.nextWorkingDay());
      from = segments[0][0];
    }
  }

  if (!detail) {
    diff = diff < 0 ? Math.ceil(diff) : Math.floor(diff);
  }

  return multiplier * diff;
};

module.exports = moment;
