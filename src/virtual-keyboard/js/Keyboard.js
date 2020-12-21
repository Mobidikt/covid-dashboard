/* eslint-disable no-alert */
/* eslint-disable no-undef */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
import * as storage from './storage'
import create from './utils/create'
import language from './layouts/index'
import Key from './Key'

if (window.SpeechRecognition || window.webkitSpeechRecognition) {
  window.SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
} else {
  alert('Voice recognition function is not supported by browser')
}

export default class Keyboard {
  constructor(rowsOrder) {
    this.rowsOrder = rowsOrder
    this.isFn = false
    this.isShift = false
    this.isCaps = false
    this.metaKey = false
    this.isControl = true
    this.recognition = window.SpeechRecognition
      ? new SpeechRecognition()
      : false
  }

  init(langCode) {
    const searchInput = document.querySelector('.search-input')
    this.keyBase = language[langCode]
    this.output = searchInput

    this.container = create('div', 'keyboard', null, null, [
      'language',
      langCode,
    ])

    if (this.recognition) {
      this.recognition.interimResults = false
      this.recognition.lang = langCode
      this.recognition.addEventListener('result', (e) => {
        const transcript = Array.from(e.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join('')
        if (e.results[0].isFinal) {
          if (transcript.match(/пробел|space/)) {
            this.output.value += ' '
          } else if (transcript.match(/запятая|comma/)) {
            this.output.value += ', '
          } else if (transcript.match(/точка|dot/)) {
            this.output.value += '. '
          } else if (transcript.match(/вопросительный знак|question mark/)) {
            this.output.value += '? '
          } else if (
            transcript.match(/восклицательный знак|exclamation point/)
          ) {
            this.output.value += '! '
          } else if (transcript.match(/тире|dash/)) {
            this.output.value += ' - '
          } else {
            this.output.value += transcript
          }
        }
      })
      this.recognition.addEventListener('end', () => {
        if (this.isFn) this.recognition.start()
      })
    }
    return this
  }

  generateLayout() {
    this.keyButtons = []
    this.rowsOrder.forEach((row, i) => {
      const rowElement = create('div', 'keyboard__row', null, this.container, [
        'row',
        i + 1,
      ])
      row.forEach((code) => {
        if (Array.isArray(code)) {
          const arrowDiv = create('div', 'arrow__container')
          code.forEach((item) => {
            const arrow = this.keyBase.find((key) => key.code === item)
            if (arrow) {
              const keyButton = new Key(arrow)
              this.keyButtons.push(keyButton)
              arrowDiv.appendChild(keyButton.div)
              rowElement.appendChild(arrowDiv)
            }
          })
        } else {
          const keyObj = this.keyBase.find((key) => key.code === code)
          if (keyObj) {
            const keyButton = new Key(keyObj)
            this.keyButtons.push(keyButton)
            rowElement.appendChild(keyButton.div)
            if (!window.SpeechRecognition && keyObj.code === 'fn') {
              keyButton.div.classList.add('fn-disabled')
            }
          }
        }
      })
    })

    document.addEventListener('keydown', this.handleEvent)
    document.addEventListener('keyup', this.handleEvent)
    document.addEventListener('mousedown', this.handleEvent)
    document.addEventListener('mouseup', this.handleEvent)
  }

  handleEvent = (e) => {
    if (e.stopPropagation) e.stopPropagation()
    if (e.type.match(/mouse/) && !e.target.parentElement.dataset.code) return
    let { code } = e
    const { type } = e
    if (!code) {
      code = e.path
        ? e.path[1].dataset.code
        : e.toElement
        ? e.toElement.parentElement.dataset.code
        : e.originalTarget.parentElement.dataset.code
    }

    const keyObj = this.keyButtons.find((key) => key.code === code)
    // eslint-disable-next-line no-useless-return
    if (!keyObj) return
    this.output.focus()
    if (
      (type === 'keydown' && this.isControl) ||
      (type === 'mousedown' && this.isControl)
    )
      this.printSound()

    if (type.match(/keydown|mousedown/)) {
      if (code.match(/fn/)) {
        keyObj.div.classList.add('fn-active')
      } else {
        keyObj.div.classList.add('active')
      }

      if (type.match(/mousedown/)) {
        if (this.metaKey && !code.match(/Space/)) {
          this.metaKey = false
          this.removeClass('Meta', 'active')
          return
        }
      }
      if (
        code.match(
          /Tab|Caps|Shift|fn|Control|Alt|Meta|Arrow|Enter|Backspace|Space/
        )
      ) {
        this.specialKeys(e, keyObj)
        // eslint-disable-next-line no-empty
      } else if (type.match(/keydown/)) {
      } else {
        this.printToOutput(keyObj, keyObj.letter.innerText)
      }
    } else if (type.match(/keyup|mouseup/)) {
      if (type.match(/keyup/) && code.match(/Caps/)) this.specialKeys(e, keyObj)
      if (type.match(/keyup/) && code.match(/Shift/))
        this.specialKeys(e, keyObj)
      if (this.metaKey) return
      if (this.isShift && code.match(/Shift/)) return
      if (!this.isControl && code.match(/Control/)) return
      keyObj.div.classList.remove('active')
    }
  }

  printSound = () => {
    const audio = new Audio()
    audio.src = './assets/audio/click.mp3'
    audio.play()
  }

  actualLanguage = () => {
    const langAbbr = Object.keys(language)
    return langAbbr.indexOf(this.container.dataset.language)
  }

  removeClass = (match, className) => {
    this.keyButtons
      .find((key) => key.code.match(`${match}`))
      .div.classList.remove(`${className}`)
  }

  specialKeys = (e, keyObj) => {
    const { code } = keyObj
    const { type } = e
    if (code === 'Tab' && type.match(/down/)) {
      e.preventDefault()
      this.printToOutput(keyObj)
    }
    if (
      (code.match(/Caps/) && type.match(/down/)) ||
      (code.match(/Caps/) && type.match(/keyup/))
    ) {
      if (!this.isCaps) {
        this.isCaps = true
        this.keyButtons
          .find((key) => key.code.match(/Caps/))
          .div.firstChild.classList.add('caps-toggle')
        this.isShift ? this.switchShift() : this.switchCase('upper')
      } else {
        this.isCaps = false
        this.keyButtons
          .find((key) => key.code.match(/Caps/))
          .div.firstChild.classList.remove('caps-toggle')
        this.isShift ? this.switchShift() : this.switchCase('')
      }
    }
    if (
      (code.match(/Shift/) && type.match(/down/)) ||
      (code.match(/Shift/) && type.match(/keyup/))
    ) {
      if (!this.isShift) {
        this.isShift = true
        this.switchShift()
      } else {
        this.isShift = false
        this.switchShift()
      }
    }
    if (type.match(/mousedown/)) {
      if (code.match(/Backspace|Enter|Arrow/)) {
        this.printToOutput(keyObj)
      }
      if (code.match(/Control/)) {
        this.isControl = !this.isControl
      }
      if (code.match(/Space/) && !this.metaKey) this.printToOutput(keyObj)
      if (code.match(/Meta/)) this.metaKey = true
      if (this.metaKey && code.match(/Space/)) {
        this.metaKey = false
        this.removeClass('Meta', 'active')
        this.removeClass('Space', 'active')
        this.switchLanguage()
      }
      if (code.match(/fn/)) {
        if (!this.isFn) {
          this.isFn = true
          this.speechDetection()
        } else {
          this.isFn = false
          this.removeClass('fn', 'fn-active')
          this._end
        }
      }
    }
  }

  printToOutput(keyObj, symbol) {
    let cursorPos = this.output.selectionStart
    const left = this.output.value.slice(0, cursorPos)
    const right = this.output.value.slice(cursorPos)

    const fnButtonsHandler = {
      Tab: () => {
        this.output.value = `${left}\t${right}`
        cursorPos += 1
      },
      Enter: () => {
        this.output.value = `${left}\n${right}`
        cursorPos += 1
      },
      Backspace: () => {
        this.output.value = `${left.slice(0, left.length - 1)}${right}`
        cursorPos -= 1
      },
      Space: () => {
        this.output.value = `${left} ${right}`
        cursorPos += 1
      },
      ArrowLeft: () => {
        cursorPos = cursorPos - 1 >= 0 ? cursorPos - 1 : 0
      },
      ArrowRight: () => {
        cursorPos += 1
      },
      ArrowUp: () => {
        const positionFromLeft = this.output.value
          .slice(0, cursorPos)
          .match(/(\n).*$(?!\1)/g) || [[1]]
        cursorPos -= positionFromLeft[0].length
      },
      ArrowDown: () => {
        const positionFromLeft = this.output.value
          .slice(cursorPos)
          .match(/^.*(\n).*(?!\1)/) || [[1]]
        cursorPos += positionFromLeft[0].length
      },
    }
    if (fnButtonsHandler[keyObj.code]) fnButtonsHandler[keyObj.code]()
    else if (symbol) {
      cursorPos += 1
      this.output.value = `${left}${symbol}${right}`
    }
    this.output.setSelectionRange(cursorPos, cursorPos)
  }

  speechDetection = () => {
    const langAbbr = Object.keys(language)
    const langIndex = this.actualLanguage()
    this.recognition.lang = langAbbr[langIndex]
    if (this.isFn) {
      this._start()
    } else {
      this._end()
    }
  }

  _start = () => {
    this.recognition.start()
  }

  _end = () => {
    this.recognition.abort()
  }

  switchCase = (switcher) => {
    this.keyButtons.forEach((button) => {
      const keyObj = this.keyBase.find((key) => key.code === button.code)
      if (!keyObj) return

      if (
        (keyObj.shift && keyObj.shift.match(/[^a-zA-Za-яА-ЯёË0-9]/)) ||
        (keyObj.shift && keyObj.shift.match(/{|}|\||~/))
      ) {
        button.sub.innerHTML = keyObj.shift
      } else {
        button.sub.innerHTML = ''
      }
      if (
        keyObj.code.match(
          /Tab|Caps|Shift|fn|Control|Alt|Meta|Arrow|Enter|Backspace|Space/
        )
      ) {
        button.letter.innerHTML = keyObj.small
      } else {
        button.letter.innerHTML =
          switcher === 'upper' ? keyObj.small.toUpperCase() : keyObj.small
      }
    })
  }

  switchShift = () => {
    this.keyButtons.forEach((button) => {
      const keyObj = this.keyBase.find((key) => key.code === button.code)
      if (!keyObj) return

      if (
        (keyObj.shift && keyObj.shift.match(/[^a-zA-Za-яА-ЯёË0-9]/)) ||
        (keyObj.shift && keyObj.shift.match(/{|}|\||~/))
      ) {
        button.sub.innerHTML = this.isShift ? keyObj.small : keyObj.shift
      } else {
        button.sub.innerHTML = ''
      }
      if (
        keyObj.code.match(
          /Tab|Caps|Shift|fn|Control|Alt|Meta|Arrow|Enter|Backspace|Space/
        )
      ) {
        button.letter.innerHTML = keyObj.small
      } else if (
        keyObj.code.match(
          /quote|Digit|Minus|Equal|Bracket|lash|Period|Comma|Colon|Quote/
        )
      ) {
        button.letter.innerHTML = this.isShift ? keyObj.shift : keyObj.small
      } else {
        button.letter.innerHTML =
          this.isShift && !this.isCaps ? keyObj.shift : keyObj.small
      }
    })
  }

  switchLanguage = () => {
    const langAbbr = Object.keys(language)
    let langIndex = this.actualLanguage()
    langIndex =
      langIndex === langAbbr.length - 1 ? langIndex - langIndex : langIndex + 1
    this.keyBase = language[langAbbr[langIndex]]
    this.container.dataset.language = langAbbr[langIndex]
    storage.set('kbLang', langAbbr[langIndex])

    this.keyButtons.forEach((button) => {
      const keyObj = this.keyBase.find((key) => key.code === button.code)
      if (!keyObj) return
      button.shift = keyObj.shift
      button.small = keyObj.small
      if (
        (keyObj.shift && keyObj.shift.match(/[^a-zA-Za-яА-ЯёË0-9]/)) ||
        (keyObj.shift && keyObj.shift.match(/{|}|\||~/))
      ) {
        button.sub.innerHTML = keyObj.shift
      } else {
        button.sub.innerHTML = ''
      }
      button.letter.innerHTML = keyObj.small
    })
    this.keyBase = language[langAbbr[langIndex]]
    if (this.isCaps) {
      this.switchCase('upper')
    }
    if (this.isShift) {
      this.switchShift()
    }
  }
}
