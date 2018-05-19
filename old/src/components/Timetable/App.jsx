import React, { Component } from 'react'

import moment from 'moment-hijri'
import momenttz from 'moment-timezone'

// import logo from './logo.svg';
import './style/normalize.css'
import './style/App.css'

import Overlay from './components/Overlay'
import Clock from './components/Clock'
import Timetable from './components/Timetable'
import Countdown from './components/Countdown'
import Message from './components/Message'
import Header from './components/Header'
import Footer from './components/Footer'

// moment.tz = require('moment-timezone');

import defsettings from './settings.json'

import deftimetable from './cities/dublin.json'

// var settings = defsettings
// var timetable = deftimetable
// var tomorrow

class TimetableApp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      timetable: deftimetable,
      settings: defsettings,
      dst: 0,
      date: new Date(),
      day: {},
      prayers: { next: { time: moment(), name: '' }, current: { time: moment(), name: '' }, list: [] },
      tomorrow: 0,
      name: '',
      jamaahShow: true,
      overlayTitle: 'Welcome',
      jummuahTime: moment({ hour: '13', minute: '10' }).day(5),
      overlayActive: false,
      refresh: this.props.refresh || 60
    }
  }

  /* JAMAAH CALC */
  jamaahCalc (num, time, timenext) {
    // console.log (this.state)

    // var jamaahMethodSetting = (this.state.settings.jamaahmethods).split(',')[num]
    // var jamaahOffsetSetting = ((this.state.settings.jamaahoffsets).split(',')[num]).split(':')
    const jamaahMethodSetting = this.state.settings.jamaahmethods[num]
    const jamaahOffsetSetting = this.state.settings.jamaahoffsets[num]

    let jamaahOffset
    switch (jamaahMethodSetting) {
      case 'afterthis':
        jamaahOffset = parseInt(jamaahOffsetSetting[0] * 60 + jamaahOffsetSetting[1], 10)
        break
      case 'fixed':
        jamaahOffset = (moment().month(time.get('month')).date(time.get('date')).hour(jamaahOffsetSetting[0])
          .minute(jamaahOffsetSetting[1]))
          .diff(time, 'minutes')
        if (moment().month(time.get('month')).date(time.get('date')).hour(jamaahOffsetSetting[0])
          .minute(jamaahOffsetSetting[1])
          .isBefore(time)) jamaahOffset--
        break
      case 'beforenext':
        jamaahOffset = (timenext.subtract({
          minutes: parseInt(jamaahOffsetSetting[0] * 60 + jamaahOffsetSetting[1], 10)
        })).diff(time, 'minutes')
        break
      case '':
        jamaahOffset = ''
        break
      default:
        jamaahOffset = 0
    }
    // console.log(jamaahOffset)
    return jamaahOffset
  }

  prayersCalc (tomorrow) {
    // console.log(this.state.timetable)
    // DST settings
    const city = 'Europe/Dublin'
    let dst
    const dstcheck = momenttz(moment().add(tomorrow, 'day'), city).isDST()

    if (!dstcheck && moment().format('M') === '10') dst = -1
    else if (dstcheck && moment().format('M') === '3') dst = 1
    else dst = 0

    // if (moment().isDST()) dst = 1; else dst = 0;
    // console.log(dst)
    // var dst = this.state.dst
    let current,
      next,
      list

    const month = moment().add(dst, 'hour').month() + 1
    const date = moment().add(dst, 'hour').date()

    const tmonth = moment().add(1, 'days').add(dst, 'hour').month() + 1
    const tdate = moment().add(1, 'days').add(dst, 'hour').date()
    // console.log(month,date)

    const prayerNames = ['fajr', 'shurooq', 'dhuhr', 'asr', 'maghrib', 'isha']

    const listToday = []
    const listTomorrow = []

    prayerNames.forEach((prayer, index) => listToday.push({
      name: prayer,
      time: moment({
        hour: this.state.timetable[month][date][index][0],
        minute: this.state.timetable[month][date][index][1]
      }).add(dst, 'hour'),
      jamaah: {
        offset: this.jamaahCalc(index, moment({ hour: this.state.timetable[month][date][index][0], minute: this.state.timetable[month][date][index][1] })),
        time: moment({
          hour: this.state.timetable[month][date][index][0],
          minute: this.state.timetable[month][date][index][1]
        }).add(dst, 'hour')
          .add(this.jamaahCalc(index, moment({ hour: this.state.timetable[month][date][index][0], minute: this.state.timetable[month][date][index][1] })), 'minutes')
      }
    }))
    prayerNames.forEach((prayer, index) => listTomorrow.push({
      name: prayer,
      time: moment({
        hour: this.state.timetable[tmonth][tdate][index][0],
        minute: this.state.timetable[tmonth][tdate][index][1]
      }).add(1, 'day').add(dst, 'hour'),
      jamaah: {
        offset: this.jamaahCalc(index, moment({ hour: this.state.timetable[tmonth][tdate][index][0], minute: this.state.timetable[tmonth][tdate][index][1] })),
        time: moment({
          hour: this.state.timetable[tmonth][tdate][index][0],
          minute: this.state.timetable[tmonth][tdate][index][1]
        }).add(1, 'day').add(dst, 'hour')
          .add(this.jamaahCalc(index, moment({ hour: this.state.timetable[tmonth][tdate][index][0], minute: this.state.timetable[tmonth][tdate][index][1] })), 'minutes')
        // time: moment(
        //     this.state.timetable[tmonth][tdate][index][0]+'-'+
        //     this.state.timetable[tmonth][tdate][index][1], 'H-m'
        // ).add(1, 'day').add(dst, 'hour').add(this.jamaahCalc(
        // index, moment({hour: this.state.timetable[month][date][index][0],minute: this.state.timetable[month][date][index][1]})), 'minutes')
      }
    }))

    // console.log(listTomorrow[2].koko0,listTomorrow[1].koko1)

    // var timePeriod

    if (moment().isBetween(moment().startOf('day'), listToday[0].time)) {
      tomorrow = 0
      current = { name: 'midnight', time: moment().startOf('day') }
      next = { name: listToday[0].name, time: listToday[0].time }
      list = listToday
      // timePeriod = 'case 1'
    }
    // fajr-shurooq
    else if (moment().isBetween(listToday[0].time, listToday[1].time)) {
      // jamaah
      if (this.state.jamaahShow === true && moment().isBetween(listToday[0].time, listToday[0].jamaah.time)) {
        next = { name: `${listToday[0].name} jamaah`, time: listToday[0].jamaah.time }
      } else {
        next = { name: listToday[1].name, time: listToday[1].time }
      }
      tomorrow = 0
      current = { name: listToday[0].name, time: listToday[0].time }
      list = listToday
      // timePeriod = 'case 2'
    }
    // shurooq-dhuhr
    else if (moment().isBetween(listToday[1].time, listToday[2].time)) {
      tomorrow = 0
      current = { name: listToday[1].name, time: listToday[1].time }
      next = { name: listToday[2].name, time: listToday[2].time }
      list = listToday
      // timePeriod = 'case 3'
    }
    // dhuhr-asr
    else if (moment().isBetween(listToday[2].time, listToday[3].time)) {
      // jamaah
      if (this.state.jamaahShow === true && moment().isBetween(listToday[2].time, listToday[2].jamaah.time)) {
        next = { name: `${listToday[2].name} jamaah`, time: listToday[2].jamaah.time }
      } else {
        next = { name: listToday[3].name, time: listToday[3].time }
      }
      tomorrow = 0
      current = { name: listToday[2].name, time: listToday[2].time }
      list = listToday

      // timePeriod = 'case 4'
    }
    // asr-maghrib
    else if (moment().isBetween(listToday[3].time, listToday[4].time)) {
      // jamaah
      if (this.state.jamaahShow === true && moment().isBetween(listToday[3].time, listToday[3].jamaah.time)) {
        next = { name: `${listToday[3].name} jamaah`, time: listToday[3].jamaah.time }
      } else {
        next = { name: listToday[4].name, time: listToday[4].time }
      }
      tomorrow = 0
      current = { name: listToday[3].name, time: listToday[3].time }
      list = listToday
      // timePeriod = 'case 5'
    }
    // maghrib-isha
    else if (moment().isBetween(listToday[4].time, listToday[5].time)) {
      // jamaah
      if (this.state.jamaahShow === true && moment().isBetween(listToday[4].time, listToday[4].jamaah.time)) {
        next = { name: `${listToday[4].name} jamaah`, time: listToday[4].jamaah.time }
      } else {
        next = { name: listToday[5].name, time: listToday[5].time }
      }
      tomorrow = 0
      current = { name: listToday[4].name, time: listToday[4].time }
      list = listToday
      // timePeriod = 'case 6'
    }
    // isha-midnight
    else if (moment().isBetween(listToday[5].time, moment().endOf('day'))) {
      // jamaah
      if (this.state.jamaahShow === true && moment().isBetween(listToday[5].time, listToday[5].jamaah.time)) {
        next = { name: `${listToday[5].name} jamaah`, time: listToday[5].jamaah.time }
        tomorrow = 0
        list = listToday
        // timePeriod = 'case 7a'
      } else {
        tomorrow = 1
        list = listTomorrow
        next = { name: listTomorrow[0].name, time: listTomorrow[0].time }
        // timePeriod = 'case 7b'
      }

      current = { name: listToday[5].name, time: listToday[5].time }
    } else {
      tomorrow = 1
      current = { name: listToday[5].name, time: listToday[5].time }// .clone().add(-1, 'day')}
      list = listTomorrow
      next = { name: listTomorrow[0].name, time: listTomorrow[0].time }
      // next = {name: 'midnight', time: moment().endOf('day')}
      // console.log('case 8', listToday[5].time.isValid())
      // timePeriod = 'case 8'
    }

    // console.log (moment().format('M/D H'),timePeriod,'| current:',current.name,'| next:',next.name, '| tomorrow:',tomorrow)

    this.setState({ tomorrow, dst })

    // console.log(
    //     'now:', moment().format("DD/MM - H:mm"),
    //     '\nfajr:', listToday[0].time.format("DD/MM - H:mm"),
    //     '\nshurooq:', listToday[1].time.format("DD/MM - H:mm"),
    //     '\ndhuhr:', listToday[2].time.format("DD/MM - H:mm"),
    //     '\nmaghrib:', listToday[4].time.format("DD/MM - H:mm"),
    //     '\nisha:', listToday[5].time.format("DD/MM - H:mm"),
    //     '\ncurrent:', current.time.format("DD/MM - H:mm"),
    //     '\nnext:', next.time.format("DD/MM - H:mm")
    // )

    return {
      list, current, next, tomorrow
    }
  }

  dayCalc (tomorrow) {
    const gregorian = moment().add(tomorrow, 'day').format('dddd, D MMMM YYYY')
    const hijri = moment().add((parseInt(this.state.settings.hijrioffset, 10) + parseInt(tomorrow, 10)), 'day').format('iD iMMMM iYYYY')

    return { gregorian, hijri, tomorrow }
  }

  componentWillMount () {
    // console.log('1',this.state.tomorrow)
    this.prayersCalc()
    // console.log('2',this.state.tomorrow)

    this.setState({
      prayers: this.prayersCalc(this.state.tomorrow),
      day: this.dayCalc(this.state.tomorrow),
      settings: defsettings,
      timetable: deftimetable,
      overlayActive: false,
      jamaahShow: true
    })
  }

  async componentDidMount () {
    // console.log('3',this.state.tomorrow)
    document.title = 'ICCI Timetable'

    try {
      // var settings, timetable

      if (await localStorage.getItem('settings') !== 'undefined') {
        var newsettings = await JSON.parse(localStorage.getItem('settings'))
      }
      if (await localStorage.getItem('timetable') !== 'undefined') {
        var newtimetable = await JSON.parse(localStorage.getItem('timetable'))
      }

      // console.log(JSON.parse(localStorage.getItem('timetable')))
      await this.setState({ settings: newsettings, timetable: newtimetable })
    } catch (error) {
      console.log(error)
    }

    await this.update()

    this.timerID = setInterval(
      () => this.tick(),
      1000
    )
    this.updateID = setInterval(
      () => this.update(),
      this.state.refresh * 60 * 1000

    )
  }

  componentWillUnmount () {
    clearInterval(this.timerID)
    clearInterval(this.updateID)
  }

  tick () {
    this.setState({
      prayers: this.prayersCalc(this.state.tomorrow),
      day: this.dayCalc(this.state.tomorrow)
    })

    if (moment().isBetween(this.state.jummuahTime, this.state.jummuahTime.clone().add(1, 'hour'))) {
      this.setState({
        overlayActive: true
      })
      // console.log('ok')
    }
    // console.log(moment().isBetween(this.state.jummuahTime, this.state.jummuahTime.clone().add(7, 'hour')))
    // console.log(this.state.jummuahTime.format('dddd D/M H:m'))

    // localStorage.setItem('settings', 'koko')

    // console.log(localStorage.getItem('settings'))
  }

  async update () {
    if (this.state.refresh !== 0) {
      try {
        const res = await fetch('https://islamireland.ie/api/timetable/', { mode: 'cors' })
        // set vars
        const { name, settings, timetable } = await res.json()
        // console.log(settings)
        // update states and storage
        await this.setState({ settings, timetable, name })
        await localStorage.setItem('settings', JSON.stringify(settings))
        await localStorage.setItem('timetable', JSON.stringify(timetable))
        // console.log('timetable', timetable)
        console.log('refreshed')
      } catch (error) {
        console.log(error)
      }
    }
  }

  render () {
    // console.log(this.state.settings)
    return (
      <div className='TimetableApp'>

        <Overlay settings={this.state.settings} day={this.state.day} title={this.state.overlayTitle} overlayActive={this.state.overlayActive} />
        <Header settings={this.state.settings} />
        {/* {console.log(this.state.settings)} */}
        <Clock day={this.state.day} />
        <Timetable
          prayers={this.state.prayers}
          jamaahShow={this.state.jamaahShow || true}
        />
        <Countdown
          prayers={this.state.prayers}
        />
        <Message settings={this.state.settings} />
        <Footer settings={this.state.settings} />

      </div>
    )
  }
}

export default TimetableApp
