// eslint-disable-next-line import/extensions
import create from './utils/create'

export default class Key {
  constructor({ small, shift, code }) {
    this.code = code
    this.small = small
    this.shift = shift
    this.isFnKey = Boolean(
      code.match(/Backspace|Tab|Caps|Enter|Shift|Control|Alt|Meta|Space|Arrow/)
    )

    if (shift && shift.match(/[^a-zA-Zа-яА-ЯёË0-9]/)) {
      this.sub = create('div', 'sub', this.shift)
    } else {
      this.sub = create('div', 'sub', '')
    }

    this.letter = create('div', 'letter', small)
    this.div = create(
      'div',
      'keyboard__key',
      [this.sub, this.letter],
      null,
      ['code', this.code],
      this.isFnKey ? ['fn', 'true'] : ['fn', 'false']
    )
  }
}
