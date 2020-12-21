import Keyboard from './Keyboard'
import rowsOrder from './constants/rowsOrder'
import lang from './constants/lang'

new Keyboard(rowsOrder).init(lang).generateLayout()
